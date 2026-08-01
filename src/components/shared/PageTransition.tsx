'use client'

import { m, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type * as React from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Wraps each page's content with a smooth fade-up entrance.
 * Applied once in the marketing layout so every route change feels fluid.
 *
 * Performance note: on the FIRST render (SSR + hydration) we pass
 * `initial={false}` so the server HTML ships fully visible — the LCP hero
 * text must paint immediately, not wait for JS hydration + animation.
 * The entrance animation still plays on client-side route changes, because
 * the m.div remounts (keyed by pathname) after the first render.
 * Collapses to a plain fade for prefers-reduced-motion users.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  // Toggled in an effect (not during render) so the SSR + hydration pass
  // both see `initial={false}`; only later navigations animate.
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const skipEntrance = isFirstRender || reduceMotion

  return (
    <m.div
      key={pathname}
      initial={skipEntrance ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  )
}
