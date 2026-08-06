'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

import { Container } from '@/components/shared/Container'
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
 * ProgramStepsTimeline matching the zoomed reference screenshot:
 * - Centered Bodoni Moda heading ("How Our BHRT Program Works")
 * - Overlapping left circular step photo with thin teal ring (#519B99)
 * - Vertical dashed connector line passing through the step number badges
 * - Rose-dust step circle (1, 2, 3)
 * - Large rounded white card (rounded-[24px]) with Bodoni Moda step titles
 */
export function ProgramStepsTimeline({
  eyebrow,
  title = 'How Our BHRT Program Works',
  steps,
  stepImages,
  className,
}: ProgramStepsTimelineProps) {
  return (
    <section className={cn('relative w-full bg-[#F6F7F2] py-16 sm:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <Container className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          {eyebrow ? (
            <span className="text-xs font-bold uppercase tracking-widest text-[#519B99] mb-2 block">
              {eyebrow}
            </span>
          ) : null}
          <h2
            className="text-3xl sm:text-4xl md:text-[40px] font-normal leading-tight text-[#1C274C] font-display"
            
          >
            {title}
          </h2>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-3xl mx-auto space-y-10 sm:space-y-12">
          {/* Vertical Dashed Connector Line passing through step number circles */}
          <div
            className="absolute left-[138px] sm:left-[172px] top-12 bottom-12 w-0 border-l border-dashed border-slate-300 pointer-events-none z-0"
            aria-hidden="true"
          />

          {steps.map((step, index) => {
            const imgSrc = stepImages[index] || stepImages[0]

            return (
              <m.div
                key={step.title || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16 sm:pl-24"
              >
                {/* 1. Left Circular Photo (Overlapping Left Edge of Card) */}
                <div className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-1 bg-white shadow-md border border-[#519B99]/60">
                    {imgSrc.startsWith('http') ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={imgSrc}
                        alt={step.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Image
                        src={imgSrc}
                        alt={step.title}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>

                {/* 2. Main White Card Container */}
                <div className="bg-white rounded-[24px] p-6 sm:p-10 pl-16 sm:pl-24 shadow-[0_10px_35px_rgba(0,0,0,0.035)] border border-slate-100/70 flex items-start gap-4 sm:gap-6 relative z-10">
                  {/* Step Number Circle (Rose-Dust #AA768A) */}
                  <div className="relative shrink-0 pt-0.5 z-20">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#AA768A] text-white font-normal text-sm sm:text-base flex items-center justify-center shadow-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Title & Body Text */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-xl sm:text-2xl font-normal text-[#1C274C] mb-2 sm:mb-3 font-display"
                      
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 font-light leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </m.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}