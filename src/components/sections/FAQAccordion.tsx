'use client'

import { useState } from 'react'

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
 * The live site's `.content-d` heading + `#faq-d` accordion — a white rounded
 * card with hairline-divided rows and a navy plus/minus toggle in the left
 * gutter. Ported live-site CSS (see src/app/legacy.css).
 *
 * Data flow is unchanged: same props, same `items` array, same optional
 * `category` grouping. Only the markup/CSS was swapped.
 */
export function FAQAccordion({ eyebrow, title, lead, items }: FAQAccordionProps) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null)
  const groups = groupByCategory(items)

  return (
    <section className="lg-faq-section">
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            {eyebrow ? <h2 className="lg-top-title">{eyebrow}</h2> : null}
            <h2 className="lg-title" style={lead ? undefined : { marginBottom: 0 }}>
              {title}
            </h2>
            {lead ? (
              <div className="lg-text lg-max-width-700">
                <p>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div id="faq-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              {groups.map((group, groupIndex) => (
                <div
                  key={group.category ?? `ungrouped-${groupIndex}`}
                  style={groupIndex > 0 ? { marginTop: 40 } : undefined}
                >
                  {group.category ? (
                    <h3 className="faq-category">{group.category}</h3>
                  ) : null}

                  {group.items.map((item) => {
                    const isOpen = open === item.question
                    const panelId = `faq-panel-${item.question}`
                    const buttonId = `faq-button-${item.question}`

                    return (
                      <div
                        key={item.question}
                        className={cn('item', isOpen && 'active')}
                      >
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : item.question)}
                          className="lg-title"
                        >
                          <span className="toggle" aria-hidden />
                          {item.question}
                        </button>

                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="content"
                        >
                          <div className="box">
                            <div>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
