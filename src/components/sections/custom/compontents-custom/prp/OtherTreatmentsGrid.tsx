import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import type { Media } from '@/types/content'

export interface OtherTreatmentItem {
  image: Media
  title: string
  description: string
  href: string
}

export interface OtherTreatmentsGridProps {
  title: string
  lead: string
  items: OtherTreatmentItem[]
}

/** Related-treatments cross-sell — circular thumbnail + title + description + "Learn more" link. */
export function OtherTreatmentsGrid({ title, lead, items }: OtherTreatmentsGridProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <SectionHeader title={title} lead={lead} align="center" />

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <StaggerItem as="li" key={item.href} className="h-full">
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-1 ring-canvas-300/60">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="64px"
                    className="object-cover"
                    style={{ objectPosition: item.image.focalPoint ?? 'center' }}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-title-md text-ink-950">{item.title}</h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-canvas-600">{item.description}</p>
                </div>

                <span className="inline-flex items-center gap-2 text-label font-semibold uppercase tracking-wide text-sage-700">
                  Learn more
                  <span className="flex size-6 items-center justify-center rounded-full bg-sage-600 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
