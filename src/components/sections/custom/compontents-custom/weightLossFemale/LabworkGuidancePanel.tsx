import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface LabworkGuidancePanelProps {
  image: Media
  heading: string
  boldStatement?: string
  paragraph: string
  columnALabel: string
  columnA: string[]
  columnBLabel: string
  columnB: string[]
  /** Closing paragraphs as nodes, so callers can embed real internal links. */
  closingParagraphs: ReactNode[]
}

/** Dark, contained card with a two-column bullet comparison — matches the width/rounding of the page's other cards. */
export function LabworkGuidancePanel({
  image,
  heading,
  boldStatement,
  paragraph,
  columnALabel,
  columnA,
  columnBLabel,
  columnB,
  closingParagraphs,
}: LabworkGuidancePanelProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-64 lg:min-h-full">
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

              {boldStatement ? (
                <p className="mt-4 text-body font-semibold text-canvas-50">{boldStatement}</p>
              ) : null}

              <p className="mt-3 text-body leading-relaxed text-canvas-50/75">{paragraph}</p>

              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <div>
                  <p className="text-body-sm font-semibold text-canvas-50">{columnALabel}</p>
                  <ul className="mt-2.5 space-y-2">
                    {columnA.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                        <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-body-sm font-semibold text-canvas-50">{columnBLabel}</p>
                  <ul className="mt-2.5 space-y-2">
                    {columnB.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                        <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {closingParagraphs.map((paragraphNode, index) => (
                <p key={index} className="mt-4 text-body-sm leading-relaxed text-canvas-50/75">
                  {paragraphNode}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
