import type { Metadata } from 'next'
import { Bodoni_Moda, Manrope } from 'next/font/google'

import './globals.css'

import { TrackingScripts } from '@/components/shared/TrackingScripts'
import { site } from '@/content/site'
import { optimizedFaviconUrl } from '@/lib/optimized-image'
import { getSiteSettings } from '@/lib/settings'

/**
 * Bodoni Moda replaces the source site's Bodoni-72: the original is an Apple
 * system font, not licensed for web embedding, and its files were absent from
 * the download. Moda's variable optical-size axis is also a genuine upgrade at
 * display sizes. See docs/00-AUDIT.md §5.2.
 */
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const FALLBACK_TITLE = 'Hormone Therapy & Weight Loss Clinic in Savannah, GA | SAMM'
const FALLBACK_DESCRIPTION =
  'Savannah Age Management Medicine offers hormone therapy, medical weight loss, PRP, sexual wellness, and age management care in Pooler and Statesboro, GA.'

/** Site-wide default metadata — admin-editable via SiteSettings, same hardcoded values as fallback. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    metadataBase: new URL(site.url),
    title: {
      default: settings.defaultSeoTitle ?? FALLBACK_TITLE,
      template: `%s | ${site.shortName}`,
    },
    description: settings.defaultSeoDescription ?? FALLBACK_DESCRIPTION,
    icons: { icon: settings.faviconUrl ? optimizedFaviconUrl(settings.faviconUrl) : '/favicon.ico' },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: settings.defaultOgImageUrl
      ? { images: [{ url: settings.defaultOgImageUrl }] }
      : undefined,
    authors: [{ name: 'Habibur rahman' }],
    creator: 'Habibur rahman',
    other: {
      publisher: site.name,
      developer: 'Habibur rahman',
    },
  }
}

/**
 * Truly universal only: html shell, fonts, sitewide metadata, tracking
 * scripts. The marketing chrome (Footer, page-transition animation, scroll
 * features, skip link, Organization JSON-LD) lives in
 * `(marketing)/layout.tsx` instead — `admin/` and `api/` are siblings of
 * that group, so they render under this root layout only and never pick up
 * the public site's footer/animations.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      {/* Critical-origin hints — nearly every hero/section image is served from Cloudinary. */}
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      {settings.headerScripts ? (
        <head dangerouslySetInnerHTML={{ __html: settings.headerScripts }} />
      ) : null}
      <body className="font-sans antialiased">
        {/*
          GA4 + Google Tag Manager + Meta Pixel on every route, eagerly, from
          the static IDs hardcoded in `content/site.ts` (`site.tracking`) —
          no props passed here on purpose. This used to accept a `SiteSettings`
          override, which meant a tag inspector's result depended on a
          successful DB read on top of everything else; given that one of
          those "overrides" turned out to be masking a typo'd static ID for
          two weeks (see site.ts), the DB is no longer consulted for these at
          all. See TrackingScripts for why the earlier
          first-interaction-only loading must not come back either.
        */}
        <TrackingScripts />

        {children}
        {settings.footerScripts ? (
          <div dangerouslySetInnerHTML={{ __html: settings.footerScripts }} />
        ) : null}
      </body>
    </html>
  )
}
