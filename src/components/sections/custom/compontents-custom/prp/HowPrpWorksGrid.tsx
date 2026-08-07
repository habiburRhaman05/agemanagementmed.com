import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'

import { Eyebrow } from '@/components/shared/Eyebrow'
import BookAppointmentButton from '@/components/shared/BookAppointmentButton'

export interface HowPrpWorksItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface HowPrpWorksGridProps {
  eyebrow?: string
  heading: string
  lead: string
  items: HowPrpWorksItem[]
  cta?: { label: string; href: string }
}

/** Centered intro (eyebrow + heading + lead) followed by a 2x2 icon-led explainer grid. */
export function HowPrpWorksGrid({ eyebrow, heading, lead, items, cta }: HowPrpWorksGridProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {eyebrow ? (
              <Eyebrow className="mb-4">
                {eyebrow}
              </Eyebrow>
            ) : null}
            <h2 className="font-display text-display-sm text-ink-950">{heading}</h2>
            <p className="mt-4 text-body leading-relaxed text-canvas-600">{lead}</p>
          </div>
        </Reveal>

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-6"
        >
          {items.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl bg-white/60 border border-canvas-200/50 p-6 shadow-sm transition-all hover:bg-white hover:shadow-md h-full">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <item.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="text-body-sm leading-relaxed text-canvas-600">
                  <span className="font-semibold text-ink-950">{item.title}</span> - {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {cta ? (
          <div className="mt-10 flex justify-center">
            {cta.href === '/book-appointment' ? (
              <BookAppointmentButton>{cta.label}</BookAppointmentButton>
            ) : (
              <Button asChild size="md">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
