import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface MeasureBadge {
  icon: LucideIcon
  label: string
}

export interface OverviewApproachCardsProps {
  darkCard: {
    image: Media
    heading: string
    lead: string
    focusLabel?: string
    focusItems: string[]
  }
  lightCard: {
    image: Media
    heading: string
    paragraph: string
    measuresLabel?: string
    measures: MeasureBadge[]
    closingParagraphs: string[]
  }
}

/**
 * Dark "our approach" card (image + 2-column focus list) followed by a light
 * "what we measure" card (image + pill-badge row of measurements). Content
 * only — swap props to reuse for a different treatment's intro.
 */
export function OverviewApproachCards({ darkCard, lightCard }: OverviewApproachCardsProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
              <Image
                src={darkCard.image.src}
                alt={darkCard.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: darkCard.image.focalPoint ?? 'center' }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-canvas-50">{darkCard.heading}</h2>
              <p className="mt-4 text-body leading-relaxed text-canvas-50/75">{darkCard.lead}</p>

              {darkCard.focusLabel ? (
                <p className="mt-6 text-body-sm font-semibold text-canvas-50">{darkCard.focusLabel}</p>
              ) : null}

              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {darkCard.focusItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div className="grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm lg:grid-cols-[58%_42%]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-ink-950">{lightCard.heading}</h2>
              <p className="mt-4 text-body leading-relaxed text-canvas-600">{lightCard.paragraph}</p>

              {lightCard.measuresLabel ? (
                <p className="mt-5 text-body-sm font-semibold text-ink-950">{lightCard.measuresLabel}</p>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-2.5">
                {lightCard.measures.map((measure) => (
                  <span
                    key={measure.label}
                    className="inline-flex items-center gap-2 rounded-full border border-canvas-300/60 bg-white px-4 py-2 text-body-sm font-medium text-ink-950 shadow-sm"
                  >
                    <measure.icon className="size-4 text-sage-600" strokeWidth={1.75} aria-hidden />
                    {measure.label}
                  </span>
                ))}
              </div>

              {lightCard.closingParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-body-sm leading-relaxed text-canvas-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
              <Image
                src={lightCard.image.src}
                alt={lightCard.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: lightCard.image.focalPoint ?? 'center' }}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
