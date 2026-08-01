'use client'

import { m, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import type { ProcessStepsData } from '@/types/content'

interface ProcessStepsProps extends ProcessStepsData {
  background?: 'page' | 'alt' | 'accent'
}

/** Consolidates patient journey, PRP protocol, and consultation process. */
export function ProcessSteps({
  eyebrow,
  title,
  lead,
  steps,
  background = 'alt',
}: ProcessStepsProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <ol className="relative mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {/* Spine — draws in left to right on scroll, desktop only. */}
          <m.span
            initial={{ scaleX: reduceMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-x-0 top-6 hidden h-px bg-canvas-300 md:block"
            aria-hidden
          />

          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 110}>
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sage-400 to-sage-700 p-0.5 shadow-glow">
                  <span className="flex size-full items-center justify-center rounded-full bg-canvas-50 font-display text-body text-sage-700 tabular">
                    {index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-title-lg">{step.title}</h3>
                <p className="mt-4 text-body text-canvas-600">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}



