import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { Media } from '@/types/content'

type Ratio = 'hero' | 'landscape' | 'portrait' | 'square' | 'wide'

const ratios: Record<Ratio, string> = {
  hero: 'aspect-[16/9]',
  wide: 'aspect-[21/9]',
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
}

interface AspectImageProps {
  media: Media
  ratio?: Ratio
  /** Required — an image without `sizes` is a CLS and bandwidth bug. */
  sizes: string
  priority?: boolean
  rounded?: boolean
  className?: string
  imageClassName?: string
}

/**
 * The only image entry point in the app. Guarantees a fixed ratio, explicit
 * `sizes`, and real alt text — no bare <img>, no unsized next/image.
 */
export function AspectImage({
  media,
  ratio = 'landscape',
  sizes,
  priority = false,
  rounded = true,
  className,
  imageClassName,
}: AspectImageProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-canvas-200',
        ratios[ratio],
        rounded && 'rounded-lg',
        className,
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  )
}
