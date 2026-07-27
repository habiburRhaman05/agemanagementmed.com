'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type * as React from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Wraps each page's content with a smooth fade-up entrance.
 * Applied once in the root layout so every route change feels fluid.
 * Collapses to a plain fade for prefers-reduced-motion users.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
