import type * as React from 'react'

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
    <div
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'mb-5 font-sans text-label font-semibold uppercase',
            inverse ? 'text-sage-400' : 'text-sage-700',
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <Heading className={cn(sizes[size], inverse && 'text-canvas-50', 'max-w-[20ch]')}>
        {title}
      </Heading>

      {lead ? (
        <p
          className={cn(
            'mt-6 text-body-lg prose-measure',
            inverse ? 'text-canvas-50/75' : 'text-canvas-600',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  )
}
