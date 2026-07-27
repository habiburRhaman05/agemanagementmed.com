import type * as React from 'react'

import { cn } from '@/lib/utils'

type ContainerWidth = 'default' | 'prose' | 'wide' | 'full'

const widths: Record<ContainerWidth, string> = {
  default: 'max-w-[80rem]', // 1280px
  prose: 'max-w-[47.5rem]', // 760px — long-form reading measure
  wide: 'max-w-[90rem]', // 1440px
  full: 'max-w-none',
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth
  /** Drop horizontal padding, for edge-to-edge children like maps. */
  bleed?: boolean
}

export function Container({
  width = 'default',
  bleed = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full', widths[width], !bleed && 'px-6 lg:px-12', className)}
      {...props}
    >
      {children}
    </div>
  )
}
