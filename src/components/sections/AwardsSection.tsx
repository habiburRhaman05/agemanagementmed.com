'use client'

import { m } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'

export interface AwardLogo {
  src: string
  alt: string
}

export interface AwardsSectionProps {
  title?: string
  lead?: string
  awards?: AwardLogo[]
  /** Caps the lead paragraph width (any CSS width value). */
  paraWidth?: string
  className?: string
}

/** Default 9 award logos for the "Recognized For Excellence" section. */
const DEFAULT_AWARDS: AwardLogo[] = [
  { src: '/images/award-11-img.png', alt: 'Best of Pooler 2025' },
  { src: '/images/award-12-img.png', alt: 'Best of Savannah 2025' },
  { src: '/images/award-13-img.png', alt: 'Connect Best of Savannah 2025' },
  { src: '/images/award-14-img.png', alt: 'Best of Savannah 2024 Winner' },
  { src: '/images/award-15-img.png', alt: 'Best of Savannah 2023 Winner' },
  { src: '/images/award-16-img.png', alt: 'Best of Savannah 2022 Winner' },
  { src: '/images/award-17-img.png', alt: 'Best of Savannah 2021 Winner' },
  { src: '/images/award-18-img.png', alt: 'Best of Savannah 2020 Winner' },
  { src: '/images/award-19-img.png', alt: 'Best of Savannah 2019 Winner' },
]

/**
 * Standalone "Recognized For Excellence" awards/press-badge band — centered
 * serif heading + lead, followed by a wrapping, centered row of award logos.
 * Extracted out of BenefitList (which used to render this at its own
 * bottom) so it can be dropped in on its own, on any background.
 */
export function AwardsSection({
  title = 'Recognized For Excellence In Savannah & Beyond',
  lead = 'These recognitions reflect our commitment to delivering high-quality aesthetic and wellness services in the Savannah area.',
  awards = DEFAULT_AWARDS,
  paraWidth,
  className,
}: AwardsSectionProps) {
  if (!awards.length) return null

  return (
    <section
      className={cn(
        'w-full bg-gradient-to-br from-[#dfe6f3] via-[#eef1f8] to-white px-4 py-16 sm:py-20 md:py-24',
        className
      )}
    >
      <Container className="mx-auto !max-w-[1292px]">
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 text-center sm:mb-14"
        >
          {title ? (
            <h2 className="font-display text-[32px] leading-tight font-medium tracking-tight text-[#1C274C] sm:text-[40px] lg:text-[48px]">
              {title}
            </h2>
          ) : null}

          {lead ? (
            <p
              className={cn('mx-auto mt-4 text-base leading-relaxed font-normal text-[#1C274C]/80', !paraWidth && 'max-w-2xl')}
              style={paraWidth ? { maxWidth: paraWidth } : undefined}
            >
              {lead}
            </p>
          ) : null}
        </m.div>

        {/* Fixed-size cells (not `w-auto` on the image) so every badge — circular
            seal or rectangular ribbon alike — occupies the same column pitch.
            That's what makes the wrapped rows (5 then 4) line up into a clean
            grid instead of a ragged flex row. */}
        <div className="mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-10 sm:gap-x-10 md:gap-x-14 lg:gap-x-16">
          {awards.map((award, i) => (
            <m.div
              key={award.src + i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.08 }}
              className="flex h-24 w-28 shrink-0 items-center justify-center sm:h-28 sm:w-32 md:h-32 md:w-36"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={award.src}
                alt={award.alt}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
