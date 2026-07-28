'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

/* ── Validation ───────────────────────────────────────────────────── */

const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  sourcePath: z.string().optional().nullable(),
})

const StatusUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'converted', 'archived']),
  notes: z.string().optional().nullable(),
})

export type ActionResult =
  | { success: true; data?: { id: string } }
  | { success: false; error: string }

/* ── Public: submit a lead (simpler than bookAppointment — no scheduling) ── */

export async function submitLead(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const parsed = LeadSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: (formData.get('phone') as string) || null,
      message: (formData.get('message') as string) || null,
      sourcePath: (formData.get('sourcePath') as string) || null,
    })

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      }
    }

    const lead = await prisma.lead.create({ data: { ...parsed.data, status: 'new' } })

    return { success: true, data: { id: lead.id } }
  } catch (error) {
    console.error('Submit lead error:', error)
    return { success: false, error: 'Failed to submit' }
  }
}

/* ── Admin: list / update ─────────────────────────────────────────── */

export async function getLeads(params?: {
  status?: string
  search?: string
  page?: number
  pageSize?: number
}) {
  const { status, search, page = 1, pageSize = 10 } = params || {}

  const where: Record<string, unknown> = {}
  if (status) where.status = status
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.lead.count({ where: where as any }),
  ])

  return { leads, total, totalPages: Math.ceil(total / pageSize), currentPage: page }
}

export async function updateLeadStatus(
  id: string,
  status: string,
  notes?: string | null
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    const parsed = StatusUpdateSchema.safeParse({ status, notes: notes || null })
    if (!parsed.success) return { success: false, error: 'Invalid status' }

    await prisma.lead.update({ where: { id }, data: parsed.data })
    revalidatePath('/admin/leads')

    return { success: true }
  } catch (error) {
    console.error('Update lead error:', error)
    return { success: false, error: 'Failed to update lead' }
  }
}
