import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'

export interface RestoreHairClosingBandProps {
  title?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  disclaimer?: string
  backgroundImage?: string
}

/**
 * Closing CTA band for the male PRP hair-restoration page: full-bleed photo,
 * left-aligned Bodoni title/body, a teal pill CTA, and a small-print
 * disclaimer line beneath it — the disclaimer is what sets this apart from
 * the shared `ClosingCTA` component, which has no room for one.
 */
export function RestoreHairClosingBand({
  title = 'Restore Your Hair Naturally!',
  body = 'Take the first step toward thicker, healthier hair with PRP therapy. Our expert team is ready to help you achieve your hair restoration goals using this revolutionary, natural treatment.',
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
  disclaimer = 'Individual results may vary. A consultation with our medical team is required to determine if PRP hair therapy is appropriate for your specific condition.',
  backgroundImage = 'https://www.agemanagementmed.com/themes/default/assets/images/hero-14-bg.jpg',
}: RestoreHairClosingBandProps) {
  return (
    <section
      className="relative isolate flex min-h-[420px] items-center overflow-hidden bg-cover bg-center py-16 sm:min-h-[460px] sm:py-20"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-[#0F1E4D]/60" aria-hidden />

      <Container className="relative">
        <div className="max-w-xl">
          <h2
            className="text-3xl sm:text-4xl md:text-[42px] font-normal leading-[1.15] text-white font-display"
            
          >
            {title}
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">{body}</p>

          <Link
            href={ctaHref}
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#519B99] px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#448b89] sm:h-14 sm:px-9 sm:text-sm"
          >
            {ctaLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          {disclaimer ? (
            <p className="mt-6 max-w-lg text-xs italic leading-relaxed text-white/70">*{disclaimer}*</p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
