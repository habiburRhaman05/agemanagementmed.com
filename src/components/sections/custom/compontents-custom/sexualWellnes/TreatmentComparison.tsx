import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

export interface ComparisonPoint {
  icon: LucideIcon
  label: string
}

export interface ComparisonColumn {
  title: string
  points: ComparisonPoint[]
}

export interface TreatmentComparisonProps {
  title: string
  lead?: string
  columnA: ComparisonColumn
  columnB: ComparisonColumn
}

function ComparisonCard({ column }: { column: ComparisonColumn }) {
  return (
    <div className="h-full rounded-2xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-sm sm:p-7">
      <h3 className="font-display text-title-md text-ink-950">{column.title}</h3>
      <ul className="mt-4 space-y-3.5">
        {column.points.map(({ icon: PointIcon, label }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <PointIcon className="size-4" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="pt-1 text-body-sm leading-snug text-canvas-600">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Reusable two-column "VS" comparison card — content-driven so it fits any pair of treatments. */
export function TreatmentComparison({ title, lead, columnA, columnB }: TreatmentComparisonProps) {
  return (
    <Section background="page" spacing="md">
      <Container width="wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-display-sm text-ink-950">{title}</h2>
          {lead ? <p className="mt-5 text-body leading-relaxed text-canvas-600">{lead}</p> : null}
        </div>

        <Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-7">
            <ComparisonCard column={columnA} />

            <span
              className="mx-auto flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-body-sm font-semibold text-canvas-50"
              aria-hidden
            >
              VS
            </span>

            <ComparisonCard column={columnB} />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
