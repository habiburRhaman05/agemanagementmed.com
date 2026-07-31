import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface LifestyleAndEvaluationProps {
  lifestylePanel: {
    image: Media
    heading: string
    paragraphs: string[]
  }
  evaluationPanel: {
    image: Media
    heading: string
    paragraphs: string[]
    bulletsLabel?: string
    bullets: string[]
    closingParagraphs?: string[]
  }
}

/**
 * "Why lifestyle changes aren't enough" (plain text + image, no card chrome)
 * followed by "how we evaluate" (dark, contained card — same width/rounding
 * as the rest of the page's cards). Content-only.
 */
export function LifestyleAndEvaluation({ lifestylePanel, evaluationPanel }: LifestyleAndEvaluationProps) {
  return (
    <>
      <Section background="page" spacing="md" className='pt-0'>
        <Container className=''>
          <Reveal>
            <div className="grid items-center gap-8 lg:grid-cols-[38%_62%] lg:gap-6 bg-white p-4 rounded-3xl">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl lg:aspect-auto lg:h-125">
                <Image
                  src={lifestylePanel.image.src}
                  alt={lifestylePanel.image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: lifestylePanel.image.focalPoint ?? 'center' }}
                />
              </div>

              <div>
                <h2 className="font-display text-display-sm text-ink-950">{lifestylePanel.heading}</h2>
                {lifestylePanel.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-body leading-relaxed text-canvas-600 ${index === 0 ? 'mt-4' : 'mt-3'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section background="page" spacing="md" className="pt-0">
        <Container>
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-2">
              <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                <h2 className="font-display text-display-sm text-canvas-50">{evaluationPanel.heading}</h2>

                {evaluationPanel.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`text-body leading-relaxed text-canvas-50/75 ${index === 0 ? 'mt-4' : 'mt-3'}`}
                  >
                    {paragraph}
                  </p>
                ))}

                {evaluationPanel.bulletsLabel ? (
                  <p className="mt-5 text-body-sm font-semibold text-canvas-50">{evaluationPanel.bulletsLabel}</p>
                ) : null}

                <ul className="mt-3 space-y-2">
                  {evaluationPanel.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                      <span className="text-body-sm leading-snug text-canvas-50/90">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {evaluationPanel.closingParagraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-body leading-relaxed text-canvas-50/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
                <Image
                  src={evaluationPanel.image.src}
                  alt={evaluationPanel.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: evaluationPanel.image.focalPoint ?? 'center' }}
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
