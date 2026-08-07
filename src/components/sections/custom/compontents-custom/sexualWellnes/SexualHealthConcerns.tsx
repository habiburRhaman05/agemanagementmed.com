import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface SexualHealthFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface SexualHealthConcernsProps {
  image: Media
  heading: string
  paragraphs: string[]
  symptomsLabel?: string
  symptoms: string[]
  featuresHeading: string
  featuresParagraphs: string[]
  features: SexualHealthFeature[]
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Reusable "concerns → advanced therapies" intro block for a sexual-wellness
 * page. Content-only — same component renders the men's and women's pages
 * with entirely different copy via props.
 */
export function SexualHealthConcerns({
  image,
  heading,
  paragraphs,
  symptomsLabel = 'Common symptoms treated',
  symptoms,
  featuresHeading,
  featuresParagraphs,
  features,
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
}: SexualHealthConcernsProps) {
  return (
    <Section background="page" spacing="md" className="bg-[#D2DCED] px-[47px] md:px-0">
      <Container bleed className="overflow-hidden rounded-2xl bg-white pb-12">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-56 lg:min-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={50000000}
                height={50000000}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-contain"
                style={{ objectPosition: image.focalPoint ?? 'left' }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <h2 className="font-display text-[20px] text-canvas-50 lg:text-[24px]">{heading}</h2>

              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-body font-light leading-relaxed text-canvas-50/75 ${index === 0 ? 'mt-4' : 'mt-3'}`}
                >
                  {paragraph}
                </p>
              ))}

              <Eyebrow tone="inverse" className="mt-6 max-w-fit">
                {symptomsLabel}
              </Eyebrow>

              <ul className="mt-4 space-y-2.5">
                {symptoms.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm font-light leading-snug text-canvas-50/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-[36px] text-ink-950 lg:text-[48px]">{featuresHeading}</h2>
            {featuresParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-body font-light leading-relaxed text-canvas-600">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2"
        >
          {features.map((feature) => (
            <StaggerItem as="li" key={feature.title} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <feature.icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="text-body-sm font-light leading-relaxed text-canvas-600">
                  <span className="font-semibold text-ink-900">{feature.title}</span> —{' '}
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-8 mb-6 text-center">
          {ctaHref === '/book-appointment' ? (
            <BookAppointmentButton>{ctaLabel}</BookAppointmentButton>
          ) : (
            <Button asChild size="lg" className="font-bold">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          )}
        </div>
      </Container>
    </Section>
  )
}
