import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { prisma } from '@/lib/prisma'
import type { TreatmentSummary } from '@/components/shared/Services'

const fetchPublishedServices = unstable_cache(
  async (): Promise<TreatmentSummary[]> => {
    const rows = await prisma.service.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    })

    return rows.map((row) => ({
      slug: row.slug,
      href: row.href,
      pillar: 'aesthetics' as const, // Currently hardcoded to aesthetics based on existing logic
      audience: 'all' as const,
      name: row.shortName,
      shortName: row.shortName,
      summary: row.summary,
      cardImage: {
        src: row.cardImageSrc,
        alt: row.cardImageAlt,
      },
      cardBenefits: row.cardBenefits as string[],
    }))
  },
  ['published-services'],
  { tags: ['services'], revalidate: 3600 }
)

export const getServices = cache(fetchPublishedServices)
