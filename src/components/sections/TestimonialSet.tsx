'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Testimonial } from '@/types/content'

interface TestimonialSetProps {
  eyebrow?: string
  title: string
  testimonials: Testimonial[]
  background?: 'page' | 'alt' | 'accent'
}

/** Small, quiet, single-quote slider — a fade/rise crossfade, no cinematic scale or giant glyph. */
export function TestimonialSet({
  eyebrow,
  title,
  testimonials,
  background = 'page',
}: TestimonialSetProps) {
  const [tuple, setTuple] = useState<[number, number]>([0, 0]) // [index, direction]
  const [index, direction] = tuple

  const total = testimonials.length
  const current = testimonials[index]

  if (!current) return null

  const go = (delta: number) => {
    setTuple([((index + delta) % total + total) % total, delta])
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 16 : -16, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 16 : -16, opacity: 0 }),
  }

  return (
    <Section background={background} spacing="lg">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {eyebrow ? (
              <span className="mb-4 block text-label font-bold uppercase tracking-widest text-sage-600">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="text-display-sm sm:text-display-md text-ink-950 w-full mb-12">
              {title}
            </h2>

            <div className="relative w-full min-h-64">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col items-center rounded-2xl border border-canvas-300/60 bg-canvas-50 px-6 py-10 shadow-sm sm:px-16 sm:py-12"
                >
                  <Quote className="size-5 text-sage-300" aria-hidden />

                  <blockquote className="mt-5 text-body-lg sm:text-title-lg leading-relaxed text-ink-900 max-w-2xl">
                    {current.quote}
                  </blockquote>

                  <div className="mt-7 flex gap-1 text-sage-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>

                  <figcaption className="mt-4 flex flex-col items-center gap-1">
                    <span className="font-semibold text-body text-ink-950">{current.author}</span>
                    {current.source === 'google' ? (
                      <span className="text-body-sm text-canvas-600">Verified Google Review</span>
                    ) : null}
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </div>

            {total > 1 ? (
              <div className="mt-8 flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTuple([i, i > index ? 1 : -1])}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? 'w-6 bg-sage-600' : 'w-1.5 bg-canvas-300 hover:bg-sage-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
                >
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
