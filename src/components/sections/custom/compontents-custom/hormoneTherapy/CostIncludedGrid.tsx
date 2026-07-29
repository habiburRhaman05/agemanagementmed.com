import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'

export interface CostGridItem {
  icon: LucideIcon
  title: string
}

export interface CostIncludedGridProps {
  title: string
  lead?: string
  includedLabel?: string
  included: CostGridItem[]
  separateLabel?: string
  separate?: CostGridItem[]
  note?: string
  cta?: { label: string; href: string }
}

function GridCard({ item }: { item: CostGridItem }) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl bg-canvas-50 p-6 text-center shadow-sm ring-1 ring-canvas-300/50">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
        <item.icon className="size-5" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-3 text-body-sm font-semibold text-ink-950">{item.title}</p>
    </div>
  )
}

/** Reusable "what's included / what's separate" cost grid — content-driven icon cards. */
export function CostIncludedGrid({
  title,
  lead,
  includedLabel = "What's typically included:",
  included,
  separateLabel,
  separate,
  note,
  cta,
}: CostIncludedGridProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <SectionHeader title={title} lead={lead} align="center" />

        {includedLabel ? (
          <p className="mt-10 text-center text-body-sm font-semibold uppercase tracking-wide text-ink-950">
            {includedLabel}
          </p>
        ) : null}
        <StaggerGroup
          as="ul"
          stagger={0.05}
          className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {included.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <GridCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {separate?.length ? (
          <>
            <p className="mt-10 text-center text-body-sm font-semibold uppercase tracking-wide text-ink-950">
              {separateLabel ?? 'Typically separate:'}
            </p>
            <StaggerGroup
              as="ul"
              stagger={0.05}
              className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-4"
            >
              {separate.map((item) => (
                <StaggerItem as="li" key={item.title} className="h-full">
                  <GridCard item={item} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </>
        ) : null}

        {note ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-body-sm leading-relaxed text-canvas-600">{note}</p>
        ) : null}

        {cta ? (
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
