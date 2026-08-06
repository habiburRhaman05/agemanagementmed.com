'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { ProcessStep } from '@/types/content'

export interface ProgramStepsTimelineProps {
  eyebrow?: string
  title: string
  steps: ProcessStep[]
  /** Demo photo per step */
  stepImages: string[]
  className?: string
}

/**
 * ProgramStepsTimeline — mirrors the home page "Your Patient Journey" layout:
 * - Dashed vertical timeline running through the center of every number badge
 * - Number badges (1, 2, 3) aligned on a fixed vertical axis across ALL cards
 * - Circular photo vertically centered, overlapping the card's left edge (sm+)
 * - Mobile: photo centered above the card instead of overlapping the side
 * - Bodoni Moda headings
 */
export function ProgramStepsTimeline({
  eyebrow,
  title = 'How Our BHRT Program Works',
  steps,
  stepImages,
  className,
}: ProgramStepsTimelineProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className={cn('relative w-full bg-[#F7F8F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6', className)}>
      <div className="mx-auto max-w-[1140px]">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-18">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#519B99]">
              {eyebrow}
            </p>
          )}

          <h2
            className="mb-3 text-[48px] font-medium leading-tight tracking-tight text-[#111214]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h2>
        </div>

        {/* Extra side gutter so the desktop-only circular photos (which overlap the card's left edge by half their own width, sm+) never clip past the viewport edge — sized to each breakpoint's image radius (80/112px) plus a safety margin. */}
        <div className="sm:px-24 md:px-28">
          {/* Steps Outer Container — the vertical timeline is a ::before on this element (see .timeline-dash in globals.css), running continuously behind every card from the 1st through the last. */}
          <div className="timeline-dash relative mx-auto max-w-[860px] before:pointer-events-none before:absolute before:left-13 before:top-0 before:block before:w-0.5 sm:before:left-42.5 md:before:left-47.5">
            <div className="flex flex-col gap-10 sm:gap-12 md:gap-14">
              {steps.map((step, index) => {
                const imageSrc = stepImages[index] || stepImages[0]

                return (
                  <div key={step.title || index} className="relative">
                    {/* Mobile layout (below sm): photo centered above the card, badge inline with the title */}
                    <div className="sm:hidden">
                      {imageSrc ? (
                        <div className="relative z-20 mx-auto -mb-24 h-30 w-30 md:h-48 md:w-48 overflow-hidden rounded-full border border-[#89B3AA] bg-white p-0.75 shadow-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imageSrc}
                            alt={step.title}
                            className="h-full w-full rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}

                      <div className="relative rounded-xl border border-slate-100/70 bg-white p-6 pt-28 shadow-[0_8px_35px_rgba(0,0,0,0.035)]">
                        <div className="flex items-start gap-4">
                          <div className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#B88796] font-serif text-xl font-medium text-white shadow-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-2">
                            <h3
                              className="mb-3 text-[32px] font-normal leading-snug text-[#111214] font-['Bodoni_Moda',var(--font-bodoni),serif]"
                              style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                            >
                              {step.title}
                            </h3>
                            <p className="text-[16px] font-normal leading-[1.7] text-[#111214]">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout (sm+): photo overlapping the card's left edge, badge on the timeline */}
                    <div className="relative hidden min-h-60 items-center sm:flex">
                      <div className="relative flex min-h-60 w-full flex-col justify-center rounded-xl border border-slate-100/70 bg-white p-10 pl-52.5 shadow-[0_8px_35px_rgba(0,0,0,0.035)] md:p-12 md:pl-61.25">
                        <h3
                          className="mb-3 text-[32px] font-normal leading-snug text-[#111214] font-['Bodoni_Moda',var(--font-bodoni),serif]"
                          style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-[16px] font-normal leading-[1.7] text-[#111214]">
                          {step.body}
                        </p>
                      </div>

                      <div className="absolute left-42.5 top-1/2 z-20 -ml-7 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#B88796] font-serif text-xl font-medium text-white shadow-sm md:left-47.5 md:-ml-8 md:h-16 md:w-16 md:text-2xl">
                        {index + 1}
                      </div>

                      {imageSrc ? (
                        <div className="absolute -left-20 top-1/2 z-20 h-40 w-40 -translate-y-1/2 overflow-hidden rounded-full border border-[#89B3AA] bg-white p-0.75 shadow-md md:-left-28 md:h-56 md:w-56">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imageSrc}
                            alt={step.title}
                            className="h-full w-full rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center sm:mt-16 lg:mt-20">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#519B99] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-md transition-all duration-200 hover:bg-[#448b89] hover:shadow-lg sm:text-xs"
          >
            <span>SCHEDULE A CONSULTATION</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
