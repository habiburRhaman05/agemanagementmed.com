import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface TrustMarkersProps {
  label?: string
  reviewer: {
    name: string
    subtitle?: string
    bio: string[]
    portrait: Media
  }
}

/**
 * E-E-A-T credibility block: the "Reviewed by" byline row (portrait + bio).
 * The full-bleed patient-testimonial photo card that used to render below
 * this is now its own `PatientSuccessStories` component — render that
 * separately alongside this one.
 */
export function TrustMarkers({ label = 'Trust Markers', reviewer }: TrustMarkersProps) {
  return (
    <Section background="page" spacing="lg">
      <Container className="max-w-6xl text-center px-4! lg:px-0">
        <Reveal>
          <p className="font-display text-[32px] lg:text-[48px] text-ink-900 mb-8">{label}</p>

          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-6 sm:gap-10">
            <div className="relative size-72 sm:size-80 xl:size-[500px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={reviewer.portrait.src}
                alt={reviewer.portrait.alt}
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>

            <div className="text-left pl-[40px] max-[768px]:text-center max-[768px]:pl-0">
              <p className="text-[14px] font-semibold uppercase tracking-widest text-[#111214] mb-1">Reviewed by</p>
              <h3 className="font-display text-[32px] leading-tight tracking-tight text-[#111214]">{reviewer.name}</h3>
              {reviewer.subtitle ? (
                <p className="mt-1 text-left text-[24px] font-medium text-[#111214] py-3 max-[768px]:text-center">{reviewer.subtitle}</p>
              ) : null}
              <div className="mt-4 space-y-3 text-body-sm leading-relaxed text-[#111214]">
                {reviewer.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
