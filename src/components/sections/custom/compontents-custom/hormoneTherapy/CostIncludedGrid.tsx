'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import {
  CalendarCheck,
  ClipboardList,
  FlaskConical,
  LucideIcon,
  Pill,
  Scale,
  SlidersHorizontal,
  Tag,
  TestTube,
  Utensils,
  Zap,
} from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  'provider-visits': ClipboardList,
  'body-composition': Scale,
  'nutritional-guidance': Utensils,
  'functional-movement': CalendarCheck,
  'lab-draws': TestTube,
  'treatment-optimization': SlidersHorizontal,
  'quickcare-access': Zap,
  'member-pricing': Tag,
  'lab-testing': FlaskConical,
  'hormone-medications': Pill,
  ClipboardList,
  Scale,
  Utensils,
  CalendarCheck,
  TestTube,
  SlidersHorizontal,
  Zap,
  Tag,
  FlaskConical,
  Pill,
}

export interface CostGridItem {
  icon?: LucideIcon | string
  iconName?: string
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
  className?: string
}

function GridCard({ item }: { item: CostGridItem }) {
  let IconComponent: LucideIcon = ClipboardList
  if (item.iconName && ICON_MAP[item.iconName]) {
    IconComponent = ICON_MAP[item.iconName]
  } else if (typeof item.icon === 'string' && ICON_MAP[item.icon]) {
    IconComponent = ICON_MAP[item.icon]
  } else if (typeof item.icon === 'function' || (typeof item.icon === 'object' && item.icon !== null)) {
    IconComponent = item.icon as LucideIcon
  }

  return (
    <div className="flex min-h-36 sm:h-52 w-full flex-col items-center justify-center rounded-[20px] bg-[#F8F9F5] p-4 sm:p-6 text-center transition-all duration-200 hover:shadow-md hover:bg-[#F3F5EF]">
      <div className="mb-3 sm:mb-4 flex shrink-0 items-center justify-center text-[#519B99]">
        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.25]" aria-hidden="true" />
      </div>
      <p
        className="text-xs sm:text-sm font-normal text-[#1C274C] leading-snug max-w-[150px] font-['Bodoni_Moda',var(--font-bodoni),serif]"
        style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
      >
        {item.title}
      </p>
    </div>
  )
}

/**
 * Reusable Cost & What's Included Grid component:
 * - Accepts plain serializable string icon names (iconName) for Server Component compatibility
 * - Centered Bodoni Moda titles
 * - 4-column light cream card grid for included items
 * - 2-column centered card grid for separate items
 * - Bottom PatientFi financing note
 */
export function CostIncludedGrid({
  title = "Cost & What's Included: Transparent Pricing, No Guesswork",
  lead,
  includedLabel = "What's Typically Included As A Patient:",
  included,
  separateLabel = "What Is Typically Separate:",
  separate,
  note = "Insurance commonly covers lab work but may not cover hormone medications. Flexible financing options are available through PatientFi to help make treatment more accessible.",
  cta,
  className,
}: CostIncludedGridProps) {
  return (
    <section className={cn('relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <Container className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Title */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal leading-tight text-[#1C274C] mb-3 font-['Bodoni_Moda',var(--font-bodoni),serif]"
              style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
            >
              {title}
            </h2>
            {lead ? <p className="text-sm sm:text-base text-slate-600 font-light">{lead}</p> : null}
          </div>

          {/* Included Sub-Header */}
          {includedLabel ? (
            <h3
              className="text-lg sm:text-xl font-normal text-[#1C274C] text-center mb-6 sm:mb-8 font-['Bodoni_Moda',var(--font-bodoni),serif]"
              style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
            >
              {includedLabel}
            </h3>
          ) : null}

          {/* Included Cards Grid (4 columns) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-14 sm:mb-16">
            {included.map((item) => (
              <GridCard key={item.title} item={item} />
            ))}
          </div>

          {/* Separate Section */}
          {separate?.length ? (
            <div className="mt-12 sm:mt-16">
              <h3
                className="text-lg sm:text-xl font-normal text-[#1C274C] text-center mb-6 sm:mb-8 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
              >
                {separateLabel}
              </h3>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
                {separate.map((item) => (
                  <div key={item.title} className="w-[calc(50%-0.5rem)] sm:w-56">
                    <GridCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Note / Disclaimer */}
          {note ? (
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs sm:text-sm leading-relaxed text-slate-500 font-light font-sans">
              {note}
            </p>
          ) : null}

          {/* CTA if available */}
          {cta ? (
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="rounded-full bg-[#519B99] text-white">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          ) : null}
        </m.div>
      </Container>
    </section>
  )
}
