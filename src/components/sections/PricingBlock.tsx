import { Check } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'
import type { PricingData } from '@/types/content'

/**
 * Cost is the primary objection in concierge medicine and the source site
 * answers it only in a footer link. This block puts "what's included" and a
 * financing route inside the treatment page itself.
 *
 * Now animated: left column slides in first (Reveal), then the included items
 * cascade in via StaggerGroup — drawing the eye from the header down through
 * every benefit item.
 */
export function PricingBlock({ eyebrow, title, lead, included, note, cta }: PricingData) {
  return (
    <Section background="alt" spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
            <Button asChild className="mt-10">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </Reveal>

          <div className="lg:col-span-7">
            <StaggerGroup stagger={0.06}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <StaggerItem key={item}>
                    <li className="group flex h-full items-start gap-3 rounded-xl border border-canvas-300/50 bg-canvas-50 p-4 text-body shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sage-600/30 hover:shadow-md">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700 transition-all duration-300 group-hover:bg-sage-600 group-hover:text-canvas-50">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="transition-colors duration-200 group-hover:text-sage-700">
                        {item}
                      </span>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerGroup>

            {note ? (
              <Reveal delay={200}>
                <p className="mt-10 border-t border-ink-900/10 pt-8 text-body-sm text-canvas-600">
                  {note}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}
