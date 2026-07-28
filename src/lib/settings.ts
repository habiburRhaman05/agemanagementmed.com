import { unstable_cache } from 'next/cache'

import { prisma } from '@/lib/prisma'

export interface SiteSettingsData {
  siteName: string
  tagline: string
  logoUrl: string
  logoDarkUrl: string
  faviconUrl: string | null
  phone: string | null
  email: string | null
  socialLinks: Partial<Record<'facebook' | 'instagram' | 'youtube' | 'linkedin' | 'tiktok', string>>
  defaultSeoTitle: string | null
  defaultSeoDescription: string | null
  defaultOgImageUrl: string | null
  headerScripts: string | null
  footerScripts: string | null
}

/**
 * Fallback matches the values that were hardcoded in Header/Footer before
 * this became DB-editable — a missing or empty SiteSettings row never breaks
 * the site.
 */
const FALLBACK: SiteSettingsData = {
  siteName: 'Savannah Age Management Medicine',
  tagline: 'Optimize your health. Optimize your life.',
  logoUrl: '/images/samm-blue-logo.png',
  logoDarkUrl: '/images/samm-logo.webp',
  faviconUrl: null,
  phone: null,
  email: null,
  socialLinks: {},
  defaultSeoTitle: null,
  defaultSeoDescription: null,
  defaultOgImageUrl: null,
  headerScripts: null,
  footerScripts: null,
}

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    const row = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } })
    if (!row) return FALLBACK

    return {
      siteName: row.siteName ?? FALLBACK.siteName,
      tagline: row.tagline ?? FALLBACK.tagline,
      logoUrl: row.logoUrl ?? FALLBACK.logoUrl,
      logoDarkUrl: row.logoDarkUrl ?? FALLBACK.logoDarkUrl,
      faviconUrl: row.faviconUrl,
      phone: row.phone,
      email: row.email,
      socialLinks: (row.socialLinks as SiteSettingsData['socialLinks']) ?? {},
      defaultSeoTitle: row.defaultSeoTitle,
      defaultSeoDescription: row.defaultSeoDescription,
      defaultOgImageUrl: row.defaultOgImageUrl,
      headerScripts: row.headerScripts,
      footerScripts: row.footerScripts,
    }
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 3600 },
)
