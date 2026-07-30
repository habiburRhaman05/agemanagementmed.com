'use client'

import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/types/content'

interface FAQAccordionProps {
  eyebrow?: string
  title: string
  lead?: string
  items: FaqItem[]
  background?: 'page' | 'alt' | 'raised'
}

/**
 * Ruled rows, not boxes. Placed immediately before the closing CTA so the
 * last objection is answered right before the ask.
 *
 * Animation technique: CSS grid row trick (grid-rows-[0fr] → grid-rows-[1fr])
 * eliminates the need for JS height measurement while giving silky smooth
 * expand/collapse without layout jank. The inner div has overflow-hidden so
 * content is clipped during the transition.
 */
export function FAQAccordion({
  eyebrow,
  title,
  lead,
  items,
  background = 'page',
}: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section background={background} spacing="lg">
      <Container>
        <div className="">
          <div className="lg:col-span-4 mb-20">
            <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align='center' />
          </div>

          <div className="lg:col-span-8">
            {items.map((item, index) => {
              const isOpen = open === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`

              return (
                <div
                  key={item.question}
                  className="faq-item border-b border-canvas-300 first:border-t"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-start justify-between gap-8 py-7 text-left"
                    >
                      <span
                        className={cn(
                          'text-title-md font-display transition-colors duration-300',
                          isOpen ? 'text-sage-700' : 'text-ink-900 group-hover:text-sage-700',
                        )}
                      >
                        {item.question}
                      </span>

                      {/* Animated icon — rotates 45° on open turning + into × shape */}
                      <span
                        className={cn(
                          'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-in-out',
                          isOpen
                            ? 'bg-sage-700 text-white rotate-45 scale-110 shadow-md shadow-sage-700/25'
                            : 'bg-sage-100 text-sage-700 rotate-0 scale-100 group-hover:bg-sage-200 group-hover:scale-105',
                        )}
                        aria-hidden
                      >
                        {/* Single + SVG that rotates to × via parent rotation */}
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="size-3.5"
                        >
                          <line x1="7" y1="1" x2="7" y2="13" />
                          <line x1="1" y1="7" x2="13" y2="7" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  {/*
                   * CSS grid row trick:
                   *   grid-rows-[0fr] → content collapses to 0 height (inner div overflow-hidden clips it)
                   *   grid-rows-[1fr] → content expands to natural height
                   * transition-all animates the row track size smoothly.
                   */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      'grid transition-all duration-500 ease-in-out',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={cn(
                          'pb-8 pr-12 text-body text-canvas-600 transition-all duration-500',
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
                        )}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
