import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-32 w-full rounded-md border border-canvas-300 bg-canvas-50 px-4 py-3 text-body text-canvas-900',
      'placeholder:text-canvas-600/60',
      'focus:border-ink-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-sage-600',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-rose-700',
      className,
    )}
    ref={ref}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
