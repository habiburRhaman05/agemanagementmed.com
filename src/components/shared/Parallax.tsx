'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type * as React from 'react'
import { useRef } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /** Max vertical travel in pixels, applied as the element scrolls through the viewport. */
  strength?: number
}

/** Subtle scroll-linked drift — used on hero/editorial imagery, never on text. */
export function Parallax({ children, className, strength = 50 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-strength, strength])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
