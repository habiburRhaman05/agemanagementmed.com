'use client'

import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Media } from '@/types/content'

const formLoading = (
  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
    Loading form…
  </div>
)
const BookingForm = dynamic(
  () => import('@/components/shared/BookingForm').then((mod) => mod.BookingForm),
  { loading: () => formLoading },
)

export interface WeightLossMaleHeroBannerProps {
  title?: string
  image?: Media
  ctaLabel?: string
}

/**
 * Dedicated hero for the male concierge-weight-loss page: light left-to-right
 * scrim (much lighter than the shared HeroEditorial's, to keep the photo
 * visible), a two-line Bodoni title, and three body paragraphs — richer,
 * more specific copy than HeroEditorial's single `lead` string supports,
 * including an inline underlined "expert provider" link in the third
 * paragraph — so the copy is hardcoded here rather than prop-driven.
 */
export function WeightLossMaleHeroBanner({
  title = 'Achieve Sustainable Weight Loss With Personalized Care',
  image = {
    src: '/images/treatments/weight-loss-men/hero.jpg',
    alt: 'A man committed to his weight loss journey',
  },
  ctaLabel = 'Schedule a consultation',
}: WeightLossMaleHeroBannerProps) {
  return (
    <section className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden bg-slate-900 py-20 sm:min-h-[640px] py-30 md:py-40 lg:py-45">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-[#16284F]/55 via-[#16284F]/20 to-transparent"
        aria-hidden
      />

      <Container className="relative">
        <div className="max-w-xl">
          <h1
            className="text-[32px] sm:text-[40px] md:text-[46px] font-normal leading-[1.18] text-white font-display"
            
          >
            {title}
          </h1>

          <div className="mt-5 space-y-4 text-sm sm:text-base font-light leading-relaxed text-white/90">
            <p>
              If you&apos;ve tried to lose weight before and nothing seems to stick, you&apos;re not alone. Most
              programs focus on calories and workouts, but miss what&apos;s actually going on in your body.
            </p>
            <p>
              Our concierge medical weight loss program in Savannah is different. Instead of guessing, we use lab
              testing, body composition data, and ongoing monitoring to build a plan that works for you.
            </p>
            <p>
              You&apos;ll work directly with an{' '}
              <a href="/our-experts" className="underline underline-offset-2 hover:text-white">
                expert provider
              </a>{' '}
              who looks at your metabolism, hormones, and overall health to create a plan based on real data, not
              trends.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="mt-7 h-11 rounded-full bg-[#519B99] px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#448b89] sm:h-14 sm:px-9 sm:text-sm"
              >
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="w-[calc(100%-1rem)] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-[28px] p-5 sm:w-full sm:rounded-[40px] sm:p-10"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-slate-900">Book Your Consultation</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <BookingForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </section>
  )
}
