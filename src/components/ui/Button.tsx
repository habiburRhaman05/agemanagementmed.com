'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useReducedMotion } from 'framer-motion'
import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Six typed variants replace the source site's single uppercase pill.
 *
 * `primary` fills with ink-900 (navy) — not the brand teal. Teal is an accent
 * color only (labels, links, icon strokes); as a button fill it read flat and
 * dated, not premium. See docs/02-DESIGN-DIRECTION.md §2.3 (superseded).
 *
 * The hover shine is a `before:` pseudo-element, not a sibling span — `Slot`
 * (used for `asChild`) clones props onto a single child and can't tolerate an
 * injected sibling, which is what a wrapping Fragment would produce.
 */
const buttonVariants = cva(
  [
    'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full cursor-pointer',
    'font-sans font-semibold whitespace-nowrap',
    'transition-[background-color,color,border-color,opacity] duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-ink-900 text-canvas-50 hover:bg-ink-800',
        secondary: 'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-canvas-50',
        accent: 'bg-rose-600 text-canvas-50 hover:bg-rose-700',
        inverse: 'bg-canvas-50 text-ink-900 hover:bg-canvas-200',
        outlineInverse:
          'border border-canvas-50/40 text-canvas-50 hover:border-canvas-50 hover:bg-canvas-50 hover:text-ink-900',
        ghost: 'text-ink-900 hover:bg-ink-900/5',
        link: 'text-sage-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-5 text-body-sm',
        md: 'h-12 px-7 text-body',
        lg: 'h-14 px-9 text-body',
      },
      shine: {
        true: [
          'before:pointer-events-none before:absolute before:inset-0 before:z-10',
          'before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/25 before:to-transparent',
          'before:transition-transform before:duration-700 before:ease-out before:content-[\'\']',
          'group-hover:before:translate-x-full',
        ],
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'link', size: ['sm', 'md', 'lg'], class: 'h-auto rounded-none px-0' },
    ],
    defaultVariants: { variant: 'primary', size: 'md', shine: false },
  },
)

/** Variants that get the light-sweep shine on hover — solid fills only. */
const SHINE_VARIANTS = new Set(['primary', 'accent', 'inverse'])

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const MotionSlot = motion.create(Slot)

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const resolvedVariant = variant ?? 'primary'
  const shine = !reduceMotion && SHINE_VARIANTS.has(resolvedVariant)

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.025 },
        whileTap: { scale: 0.97 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 22 },
      }

  const classes = cn(buttonVariants({ variant, size, shine }), className)

  if (asChild) {
    // @ts-expect-error framer-motion event typings conflict with standard HTML button typings
    return <MotionSlot className={classes} {...motionProps} {...props} />
  }

  // @ts-expect-error framer-motion event typings conflict with standard HTML button typings
  return <motion.button className={classes} {...motionProps} {...props} />
}

export { buttonVariants }
