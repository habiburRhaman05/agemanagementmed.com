import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

export interface ProgramItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface ProgramIncludedGridProps {
  title: string
  lead?: string
  includedLabel?: string
  included: ProgramItem[]
  additionalLabel?: string
  additional?: ProgramItem[]
}

function ProgramCard({ item }: { item: ProgramItem }) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl border border-canvas-300/60 bg-canvas-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
        <item.icon className="size-6" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-title-md text-ink-950">{item.title}</h3>
      <p className="mt-2 text-body-sm leading-relaxed text-canvas-600">{item.description}</p>
    </div>
  )
}

/**
 * Reusable "what's included" program grid — a required tier and an optional
 * "may be additional" tier. Content-driven so it fits any treatment program.
 */
export function ProgramIncludedGrid({
  title,
  lead,
  includedLabel = 'Included:',
  included,
  additionalLabel = 'May be additional:',
  additional,
}: ProgramIncludedGridProps) {
  return (
    <Section background="alt" spacing="md">
      <Container>
        <SectionHeader title={title} lead={lead} align="center" />

        <p className="mt-10 text-title-md font-semibold text-ink-950">{includedLabel}</p>
        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {included.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <ProgramCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {additional?.length ? (
          <>
            <p className="mt-12 text-title-md font-semibold text-ink-950">{additionalLabel}</p>
            <StaggerGroup
              as="ul"
              stagger={0.06}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {additional.map((item) => (
                <StaggerItem as="li" key={item.title} className="h-full">
                  <ProgramCard item={item} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </>
        ) : null}
      </Container>
    </Section>
  )
}
