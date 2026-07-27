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
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 90}>
                {/* Connector rule — the horizontal spine on desktop. */}
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sage-600 font-display text-body text-sage-700 tabular">
                    {index + 1}
                  </span>
                  <span className="h-px flex-1 bg-canvas-300" aria-hidden />
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
