import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

export interface TreatmentPathwayItem {
  icon: LucideIcon
  title: string
  href: string
}

export interface TreatmentPathwaysPanelProps {
  title: string
  lead?: string
  pathways: TreatmentPathwayItem[]
  ctaLabel?: string
}

/** Reusable dark panel of "learn more" mini service cards, routed to their real pillar/treatment pages. */
export function TreatmentPathwaysPanel({ title, lead, pathways, ctaLabel = 'Learn more' }: TreatmentPathwaysPanelProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 shadow-xl sm:px-10 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-display-sm text-canvas-50">{title}</h2>
              {lead ? <p className="mt-5 text-body leading-relaxed text-canvas-50/75">{lead}</p> : null}
            </div>

            <StaggerGroup
              as="ul"
              stagger={0.06}
              className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pathways.map((pathway) => (
                <StaggerItem as="li" key={pathway.title} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl bg-canvas-50 p-6 shadow-sm">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <pathway.icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-title-md text-ink-950">{pathway.title}</h3>
                    <Link
                      href={pathway.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-sage-700 transition-colors hover:text-sage-800"
                    >
                      {ctaLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
