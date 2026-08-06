import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'

export interface SexualHealthClosingBandProps {
  title?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: string
}

/**
 * Closing CTA band for the sexual-wellness pages: full-bleed photo (already
 * carrying its own navy tint) with left-aligned Bodoni title/body and a
 * teal pill CTA. Pairs with the `TestimonialSet` band above it — same
 * "photo band, left-aligned copy" language, different photo per section.
 */
export function SexualHealthClosingBand({
  title = 'Ready To Take Control Of Your Sexual Health?',
  body = 'Our treatments are discreet, effective, and personalized to meet your needs.',
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
  backgroundImage = '/sexual man/mans2.jpg',
}: SexualHealthClosingBandProps) {
  return (
    <section
      className="relative isolate flex min-h-[380px] items-center overflow-hidden bg-cover bg-[position:80%_center] py-16 sm:min-h-[420px] sm:bg-[position:65%_center] sm:py-20"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-[#0F1E4D]/35" aria-hidden />

      <Container className="relative">
        <div className="max-w-lg">
          <h2
            className="text-[28px] sm:text-[34px] md:text-[38px] font-normal leading-[1.2] text-white font-display"
            
          >
            {title}
          </h2>

          <p className="mt-3 text-sm sm:text-base font-light leading-relaxed text-white/90">{body}</p>

          <Link
            href={ctaHref}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#519B99] px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#448b89] sm:h-12 sm:px-7"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  )
}
