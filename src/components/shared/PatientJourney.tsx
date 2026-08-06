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
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#519B99]">
              {eyebrow}
            </p>
          )}

          <h2
            className="mb-3 text-[32px] font-normal leading-tight text-[#1C274C] sm:text-[40px] lg:text-[44px]"
            
          >
            {title}
          </h2>

          {lead && (
            <p className="text-sm font-light leading-relaxed text-slate-500 sm:text-[15px]">
              {lead}
            </p>
          )}
        </div>

        {/* Steps Outer Container */}
        <div className="relative mx-auto max-w-[860px]">
          {/* Vertical dashed timeline running through the center of all number badges */}
          <div
            className="pointer-events-none absolute left-[150px] sm:left-[170px] md:left-[190px] top-12 bottom-12 w-0 border-l-2 border-dashed border-slate-300 z-0 hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10 sm:gap-12 md:gap-14">
            {steps.map((step, index) => {
              const imageSrc = step.url || step.image?.src

              return (
                <div
                  key={step.title}
                  className="relative min-h-[220px] sm:min-h-[240px] flex items-center"
                >
                  {/* White Card Box - increased height & spacious padding */}
                  <div className="relative w-full bg-white rounded-[24px] shadow-[0_8px_35px_rgba(0,0,0,0.035)] border border-slate-100/70 p-6 sm:p-10 md:p-12 pl-24 sm:pl-36 md:pl-[240px] min-h-[220px] sm:min-h-[240px] flex flex-col justify-center">
                    {/* Title & Body */}
                    <h3
                      className="text-xl sm:text-2xl md:text-[25px] font-normal leading-snug text-[#1C274C] mb-3 font-display"
                      
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-[14.5px] font-normal leading-[1.7] text-[#4A5568]">
                      {step.body}
                    </p>
                  </div>

                  {/* Number Badge (fixed vertical alignment across ALL cards) */}
                  <div className="hidden sm:flex absolute left-6 sm:left-[150px] md:left-[170px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B88796] text-white font-serif text-lg sm:text-xl font-medium items-center justify-center shadow-sm -ml-5 sm:-ml-5.5 md:-ml-5.5">
                    {index + 1}
                  </div>

                  {/* Number Badge for mobile */}
                  <div className="sm:hidden absolute left-4 top-4 z-20 w-8 h-8 rounded-full bg-[#B88796] text-white font-serif text-sm font-medium flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>

                  {/* Circular Image (vertically centered on card height, overlapping left edge) */}
                  {imageSrc ? (
                    <div className="absolute -left-10 sm:-left-16 md:-left-20 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full border border-[#89B3AA] p-[3px] overflow-hidden bg-white shadow-md z-20">
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