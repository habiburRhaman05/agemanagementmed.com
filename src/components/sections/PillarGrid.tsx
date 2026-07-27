import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
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

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <li key={treatment.slug}>
              <Reveal delay={(index % 3) * 70}>
                <Link href={treatment.href} className="group block">
                  <AspectImage
                    media={treatment.cardImage}
                    ratio="landscape"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  <h3 className="mt-7 text-title-lg transition-colors group-hover:text-sage-700">
                    {treatment.shortName}
                  </h3>

                  <p className="mt-3 text-body-sm text-canvas-600">{treatment.summary}</p>

                  <ul className="mt-5 space-y-2 border-t border-canvas-300 pt-5">
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

                  <span className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-sage-700">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
