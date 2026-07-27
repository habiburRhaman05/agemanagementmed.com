import type * as React from 'react'

import { Eyebrow } from '@/components/shared/Eyebrow'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  /** Uppercase tracked label. The editorial device that carries the layout. */
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  /** Heading level — pages must not skip levels. */
  level?: 'h1' | 'h2' | 'h3'
  size?: 'lg' | 'md' | 'sm'
  tone?: 'default' | 'inverse'
  className?: string
  children?: React.ReactNode
}

const sizes = {
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
}

/**
 * Replaces the previous single-Reveal wrapper with a StaggerGroup so
 * eyebrow → title → lead resolve in sequence — the premium "editorial
 * cascade" used on Apple, Linear, and Stripe landing pages.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  level: Heading = 'h2',
  size = 'md',
  tone = 'default',
  className,
  children,
}: SectionHeaderProps) {
  const inverse = tone === 'inverse'

  return (
    <StaggerGroup stagger={0.1}>
      <div
        className={cn(
          'flex flex-col',
          align === 'center' ? 'items-center text-center' : 'items-start',
          className,
        )}
      >
        {eyebrow ? (
          <StaggerItem>
            <Eyebrow tone={inverse ? 'inverse' : 'default'} className="mb-5">
              {eyebrow}
            </Eyebrow>
          </StaggerItem>
        ) : null}

        <StaggerItem>
          <Heading className={cn(sizes[size], inverse && 'text-canvas-50', 'max-w-[20ch]')}>
            {title}
          </Heading>
        </StaggerItem>

        {lead ? (
          <StaggerItem>
            <p
              className={cn(
                'mt-6 text-body-lg prose-measure',
                inverse ? 'text-canvas-50/75' : 'text-canvas-600',
                align === 'center' && 'mx-auto',
              )}
            >
              {lead}
            </p>
          </StaggerItem>
        ) : null}

        {children ? (
          <StaggerItem>
            <div className="mt-8">{children}</div>
          </StaggerItem>
        ) : null}
      </div>
    </StaggerGroup>
  )
}
