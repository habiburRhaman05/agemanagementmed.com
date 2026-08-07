'use client'

import Image from 'next/image'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import type { Media } from '@/types/content'

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

          <BookAppointmentButton
            variant="teal"
            className="mt-7 h-11 px-6 sm:h-14 sm:px-9"
            modalTitle="Book Your Consultation"
          >
            {ctaLabel}
          </BookAppointmentButton>
        </div>
      </Container>
    </section>
  )
}
