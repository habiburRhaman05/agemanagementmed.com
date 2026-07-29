import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface SymptomsIntroCardsProps {
  darkCard: {
    image: Media
    heading: string
    paragraphs: string[]
    ctaLabel?: string
    ctaHref?: string
  }
  lightCard: {
    image: Media
    heading: string
    paragraphs: string[]
    bulletsLabel?: string
    bullets: string[]
  }
}

/**
 * Reusable paired-card intro: dark "don't ignore this" card (image + text +
 * CTA) followed by a light "common symptoms" card (image + text + arrow
 * bullet list). Content-only.
 */
export function SymptomsIntroCards({ darkCard, lightCard }: SymptomsIntroCardsProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-56 lg:min-h-full">
              <Image
                src={darkCard.image.src}
                alt={darkCard.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: darkCard.image.focalPoint ?? 'center' }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-canvas-50">{darkCard.heading}</h2>

              {darkCard.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-body leading-relaxed text-canvas-50/75 ${index === 0 ? 'mt-4' : 'mt-3'}`}
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-7">
                <Button asChild size="lg">
                  <Link href={darkCard.ctaHref ?? '/book-appointment'}>{darkCard.ctaLabel ?? 'Schedule a consultation'}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div className="grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm lg:grid-cols-[58%_42%]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-ink-950">{lightCard.heading}</h2>

              {lightCard.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-body leading-relaxed text-canvas-600">
                  {paragraph}
                </p>
              ))}

              {lightCard.bulletsLabel ? (
                <p className="mt-5 text-body-sm font-semibold text-ink-950">{lightCard.bulletsLabel}</p>
              ) : null}

              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {lightCard.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
                    <span className="text-body-sm leading-snug text-canvas-600">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-56 lg:min-h-full">
              <Image
                src={lightCard.image.src}
                alt={lightCard.image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: lightCard.image.focalPoint ?? 'center' }}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
