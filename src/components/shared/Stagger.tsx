'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type * as React from 'react'

interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's reveal. */
  stagger?: number
  as?: 'div' | 'ul' | 'ol' | 'span'
}

/** Wraps a set of `StaggerItem`s; reveals them in sequence, once, on scroll into view. */
export function StaggerGroup({ children, className, stagger = 0.08, as = 'div' }: StaggerGroupProps) {
  const reduceMotion = useReducedMotion()
  const Comp = motion[as]

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : stagger } } }}
    >
      {children}
    </Comp>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  blur?: boolean
  as?: 'div' | 'li' | 'span'
}

export function StaggerItem({ children, className, blur = false, as = 'div' }: StaggerItemProps) {
  const reduceMotion = useReducedMotion()
  const Comp = motion[as]

  return (
    <Comp
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 22,
          filter: blur && !reduceMotion ? 'blur(8px)' : 'blur(0px)',
        },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { type: 'spring', stiffness: 130, damping: 18 },
        },
      }}
    >
      {children}
    </Comp>
  )
}
