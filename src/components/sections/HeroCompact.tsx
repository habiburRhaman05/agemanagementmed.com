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
}

export function HeroCompact({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  compact,
  align = 'left',
}: HeroCompactProps) {
  const isCentered = align === 'center'

  return (
    <Section spacing="none" className="relative overflow-hidden pt-36 pb-10 lg:pt-44 lg:pb-12">
      <div className="absolute inset-0 bg-mesh-warm" aria-hidden />
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
                  flex flex-wrap items-center gap-1.5 text-body-sm text-canvas-600
                  ${isCentered ? 'justify-center' : ''}
                `}
              >
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {i > 0 ? (
                      <ChevronRight className="size-3.5 text-canvas-300" aria-hidden />
                    ) : null}
                    <Link href={crumb.href} className="transition-colors hover:text-sage-700">
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
            className={compact ? 'text-display-md' : 'text-display-md lg:text-display-lg'}
          >
            {title}
          </h1>

          {lead ? (
            <p
              className={`mt-5 text-body-lg text-canvas-600 ${isCentered ? 'mx-auto max-w-prose' : ''}`}
            >
              {lead}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}