import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

export interface SymptomOutcomeItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface SymptomsOutcomesGridProps {
  title: string
  lead?: string
  items: SymptomOutcomeItem[]
  align?:"left" | "center"
}

/** Reusable "symptoms & outcomes" grid — icon-left cards, two columns. Content-driven. */
export function SymptomsOutcomesGrid({ title, lead, items,align="left" }: SymptomsOutcomesGridProps) {
  return (
    <Section background="alt" spacing="md">
      <Container>
        <SectionHeader title={title} lead={lead} align={align} size="md" />

        <StaggerGroup as="ul" stagger={0.06} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <item.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="text-body-sm leading-relaxed text-canvas-600">
                  <span className="font-semibold text-ink-900">{item.title}</span>
                  <br />
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
