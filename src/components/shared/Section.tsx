import type * as React from 'react'

import { cn } from '@/lib/utils'

type Background = 'page' | 'alt' | 'inverse' | 'accent' | 'raised'
type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'

const backgrounds: Record<Background, string> = {
  page: 'bg-canvas-100 text-canvas-900',
  alt: 'bg-canvas-200 text-canvas-900',
  raised: 'bg-canvas-50 text-canvas-900',
  accent: 'bg-sage-100 text-canvas-900',
  // Dark bands are the emphasis device — headings invert too.
  inverse: 'bg-ink-900 text-canvas-50 [&_h1]:text-canvas-50 [&_h2]:text-canvas-50 [&_h3]:text-canvas-50 [&_h4]:text-canvas-50',
}

/**
 * Desktop padding is roughly double the source site's. Whitespace is the
 * single biggest lever on "premium" — see docs/02-DESIGN-DIRECTION.md §4.2.
 */
const spacings: Record<Spacing, string> = {
  none: '',
  sm: 'py-8 lg:py-12',
  md: 'py-12 lg:py-16',
  lg: 'py-16 lg:py-24',
  xl: 'py-20 lg:py-32',
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: Background
  spacing?: Spacing
  as?: 'section' | 'div' | 'article' | 'aside'
}

export function Section({
  background = 'page',
  spacing = 'md',
  as: Comp = 'section',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp
      className={cn('relative', backgrounds[background], spacings[spacing], className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
