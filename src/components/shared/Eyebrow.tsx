import type * as React from 'react'

import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  tone?: 'default' | 'inverse'
  className?: string
}

/** The one eyebrow-label treatment in the system — a small pill, never bare uppercase text. */
export function Eyebrow({ children, tone = 'default', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-4 py-1.5 text-label font-semibold uppercase',
        tone === 'inverse' ? 'bg-canvas-50/10 text-sage-400' : 'bg-sage-200 text-sage-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
