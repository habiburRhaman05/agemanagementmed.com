import { Clock, MapPin } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { toTelHref } from '@/lib/contact'
import type { Location } from '@/types/content'

export interface LocationHighlightCardProps {
  title: string
  location: Location
  phone: string
}

/** Dark "visit us" card — address/hours/call on one side, an embedded map on the other. */
export function LocationHighlightCard({ title, location, phone }: LocationHighlightCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[52%_48%]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
              <h2 className="font-display text-display-sm text-canvas-50">{title}</h2>

              <div className="mt-6 space-y-4">
                <p className="flex items-start gap-3 text-body-sm text-canvas-50/80">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-600/15 text-sage-400">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <span className="pt-1.5">
                    {location.addressLine}
                    <br />
                    {location.city}, {location.state} {location.zip}
                  </span>
                </p>

                <div className="flex items-start gap-3 text-body-sm text-canvas-50/80">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-600/15 text-sage-400">
                    <Clock className="size-4" aria-hidden />
                  </span>
                  <dl className="space-y-1 pt-1.5">
                    {location.hours.map((h) => (
                      <div key={h.days} className="flex gap-3">
                        <dt className="w-20 shrink-0 text-canvas-50/60">{h.days}</dt>
                        <dd className="tabular text-canvas-50/90">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <Button asChild size="md" className="mt-8 self-start">
                <a href={toTelHref(phone)}>Call: {phone}</a>
              </Button>
            </div>

            <div className="relative min-h-72 lg:min-h-full">
              <iframe
                src={location.mapEmbedUrl}
                title={`Map of ${location.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[0.15]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
