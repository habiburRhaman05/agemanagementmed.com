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
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url.replace(/\/$/, '')

  const [treatments, posts] = await Promise.all([
    getAllTreatments(),
    prisma.post.findMany({
      where: { status: 'published', deletedAt: null },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    }),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const treatmentEntries: MetadataRoute.Sitemap = treatments.map((treatment) => ({
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
