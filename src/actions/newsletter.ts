'use server'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'

/* ── Validation ───────────────────────────────────────────────────── */

const NewsletterSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Enter a valid email address'),
})

export type ActionResult =
  | { success: true; data?: { id: string } }
  | { success: false; error: string }

/* ── Public: subscribe ────────────────────────────────────────────── */

export async function subscribeNewsletter(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const parsed = NewsletterSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    })

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e) => e.message).join(', '),
      }
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: parsed.data.email },
    })

    if (existing) {
      return { success: false, error: "You're already subscribed with this email." }
    }

    const subscriber = await prisma.newsletterSubscriber.create({ data: parsed.data })

    // Best-effort — a GHL outage or webhook error must never fail the
    // subscription itself, since the subscriber is already saved above.
    await sendToGoHighLevel(parsed.data).catch((error) => {
      console.error('GoHighLevel newsletter webhook failed:', error)
    })

    return { success: true, data: { id: subscriber.id } }
  } catch (error) {
    console.error('Subscribe newsletter error:', error)
    return { success: false, error: 'Failed to subscribe. Please try again.' }
  }
}

/**
 * Forwards a new subscriber to the GoHighLevel inbound webhook.
 *
 * Runs server-side (this file is `'use server'`) — the same POST used to
 * live in `NewsletterForm.tsx` (a client component), where the browser's own
 * CORS restrictions silently dropped it: leadconnectorhq.com doesn't return
 * `Access-Control-Allow-Origin` for cross-origin browser requests, so the
 * request looked fine locally/via curl but never actually reached GHL from a
 * real visitor's browser.
 */
async function sendToGoHighLevel(data: { firstName: string; lastName: string; email: string }) {
  const webhookUrl = process.env.GHL_NEWSLETTER_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('GHL_NEWSLETTER_WEBHOOK_URL is not configured')
    return
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      source: 'Age Management Website',
    }),
  })

  if (!response.ok) {
    console.error('GoHighLevel newsletter webhook rejected:', response.status, await response.text())
  }
}

/* ── Admin: list ──────────────────────────────────────────────────── */

export async function getNewsletterSubscribers(params?: {
  search?: string
  page?: number
  pageSize?: number
}) {
  const { search, page = 1, pageSize = 10 } = params || {}

  const where: Record<string, unknown> = {}
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [subscribers, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.newsletterSubscriber.count({ where: where as any }),
  ])

  return { subscribers, total, totalPages: Math.ceil(total / pageSize), currentPage: page }
}
