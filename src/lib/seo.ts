import type { Metadata } from 'next'

import { site } from '@/content/site'
import type { Seo } from '@/types/content'

/**
 * Turns a content `Seo` object into Next metadata. No page hand-writes
 * metadata — it always derives from the same object the page renders from.
 */
export function buildMetadata(seo: Seo): Metadata {
  const url = new URL(seo.canonical, site.url).toString()
  const images = seo.ogImage ? [{ url: seo.ogImage.src, alt: seo.ogImage.alt }] : undefined

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: site.name,
      locale: 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: images?.map((i) => i.url),
    },
  }
}
