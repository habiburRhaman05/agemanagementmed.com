'use client'

import { Minus, Plus } from 'lucide-react'
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
          </div>

          <dl className="lg:col-span-8">
            {items.map((item, index) => {
              const isOpen = open === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`

              return (
                <div key={item.question} className="border-b border-canvas-300 first:border-t">
                  <dt>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="flex w-full items-start justify-between gap-8 py-7 text-left"
                    >
                      <span className="text-title-md font-display text-ink-900">
                        {item.question}
                      </span>
                      <span className="mt-0.5 shrink-0 text-sage-700" aria-hidden>
                        {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className={cn('pb-8 pr-12 text-body text-canvas-600')}
                  >
                    {item.answer}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </Container>
    </Section>
  )
}
