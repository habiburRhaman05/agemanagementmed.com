import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface TreatmentBenefitsIntroProps {
  darkCard: {
    image: Media
    heading: string
    paragraphs: string[]
  }
  lightCard: {
    image: Media
    heading: string
    benefits: string[]
    ctaLabel?: string
    ctaHref?: string
  }
}

/**
 * Reusable "what it is" (dark, image + paragraphs) + "benefits" (light, image
 * + checkmark list + CTA) pair. Content-only, for a single-audience treatment
 * page — no gendered variant needed here.
 */
export function TreatmentBenefitsIntro({ darkCard, lightCard }: TreatmentBenefitsIntroProps) {
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
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div className="grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm lg:grid-cols-[58%_42%]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-display-sm text-ink-950">{lightCard.heading}</h2>

              <ul className="mt-5 space-y-2.5">
                {lightCard.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Check className="size-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="text-body-sm leading-snug text-canvas-600">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button asChild size="lg">
                  <Link href={lightCard.ctaHref ?? '/book'}>{lightCard.ctaLabel ?? 'Request a consultation'}</Link>
                </Button>
              </div>
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
