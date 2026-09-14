import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url.replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
