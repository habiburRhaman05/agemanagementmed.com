import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import type { Media } from '@/types/content'

export interface IconGridItem {
  icon: LucideIcon
  label: string
}

export interface IconGridCardProps {
  tone?: 'dark' | 'light'
  imageSide?: 'left' | 'right'
  image: Media
  heading: string
  lead?: string
  itemsLabel?: string
  items: IconGridItem[]
  closingParagraphs?: ReactNode[]
  cta?: { label: string; href: string }
}

/** The bare card — image + heading + a 2-column icon-badge list — with no outer Section/Container, so callers can group several under one wrapper. */
export function IconGridCard({
  tone = 'light',
  imageSide = 'left',
  image,
  heading,
  lead,
  itemsLabel,
  items,
  closingParagraphs,
  cta,
}: IconGridCardProps) {
  const dark = tone === 'dark'

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
      <h2 className={`font-display text-display-sm ${dark ? 'text-canvas-50' : 'text-ink-950'}`}>{heading}</h2>
      {lead ? (
        <p className={`mt-4 text-body leading-relaxed ${dark ? 'text-canvas-50/75' : 'text-canvas-600'}`}>{lead}</p>
      ) : null}

      {itemsLabel ? (
        <p className={`mt-6 text-body-sm font-semibold ${dark ? 'text-canvas-50' : 'text-ink-950'}`}>{itemsLabel}</p>
      ) : null}

      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                dark ? 'bg-sage-600/15 text-sage-400' : 'bg-sage-100 text-sage-700'
              }`}
            >
              <item.icon className="size-4" strokeWidth={1.75} aria-hidden />
            </span>
            <span className={`text-body-sm leading-snug ${dark ? 'text-canvas-50/90' : 'text-canvas-600'}`}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      {closingParagraphs?.map((paragraph, index) => (
        <p key={index} className={`mt-4 text-body-sm leading-relaxed ${dark ? 'text-canvas-50/75' : 'text-canvas-600'}`}>
          {paragraph}
        </p>
      ))}

      {cta ? (
        <Button asChild size="md" className="mt-6 self-start">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      ) : null}
    </div>
  )

  return (
    <div
      className={`grid overflow-hidden rounded-3xl shadow-xl ${
        imageSide === 'left' ? 'lg:grid-cols-[42%_58%]' : 'lg:grid-cols-[58%_42%]'
      } ${dark ? 'bg-ink-950' : 'border border-canvas-300/60 bg-canvas-50 shadow-sm'}`}
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

/** Standalone version — a single card in its own full Section. Use `IconGridPanelGroup` to stack several tightly instead of repeating full section spacing per card. */
export function IconGridPanel(props: IconGridCardProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <IconGridCard {...props} />
        </Reveal>
      </Container>
    </Section>
  )
}

/** Groups multiple cards inside one Section with a tight gap — the rhythm used across the rest of the site for paired cards (see OverviewApproachCards). */
export function IconGridPanelGroup({ panels }: { panels: IconGridCardProps[] }) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <div className="space-y-6">
          {panels.map((panel, index) => (
            <Reveal key={panel.heading} delay={index * 80}>
              <IconGridCard {...panel} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export interface IconGridColumn {
  heading: string
  lead?: string
  items: IconGridItem[]
  closingParagraphs?: string[]
  cta?: { label: string; href: string }
}

/**
 * A single dark banner split into two icon-list columns, side by side —
 * no photography. Reaches for the same mesh-gradient texture used on other
 * dark cards across the site (see ExpertsSpotlightCard) so the surface still
 * reads as premium without a photo doing the work.
 */
export function DualIconGridBanner({ columns }: { columns: [IconGridColumn, IconGridColumn] }) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 shadow-xl">
            <div className="absolute inset-0 bg-mesh-navy opacity-60" aria-hidden />

            <div className="relative grid gap-10 px-6 py-10 sm:gap-12 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-16">
              {columns.map((column, index) => (
                <div
                  key={column.heading}
                  className={
                    index === 0
                      ? 'min-w-0 lg:border-r lg:border-white/10 lg:pr-16'
                      : 'min-w-0'
                  }
                >
                  <h2 className="font-display text-title-lg text-canvas-50 sm:text-display-sm">{column.heading}</h2>
                  {column.lead ? (
                    <p className="mt-3 text-body-sm leading-relaxed text-canvas-50/70">{column.lead}</p>
                  ) : null}

                  <ul className="mt-6 space-y-4">
                    {column.items.map((item) => (
                      <li key={item.label} className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-600/15 text-sage-400">
                          <item.icon className="size-4" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="text-body-sm leading-snug text-canvas-50/90">{item.label}</span>
                      </li>
                    ))}
                  </ul>

                  {column.closingParagraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-body-sm leading-relaxed text-canvas-50/70">
                      {paragraph}
                    </p>
                  ))}

                  {column.cta ? (
                    <Button
                      asChild
                      size="md"
                      className="mt-6 h-auto w-full whitespace-normal text-center leading-snug py-3 sm:h-12 sm:w-auto sm:whitespace-nowrap"
                    >
                      <Link href={column.cta.href}>{column.cta.label}</Link>
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
