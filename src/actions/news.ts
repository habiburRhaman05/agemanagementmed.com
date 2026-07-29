'use server'

import { prisma } from '@/lib/prisma'

/* ── Public read ──────────────────────────────────────────────────── */

/** Published news items for the public `/in-the-news` page, ordered by admin-set `order` then newest first. */
export async function getNewsItems() {
  return prisma.newsItem.findMany({
    where: { published: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })
}
