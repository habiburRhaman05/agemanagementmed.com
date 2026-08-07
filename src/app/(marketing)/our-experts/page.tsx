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
// Per-item overrides — custom eyebrow text (or none, to hide the auto
// "source" label), the exact article URL, and a local image override,
// keyed by the same domain match used to find the item in the DB.
const FEATURED_NEWS_LINKS: { match: string; eyebrow?: string; href: string; image: string }[] = [
  {
    match: 'poolermagazine.com',
    eyebrow: 'Woman of Influence: Raechel Halbert',
    href: 'https://www.poolermagazine.com/2026/03/04/565619/q-a-with-women-who-are-making-a-difference-in-pooler-chatham-county?utm_medium=email&_hsenc=p2ANqtz-_LBXOEfwVieJzLYdTBwXmLrjUc89UJrclVJb7t1jMIfkg35uvQRrSAxV0AM_aqGZWR0246wDYUhnNfyIp2bBM-lu4fBg&_hsmi=413223795&utm_content=413223795&utm_source=hs_automation',
    image: '/images/article-2-img.jpg',
  },
  {
    match: 'griceconnect.com',
    href: 'https://www.griceconnect.com/local-news/savannah-age-management-medicine-celebrates-grand-opening-of-statesboro-location-11261142',
    image: '/images/article-img.jpg',
  },
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

  const news: ContentSummary[] = FEATURED_NEWS_LINKS.map(
    ({ match, eyebrow, href, image }): ContentSummary | null => {
      const item = allNews.find((n) => n.newsLink.includes(match))
      if (!item) return null
      return {
        href,
        title: item.title,
        image: { src: image, alt: item.title },
        external: true,
        eyebrow,
        date: item.publishedLabel ?? undefined,
        excerpt: item.description ?? undefined,
      }
    },
  ).filter((item): item is ContentSummary => item !== null)

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
        {...expertsContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Experts', href: '/our-experts' }]}
        containerOverride="pb-20 pt-35 md:pb-35 md:pt-50 lg:pb-40 lg:pt-65"
        heroDiv='max-w-full'
        heroPara='max-w-3xl'
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
