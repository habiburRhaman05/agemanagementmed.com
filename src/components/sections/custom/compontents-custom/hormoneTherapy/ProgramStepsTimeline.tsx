import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import type { ProcessStep } from '@/types/content'

export interface ProgramStepsTimelineProps {
  eyebrow?: string
  title: string
  steps: ProcessStep[]
  /** Demo photo per step — purely illustrative, swap for real photography later. */
  stepImages: string[]
}

/**
 * Numbered step timeline with a circular photo per step, connected by a
 * vertical line — sourced from the treatment's own `process` data (steps
 * are real content; only the per-step photo is a placeholder).
 */
export function ProgramStepsTimeline({ eyebrow, title, steps, stepImages }: ProgramStepsTimelineProps) {
  return (
    <Section background="alt" spacing="md">
      <Container width="prose">
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />

        <ol className="relative mt-12 space-y-6">
          <span
            className="absolute left-11 top-11 bottom-11 hidden w-px border-l-2 border-dashed border-sage-600/40 sm:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <li className="relative flex flex-col gap-5 rounded-2xl bg-canvas-50 p-6 shadow-sm sm:flex-row sm:items-center sm:p-7">
                <div className="relative mx-auto size-24 shrink-0 overflow-hidden rounded-full ring-4 ring-sage-100 sm:mx-0">
                  <Image
                    src={stepImages[index] ?? stepImages[0]}
                    alt={step.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-sage-600 font-display text-body-sm font-semibold text-canvas-50 ring-4 ring-canvas-50">
                    {index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-title-md text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-canvas-600">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
