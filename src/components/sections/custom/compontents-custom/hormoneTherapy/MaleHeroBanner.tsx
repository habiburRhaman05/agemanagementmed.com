'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { Media } from '@/types/content'

export interface MaleHeroBannerProps {
  title?: string
  lead?: string
  image?: Media | { src: string; alt?: string }
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
  className,
}: MaleHeroBannerProps) {
  const imageSrc = image?.src || '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg'
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-center overflow-hidden bg-slate-900 bg-cover pt-70 pb-45 lg:pb-68.75',
        className
      )}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: 'center top',
      }}
    >
      <Container className="relative z-20 px-3! lg-container">
        <div className="max-w-2xl w-full text-center mx-auto lg:mx-0 lg:text-left">
          {/* Main Title */}
          <h1
            className="text-[40px] sm:text-[46px] lg:text-[56px] font-medium leading-[1.12] text-white text-center lg:text-left font-['Bodoni_Moda',var(--font-bodoni),serif] max-w-2xl mb-3.5"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-[18px] lg:text-[20px] font-normal leading-normal text-white/95 text-center lg:text-left mb-7 max-w-md mx-auto lg:mx-0">
            {lead}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
            {/* Primary CTA (Start Today) */}
            <BookAppointmentButton
              variant="teal"
              className="px-6 py-3.5 shadow-md hover:shadow-lg"
              modalTitle="Book Your Consultation"
            >
              START TODAY
            </BookAppointmentButton>

            {/* Secondary CTA (Watch Video Modal) */}
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outlineInverse"
                  className="rounded-full bg-white hover:bg-slate-100 text-[#519B99] hover:text-[#448b89] font-bold text-[11px] uppercase tracking-wider px-6 py-3.5 h-auto inline-flex items-center gap-2 shadow-md transition-all duration-200 border-none"
                >
                  <Play className="h-3.5 w-3.5 fill-[#519B99] text-[#519B99] translate-x-0.5" aria-hidden="true" />
                  <span>WATCH VIDEO</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100%-1.5rem)] sm:max-w-5xl max-h-[90dvh] border-none bg-black p-0 overflow-hidden !rounded-none sm:!rounded-none md:!rounded-none lg:!rounded-none shadow-2xl [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/80 [&>button]:border-none [&>button]:size-8 [&>button]:top-3 [&>button]:right-3 [&>button]:z-30 [&>button]:rounded-full">
                {/* Radix requires a DialogTitle for a11y; visually hidden here */}
                <DialogHeader className="sr-only">
                  <DialogTitle>Intro video</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-video w-full overflow-hidden bg-black !rounded-none">
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/1080951303?h=91f29206b0&autoplay=1"
                    className="absolute inset-0 h-full w-full border-none bg-black"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </section>
  )
}
