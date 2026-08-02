import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
}

export interface SymptomsAndProcessPanelProps {
  symptomsHeading: string
  symptomsLead: string
  symptomsLabel: string
  symptoms: string[]
  processHeading: string
  processLead: string
  processSteps: ProcessStep[]
  ctaLabel: string
  ctaHref: string
}

/**
 * Two stacked cards: a dark symptom-checklist banner (centered, no image —
 * mirrors DualIconGridBanner's photo-free texture treatment) directly above
 * a light "how it works" card with an icon-badge grid, grouped tightly like
 * the rest of the page's paired panels.
 */
export function SymptomsAndProcessPanel({
  symptomsHeading,
  symptomsLead,
  symptomsLabel,
  symptoms,
  processHeading,
  processLead,
  processSteps,
  ctaLabel,
  ctaHref,
}: SymptomsAndProcessPanelProps) {
  return (
    <Section background="page" spacing="sm">
      <Container>
        <div className="space-y-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-10 shadow-xl sm:px-10 sm:py-12 lg:px-16">
              <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />
              <div className="relative">
                <SectionHeader
                  title={symptomsHeading}
                  lead={symptomsLead}
                  align="center"
                  tone="inverse"
                  size="sm"
                  className="mx-auto max-w-2xl [&_h2]:max-w-none"
                />

                <p className="mt-10 text-center text-body font-semibold text-canvas-50">{symptomsLabel}</p>

                <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                  {symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-start gap-2.5">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                      <span className="text-body-sm leading-snug text-canvas-50/90">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-3xl border border-canvas-300/60 bg-canvas-50 px-6 py-10 shadow-sm sm:px-10 sm:py-12 lg:px-16">
              <SectionHeader
                title={processHeading}
                lead={processLead}
                align="center"
                size="sm"
                className="mx-auto max-w-2xl"
              />

              <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <li key={step.title} className="h-full">
                    <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-canvas-300/50 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                        <step.icon className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-body font-semibold text-ink-950">{step.title}</h3>
                        <p className="mt-1 text-body-sm leading-relaxed text-canvas-600">{step.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex justify-center">
                <Button asChild size="lg">
                  <Link href={ctaHref}>
                    {ctaLabel}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
