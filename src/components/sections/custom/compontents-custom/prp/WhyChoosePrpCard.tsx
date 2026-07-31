import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface WhyChoosePrpCardProps {
  image: Media
  heading: string
  paragraph: string
  bulletsLabel?: string
  bullets: string[]
}

/** Dark, edge-to-edge image + copy card — the page's opening "why this treatment" statement. */
export function WhyChoosePrpCard({ image, heading, paragraph, bulletsLabel, bullets }: WhyChoosePrpCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-72 lg:min-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.focalPoint ?? 'center' }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-canvas-50">{heading}</h2>
              <p className="mt-4 text-body leading-relaxed text-canvas-50/75">{paragraph}</p>

              {bulletsLabel ? (
                <p className="mt-6 text-body-sm font-semibold text-canvas-50">{bulletsLabel}</p>
              ) : null}

              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-snug text-canvas-50/90">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
