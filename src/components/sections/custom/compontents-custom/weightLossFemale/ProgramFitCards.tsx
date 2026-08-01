import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface ProgramFitCard {
  image: Media
  imageSide?: 'left' | 'right'
  heading: string
  lead: string
  bulletsLabel?: string
  bullets: string[]
  note?: {
    prefix: string
    linkLabel: string
    linkHref: string
    suffix: string
  }
  closingText?: string
}

export interface ProgramFitCardsProps {
  fitCard: ProgramFitCard
  safetyCard: ProgramFitCard
}

function FitCard({ card }: { card: ProgramFitCard }) {
  const imageSide = card.imageSide ?? 'left'

  const textContent = (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="font-display text-display-sm text-ink-950">{card.heading}</h2>
      <p className="mt-4 text-body leading-relaxed text-canvas-600">{card.lead}</p>

      {card.bulletsLabel ? (
        <p className="mt-5 text-body-sm font-semibold text-ink-950">{card.bulletsLabel}</p>
      ) : null}

      <ul className="mt-3 space-y-2">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
            <span className="text-body-sm leading-snug text-canvas-600">{bullet}</span>
          </li>
        ))}
      </ul>

      {card.note ? (
        <p className="mt-5 text-body-sm leading-relaxed text-canvas-600">
          {card.note.prefix}{' '}
          <Link href={card.note.linkHref} className="font-medium text-sage-700 underline underline-offset-2 hover:text-sage-800">
            {card.note.linkLabel}
          </Link>{' '}
          {card.note.suffix}
        </p>
      ) : null}

      {card.closingText ? (
        <p className="mt-5 text-body-sm leading-relaxed text-canvas-600">{card.closingText}</p>
      ) : null}
    </div>
  )

  const imageBlock = (
    <div className="relative  lg:aspect-auto lg:min-h-full">
      <Image
        src={card.image.src}
        alt={card.image.alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="w-full h-full object-cover"
        style={{ objectPosition: card.image.focalPoint ?? 'center' }}
      />
    </div>
  )

  return (
    <div
      className={`grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-100 shadow-sm lg:grid-cols-2`}
    >
      {imageSide === 'left' ? (
        <>
          {imageBlock}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageBlock}
        </>
      )}
    </div>
  )
}

/** Two "is this right for you" style cards — content-driven, alternating image side. */
export function ProgramFitCards({ fitCard, safetyCard }: ProgramFitCardsProps) {
  return (
    <Section background="alt" spacing="md">
      <Container>
        <div className="space-y-6">
          <Reveal>
            <FitCard card={{ ...fitCard, imageSide: fitCard.imageSide ?? 'left' }} />
          </Reveal>
          <Reveal>
            <FitCard card={{ ...safetyCard, imageSide: safetyCard.imageSide ?? 'right' }} />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
