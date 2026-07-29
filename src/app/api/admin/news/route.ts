import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CreateNewsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  thumbnailUrl: z.string().min(1).url('Thumbnail must be a valid URL'),
  newsLink: z.string().min(1).url('News link must be a valid URL'),
  source: z.string().optional(),
  publishedLabel: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['article', 'video']).default('article'),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
})

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const rows = await prisma.newsItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json({ news: rows })
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = CreateNewsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const row = await prisma.newsItem.create({ data: parsed.data })

  revalidateTag('news', 'max')

  return NextResponse.json({ news: row }, { status: 201 })
}
