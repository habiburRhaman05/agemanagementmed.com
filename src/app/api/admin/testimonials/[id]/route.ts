import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const UpdateTestimonialSchema = z.object({
  name: z.string().min(1).optional(),
  roleLabel: z.string().optional().nullable(),
  treatment: z.string().optional().nullable(),
  quote: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  photoUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  status: z.enum(['draft', 'published']).optional(),
  order: z.number().int().optional(),
})

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const row = await prisma.testimonial.findUnique({ where: { id } })
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ testimonial: row })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.testimonial.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = UpdateTestimonialSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const row = await prisma.testimonial.update({ where: { id }, data: parsed.data })

  revalidateTag('testimonials', 'max')

  return NextResponse.json({ testimonial: row })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.testimonial.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.testimonial.delete({ where: { id } })

  revalidateTag('testimonials', 'max')

  return NextResponse.json({ success: true })
}
