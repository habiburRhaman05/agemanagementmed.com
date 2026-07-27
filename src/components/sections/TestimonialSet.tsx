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
            <h2 className="text-display-sm sm:text-display-md text-ink-950 w-full mb-16">
              {title}
            </h2>

            {/* Slider Track */}
            <div className="relative w-full  min-h-[22rem] flex flex-col items-center justify-center">
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
                  className="flex flex-col items-center justify-center bg-white rounded-[2.5rem] p-10 sm:p-16 md:p-24 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-sage-100 w-full relative overflow-hidden min-h-[30rem]"
                >
                  <div
                    className="absolute -top-16 left-0 sm:left-12 select-none font-serif text-[30rem] leading-none text-sage-50/80 pointer-events-none z-0"
                    aria-hidden
                  >
                    “
                  </div>
                  <blockquote className="font-display text-2xl sm:text-4xl md:text-5xl leading-tight text-ink-900 max-w-4xl px-4 relative z-10">
                    “{current.quote}”
                  </blockquote>

                  <div className="mt-12 flex flex-col items-center relative z-10">
                    <div className="mb-5 flex gap-1.5 text-sage-500">
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
