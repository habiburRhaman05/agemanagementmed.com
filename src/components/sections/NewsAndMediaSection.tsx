'use client'

import { m } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'
import type { ContentSummary } from '@/types/content'
import type { VideoThumbnailItem } from '@/components/features/VideoThumbnailGrid'

export interface NewsAndMediaSectionProps {
  eyebrow?: string
  title?: string
  lead?: string
  news?: ContentSummary[]
  videos?: VideoThumbnailItem[]
  background?: 'page' | 'alt' | 'raised'
}

/** Default 4 video media items matching the screenshot */
const DEFAULT_VIDEOS: VideoThumbnailItem[] = [
  {
    title: 'John Halbert - Morning Break',
    image: {
      src: 'https://www.agemanagementmed.com/themes/default/assets/images/video-12-img.jpg',
      alt: 'John Halbert Morning Break',
    },
    href: 'https://www.wtoc.com/2025/08/20/platelet-rich-plasma-therapy-recreational-athletes/',
    source: 'WTOC',
  },
  {
    title: 'Importance of Hormone Treatment',
    image: { src: '/images/video-2-img.jpg', alt: 'Importance of Hormone Treatment' },
    href: 'https://www.wtoc.com',
    source: 'WTOC',
  },
  {
    title: 'Patient Turns Into Employee At Clinic',
    image: { src: '/images/video-3-img.jpg', alt: 'Patient Turns Into Employee At Clinic' },
    href: 'https://www.wtoc.com',
    source: 'WTOC',
  },
  {
    title: 'Tips To Reclaim Your Energy',
    image: { src: '/images/video-4-img.jpg', alt: 'Tips To Reclaim Your Energy' },
    href: 'https://www.wtoc.com',
    source: 'WTOC',
  },
]

/** Default news articles matching the screenshot */
const DEFAULT_NEWS: ContentSummary[] = [
  {
    title: 'Q&A With Women Who Are Making A Difference IN POOLER & CHATHAM COUNTY',
    eyebrow: 'Woman of Influence: Raechel Halbert',
    date: 'MAR 6, 2026',
    excerpt:
      'As part of the Women of Influence issue, Raechel Halbert of Savannah Age Management Medicine shares her journey of building a growing wellness practice...',
    href: '/in-the-news',
    image: { src: '/images/video-2-img.jpg', alt: 'Raechel Halbert Pooler Magazine' },
    external: false,
  },
  {
    title: 'Savannah Age Management Medicine Celebrates Grand Opening Of Statesboro Location',
    eyebrow: 'Savannah Age Management Medicine',
    date: 'OCT 3, 2025',
    excerpt:
      'Savannah Age Management Medicine, a leader in proactive healthcare, has officially opened its second location with...',
    href: '/in-the-news',
    image: { src: '/images/video-1-img.jpg', alt: 'Grand Opening Statesboro Location' },
    external: false,
  },
]

/**
 * Rebuilt NewsAndMediaSection matching the reference screenshot design:
 * - Soft off-white page background (#F8F9F5)
 * - "As Seen On" header in Bodoni Moda font
 * - 1-2-1 Video layout with centered play icons
 * - WTOC 11 channel logo divider
 * - Elevated white article cards with teal "READ FULL ARTICLE HERE ->" CTA buttons
 */
export function NewsAndMediaSection({
  title = 'As Seen On',
  news = DEFAULT_NEWS,
  videos = DEFAULT_VIDEOS,
}: NewsAndMediaSectionProps) {
  const displayVideos = videos && videos.length >= 4 ? videos : DEFAULT_VIDEOS
  const displayNews = news && news.length > 0 ? news : DEFAULT_NEWS

  return (
    <section className="relative w-full bg-[#F8F9F5] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-5xl mx-auto">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-[36px] font-normal leading-tight text-[#1C274C] font-['Bodoni_Moda',var(--font-bodoni),serif]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h2>
        </m.div>

        {/* 1-2-1 Video Layout */}
        <div className="flex flex-col items-center">
          {/* Top Video (Card 1 - Centered Large) */}
          <m.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[560px] mb-5 sm:mb-6"
          >
            <VideoCard item={displayVideos[0]} />
          </m.div>

          {/* Middle Row Videos (Cards 2 & 3 - Side by Side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[760px] mb-5 sm:mb-6">
            <m.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <VideoCard item={displayVideos[1]} />
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              <VideoCard item={displayVideos[2]} />
            </m.div>
          </div>

          {/* Bottom Video (Card 4 - Centered Medium) */}
          <m.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[460px] mb-12 sm:mb-16"
          >
            <VideoCard item={displayVideos[3]} />
          </m.div>
        </div>

        {/* WTOC 11 Channel Brand Divider */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center my-12 sm:my-16"
        >
          <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#D92528] tracking-tighter italic font-sans">
            <span>WTOC</span>
            <span className="bg-[#D92528] text-white px-2 py-0.5 rounded-sm not-italic text-xl sm:text-2xl font-black">
              11
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-700 tracking-wider uppercase mt-1">
            Live. Local. Now.
          </p>
        </m.div>

        {/* Article / Press Cards Stack */}
        <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto">
          {displayNews.map((article, index) => (
            <m.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.035)] border border-slate-100 flex flex-col md:flex-row items-center gap-6 sm:gap-8 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Left Article Image */}
              {article.image?.src ? (
                <div className="relative w-full md:w-72 lg:w-80 h-48 sm:h-52 shrink-0 rounded-[16px] overflow-hidden bg-slate-100">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt || article.title}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : null}

              {/* Right Content */}
              <div className="flex-1 flex flex-col items-start">
                {article.eyebrow ? (
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {article.eyebrow}
                  </p>
                ) : null}

                <h3
                  className="text-lg sm:text-xl md:text-[22px] font-normal leading-snug text-[#1C274C] mb-2 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  {article.title}
                </h3>

                {article.date ? (
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    {article.date}
                  </p>
                ) : null}

                {article.excerpt ? (
                  <p className="text-xs sm:text-[13.5px] text-slate-600 font-light leading-relaxed mb-5 line-clamp-2">
                    {article.excerpt}
                  </p>
                ) : null}

                <Link
                  href={article.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#519B99] px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-200 hover:bg-[#448b89] hover:shadow-md"
                >
                  <span>READ FULL ARTICLE HERE</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                </Link>
              </div>
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** Individual Video Thumbnail Card Component with Play Overlay */
function VideoCard({ item }: { item: VideoThumbnailItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group relative block w-full rounded-[20px] overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 aspect-video"
    >
      {item.image?.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.image.src}
          alt={item.image.alt || item.title}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : null}

      {/* Play Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 text-[#1C274C] shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
        </div>
      </div>
    </a>
  )
}
