import type { MetadataRoute } from 'next'

import { getAllTreatments } from '@/content/treatments/main'
import { site } from '@/content/site'
import { prisma } from '@/lib/prisma'

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/our-experts', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact-us', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/book-appointment', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/in-the-news', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
  // These four real content pages exist under `(marketing)` but were never
  // added here — they render fine and are linkable, just invisible to
  // crawlers relying on the sitemap to discover them.
  { path: '/financing-options', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/office-policies', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/specials', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/newsletter', changeFrequency: 'monthly', priority: 0.4 },
  // Deliberately NOT included: /thank-you, /newsletter-thankyou (post-submit
  // confirmation screens — no unique content, shouldn't be a search
  // landing page), /schedule-consultation, /lead-magnet, /conversational-ai
  // (funnel/campaign pages, not general site navigation). None of these
  // currently set `noindex` either — worth a follow-up if they're meant to
  // stay out of search entirely rather than just out of the sitemap.
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url.replace(/\/$/, '')

  const [treatments, posts, seoRows] = await Promise.all([
    getAllTreatments(),
    prisma.post.findMany({
      where: { status: 'published', deletedAt: null },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.pageSeo.findMany({ select: { path: true, robotsMeta: true, sitemapInclude: true } }),
  ])

  /**
   * A page an admin has marked `noindex` (or excluded from the sitemap) must
   * not still be listed here — submitting a noindexed URL is a contradictory
   * signal that Search Console reports as an error. `PageSeo.sitemapInclude`
   * existed as a column but nothing ever read it, so the two settings could
   * silently disagree.
   */
  const excludedPaths = new Set(
    seoRows
      .filter((row) => row.sitemapInclude === false || /noindex/i.test(row.robotsMeta ?? ''))
      .map((row) => row.path),
  )

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.filter(
    (route) => !excludedPaths.has(route.path),
  ).map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const treatmentEntries: MetadataRoute.Sitemap = treatments
    .filter((treatment) => !excludedPaths.has(treatment.href))
    .map((treatment) => ({
      url: `${baseUrl}${treatment.href}`,
      changeFrequency: 'monthly',
      priority: 0.9,
    }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...treatmentEntries, ...postEntries]
}
