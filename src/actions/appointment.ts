'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

/* ── Validation ───────────────────────────────────────────────────── */

const AppointmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
})

const StatusUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  notes: z.string().optional().nullable(),
})

export type ActionResult =
  | { success: true; data?: { id: string } }
  | { success: false; error: string }

/* ── Public: Book an appointment ──────────────────────────────────── */

export async function bookAppointment(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const service = formData.get('service') as string
    const message = formData.get('message') as string
    const preferredDate = formData.get('preferredDate') as string
    const preferredTime = formData.get('preferredTime') as string

    const parsed = AppointmentSchema.safeParse({
      name,
      email,
      phone: phone || null,
      service: service || null,
      message: message || null,
      preferredDate: preferredDate || null,
      preferredTime: preferredTime || null,
    })

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...parsed.data,
        preferredDate: parsed.data.preferredDate
          ? new Date(parsed.data.preferredDate)
          : null,
        status: 'pending',
      },
    })

    return { success: true, data: { id: appointment.id } }
  } catch (error) {
    console.error('Book appointment error:', error)
    return { success: false, error: 'Failed to book appointment' }
  }
}

/* ── Admin: Get appointments ──────────────────────────────────────── */

export async function getAppointments(params?: {
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
      { service: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [appointments, total] = await Promise.all([
    prisma.appointment.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.appointment.count({ where: where as any }),
  ])

  return {
    appointments,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  }
}

export async function getAppointment(id: string) {
  return prisma.appointment.findUnique({ where: { id } })
}

/* ── Admin: Update appointment status ─────────────────────────────── */

export async function updateAppointmentStatus(
  id: string,
  status: string,
  notes?: string | null
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    const parsed = StatusUpdateSchema.safeParse({
      status,
      notes: notes || null,
    })
    if (!parsed.success) {
      return { success: false, error: 'Invalid status' }
    }

    await prisma.appointment.update({
      where: { id },
      data: parsed.data,
    })

    revalidatePath('/admin/appointments')

    return { success: true }
  } catch (error) {
    console.error('Update appointment error:', error)
    return { success: false, error: 'Failed to update appointment' }
  }
}

/* ── Dashboard stats ──────────────────────────────────────────────── */

export async function getDashboardStats() {
  const [totalPosts, publishedPosts, draftPosts, totalAppointments, totalLeads, newLeads] =
    await Promise.all([
      prisma.post.count({ where: { deletedAt: null } }),
      prisma.post.count({ where: { status: 'published', deletedAt: null } }),
      prisma.post.count({ where: { status: 'draft', deletedAt: null } }),
      prisma.appointment.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'new' } }),
    ])

  const [recentPosts, recentAppointments] = await Promise.all([
    prisma.post.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalAppointments,
    totalLeads,
    newLeads,
    recentPosts,
    recentAppointments,
  }
}
