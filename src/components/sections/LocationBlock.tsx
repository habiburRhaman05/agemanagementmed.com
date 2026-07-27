import { Clock, MapPin, Phone } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'
import { site } from '@/content/site'
import type { Location } from '@/types/content'

interface LocationBlockProps {
  eyebrow?: string
  title: string
  lead?: string
  locations: Location[]
  showMap?: boolean
  background?: 'page' | 'alt' | 'raised'
}

export function LocationBlock({
  eyebrow,
  title,
  lead,
  locations,
  showMap = false,
  background = 'alt',
}: LocationBlockProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <Reveal key={location.slug} delay={index * 80}>
              <article className="flex h-full flex-col rounded-lg border border-canvas-300 bg-canvas-50 p-8 lg:p-10">
                <h3 className="text-display-sm">{location.name}</h3>

                <address className="mt-6 space-y-4 not-italic">
                  <p className="flex gap-3 text-body text-canvas-600">
                    <MapPin className="mt-1 size-4 shrink-0 text-sage-600" aria-hidden />
                    <span>
                      {location.addressLine}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </span>
                  </p>
                  <p className="flex gap-3 text-body text-canvas-600">
                    <Phone className="mt-1 size-4 shrink-0 text-sage-600" aria-hidden />
                    <a href={site.phoneHref} className="hover:text-sage-700">
                      {site.phone}
                    </a>
                  </p>
                </address>

                <div className="mt-6 flex gap-3 border-t border-canvas-300 pt-6">
                  <Clock className="mt-1 size-4 shrink-0 text-sage-600" aria-hidden />
                  <dl className="space-y-1.5">
                    {location.hours.map((h) => (
                      <div key={h.days} className="flex gap-4 text-body-sm">
                        <dt className="w-24 shrink-0 text-canvas-600">{h.days}</dt>
                        <dd className="text-ink-900 tabular">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {showMap ? (
                  <iframe
                    src={location.mapEmbedUrl}
                    title={`Map of ${location.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="mt-8 h-56 w-full rounded-md border border-canvas-300"
                  />
                ) : null}

                <Button asChild variant="secondary" className="mt-8 self-start">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${location.addressLine}, ${location.city}, ${location.state} ${location.zip}`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                  </a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
