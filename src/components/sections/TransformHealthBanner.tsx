'use client'

import { m } from 'framer-motion'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'

export interface TransformHealthBannerProps {
  title?: string
  lead?: string
  buttonLabel?: string
  buttonHref?: string
  backgroundImage?: string
  className?: string
}

/**
 * TransformHealthBanner component:
 * - Full-width CTA banner matching the reference screenshot design
 * - Background image with dark blue gradient overlay
 * - Bodoni Moda typography for the headline
 * - Interactive teal "SCHEDULE A CONSULTATION" CTA button that triggers the booking modal
 */
export function TransformHealthBanner({
  title = 'Ready To Transform Your Health?',
  lead = 'Take the first step towards a healthier, more vibrant you.',
  buttonLabel = 'SCHEDULE A CONSULTATION',
  buttonHref = '/book-appointment',
  backgroundImage = 'https://www.agemanagementmed.com/themes/default/assets/images/hero-11-bg.jpg',
  className,
}: TransformHealthBannerProps) {
  return (
    <section
      className={cn(
        'relative isolate w-full py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat',
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <Container className="relative z-10 max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl text-left"
        >
          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.15] text-white mb-3 sm:mb-4 font-['Bodoni_Moda',var(--font-bodoni),serif]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h2>

          {/* Lead Subtitle */}
          {lead ? (
            <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/90 mb-8 sm:mb-10">
              {lead}
            </p>
          ) : null}

          {/* Interactive Modal CTA Trigger */}
          <BookAppointmentButton
            variant="teal"
            className="px-8 py-4 text-xs shadow-md hover:shadow-lg sm:text-sm"
            modalTitle="Book Your Consultation"
          >
            {buttonLabel}
          </BookAppointmentButton>
        </m.div>
      </Container>
    </section>
  )
}
