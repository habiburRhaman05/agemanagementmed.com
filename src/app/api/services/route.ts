import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rows = await prisma.service.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    })

    const services = rows.map((row) => ({
      slug: row.slug,
      href: row.href,
      shortName: row.shortName,
      summary: row.summary,
      cardImage: {
        src: row.cardImageSrc,
        alt: row.cardImageAlt,
      },
      cardBenefits: row.cardBenefits as string[],
    }))

    return NextResponse.json({ services })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}
