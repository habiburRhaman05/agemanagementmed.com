import { Check } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'
import type { PricingData } from '@/types/content'

/**
 * Cost is the primary objection in concierge medicine and the source site
 * answers it only in a footer link. This block puts "what's included" and a
 * financing route inside the treatment page itself.
 */
export function PricingBlock({ eyebrow, title, lead, included, note, cta }: PricingData) {
  return (
    <Section background="alt" spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
            <Button asChild className="mt-10">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-body">
                  <Check className="mt-1 size-4 shrink-0 text-sage-700" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            {note ? (
              <p className="mt-10 border-t border-ink-900/10 pt-8 text-body-sm text-canvas-600">
                {note}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}
