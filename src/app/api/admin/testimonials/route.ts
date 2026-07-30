import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CreateTestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  roleLabel: z.string().optional().nullable(),
  treatment: z.string().optional().nullable(),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().int().min(1).max(5).default(5),
  photoUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  source: z.enum(['google', 'site']).default('site'),
  status: z.enum(['draft', 'published']).default('published'),
  order: z.number().int().default(0),
})

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const rows = await prisma.testimonial.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json({ testimonials: rows })
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = CreateTestimonialSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const row = await prisma.testimonial.create({ data: parsed.data })

  revalidateTag('testimonials', 'max')

  return NextResponse.json({ testimonial: row }, { status: 201 })
}
