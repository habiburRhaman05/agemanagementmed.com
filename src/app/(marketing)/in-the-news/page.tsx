import type { Metadata } from 'next'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { ContentGrid } from '@/components/sections/ContentGrid'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { getNewsItems } from '@/actions/news'
import { buildMetadata, resolveStaticPageSeo } from '@/lib/seo'
import type { ContentSummary } from '@/types/content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    await resolveStaticPageSeo('/in-the-news', {
      title: 'In The News | Savannah Age Management Medicine',
      description:
        'Press coverage and media features of Savannah Age Management Medicine — see where our providers and practice have been featured.',
      canonical: '/in-the-news',
    }),
  )
}

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const news = await getNewsItems()

  const items: ContentSummary[] = news.map((item) => ({
    href: item.newsLink,
    title: item.title,
    image: { src: item.thumbnailUrl, alt: item.title },
    external: true,
    eyebrow: item.source ?? undefined,
    date: item.publishedLabel ?? undefined,
    excerpt: item.description ?? undefined,
  }))

  return (
    <>
      <Header />
      <HeroCompact
        align="center"
        eyebrow="Press"
        title="In The News"
        lead="Press coverage and media features of Savannah Age Management Medicine."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'In The News', href: '/in-the-news' }]}
      />
      <ContentGrid eyebrow="As seen on" title="In the news" items={items} columns={4} compact />

      {/*
        Production's closing "Ready to transform your health?" band on this
        page uses hero-15-bg.jpg — a different photo than the homepage's
        (hero-29-bg) or /our-experts' (hero-11-bg). This page was missing the
        band entirely, which is presumably what read as "wrong bg image".
      */}
      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        backgroundImage="/themes/default/assets/images/hero-15-bg.jpg"
      />
    </>
  )
}
