import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { ContentCard } from '@/components/features/ContentCard'
import { VideoThumbnailGrid, type VideoThumbnailItem } from '@/components/features/VideoThumbnailGrid'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import type { ContentSummary } from '@/types/content'

export interface NewsAndMediaSectionProps {
  eyebrow?: string
  title: string
  lead?: string
  news: ContentSummary[]
  videos: VideoThumbnailItem[]
  background?: 'page' | 'alt' | 'raised'
}

/** Press coverage (full cards) + video mentions (thumbnail grid) — every link opens in a new tab. */
export function NewsAndMediaSection({
  eyebrow,
  title,
  lead,
  news,
  videos,
  background = 'alt',
}: NewsAndMediaSectionProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />

        {news.length ? (
          <StaggerGroup
            as="ul"
            stagger={0.08}
            className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {news.map((item) => (
              <StaggerItem as="li" key={item.href} className="h-full">
                <ContentCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : null}

        {videos.length ? (
          <div className={news.length ? 'mt-8' : 'mt-12'}>
            <VideoThumbnailGrid items={videos} />
          </div>
        ) : null}

        <div className="mt-10 flex justify-center">
          <Link
            href="/in-the-news"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-sage-700 hover:text-sage-800"
          >
            See all news & press
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
