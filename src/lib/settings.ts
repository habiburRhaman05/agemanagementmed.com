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
  googleAnalyticsId: string | null
  metaPixelId: string | null
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
  googleAnalyticsId: null,
  // The live site's real Meta Pixel ID (see seo.json's `tracking.metaPixel`,
  // and the /1113520899741041 asset folder in the download/ backup — the
  // pixel proxies its events through a path named after its own ID). Kept
  // as a fallback, same as every other field here, rather than only in the
  // DB: admin can still override it from Settings, but the pixel now fires
  // even before anyone fills that field in.
  metaPixelId: '1113520899741041',
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
      googleAnalyticsId: row.googleAnalyticsId,
      // `getSiteSettings` only falls back to FALLBACK wholesale when the row
      // itself is missing — once a SiteSettings row exists (it does; the
      // admin has already customized siteName), every field below read
      // straight from the row with no per-field rescue. That's correct for
      // things that should genuinely go blank when unset (an OG image, a
      // custom header script) — but it silently dropped the Meta Pixel: the
      // ID lives in seo.json/the live site, nobody has entered it into the
      // admin Settings UI yet, so `row.metaPixelId` was `null` and the
      // pixel script in layout.tsx never rendered. `??` restores the
      // fallback here the same way `siteName`/`logoUrl`/etc. already work.
      metaPixelId: row.metaPixelId ?? FALLBACK.metaPixelId,
      headerScripts: row.headerScripts,
      footerScripts: row.footerScripts,
    }
  },
  ['site-settings'],
  { tags: ['site-settings'], revalidate: 3600 },
)
