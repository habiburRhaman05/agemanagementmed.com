import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getLeads } from '@/actions/lead'
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

interface LeadExportRow {
  name: string
  email: string
  phone: string | null
  message: string | null
  sourcePath: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

const COLUMNS: ExportColumn<LeadExportRow>[] = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Message', key: 'message' },
  { label: 'Source Path', key: 'sourcePath' },
  { label: 'Status', key: 'status' },
  { label: 'Created At', key: 'createdAt' },
  { label: 'Updated At', key: 'updatedAt' },
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

    const rows: LeadExportRow[] =
      scope === 'selected'
        ? await prisma.lead.findMany({ where: { id: { in: ids } } })
        : (await getLeads({ status, search, page: 1, pageSize: 100000 })).leads

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
    console.error('Lead export error:', error)
    return NextResponse.json({ error: 'Unable to generate export file' }, { status: 500 })
  }
}
