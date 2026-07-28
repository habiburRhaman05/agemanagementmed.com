import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { AspectImage } from '@/components/ui/AspectImage'
import type { TreatmentSummary } from '@/types/content'

interface PillarGridProps {
  eyebrow?: string
  title: string
  lead?: string
  treatments: TreatmentSummary[]
  background?: 'page' | 'alt' | 'raised'
}

export function PillarGrid({
  eyebrow,
  title,
  lead,
  treatments,
  background = 'page',
}: PillarGridProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {treatments.map((treatment) => (
            <StaggerItem as="li" key={treatment.slug} className="flex h-full">
              <Link
                href={treatment.href}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-canvas-300/60 bg-canvas-50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg"
              >
                <AspectImage
                  media={treatment.cardImage}
                  ratio="landscape"
                  rounded={false}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-title-lg transition-colors group-hover:text-sage-700">
                    {treatment.shortName}
                  </h3>

                  <p className="mt-2.5 text-body-sm text-canvas-600">{treatment.summary}</p>

                  <ul className="mt-4 space-y-2 border-t border-canvas-300/60 pt-4">
                    {treatment.cardBenefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-body-sm text-canvas-600">
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-sage-600"
                          aria-hidden
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* `mt-auto` pins this to the card's bottom edge regardless of how much
                      title/description text is above it, so "Learn more" lines up across
                      every card in the row even when one card's copy runs longer. */}
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-body-sm font-semibold text-sage-700">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
