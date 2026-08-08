import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { cn } from '@/lib/utils'
import type { Media } from '@/types/content'

/** Thin long-stem arrow used throughout the site's brand CTAs/bullets — matches BookAppointmentButton. */
function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  )
}

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
    <Section background="page" spacing="md" className="bg-[#D2DCED] px-4 sm:px-[47px] md:px-0">
      <Container bleed className="overflow-hidden rounded-2xl bg-white pb-12">
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-[#0f1c3f] shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-72 sm:min-h-96 lg:min-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.focalPoint ?? 'center' }}
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
              <h2 className="font-display text-[36px] leading-tight text-white sm:text-[48px]">
                {heading}
              </h2>

              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={cn(
                    'text-[16px] leading-relaxed font-light text-white/80',
                    index === 0 ? 'mt-5' : 'mt-4'
                  )}
                >
                  {paragraph}
                </p>
              ))}

              <span className="mt-7 inline-flex w-fit items-center rounded-md bg-white px-4 py-2 text-[16px] font-bold text-[#0f1c3f]">
                {symptomsLabel}
              </span>

              <ul className="mt-4 space-y-3">
                {symptoms.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ArrowSvg className="text-[#519B99]" />
                    <span className="text-[16px] leading-snug font-light text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl px-4 text-center sm:mt-16">
          <Reveal>
            <h2 className="font-display text-[36px] text-ink-950 sm:text-[48px]">{featuresHeading}</h2>
            {featuresParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[16px] leading-relaxed font-light text-canvas-600">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-8 px-4 text-left sm:grid-cols-2"
        >
          {features.map((feature) => (
            <StaggerItem as="li" key={feature.title} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center text-[#519B99]">
                <feature.icon className="size-7" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="text-[16px] leading-relaxed font-light text-canvas-600">
                <span className="font-bold text-ink-950">{feature.title}</span> - {feature.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 mb-6 px-4 text-center">
          {ctaHref === '/book-appointment' ? (
            <BookAppointmentButton>{ctaLabel}</BookAppointmentButton>
          ) : (
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 rounded-full bg-[#519B99] px-8 py-[15px] font-sans text-[14px] font-bold tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-[#458785]"
            >
              {ctaLabel}
              <ArrowSvg className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Container>
    </Section>
  )
}
