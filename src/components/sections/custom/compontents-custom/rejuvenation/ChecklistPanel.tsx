import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface ChecklistCardProps {
  imageSide?: 'left' | 'right'
  image: Media
  heading: string
  lead?: string
  itemsLabel?: string
  items: string[]
  closingParagraphs?: ReactNode[]
}

/** The bare card — no outer Section/Container — so callers can group several under one wrapper. */
export function ChecklistCard({
  imageSide = 'left',
  image,
  heading,
  lead,
  itemsLabel,
  items,
  closingParagraphs,
}: ChecklistCardProps) {
  const imageBlock = (
    <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
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

  const textBlock = (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
      <h2 className="font-display text-[36px] font-medium leading-tight text-[#111214]">{heading}</h2>
      {lead ? (
        <p className="mt-4 text-[16px] font-normal leading-relaxed text-[#111214]">{lead}</p>
      ) : null}

      {itemsLabel ? (
        <p className="mt-6 text-[16px] font-semibold text-[#111214]">{itemsLabel}</p>
      ) : null}

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sage-600" strokeWidth={1.75} aria-hidden />
            <span className="text-[16px] font-normal leading-snug text-[#111214]">{item}</span>
          </li>
        ))}
      </ul>

      {closingParagraphs?.map((paragraph, index) => (
        <p key={index} className="mt-4 text-[16px] font-normal leading-relaxed text-[#111214]">
          {paragraph}
        </p>
      ))}
    </div>
  )

  return (
    <div
      className={`grid overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm ${
        imageSide === 'left' ? 'lg:grid-cols-[42%_58%]' : 'lg:grid-cols-[58%_42%]'
      }`}
    >
      {imageSide === 'left' ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}

/** Standalone version — a single card in its own full Section. */
export function ChecklistPanel(props: ChecklistCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <ChecklistCard {...props} />
        </Reveal>
      </Container>
    </Section>
  )
}

/** Groups multiple cards inside one Section with a tight gap. */
export function ChecklistPanelGroup({ panels }: { panels: ChecklistCardProps[] }) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <div className="space-y-6">
          {panels.map((panel, index) => (
            <Reveal key={panel.heading} delay={index * 80}>
              <ChecklistCard {...panel} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
