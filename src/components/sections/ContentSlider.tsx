'use client'

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Container } from '@/components/shared/Container'
import { IconRenderer } from '@/components/shared/IconRenderer'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'
import type { DesignOverride, IconSpec } from '@/types/content'

/* ── Types ─────────────────────────────────────────────────────────── */

export interface SliderCard {
  title: string
  description?: string
  image?: { src: string; alt: string }
  icon?: IconSpec
  href?: string
}

interface ContentSliderProps {
  eyebrow?: string
  title: string
  lead?: string
  cards?: SliderCard[]
  background?: 'page' | 'alt' | 'raised' | 'accent'
  design?: DesignOverride
  sectionId?: string
  /** Auto-advance interval in ms. 0 or undefined = no autoplay. */
  autoplayInterval?: number
}

/* ── Component ─────────────────────────────────────────────────────── */

export function ContentSlider({
  eyebrow,
  title,
  lead,
  cards = [],
  background = 'page',
  design,
  sectionId,
  autoplayInterval = 0,
}: ContentSliderProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = cards.length
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback(
    (delta: number) => setCurrent((i) => ((i + delta) % total + total) % total),
    [total],
  )

  const goTo = useCallback((index: number) => setCurrent(index), [])

  // Autoplay
  useEffect(() => {
    if (!autoplayInterval || total <= 1 || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => go(1), autoplayInterval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoplayInterval, total, isPaused, go])

  if (!cards.length) return null

  const card = cards[current]

  return (
    <Section
      background={background}
      spacing="lg"
      className={cn('overflow-hidden', design?.className)}
      data-section-id={sectionId}
      style={design?.vars as React.CSSProperties}
    >
      <Container className={design?.containerClassName}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          align="center"
          className={design?.titleClassName}
        >
          {/* Pause/resume autoplay — only visible when autoplay is active */}
          {autoplayInterval > 0 && total > 1 ? (
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="inline-flex size-8 items-center justify-center rounded-full border border-canvas-300 text-canvas-600 transition-colors hover:border-sage-600 hover:text-sage-700"
            >
              {isPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          ) : null}
        </SectionHeader>

        {/* Slide area */}
        <div className="relative mt-12">
          <Reveal key={current} strong className="mx-auto max-w-2xl">
            <div
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 p-8 shadow-md transition-all duration-500 hover:shadow-lg sm:p-12',
                design?.cardClassName,
              )}
              style={design?.vars as React.CSSProperties}
            >
              {/* Icon */}
              {card.icon ? (
                <div className="mb-6">
                  <IconRenderer
                    icon={card.icon}
                    className="text-sage-600"
                    size={40}
                  />
                </div>
              ) : null}

              {/* Image */}
              {card.image ? (
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : null}

              {/* Title */}
              <h3
                className={cn(
                  'text-title-lg font-display text-ink-900',
                  design?.titleClassName,
                )}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    className="transition-colors hover:text-sage-700"
                  >
                    {card.title}
                  </a>
                ) : (
                  card.title
                )}
              </h3>

              {/* Description */}
              {card.description ? (
                <p className="mt-4 text-body text-canvas-600 leading-relaxed">
                  {card.description}
                </p>
              ) : null}
            </div>
          </Reveal>

          {/* Navigation — only when multiple cards */}
          {total > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === current
                        ? 'w-6 bg-sage-600'
                        : 'w-1.5 bg-canvas-300 hover:bg-sage-400',
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="inline-flex size-10 items-center justify-center rounded-full border border-canvas-300 text-ink-900 transition-colors hover:border-sage-600 hover:text-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
