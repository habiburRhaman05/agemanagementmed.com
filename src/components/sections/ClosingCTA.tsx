import { Phone } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { site } from '@/content/site'
import type { ClosingCtaData } from '@/types/content'

/** Dark band that ends every page. */
export function ClosingCTA({ title, body, cta }: ClosingCtaData) {
  return (
    <Section background="inverse" spacing="xl" className="!bg-ink-950">
      <Container width="prose">
        <Reveal>
          <div className="text-center">
            <h2 className="text-display-md text-canvas-50">{title}</h2>
            <p className="mx-auto mt-6 max-w-lg text-body-lg text-canvas-50/70">{body}</p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="inverse">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outlineInverse">
                <a href={site.phoneHref}>
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
