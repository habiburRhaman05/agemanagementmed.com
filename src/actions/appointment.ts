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

    // Best-effort — a GHL outage or webhook error must never fail the
    // appointment itself, since it's already saved above. Only fields the
    // browser actually appended (pageUrl, referrer, ipAddress, userAgent,
    // etc. — all values only `window`/`navigator`/`document` can read) go
    // through; anything missing (e.g. a call site that doesn't collect them)
    // is just omitted from the GHL payload rather than failing.
    await sendToGoHighLevel({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      service: parsed.data.service ?? null,
      location: formData.get('location') as string | null,
      pageUrl: formData.get('pageUrl') as string | null,
      referrer: formData.get('referrer') as string | null,
      ipAddress: formData.get('ipAddress') as string | null,
      userAgent: formData.get('userAgent') as string | null,
      browserLanguage: formData.get('browserLanguage') as string | null,
      screenWidth: formData.get('screenWidth') as string | null,
      screenHeight: formData.get('screenHeight') as string | null,
    }).catch((error) => {
      console.error('GoHighLevel booking webhook failed:', error)
    })

    return { success: true, data: { id: appointment.id } }
  } catch (error) {
    console.error('Book appointment error:', error)
    return { success: false, error: 'Failed to book appointment' }
  }
}

/**
 * Forwards a new appointment request to the GoHighLevel inbound webhook.
 *
 * Runs server-side (this file is `'use server'`) — the POST used to live in
 * `BookingModal.tsx` (a client component) as `sendToHighLevel()`, where the
 * browser's own CORS restrictions silently dropped it: leadconnectorhq.com
 * doesn't return `Access-Control-Allow-Origin` for cross-origin browser
 * requests, so the webhook looked valid but never actually delivered data
 * from a real visitor's browser.
 */
async function sendToGoHighLevel(data: {
  name: string
  email: string
  phone: string | null
  service: string | null
  location: string | null
  pageUrl: string | null
  referrer: string | null
  ipAddress: string | null
  userAgent: string | null
  browserLanguage: string | null
  screenWidth: string | null
  screenHeight: string | null
}) {
  const webhookUrl = process.env.GHL_BOOKING_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('GHL_BOOKING_WEBHOOK_URL is not configured')
    return
  }

  const payload = {
    name: data.name,
    full_name: data.name,
    email: data.email,
    phone: data.phone ?? '',
    location: data.location ?? '',
    service: data.service ?? '',
    website: 'Age Management',
    website_name: 'Age Management',
    website_domain: 'agemanagementmed.com',
    source: 'Age Management Website',
    lead_source: 'Website Booking Modal',
    source_type: 'booking_modal',
    form_name: 'Book Appointment',
    form_type: 'appointment_request',
    page_url: data.pageUrl ?? '',
    landing_page_url: data.pageUrl ?? '',
    current_page_url: data.pageUrl ?? '',
    referrer_url: data.referrer ?? '',
    referrer: data.referrer ?? '',
    ip_address: data.ipAddress ?? '',
    visitor_ip: data.ipAddress ?? '',
    user_agent: data.userAgent ?? '',
    browser_language: data.browserLanguage ?? '',
    screen_width: data.screenWidth ? Number(data.screenWidth) : null,
    screen_height: data.screenHeight ? Number(data.screenHeight) : null,
    submitted_at: new Date().toISOString(),
    form_source: 'agemanagementmed.com',
    tag: 'website-leads',
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    console.error('GoHighLevel booking webhook rejected:', response.status, await response.text())
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
