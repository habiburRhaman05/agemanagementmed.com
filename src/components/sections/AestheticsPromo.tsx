import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'

export interface AestheticsPromoProps {
  title: string
  lead: string
  ctaLabel: string
  href: string
}

/** Compact homepage promo band linking out to the practice's dedicated medical-aesthetics site. */
export function AestheticsPromo({ title, lead, ctaLabel, href }: AestheticsPromoProps) {
  return (
    <div className="bg-canvas-100 py-6 lg:pb-8 ">
      <Container>
        <Reveal>
          <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-canvas-300/60 bg-canvas-50 px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
           
            <div>
              <h2 className="font-display text-title-lg text-ink-950">{title}</h2>
              <p className="mt-1.5 text-body-sm text-canvas-600">{lead}</p>
            </div>

            <Button asChild size="md" className="w-full shrink-0 sm:w-auto">
              <a href={href} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
