'use client'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AspectImage } from '@/components/ui/AspectImage'
import type { Media } from '@/types/content'

interface BeforeAfterPair {
  before: Media
  after: Media
}

interface BeforeAfterShowcaseProps {
  eyebrow?: string
  title: string
  lead?: string
  pairs: BeforeAfterPair[]
  background?: 'page' | 'alt' | 'raised'
}

/** A single dark result-card at a time, arrow/dot navigable — real patient results, not a grid dump. */
export function BeforeAfterShowcase({
  eyebrow,
  title,
  lead,
  pairs,
  background = 'page',
}: BeforeAfterShowcaseProps) {
  const [index, setIndex] = useState(0)
  const total = pairs.length
  const current = pairs[index]

  if (!current) return null

  const go = (delta: number) => setIndex((i) => ((i + delta) % total + total) % total)

  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />

        <Reveal key={index} strong className="mx-auto mt-16 max-w-3xl">
          <div className="relative rounded-[2rem] bg-ink-900 p-5 shadow-xl sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="overflow-hidden rounded-2xl">
                <AspectImage
                  media={current.before}
                  ratio="portrait"
                  sizes="(min-width: 640px) 30vw, 42vw"
                  rounded={false}
                />
                <div className="bg-sage-600 py-2.5 text-center text-label font-semibold uppercase tracking-widest text-canvas-50">
                  Before
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl">
                <AspectImage
                  media={current.after}
                  ratio="portrait"
                  sizes="(min-width: 640px) 30vw, 42vw"
                  rounded={false}
                />
                <div className="bg-sage-600 py-2.5 text-center text-label font-semibold uppercase tracking-widest text-canvas-50">
                  After
                </div>
              </div>
            </div>

            <span
              className="absolute left-1/2 top-1/2 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas-50 text-ink-900 shadow-lg sm:flex"
              aria-hidden
            >
              <ArrowRight className="size-5" />
            </span>
          </div>
        </Reveal>

        {total > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous result"
              className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <div className="flex gap-2">
              {pairs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to result ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-sage-600' : 'w-1.5 bg-canvas-300 hover:bg-sage-400'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next result"
              className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
