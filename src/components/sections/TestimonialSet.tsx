'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import type { Testimonial } from '@/types/content'

interface TestimonialSetProps {
  eyebrow?: string
  title: string
  testimonials: Testimonial[]
  background?: 'page' | 'alt' | 'accent'
}

/**
 * One large pull-quote at a time, advanced manually. The source site
 * autoplayed a carousel of full-paragraph reviews — unreadable, and it moves
 * without consent. Nothing here animates on its own.
 */
export function TestimonialSet({
  eyebrow,
  title,
  testimonials,
  background = 'page',
}: TestimonialSetProps) {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]
  const total = testimonials.length

  if (!current) return null

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total)

  return (
    <Section background={background} spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            {eyebrow ? (
              <span className="mb-5 block text-label font-semibold uppercase text-sage-700">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="text-display-md">{title}</h2>

            {total > 1 ? (
              <div className="mt-10 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-12 items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-canvas-50"
                >
                  <ArrowLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-12 items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-ink-900 hover:text-canvas-50"
                >
                  <ArrowRight className="size-5" aria-hidden />
                </button>
                <span className="ml-2 text-body-sm text-canvas-600 tabular">
                  {index + 1} / {total}
                </span>
              </div>
            ) : null}
          </div>

          <figure className="lg:col-span-8" aria-live="polite">
            <blockquote className="font-display text-display-sm leading-[1.4] text-ink-900">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-body-sm">
              <span className="h-px w-10 bg-sage-600" aria-hidden />
              <span className="font-semibold text-ink-900">{current.author}</span>
              {current.source === 'google' ? (
                <span className="text-canvas-600">Google review</span>
              ) : null}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  )
}
