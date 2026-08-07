import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface AboutAndCtaBannerProps {
  eyebrow?: string
  heading: string
  lead: string
  image: Media
  ctaLabel: string
  ctaHref: string
}

/** Image + dark "about" panel card — a tighter `sm` spacing so it doesn't stack a second full section gap against its neighbors above/below. */
export function AboutAndCtaBanner({ eyebrow, heading, lead, image, ctaLabel, ctaHref }: AboutAndCtaBannerProps) {
  return (
    <Section background="page" spacing="sm">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-2">
            <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.focalPoint ?? 'center' }}
              />
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />
              <div className="relative">
                {eyebrow ? (
                  <Eyebrow tone="inverse" className="mb-5">
                    {eyebrow}
                  </Eyebrow>
                ) : null}
                <h2 className="font-display text-display-sm text-canvas-50">{heading}</h2>
                <p className="mt-4 text-body leading-relaxed text-canvas-50/75">{lead}</p>
                <div className="mt-7">
                  {ctaHref === '/book-appointment' ? (
                    <BookAppointmentButton>{ctaLabel}</BookAppointmentButton>
                  ) : (
                    <Button asChild size="lg">
                      <Link href={ctaHref}>
                        {ctaLabel}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
