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
          <h1 className="text-[40px] sm:text-[56px] font-normal leading-[1.18] tracking-tight text-white font-display">
            {title}
          </h1>

          <div className="mt-5 space-y-4 text-[20px] font-light leading-relaxed text-white/90">
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
              className="max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-[480px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[620px] overflow-y-auto rounded-[28px] border-none bg-[#0B1530] p-6 sm:p-10 text-white shadow-2xl [&>button]:bg-white/10 [&>button]:text-white/70 [&>button]:hover:bg-white/20 [&>button]:hover:text-white [&>button]:border-none [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:size-9"
            >
              <DialogHeader className="mb-2 text-center">
                <DialogTitle className="font-serif text-2xl sm:text-[32px] font-bold text-white text-center tracking-tight">Schedule A Consultation</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <BookingForm variant="dark" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </section>
  )
}
