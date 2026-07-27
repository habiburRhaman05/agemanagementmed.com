'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
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

/**
 * A highly polished, centered cinematic testimonial slider using Framer Motion.
 * Features ultra-premium typography, smooth crossfades, and an airy layout.
 */
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

  // Cinematic blur and fade transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 1.05,
    }),
  }

  return (
    <Section background={background} spacing="lg" className="overflow-hidden">
      <Container className="relative">
        <Reveal delay={100}>
          <div className="flex flex-col items-center text-center">
            {/* Header */}
            {eyebrow ? (
              <span className="mb-4 block text-label font-bold uppercase tracking-widest text-sage-600">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="text-display-sm sm:text-display-md text-ink-950 max-w-2xl mb-16">
              {title}
            </h2>

            {/* Slider Track */}
            <div className="relative w-full max-w-4xl min-h-[22rem] flex flex-col items-center justify-center">
              {/* Decorative Background Quote */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[24rem] leading-none text-sage-200/30 -z-10"
                aria-hidden
              >
                “
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    filter: { duration: 0.4 },
                    scale: { duration: 0.4 },
                  }}
                  className="flex flex-col items-center"
                >
                  <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl leading-relaxed text-ink-900 max-w-3xl px-4">
                    “{current.quote}”
                  </blockquote>

                  <div className="mt-10 flex flex-col items-center">
                    <div className="mb-4 flex gap-1 text-sage-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-5 fill-current" />
                      ))}
                    </div>
                    <figcaption className="flex flex-col items-center gap-2">
                      <span className="font-semibold text-lg text-ink-950 uppercase tracking-wide">
                        {current.author}
                      </span>
                      {current.source === 'google' ? (
                        <span className="text-sm font-medium text-canvas-600">
                          Verified Google Review
                        </span>
                      ) : null}
                    </figcaption>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {total > 1 ? (
              <div className="mt-12 flex items-center gap-6 z-10">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-12 items-center justify-center rounded-full border border-canvas-400 bg-transparent text-ink-900 transition-colors hover:bg-sage-600 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
                >
                  <ArrowLeft className="size-5" aria-hidden />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const newDir = i > index ? 1 : -1
                        setTuple([i, newDir])
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? 'w-8 bg-sage-600' : 'w-2 bg-canvas-400 hover:bg-sage-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-12 items-center justify-center rounded-full border border-canvas-400 bg-transparent text-ink-900 transition-colors hover:bg-sage-600 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
                >
                  <ArrowRight className="size-5" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
