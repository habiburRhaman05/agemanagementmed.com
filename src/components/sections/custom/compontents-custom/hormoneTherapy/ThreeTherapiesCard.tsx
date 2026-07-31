import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface TherapyRow {
  image: Media
  heading: string
  paragraph: string
}

export interface ThreeTherapiesCardProps {
  title: string
  rows: TherapyRow[]
  cta?: { label: string; href: string }
}

/** Dark card with alternating image/text rows — one row per therapy type, ending in an optional CTA. */
export function ThreeTherapiesCard({ title, rows, cta }: ThreeTherapiesCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-ink-950 p-5 shadow-xl sm:p-8 lg:p-10">
            <SectionHeader title={title} align="center" tone="inverse" />

            <div className="mt-10 space-y-4 sm:space-y-6">
              {rows.map((row, index) => {
                const imageSide = index % 2 === 0 ? 'right' : 'left'
                const imageBlock = (
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-auto sm:h-full sm:min-h-64">
                    <Image
                      src={row.image.src}
                      alt={row.image.alt}
                      fill
                      sizes="(min-width: 640px) 42vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: row.image.focalPoint ?? 'center' }}
                    />
                  </div>
                )
                const textBlock = (
                  <div className="flex flex-col justify-center sm:h-full">
                    <h3 className="font-display text-title-lg text-canvas-50">{row.heading}</h3>
                    <p className="mt-3 text-body-sm leading-relaxed text-canvas-50/70">{row.paragraph}</p>
                  </div>
                )

                return (
                  <div
                    key={row.heading}
                    className="grid items-stretch gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2 sm:gap-8 sm:p-6"
                  >
                    {imageSide === 'left' ? (
                      <>
                        {imageBlock}
                        {textBlock}
                      </>
                    ) : (
                      <>
                        <div className="sm:order-2 sm:h-full">{imageBlock}</div>
                        <div className="sm:order-1 sm:h-full">{textBlock}</div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            {cta ? (
              <div className="mt-6 flex justify-center sm:mt-8">
                <Button asChild size="md">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
