import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { prisma } from '@/lib/prisma'
import type { Audience, Pillar, Seo, Treatment } from '@/types/content'

/**
 * Single source of truth for every treatment page — now backed by Postgres
 * (`Treatment` + `PageSeo` tables) instead of a static array. Every exported
 * function keeps its original signature (aside from becoming async), so
 * `TreatmentTemplate`, `SectionRenderer`, and every `page.tsx` read the same
 * `Treatment` shape as before and don't know or care the data moved to a
 * database. See plan.md Phase 3.
 *
 * The original static array is preserved in `main.static-backup.ts.txt`
 * (not imported anywhere) as the instant-rollback path per plan.md Phase 10.
 */

interface TreatmentRow {
  slug: string
  href: string
  pillar: string
  audience: string | null
  kind: string
  data: unknown
}

interface PageSeoRow {
  title: string | null
  description: string | null
  keywords: string | null
  canonical: string | null
  ogImageUrl: string | null
  noindex: boolean
}

async function resolveSeo(href: string, seoRow: PageSeoRow | null): Promise<Seo> {
  if (seoRow?.title && seoRow.description) {
    return {
      title: seoRow.title,
      description: seoRow.description,
      canonical: seoRow.canonical ?? href,
      keywords: seoRow.keywords ?? undefined,
      ogImage: seoRow.ogImageUrl ? { src: seoRow.ogImageUrl, alt: seoRow.title } : undefined,
      noindex: seoRow.noindex,
    }
  }

  // Three-tier fallback: PageSeo row -> SiteSettings defaults -> a safe, never-blank minimum.
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } })
  return {
    title: seoRow?.title ?? settings?.defaultSeoTitle ?? href,
    description: seoRow?.description ?? settings?.defaultSeoDescription ?? '',
    canonical: seoRow?.canonical ?? href,
    keywords: seoRow?.keywords ?? undefined,
    ogImage: seoRow?.ogImageUrl
      ? { src: seoRow.ogImageUrl, alt: seoRow.title ?? href }
      : settings?.defaultOgImageUrl
        ? { src: settings.defaultOgImageUrl, alt: href }
        : undefined,
    noindex: seoRow?.noindex ?? false,
  }
}

async function toTreatment(row: TreatmentRow, seoRow: PageSeoRow | null): Promise<Treatment> {
  const seo = await resolveSeo(row.href, seoRow)

  return {
    ...(row.data as object),
    slug: row.slug,
    href: row.href,
    pillar: row.pillar as Pillar,
    audience: (row.audience ?? 'all') as Audience,
    kind: row.kind as Treatment['kind'],
    seo,
  } as Treatment
}

/**
 * `cache()` de-duplicates within a single request (so `generateMetadata` and
 * the page body reading the same slug hit Postgres once, not twice).
 * `unstable_cache` is the persistent, cross-request cache — tagged both
 * generically (`treatments`, for "invalidate everything") and specifically
 * (`treatment:<slug>`, for a single-row admin save).
 */
export const getTreatmentBySlug = cache(async (slug: string): Promise<Treatment | undefined> => {
  return unstable_cache(
    async () => {
      const row = await prisma.treatment.findUnique({ where: { slug, status: 'published' } })
      if (!row) return undefined
      const seoRow = await prisma.pageSeo.findUnique({ where: { path: row.href } })
      return toTreatment(row, seoRow)
    },
    ['treatment-by-slug', slug],
    { tags: ['treatments', `treatment:${slug}`], revalidate: 3600 },
  )()
})

/** Keyed by route path (`Treatment.href`) — the lookup for `app/[...slug]/page.tsx`. Public-only (`status: published`); draft rows 404 on the live site but remain visible/editable in admin. */
export const getTreatmentByHref = cache(async (href: string): Promise<Treatment | undefined> => {
  return unstable_cache(
    async () => {
      const row = await prisma.treatment.findFirst({ where: { href, status: 'published' } })
      if (!row) return undefined
      const seoRow = await prisma.pageSeo.findUnique({ where: { path: row.href } })
      return toTreatment(row, seoRow)
    },
    ['treatment-by-href', href],
    { tags: ['treatments', `treatment-href:${href}`], revalidate: 3600 },
  )()
})

/** Full `Treatment[]` for every *published* row — used to derive public summaries (see `content/treatments/index.ts`). */
export const getAllTreatments = cache(async (): Promise<Treatment[]> => {
  return unstable_cache(
    async () => {
      const rows = await prisma.treatment.findMany({
        where: { status: 'published' },
        orderBy: { order: 'asc' },
      })
      const seoRows = await prisma.pageSeo.findMany({
        where: { path: { in: rows.map((r) => r.href) } },
      })
      const seoByPath = new Map(seoRows.map((s) => [s.path, s]))
      return Promise.all(rows.map((row) => toTreatment(row, seoByPath.get(row.href) ?? null)))
    },
    ['all-treatments'],
    { tags: ['treatments'], revalidate: 3600 },
  )()
})
