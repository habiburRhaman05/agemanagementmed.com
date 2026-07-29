import { Header } from '@/components/layout/Header'
import { ContentGrid } from '@/components/sections/ContentGrid'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { getNewsItems } from '@/actions/news'
import { buildMetadata } from '@/lib/seo'
import type { ContentSummary } from '@/types/content'

export const metadata = buildMetadata({
  title: 'In The News | Savannah Age Management Medicine',
  description:
    'Press coverage and media features of Savannah Age Management Medicine — see where our providers and practice have been featured.',
  canonical: '/in-the-news',
})

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const news = await getNewsItems()

  const items: ContentSummary[] = news.map((item) => ({
    href: item.newsLink,
    title: item.title,
    image: { src: item.thumbnailUrl, alt: item.title },
    external: true,
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
      <ContentGrid eyebrow="As seen on" title="In the news" items={items} columns={2} />
    </>
  )
}
