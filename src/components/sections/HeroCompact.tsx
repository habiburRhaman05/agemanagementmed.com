import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Section } from '@/components/shared/Section'

interface Crumb {
  label: string
  href: string
}

interface HeroCompactProps {
  eyebrow?: string
  title: string
  lead?: string
  breadcrumbs?: Crumb[]
  /** Use for legal/policy pages — tighter bottom padding and slightly smaller h1. */
  compact?: boolean
  /** Alignment of content: 'left' (default) or 'center' */
  align?: 'left' | 'center'
  /**
   * Full-bleed photo behind the content, replacing the default warm mesh
   * gradient — matches production's `#banner-d` pages (e.g. /in-the-news'
   * banner-28-bg.jpg). Switches heading/lead/breadcrumb copy to white with a
   * dark overlay for contrast; omit to keep the existing light-gradient look.
   */
  backgroundImage?: string
  /**
   * `'dark'` gets the same white-text treatment as `backgroundImage` but as
   * a flat `bg-ink-900` fill instead of a photo — for a page that wants the
   * dark band without a background image at all. Implied automatically when
   * `backgroundImage` is set; only needed standalone. Defaults to `'light'`
   * (the existing pale mesh-gradient look).
   */
  tone?: 'light' | 'dark'
  /** Optional supporting media rendered beside the hero copy on wide screens. */
  media?: ReactNode
}

export function HeroCompact({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  compact,
  align = 'left',
  backgroundImage,
  tone,
  media,
}: HeroCompactProps) {
  const isCentered = align === 'center'
  const hasPhoto = Boolean(backgroundImage)
  const isDark = hasPhoto || tone === 'dark'

  return (
    <Section
      spacing="none"
      className={`relative overflow-hidden pt-36 pb-10 lg:pt-44 lg:pb-12 ${isDark ? 'bg-ink-900' : ''}`}
    >
      {hasPhoto ? (
        <>
          {/* A CSS `background-image` here was invisible to the browser's
              preload scanner and couldn't carry `fetchpriority` — the same
              LCP gap as `HeroEditorial`'s banner. The section's own
              `bg-ink-900` above shows through until the photo paints, so
              white text over it never sits directly on a white/ivory
              background waiting on the image. */}
          <Image
            src={backgroundImage as string}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/40 to-ink-900/20" aria-hidden />
        </>
      ) : isDark ? null : (
        <div className="absolute inset-0 bg-mesh-warm" aria-hidden />
      )}
      <Container className="relative">
        <div
          className={`
            ${media ? 'grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-16' : ''}
          `}
        >
        <div
          className={`
            ${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}
            ${media ? 'max-w-none' : ''}
          `}
        >
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className={`hero-enter mb-6 ${isCentered ? 'flex justify-center' : ''}`}
              style={{ animationDelay: '0.05s' }}
            >
              <ol
                className={`
                  flex flex-wrap items-center gap-1.5 text-body-sm
                  ${isDark ? 'text-white/75' : 'text-canvas-600'}
                  ${isCentered ? 'justify-center' : ''}
                `}
              >
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 ? (
                      <ChevronRight className={`size-3.5 ${isDark ? 'text-white/40' : 'text-canvas-300'}`} aria-hidden />
                    ) : null}
                    <Link
                      href={crumb.href}
                      className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-sage-700'}`}
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? (
            <div className="hero-enter mb-4" style={{ animationDelay: '0.12s' }}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          ) : null}

          <h1
            className={`${compact ? 'text-display-md' : 'text-display-md lg:text-display-lg'} ${isDark ? 'text-white' : ''}`}
          >
            {title}
          </h1>

          {lead ? (
            <p
              className={`mt-5 text-body-lg ${isDark ? 'text-white/85' : 'text-canvas-600'} ${isCentered ? 'mx-auto max-w-prose' : ''}`}
            >
              {lead}
            </p>
          ) : null}
        </div>
        {media ? <div className="mx-auto w-full max-w-md lg:max-w-none">{media}</div> : null}
        </div>
      </Container>
    </Section>
  )
}
