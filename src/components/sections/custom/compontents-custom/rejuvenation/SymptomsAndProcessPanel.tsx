import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'

export interface ProcessStep {
  icon: any
  title: string
  description: string
}

export interface SymptomsAndProcessPanelProps {
  symptomsHeading: string
  symptomsLead: string
  symptomsLabel: string
  symptoms: string[]
  processHeading: string
  processLead: string
  processSteps: ProcessStep[]
  ctaLabel: string
  ctaHref: string
}

/**
 * One continuous panel, not two stacked cards: a dark symptom-checklist half
 * sits flush on top of a white "how it works" half, sharing a single rounded
 * outline and shadow. The white half runs a split editorial header (heading
 * left, lead right) over bare icon-and-text rows — no nested boxes, so the
 * panel stays the only surface on screen.
 */
export function SymptomsAndProcessPanel({
  symptomsHeading,
  symptomsLead,
  symptomsLabel,
  symptoms,
  processHeading,
  processLead,
  processSteps,
  ctaLabel,
  ctaHref,
}: SymptomsAndProcessPanelProps) {
  return (
    <Section background="page" spacing="sm">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            {/* ---- Dark half: symptom checklist ---- */}
            <div className="relative bg-[#14214B] px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24">
              {/* <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden /> */}
              <div className="relative text-center">
                <h2 className="mx-auto  font-display text-[28px] font-medium  text-balance text-canvas-50 sm:text-[34px] lg:text-[40px]">
                  {symptomsHeading}
                </h2>

                {/* No measure cap — the lead runs the full width of the padded
                    box, which is what keeps it to two lines. Padding is the measure. */}
                <p className="mt-5 text-[15px] font-normal leading-relaxed text-canvas-50/75 sm:text-[16px]">
                  {symptomsLead}
                </p>

                <p className="mt-6 text-[16px] font-semibold text-canvas-50 sm:text-[18px]">{symptomsLabel}</p>

                <ul className="mx-auto mt-6 grid max-w-[52rem] grid-cols-1 gap-x-20 gap-y-2.5 text-left sm:grid-cols-2">
                  {symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-center gap-3">
                 
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none" className="transition-transform duration-300 ease-out group-hover:translate-x-2">
<path d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z" fill="#63A5A3"/>
</svg>
                      <span className="text-[15px] leading-normal text-canvas-50/90 sm:text-[16px]">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---- White half: how the treatments work ---- */}
            <div className="bg-white px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-24">
              <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-12">
                {/* The cap is what breaks the heading onto two lines at the
                    reference's ratio — the column itself is wide enough to fit it on one. */}
                <h2 className="font-display text-[30px] font-medium leading-[1.15] text-ink-800 sm:text-[36px] lg:max-w-[14ch] lg:text-[44px]">
                  {processHeading}
                </h2>
                <p className="text-[16px] font-normal leading-relaxed text-ink-800 lg:text-[17px]">{processLead}</p>
              </div>

              <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:mt-14">
                {processSteps.map((step) => (
                  <li key={step.title} className="flex items-start gap-5 sm:gap-6">
                    {/* <step.icon className="mt-0.5 size-8 shrink-0 text-ink-800" strokeWidth={1.25} aria-hidden /> */}
                    {step.icon}
                    <p className="text-[16px] leading-relaxed text-ink-800 lg:text-[17px]">
                      <span className="font-semibold">{step.title}</span>
                      {' - '}
                      {step.description}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex justify-center lg:mt-12">
                {ctaHref === '/book-appointment' ? (
                  <BookAppointmentButton className="w-full sm:w-auto">{ctaLabel}</BookAppointmentButton>
                ) : (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={ctaHref}>
                      {ctaLabel}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
