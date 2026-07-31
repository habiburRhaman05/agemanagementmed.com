import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface ProviderSpotlightCardProps {
  eyebrow: string
  name: string
  photo: Media
  paragraphs: string[]
}

/** Dark provider-credibility band — circular headshot + eyebrow/name/bio. */
export function ProviderSpotlightCard({ eyebrow, name, photo, paragraphs }: ProviderSpotlightCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-10 shadow-xl sm:px-10 sm:py-12">
            <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />
            <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="relative size-32 shrink-0 overflow-hidden rounded-full ring-4 ring-white/10 sm:size-40">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="160px"
                  className="object-cover"
                  style={{ objectPosition: photo.focalPoint ?? 'center' }}
                />
              </div>

              <div className="text-center sm:text-left">
                <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
                <h2 className="mt-3 font-display text-display-sm text-canvas-50">{name}</h2>
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-body-sm leading-relaxed text-canvas-50/75 ${index === 0 ? 'mt-4' : 'mt-3'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
