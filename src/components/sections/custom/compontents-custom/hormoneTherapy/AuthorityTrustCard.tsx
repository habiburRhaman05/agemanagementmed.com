import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface AuthorityTrustCardProps {
  image: Media
  name: string
  lastUpdated: string
  blurb: string
}

/** Compact dark E-E-A-T trust card — reviewer photo, name, last-updated date, and a short credibility blurb. */
export function AuthorityTrustCard({ image, name, lastUpdated, blurb }: AuthorityTrustCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-10 shadow-xl sm:px-10 sm:py-12">
            <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />
            <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="relative size-32 shrink-0 overflow-hidden rounded-full ring-4 ring-white/10 sm:size-40">
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill 
                  sizes="160px" 
                  className="object-cover" 
                  style={{ objectPosition: image.focalPoint ?? 'center' }}
                />
              </div>

              <div className="text-center sm:text-left mt-2">
                <Eyebrow tone="inverse">Reviewed by</Eyebrow>
                <h3 className="mt-3 font-display text-display-sm text-canvas-50">{name}</h3>
                <p className="mt-2 text-label font-semibold uppercase tracking-wide text-sage-400">
                  Last updated: {lastUpdated}
                </p>
                <p className="mt-4 text-body-sm leading-relaxed text-canvas-50/75">{blurb}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
