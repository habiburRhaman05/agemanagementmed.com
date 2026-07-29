import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface SafetyAndCandidacyProps {
  image: Media
  imageSide?: 'left' | 'right'
  heading: string
  paragraphs: string[]
  questionsLabel?: string
  questions?: string[]
  closingParagraph?: string
  disclaimerLabel?: string
  disclaimer: string
  bg: string
}

/** Plain image + text safety/candidacy panel, no card chrome — ends in a medical disclaimer. */
export function SafetyAndCandidacy({
  image,
  imageSide = 'left',
  heading,
  paragraphs,
  questionsLabel,
  questions,
  closingParagraph,
  disclaimerLabel = 'Medical Disclaimer:',
  disclaimer,
  bg
}: SafetyAndCandidacyProps) {
  const textContent = (
    <div>
      <h2 className="font-display text-display-sm text-ink-950">{heading}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={paragraph} className={`text-body leading-relaxed text-canvas-600 ${index === 0 ? 'mt-4' : 'mt-3'}`}>
          {paragraph}
        </p>
      ))}

      {questions?.length ? (
        <>
          {questionsLabel ? <p className="mt-5 text-body-sm font-semibold text-ink-950">{questionsLabel}</p> : null}
          <ul className="mt-3 space-y-2">
            {questions.map((question) => (
              <li key={question} className="flex items-start gap-2.5">
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
                <span className="text-body-sm leading-snug text-canvas-600">{question}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {closingParagraph ? (
        <p className="mt-4 text-body leading-relaxed text-canvas-600">{closingParagraph}</p>
      ) : null}

      <p className="mt-5 text-body-sm leading-relaxed text-canvas-500">
        <span className="font-semibold text-ink-900">{disclaimerLabel}</span> {disclaimer}
      </p>
    </div>
  )

  const imageBlock = (
    <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
      <Image
        src={image.src}
        alt={image.alt}
        width={50000}
        height={50000}
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
    </div>
  )

  return (
    <Section background="page" spacing="md" className={bg}>
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
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
        </Reveal>
      </Container>
    </Section>
  )
}
