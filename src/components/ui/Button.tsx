'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useReducedMotion } from 'framer-motion'
import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Six typed variants. `primary` is an emerald→navy gradient with an ambient
 * glow shadow — the brand's one "expensive" fill; every other variant stays
 * quieter so the primary action keeps its weight on the page.
 *
 * Hover is deliberately restrained: a small scale and a brightness lift,
 * nothing that tracks the pointer or sweeps across the fill — that read as
 * gimmicky rather than premium.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-full cursor-pointer',
    'font-sans font-semibold whitespace-nowrap',
    'transition-[background-color,color,border-color,box-shadow,filter] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-br from-sage-600 to-ink-900 text-canvas-50 shadow-glow hover:shadow-glow-lg hover:brightness-110',
        secondary:
          'border border-ink-900/15 bg-white/50 text-ink-900 backdrop-blur-sm hover:border-ink-900 hover:bg-ink-900 hover:text-canvas-50',
        accent: 'bg-gradient-to-br from-rose-600 to-rose-700 text-canvas-50 shadow-md hover:brightness-110',
        inverse: 'bg-canvas-50 text-ink-900 shadow-md hover:bg-canvas-200',
        outlineInverse:
          'border border-canvas-50/30 bg-canvas-50/5 text-canvas-50 backdrop-blur-sm hover:border-canvas-50/60 hover:bg-canvas-50 hover:text-ink-900',
        ghost: 'text-ink-900 hover:bg-ink-900/5',
        link: 'text-sage-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-5 text-body-sm',
        md: 'h-12 px-7 text-body',
        lg: 'h-14 px-9 text-body',
      },
    },
    compoundVariants: [
      { variant: 'link', size: ['sm', 'md', 'lg'], class: 'h-auto rounded-none px-0' },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const MotionSlot = motion.create(Slot)

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion()

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.015 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 26 },
      }

  const classes = cn(buttonVariants({ variant, size }), className)

  if (asChild) {
    // @ts-expect-error framer-motion event typings conflict with standard HTML button typings
    return <MotionSlot className={classes} {...motionProps} {...props} />
  }

  // @ts-expect-error framer-motion event typings conflict with standard HTML button typings
  return <motion.button className={classes} {...motionProps} {...props} />
}

export { buttonVariants }
