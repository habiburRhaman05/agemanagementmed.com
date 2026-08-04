'use client'

import { ArrowRight, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Media } from '@/types/content'

const formLoading = (
  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
    Loading form…
  </div>
)
const BookingForm = dynamic(
  () => import('@/components/shared/BookingForm').then((mod) => mod.BookingForm),
  { loading: () => formLoading }
)

export interface MaleHeroBannerProps {
  title?: string
  lead?: string
  image?: Media | { src: string; alt?: string }
  videoSource?: string
  className?: string
}

/**
 * Dedicated hero banner for male BHRT treatment page:
 * - Left-aligned text box with Bodoni Moda typography
 * - START TODAY and WATCH VIDEO pill buttons
 * - Left-weighted scrim overlay for background photo legibility
 * - Non-100vh height
 */
export function MaleHeroBanner({
  title = 'Bioidentical Hormone Replacement Therapy (BHRT) For Men',
  lead = 'Optimize Testosterone. Restore Energy. Reclaim Your Edge.',
  image = {
    src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg',
    alt: 'Bioidentical Hormone Replacement Therapy for Men',
  },
  videoSource = '<iframe src="https://player.vimeo.com/video/1080951303?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>',
  className,
}: MaleHeroBannerProps) {
  const imageSrc = image?.src || '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg'
  const imageAlt = image?.alt || title

  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-center overflow-hidden min-h-[520px] sm:min-h-[580px] md:min-h-[620px] py-20 sm:py-28 md:py-36 bg-slate-900',
        className
      )}
    >
      {/* Hero Background Image */}
      {imageSrc.startsWith('http') ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-0"
        />
      )}

      {/* Hero Background Image */}

      <Container className="relative z-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-xl text-left">
          {/* Main Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-[46px] lg:text-[48px] font-normal leading-[1.12] text-white text-left font-['Bodoni_Moda',var(--font-bodoni),serif] max-w-lg mb-3.5"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-[15px] font-normal leading-normal text-white/95 text-left mb-7 max-w-md">
            {lead}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-row items-center justify-start gap-3.5 flex-wrap">
            {/* Primary CTA (Start Today) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[11px] uppercase tracking-wider px-6 py-3.5 h-auto inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg border-none"
                >
                  <span>START TODAY</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                </Button>
              </DialogTrigger>
              <DialogContent
                className="
                  w-[calc(100%-1rem)]
                  max-w-2xl
                  max-h-[90dvh]
                  overflow-y-auto
                  rounded-[28px]
                  p-5
                  sm:w-full
                  sm:rounded-[40px]
                  sm:p-10
                "
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display text-slate-900">
                    Book Your Consultation
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <BookingForm />
                </div>
              </DialogContent>
            </Dialog>

            {/* Secondary CTA (Watch Video Modal) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-white hover:bg-slate-100 text-[#519B99] hover:text-[#448b89] font-bold text-[11px] uppercase tracking-wider px-6 py-3.5 h-auto inline-flex items-center gap-2 shadow-md transition-all duration-200 border-none"
                >
                  <Play className="h-3.5 w-3.5 fill-[#519B99] text-[#519B99] translate-x-0.5" aria-hidden="true" />
                  <span>WATCH VIDEO</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-5xl p-1 bg-black border-none max-h-[90vh]">
                <div
                  className="relative w-full aspect-video overflow-hidden rounded-lg [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
                  dangerouslySetInnerHTML={{ __html: videoSource }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </section>
  )
}
