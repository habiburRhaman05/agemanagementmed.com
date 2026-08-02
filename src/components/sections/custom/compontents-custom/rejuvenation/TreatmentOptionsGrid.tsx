import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

export interface TreatmentOption {
  icon: LucideIcon
  title: string
  description: string
}

export interface TreatmentOptionsGridProps {
  title: string
  lead: string
  options: TreatmentOption[]
}

/** Icon-badge card grid summarizing the available treatment modalities — 2x2 on desktop, single column on mobile. */
export function TreatmentOptionsGrid({ title, lead, options }: TreatmentOptionsGridProps) {
  return (
    <Section background="page" spacing="sm">
      <Container>
        <SectionHeader title={title} lead={lead} align="center" size="sm" />

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {options.map((option) => (
            <StaggerItem as="li" key={option.title} className="h-full">
              <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-canvas-300/60 bg-canvas-50 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <option.icon className="size-7" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-title-md text-ink-950">{option.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-canvas-600">{option.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
