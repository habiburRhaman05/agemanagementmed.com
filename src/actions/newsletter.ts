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

    return { success: true, data: { id: subscriber.id } }
  } catch (error) {
    console.error('Subscribe newsletter error:', error)
    return { success: false, error: 'Failed to subscribe. Please try again.' }
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
