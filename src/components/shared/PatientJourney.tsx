'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Media } from '@/types/content'

export interface JourneyStep {
  title: string
  body: string
  image?: Media
  url?: string
}

export interface JourneyCta {
  label: string
  href: string
}

export interface PatientJourneyProps {
  eyebrow?: string
  title?: string
  lead?: string
  steps: JourneyStep[]
  cta?: JourneyCta
  background?: 'page' | 'alt' | 'raised'
}

/**
 * PatientJourney component:
 * - Increased card height with spacious vertical padding
 * - Circular photo vertically centered on the left, overlapping the card border
 * - Number badges (1, 2, 3) aligned on a fixed vertical axis across ALL cards
 * - Vertical dashed timeline running straight through the center of all number badges
 * - Bodoni Moda font typography for headings
 */
export function PatientJourney({
  eyebrow,
  title = 'Your Patient Journey',
  lead = "This isn't just about feeling better... it's about feeling better than ever.",
  steps,
  cta = { label: 'SCHEDULE A CONSULTATION', href: '/book-appointment' },
}: PatientJourneyProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="relative w-full bg-[#F7F8F2] py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[1140px]">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-18">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#519B99]">
              {eyebrow}
            </p>
          )}

          <h2
            className="mb-3 text-[32px] font-normal leading-tight text-[#1C274C] sm:text-[40px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
          >
            {title}
          </h2>

          {lead && (
            <p className="text-sm font-light leading-relaxed text-[#111214] sm:text-[15px]">
              {lead}
            </p>
          )}
        </div>

        {/* Extra left gutter so the circular photos (which overlap the card's left edge by half their own width) never clip past the viewport edge — sized to each breakpoint's image radius (56/80/112px) plus a safety margin. Kept on a wrapper, not the timeline container itself, so the ::before timeline and the per-step badges (both anchored to elements inside this wrapper) shift together and stay aligned. */}
        <div className="pl-16 sm:pl-24 md:pl-28">
        {/* Steps Outer Container — the vertical timeline is a ::before on this element (see .timeline-dash in globals.css), running continuously behind every card from the 1st through the last */}
        <div className="timeline-dash relative mx-auto max-w-[860px] before:pointer-events-none before:absolute before:left-42.5 before:top-0 before:hidden before:w-0.5 sm:before:block md:before:left-47.5">
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-14">
            {steps.map((step, index) => {
              const imageSrc = step.url || step.image?.src

              return (
                <div
                  key={step.title}
                  className="relative min-h-55 sm:min-h-60 flex items-center"
                >
                  {/* White Card Box - increased height & spacious padding */}
                  <div className="relative w-full bg-white rounded-[24px] shadow-[0_8px_35px_rgba(0,0,0,0.035)] border border-slate-100/70 p-6 sm:p-10 md:p-12 pl-24 sm:pl-52.5 md:pl-61.25 min-h-55 sm:min-h-60 flex flex-col justify-center">
                    {/* Title & Body */}
                    <h3
                      className="text-xl sm:text-2xl md:text-[25px] font-normal leading-snug text-[#1C274C] mb-3 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                      style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-[14.5px] font-normal leading-[1.7] text-[#4A5568]">
                      {step.body}
                    </p>
                  </div>

                  {/* Number Badge (fixed vertical alignment across ALL cards, centered on the timeline) */}
                  <div className="hidden sm:flex absolute left-42.5 md:left-47.5 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#B88796] text-white font-serif text-xl md:text-2xl font-medium items-center justify-center shadow-sm -ml-7 md:-ml-8">
                    {index + 1}
                  </div>

                  {/* Number Badge for mobile */}
                  <div className="sm:hidden absolute left-4 top-4 z-20 w-8 h-8 rounded-full bg-[#B88796] text-white font-serif text-sm font-medium flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>

                  {/* Circular Image (vertically centered on card height, overlapping left edge) */}
                  {imageSrc ? (
                    <div className="absolute -left-14 sm:-left-20 md:-left-28 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full border border-[#89B3AA] p-[3px] overflow-hidden bg-white shadow-md z-20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt={step.title}
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
        </div>

        {/* Bottom CTA */}
        {cta && (
          <div className="mt-14 text-center sm:mt-16 lg:mt-20">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#519B99] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-md transition-all duration-200 hover:bg-[#448b89] hover:shadow-lg sm:text-xs"
            >
              <span>{cta.label}</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}