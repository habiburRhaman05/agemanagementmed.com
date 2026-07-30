import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getAppointments } from '@/actions/appointment'
import { getCurrentAdmin } from '@/lib/auth'
import { buildCsv } from '@/lib/export/csv'
import { buildExcel } from '@/lib/export/excel'
import { isValidFileName, sanitizeFileName, type ExportColumn } from '@/lib/export/types'
import { prisma } from '@/lib/prisma'

const ExportSchema = z.object({
  format: z.enum(['csv', 'excel']),
  scope: z.enum(['all', 'selected']),
  ids: z.array(z.string()).optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  fileTitle: z.string().min(1, 'File title is required'),
  fileName: z.string().min(1, 'File name is required'),
})

interface AppointmentExportRow {
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string | null
  preferredDate: Date | null
  preferredTime: string | null
  status: string
  notes: string | null
  createdAt: Date
}

const COLUMNS: ExportColumn<AppointmentExportRow>[] = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Service', key: 'service' },
  { label: 'Message', key: 'message' },
  { label: 'Preferred Date', key: 'preferredDate' },
  { label: 'Preferred Time', key: 'preferredTime' },
  { label: 'Status', key: 'status' },
  { label: 'Notes', key: 'notes' },
  { label: 'Created At', key: 'createdAt' },
]

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const parsed = ExportSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid export request' },
        { status: 400 },
      )
    }

    const { format, scope, ids, status, search, fileTitle, fileName } = parsed.data

    if (!isValidFileName(fileName)) {
      return NextResponse.json({ error: 'Invalid file name' }, { status: 400 })
    }

    if (scope === 'selected' && (!ids || ids.length === 0)) {
      return NextResponse.json({ error: 'No records selected' }, { status: 400 })
    }

    const rows: AppointmentExportRow[] =
      scope === 'selected'
        ? await prisma.appointment.findMany({ where: { id: { in: ids } } })
        : (await getAppointments({ status, search, page: 1, pageSize: 100000 })).appointments

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No records available to export' }, { status: 400 })
    }

    const safeFileName = sanitizeFileName(fileName)

    if (format === 'csv') {
      const csv = buildCsv(rows, COLUMNS)
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${safeFileName}.csv"`,
        },
      })
    }

    const buffer = await buildExcel(rows, COLUMNS, fileTitle)
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${safeFileName}.xlsx"`,
      },
    })
  } catch (error) {
    console.error('Appointment export error:', error)
    return NextResponse.json({ error: 'Unable to generate export file' }, { status: 500 })
  }
}
