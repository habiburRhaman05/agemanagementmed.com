import React from 'react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

export interface CostGridItem {
  icon: LucideIcon
  title: string
}

export interface PremiumIncludedGridProps {
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
    <div className="group flex h-full flex-col items-center justify-center rounded-[24px] bg-white p-6 md:p-8 text-center shadow-[0_4px_20px_-4px_rgba(20,33,75,0.03)] border border-sage-100/60 transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(20,33,75,0.08)] hover:-translate-y-1">
      <span className="mb-4 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-sage-600 group-hover:text-white">
        <item.icon className="size-6" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="text-body-sm font-semibold text-ink-950 leading-snug">{item.title}</p>
    </div>
  )
}

/** A premium, fully responsive grid replacing the old fixed-width CostIncludedGrid */
export function PremiumIncludedGrid({
  title,
  lead,
  includedLabel = "What's typically included:",
  included,
  separateLabel,
  separate,
  note,
}: PremiumIncludedGridProps) {
  return (
    <Section background="page" spacing="lg">
      <Container>
        <div className="mb-12 md:mb-16">
          <SectionHeader title={title} lead={lead} align="center" />
        </div>

        {includedLabel ? (
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-sage-200" />
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-sage-800">
              {includedLabel}
            </h3>
            <span className="h-px w-12 bg-sage-200" />
          </div>
        ) : null}
        
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
            {included.map((item) => (
              <GridCard item={item} key={item.title} />
            ))}
          </div>
        </div>

        {separate?.length ? (
          <div className="mt-16 md:mt-24">
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-sage-200" />
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-sage-800">
                {separateLabel ?? 'Typically separate:'}
              </h3>
              <span className="h-px w-12 bg-sage-200" />
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-center">
                {separate.map((item) => (
                  <GridCard item={item} key={item.title} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {note ? (
          <p className="mx-auto mt-12 max-w-2xl text-center text-body-sm leading-relaxed text-canvas-600 border-t border-canvas-200 pt-8">{note}</p>
        ) : null}
      </Container>
    </Section>
  )
}
