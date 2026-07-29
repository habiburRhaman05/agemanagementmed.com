import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CreateServiceSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  href: z.string().min(1, 'Href is required'),
  shortName: z.string().min(1, 'Short name is required'),
  summary: z.string().min(1, 'Summary is required'),
  cardImageSrc: z.string().min(1, 'Image URL is required'),
  cardImageAlt: z.string().min(1, 'Image alt text is required'),
  cardBenefits: z.array(z.string().min(1)).min(1),
  order: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('published'),
})

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const rows = await prisma.service.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json({ services: rows })
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = CreateServiceSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const row = await prisma.service.create({ data: parsed.data as any })

  revalidateTag('services', 'max')
  revalidatePath('/')

  return NextResponse.json({ service: row }, { status: 201 })
}
