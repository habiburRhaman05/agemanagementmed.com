import type { Metadata } from 'next'
import { Bodoni_Moda, Manrope } from 'next/font/google'

import './globals.css'

import { Footer } from '@/components/layout/Footer'
import { site } from '@/content/site'

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
  weight: ['400', '500'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Hormone Therapy & Weight Loss Clinic in Savannah, GA | SAMM',
    template: `%s | ${site.shortName}`,
  },
  description:
    'Savannah Age Management Medicine offers hormone therapy, medical weight loss, PRP, sexual wellness, and age management care in Pooler and Statesboro, GA.',
  icons: { icon: '/favicon.ico' },
}

import { ScrollFeatures } from '@/components/layout/ScrollFeatures'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-6 focus:py-3 focus:text-canvas-50"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
        <ScrollFeatures />
      </body>
    </html>
  )
}
