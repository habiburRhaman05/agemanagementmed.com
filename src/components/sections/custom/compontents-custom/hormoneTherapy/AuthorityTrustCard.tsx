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
      <Container width="prose">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-3xl bg-ink-950 p-8 text-center shadow-xl sm:flex-row sm:items-center sm:p-10 sm:text-left">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white/10">
              <Image src={image.src} alt={image.alt} fill sizes="112px" className="object-cover" />
            </div>

            <div>
              <Eyebrow tone="inverse">Reviewed by</Eyebrow>
              <h3 className="mt-3 font-display text-title-lg text-canvas-50">{name}</h3>
              <p className="mt-1 text-label font-semibold uppercase tracking-wide text-sage-400">
                Last updated: {lastUpdated}
              </p>
              <p className="mt-3 text-body-sm leading-relaxed text-canvas-50/75">{blurb}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
