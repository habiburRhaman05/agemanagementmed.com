import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface TextImagePanelProps {
  image: Media
  imageSide?: 'left' | 'right'
  heading: string
  lead?: string
  items: string[]
}

/**
 * Bordered image + checklist card — matches the rounded-3xl card language
 * used across the rest of the treatment pages (SymptomsHeroCard, LabworkGuidancePanel,
 * etc.) instead of floating bare text next to an image. Reused for both a compact
 * "why choose us" list and a longer "what to expect" list on the same page.
 */
export function TextImagePanel({ image, imageSide = 'left', heading, lead, items }: TextImagePanelProps) {
  const textContent = (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
      <h2 className="font-display text-display-sm text-ink-950">{heading}</h2>
      {lead ? <p className="mt-4 text-body leading-relaxed text-canvas-600">{lead}</p> : null}

      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sage-600" strokeWidth={1.75} aria-hidden />
            <span className="text-body-sm leading-snug text-canvas-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const imageBlock = (
    <div className="relative min-h-64 lg:min-h-full">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
    </div>
  )

  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div
            className={`grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm ${
              imageSide === 'left' ? 'lg:grid-cols-[42%_58%]' : 'lg:grid-cols-[58%_42%]'
            }`}
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
        </Reveal>
      </Container>
    </Section>
  )
}
