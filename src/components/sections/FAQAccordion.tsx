'use client'

import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/types/content'

interface FAQAccordionProps {
  eyebrow?: string
  title: string
  lead?: string
  items: FaqItem[]
  background?: 'page' | 'alt' | 'raised'
}

/** Splits the flat item list into runs of consecutive same-category items,
 * preserving order. Items without a category fall into their own unlabeled
 * run (rendered with no navy header bar). */
function groupByCategory(items: FaqItem[]) {
  const groups: { category: string | null; items: FaqItem[] }[] = []
  for (const item of items) {
    const category = item.category ?? null
    const last = groups[groups.length - 1]
    if (last && last.category === category) {
      last.items.push(item)
    } else {
      groups.push({ category, items: [item] })
    }
  }
  return groups
}

/**
 * White card on the page's cream background, with items optionally grouped
 * under navy category bars (BHRT's "About BHRT" / "About Savannah Age
 * Management's BHRT Program" style). Groups form automatically from
 * `item.category` — flat lists without categories render as a single
 * ungrouped card, unchanged.
 */
export function FAQAccordion({
  eyebrow,
  title,
  lead,
  items,
  background = 'page',
}: FAQAccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null)
  const groups = groupByCategory(items)

  return (
    <Section background={background} spacing="lg">
      <Container className="max-w-5xl">
        <div className="text-center mb-14">
          {eyebrow ? (
            <p className="text-label font-sans font-semibold uppercase tracking-widest text-ink-900/60 mb-3">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-3xl sm:text-4xl text-ink-900">{title}</h2>
          {lead ? (
            <p className="mt-4 max-w-xl mx-auto text-body-sm text-[#C9A876]">{lead}</p>
          ) : null}
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-sm">
          {groups.map((group, groupIndex) => (
            <div key={group.category ?? `ungrouped-${groupIndex}`} className={groupIndex > 0 ? 'mt-8' : ''}>
              {group.category ? (
                <h3 className="rounded-xl bg-[#14214B] px-6 py-4 text-body font-display text-canvas-50">
                  {group.category}
                </h3>
              ) : null}

              <div className={group.category ? 'mt-2' : ''}>
                {group.items.map((item) => {
                  const isOpen = open === item.question
                  const panelId = `faq-panel-${item.question}`
                  const buttonId = `faq-button-${item.question}`

                  return (
                    <div key={item.question} className="border-b border-canvas-300 last:border-b-0">
                      <h4>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : item.question)}
                          className="group flex w-full items-start gap-3 py-5 text-left"
                        >
                          <span className="text-black font-sans font-medium leading-6" aria-hidden>
                            {isOpen ? '−' : '+'}
                          </span>
                          <span className="text-body text-black group-hover:text-ink-700 transition-colors">
                            {item.question}
                          </span>
                        </button>
                      </h4>

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
                              'pb-5 pl-7 pr-4 text-body-sm text-canvas-600 transition-all duration-500',
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
          ))}
        </div>
      </Container>
    </Section>
  )
}
