import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

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
 * Plain image + heading + arrow-bullet list, no card background — the
 * lightest-weight of the treatment-page panels. Reused for both a compact
 * "why choose us" list and a longer "what to expect" list on the same page.
 */
export function TextImagePanel({ image, imageSide = 'left', heading, lead, items }: TextImagePanelProps) {
  const textContent = (
    <div>
      <h2 className="font-display text-display-sm text-ink-950">{heading}</h2>
      {lead ? <p className="mt-4 text-body leading-relaxed text-canvas-600">{lead}</p> : null}
      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-600" aria-hidden />
            <span className="text-body-sm leading-snug text-canvas-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const imageBlock = (
    <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
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
