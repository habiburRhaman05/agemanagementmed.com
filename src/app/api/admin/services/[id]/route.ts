import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const UpdateServiceSchema = z.object({
  slug: z.string().min(1).optional(),
  href: z.string().min(1).optional(),
  shortName: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  cardImageSrc: z.string().min(1).optional(),
  cardImageAlt: z.string().min(1).optional(),
  cardBenefits: z.array(z.string().min(1)).min(1).optional(),
  order: z.number().int().optional(),
  status: z.enum(['draft', 'published']).optional(),
})

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const row = await prisma.service.findUnique({ where: { id } })
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ service: row })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.service.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = UpdateServiceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const row = await prisma.service.update({ where: { id }, data: parsed.data as any })

  revalidateTag('services', 'max')
  revalidatePath('/')

  return NextResponse.json({ service: row })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.service.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.service.delete({ where: { id } })

  revalidateTag('services', 'max')
  revalidatePath('/')

  return NextResponse.json({ success: true })
}
