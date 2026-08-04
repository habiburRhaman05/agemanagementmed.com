import { Header } from '@/components/layout/Header'
import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { NewsAndMediaSection } from '@/components/sections/NewsAndMediaSection'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { getNewsItems } from '@/actions/news'
import { expertsContent } from '@/content/pages/experts'
import { getAllPeople } from '@/content/people'
import { buildMetadata } from '@/lib/seo'
import type { ContentSummary } from '@/types/content'
import type { VideoThumbnailItem } from '@/components/features/VideoThumbnailGrid'
import { TransformHealthBanner } from '@/components/sections/TransformHealthBanner'


// Curated subset for this page, in display order — press coverage as full
// cards, video/TV mentions as a compact watch grid. The full archive lives
// at /in-the-news.
const FEATURED_NEWS_LINKS = [
  'griceconnect.com',
  'poolermagazine.com',
]
const FEATURED_VIDEO_LINKS = [
  'wtoc.com/2025/08/20/platelet-rich-plasma-therapy-recreational-athletes',
  'youtube.com/watch?v=oTrQVnnntGw',
  'youtube.com/watch?v=KgNoH2e4zI0',
  'wtoc.com/2026/02/04/tips-maintain-your-energy-throughout-day',
]

export const metadata = buildMetadata(expertsContent.seo)

export default async function ExpertsPage() {
  const people = await getAllPeople()
  const allNews = await getNewsItems()
console.log(allNews);

  const news: ContentSummary[] = FEATURED_NEWS_LINKS.map((match): ContentSummary | null => {
    const item = allNews.find((n) => n.newsLink.includes(match))
    if (!item) return null
    return {
      href: item.newsLink,
      title: item.title,
      image: { src: item.thumbnailUrl, alt: item.title },
      external: true,
      eyebrow: item.source ?? undefined,
      date: item.publishedLabel ?? undefined,
      excerpt: item.description ?? undefined,
    }
  }).filter((item): item is ContentSummary => item !== null)

  const videos: VideoThumbnailItem[] = FEATURED_VIDEO_LINKS.map((match): VideoThumbnailItem | null => {
    const item = allNews.find((n) => n.newsLink.includes(match))
    if (!item) return null
    return {
      href: item.newsLink,
      title: item.title,
      image: { src: item.thumbnailUrl, alt: item.title },
    }
  }).filter((item): item is VideoThumbnailItem => item !== null)

  return (
    <>
      <Header overlay />
      <HeroEditorial
      fullHeight
        {...expertsContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Experts', href: '/our-experts' }]}
      />

      {/* <EditorialPair {...expertsContent.standard} background="alt" /> */}

      <BenefitList {...expertsContent.whyChooseUs} />



      <PeopleGrid
        eyebrow="Meet our experts"
        title="The people who will look after you"
        lead="With years of experience in integrative medicine and hormone therapy, our experts create personalized solutions that help you feel your best."
        people={people}
      />

      <NewsAndMediaSection
        eyebrow="As seen in"
        title="News & Media"
        lead="Press coverage and media features of Savannah Age Management Medicine and our team."
        news={news}
        videos={videos}
      />
      <TransformHealthBanner />
    </>
  )
}
