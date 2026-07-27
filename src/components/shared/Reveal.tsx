'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Stagger within a group, in ms. */
  delay?: number
  className?: string
  /** Larger rise + slight scale — for hero-adjacent, higher-drama moments. */
  strong?: boolean
  /** Adds a blur-to-sharp resolve on top of the rise — for editorial, cinematic moments. */
  blur?: boolean
}

/**
 * Spring-based reveal, once, on scroll into view. `strong` gets a bigger
 * rise and a touch of scale for hero-level moments; everything else stays on
 * the quieter default so motion reads as premium, not busy.
 * `useReducedMotion` collapses to a plain fade — no transform — for users
 * who've asked for it.
 */
export function Reveal({ children, delay = 0, className, strong = false, blur = false }: RevealProps) {
  const reduceMotion = useReducedMotion()

  const distance = reduceMotion ? 0 : strong ? 40 : 24
  const scale = reduceMotion || !strong ? 1 : 0.97

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance, scale, filter: blur && !reduceMotion ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}
