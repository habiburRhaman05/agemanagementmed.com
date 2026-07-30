import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { AspectImage } from '@/components/ui/AspectImage'
import { Media } from '@/types/content'

export interface JourneyStep {
  title: string
  body: string
  /** Optional — the photo sits inside the card next to the copy. */
  image?: Media 
  url?: string
}

export interface JourneyCta {
  label: string
  href: string
}

export interface PatientJourneyProps {
  eyebrow?: string
  title: string
  lead?: string
  steps: JourneyStep[]
  cta?: JourneyCta
  background?: 'page' | 'alt' | 'raised'
}

export function PatientJourney({
  eyebrow,
  title,
  lead,
  steps,
  cta,
  background = 'page',
}: PatientJourneyProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        {/* Custom Header to match the image (green pill + centered serif headline) */}
        <div className="mb-14 flex flex-col items-center text-center">
          {eyebrow && (
            <span className="inline-block rounded-full bg-emerald-100/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-navy-900 sm:text-5xl">
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-2xl text-body-md text-canvas-600">{lead}</p>}
        </div>

        {/* Steps & Timeline Container */}
        <div className="mx-auto max-w-3xl">
          {/* Removed gap-y. Replaced with margin on the card below for a continuous timeline */}
          <StaggerGroup as="div" stagger={0.12} className="flex flex-col">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1

              return (
                <StaggerItem as="div" key={step.title} className="relative">
                  {/* 
                    Flex Layout:
                    Added `mb-6 sm:mb-8` to the container. 
                    This pushes the next step down.
                  */}
                  <div className="flex flex-row items-stretch gap-x-4 sm:gap-x-6 mb-6 sm:mb-8 relative">
                    
                    {/* ─── Timeline Column ─── */}
                    {/* FIXED: Changed pt-8 to pt-6 sm:pt-8 to perfectly align with the card's p-6/sm:p-8 */}
                    <div className="flex flex-col items-center pt-6 sm:pt-8 w-10 sm:w-12 shrink-0 z-10 bg-transparent">
                      {/* Added `ring-4 ring-white/95` to perfectly sit ON the timeline line */}
                      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-600 font-serif text-[15px] font-medium text-white shadow-md shadow-rose-900/20 ring-4 ring-white/95">
                        {index + 1}
                      </div>
                    </div>

                    {/* ─── Card Column ─── */}
                    {/* FIXED: Added min-h-[200px] sm:min-h-[240px] so all card heights match perfectly regardless of text length */}
                    <div className="flex  flex-1   flex-col-reverse sm:flex-row h-full min-h-[200px] sm:min-h-[180px] overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5  sm:items-stretch">
                      
                      {/* Text Content (Left side) */}
                      {/* FIXED: Added h-full so the text flexbox fills the new min-height completely */}
                      <div className="flex flex-1 flex-col justify-center h-full p-6 text-center sm:p-8 sm:text-left">
                        <h3 className="font-serif text-xl leading-snug text-navy-900 sm:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-2.5 text-body-sm text-canvas-600 leading-relaxed">
                          {step.body}
                        </p>
                      </div>

                      {/* Image (Right side) - Modified Existing Div to become a circular roundel */}
                      {step.url && (
                        <div className="relative mx-auto  flex shrink-0 my-auto items-center justify-center border-t border-slate-200/30 bg-white/50 p-4 size-24 sm:size-28 lg:size-32 overflow-hidden rounded-full sm:border-t-0 sm:border-l">
                          {/* Existing Image tag - added object-cover to complete the roundel look */}
                          <img src={step.url} alt="" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>

                  </div>

                  {/* ─── Continuous Line bridging the gap ─── */}
                  {/* 
                      FIX: Changed from `h-[calc(100%+2rem)]` to `bottom-[-2rem]`. 
                      This exactly spans the exact 2rem gap (`mb-8`) created by the cards,
                      making it a perfectly unbroken line across all steps!
                  */}
                  {!isLast && (
                    <div className="absolute left-[1.25rem] sm:left-[1.5rem] top-[3.25rem] bottom-[-2rem] w-[2px] border-l-2 border-dashed border-slate-400/60" />
                  )}
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>

        {cta && (
          <div className="mt-12 flex justify-center">
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-sage-600 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-canvas-50 shadow-lg shadow-sage-900/20 transition-all duration-300 hover:bg-sage-700 hover:shadow-xl"
            >
              {cta.label}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  )
}