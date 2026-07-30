import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { prisma } from '@/lib/prisma'
import type { Testimonial } from '@/types/content'

/**
 * The single, DB-backed testimonial pool — every treatment page and the
 * public `/testimonials` page read from here. Replaces the old hardcoded
 * `content/shared/testimonials.ts` list and the various per-layout local
 * arrays; admin edits (`/admin/testimonials`) tag-revalidate this via
 * `revalidateTag('testimonials', 'max')` in the API routes, so changes go
 * live immediately.
 */
const fetchPublishedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const rows = await prisma.testimonial.findMany({
      where: { status: 'published' },
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    })

    return rows.map((row) => ({
      id: row.id,
      quote: row.quote,
      author: row.name,
      source: row.source as 'google' | 'site',
    }))
  },
  ['published-testimonials'],
  { tags: ['testimonials'], revalidate: 3600 },
)

/** `cache()` de-dupes within a single request; `unstable_cache` persists across requests until the tag is invalidated. */
export const getPublishedTestimonials = cache(fetchPublishedTestimonials)
