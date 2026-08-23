import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

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
}

export function HeroCompact({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  compact,
  align = 'left',
  backgroundImage,
}: HeroCompactProps) {
  const isCentered = align === 'center'
  const hasPhoto = Boolean(backgroundImage)

  return (
    <Section spacing="none" className="relative overflow-hidden pt-36 pb-10 lg:pt-44 lg:pb-12">
      {hasPhoto ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/40 to-ink-900/20" aria-hidden />
        </>
      ) : (
        <div className="absolute inset-0 bg-mesh-warm" aria-hidden />
      )}
      <Container className="relative">
        <div
          className={`
            ${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}
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
                  ${hasPhoto ? 'text-white/75' : 'text-canvas-600'}
                  ${isCentered ? 'justify-center' : ''}
                `}
              >
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 ? (
                      <ChevronRight className={`size-3.5 ${hasPhoto ? 'text-white/40' : 'text-canvas-300'}`} aria-hidden />
                    ) : null}
                    <Link
                      href={crumb.href}
                      className={`transition-colors ${hasPhoto ? 'hover:text-white' : 'hover:text-sage-700'}`}
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
            className={`${compact ? 'text-display-md' : 'text-display-md lg:text-display-lg'} ${hasPhoto ? 'text-white' : ''}`}
          >
            {title}
          </h1>

          {lead ? (
            <p
              className={`mt-5 text-body-lg ${hasPhoto ? 'text-white/85' : 'text-canvas-600'} ${isCentered ? 'mx-auto max-w-prose' : ''}`}
            >
              {lead}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}