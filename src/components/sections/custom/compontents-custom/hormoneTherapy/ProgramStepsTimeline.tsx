import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import type { ProcessStep } from '@/types/content'

export interface ProgramStepsTimelineProps {
  eyebrow?: string
  title: string
  steps: ProcessStep[]
  /** Demo photo per step — purely illustrative, swap for real photography later. */
  stepImages: string[]
}

/**
 * Numbered step timeline with a circular photo per step, connected by a
 * vertical line — sourced from the treatment's own `process` data (steps
 * are real content; only the per-step photo is a placeholder).
 */
export function ProgramStepsTimeline({ eyebrow, title, steps, stepImages }: ProgramStepsTimelineProps) {
  return (
    <Section background="alt" spacing="md">
      <Container width="prose">
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />

        {/* 
          CHANGED: Uses `space-y-8` on desktop to add breathing room for a modern luxury layout. 
          The previous dashed global line was removed and replaced with a per-step gradient line.
        */}
        <ol className="relative mt-12 flex flex-col space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              {/* 
                 CHANGED: Switched from a single flex column to a robust Grid. 
                 This perfectly splits the Timeline on the left, and the Card on the right.
              */}
              <li className="relative grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6">
                
                {/* ─── Timeline Node ─── */}
                {/* 
                   The `z-10` ensures the number sits perfectly ON TOP of the 
                   continuous gradient line, creating a professional "timeline track" effect. 
                   The `pt-8` aligns the dot perfectly with the top padding of the card.
                */}
                <div className="flex flex-col items-center pt-8 w-10 sm:w-12 shrink-0 z-10 bg-transparent">
                  <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full bg-sage-600 font-display text-body-md font-medium text-white shadow-md shadow-sage-900/20 ring-4 ring-white/90">
                    {index + 1}
                  </div>
                </div>

                {/* ─── Card ─── */}
                {/* 
                  CHANGED: 
                  1. Added `backdrop-blur-sm` & `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` for a very premium subtle glow.
                  2. Added a thin gradient accent border on the far left of the card using `before:`.
                  3. `hover:-translate-y-1` adds a beautiful breathing animation on hover.
                */}
                <div className="relative flex flex-1 flex-col gap-5 rounded-2xl border border-sage-200/20 bg-white/95 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 sm:flex-row sm:items-center sm:p-8 before:absolute before:inset-y-4 before:left-0 before:w-1 before:rounded-r-full before:bg-gradient-to-b before:from-sage-400/80 before:to-sage-200/30">
                  
                  {/* Image Block */}
                  <div className="relative mx-auto size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-md shadow-sage-900/10 sm:mx-0 sm:size-32">
                    <Image
                      src={stepImages[index] ?? stepImages[0]}
                      alt={step.title}
                      fill
                      sizes="(min-width: 640px) 128px, 112px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Text Block */}
                  <div className="flex flex-1 flex-col text-center sm:text-left">
                    <h3 className="font-display text-title-md text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-canvas-600">
                      {step.body}
                    </p>
                  </div>
                </div>

                {/* ─── Continuous Gradient Line ─── */}
                {/* 
                  CHANGED: The solid (non-dashed) vertical gradient line creates a much more 
                  premium aesthetic. The `bottom-[-1.5rem] sm:bottom-[-2rem]` perfectly 
                  bridges the `space-y-6 sm:space-y-8` between cards.
                */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[1.25rem] sm:left-[1.5rem] top-[4.5rem] bottom-[-1.5rem] sm:bottom-[-2rem] w-[2px] bg-gradient-to-b from-sage-500/80 via-sage-400/40 to-transparent pointer-events-none" />
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}