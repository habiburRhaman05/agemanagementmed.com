import type * as React from 'react'

interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's reveal. Unused now — kept for API compatibility. */
  stagger?: number
  as?: 'div' | 'ul' | 'ol' | 'span'
}

/**
 * Plain passthrough wrapper — same API as before (so every existing call
 * site keeps compiling unchanged), but no longer animates.
 *
 * This used to stagger its children in via framer-motion's `whileInView`,
 * matching `Reveal`. In practice that `IntersectionObserver`-driven trigger
 * would sometimes never fire — a fast/dragged scroll, a stale ref, whatever
 * the exact cause — and children were left stuck at their `hidden` variant
 * (`opacity: 0`, translated off-position) permanently. That's not just
 * invisible: framer-motion still applies the `transform`/`opacity` via the
 * DOM, and content sitting off-position with 0 opacity can fall out of
 * normal hit-testing, which is why it also couldn't be text-selected.
 * `Reveal` (see Reveal.tsx) hit the identical failure and was already
 * stripped down to a plain wrapper — this mirrors that fix so content is
 * simply visible immediately, all the time, with no observer to get stuck.
 */
export function StaggerGroup({ children, className, as: Comp = 'div' }: StaggerGroupProps) {
  return <Comp className={className}>{children}</Comp>
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  blur?: boolean
  as?: 'div' | 'li' | 'span'
}

export function StaggerItem({ children, className, as: Comp = 'div' }: StaggerItemProps) {
  return <Comp className={className}>{children}</Comp>
}
