'use client'

import { cn } from '@/lib/utils'
import type { IconSpec } from '@/types/content'
import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

/**
 * Dynamically resolves a Lucide icon by name. Uses the pre-imported
 * `lucide-react` barrel instead of `dynamicIconImports` to avoid async
 * waterfalls — every icon shipped with the initial bundle is tiny enough
 * that code splitting each one is a net loss.
 */
function LucideIcon({ name, className, size, color }: { name: string } & Pick<IconSpec, 'className' | 'size' | 'color'>) {
  // Dynamic icon lookup — safe because LucideIcons is the barrel export.
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name]

  if (!Icon) {
    // Silent fallback — broken icon names shouldn't crash the page.
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[IconRenderer] Unknown Lucide icon: "${name}" — check your JSON.`)
    }
    return (
      <span
        className={cn('inline-flex items-center justify-center rounded-md bg-sage-100 text-sage-600', className)}
        style={{ width: size ?? 24, height: size ?? 24 }}
        aria-label={name}
      >
        ?
      </span>
    )
  }

  return (
    <Icon
      className={cn('shrink-0', className)}
      size={size ?? 24}
      color={color}
      aria-hidden
    />
  )
}

/**
 * Universal icon renderer. Renders any `IconSpec` without the caller
 * needing to switch on `kind`. Returns `null` for an invalid spec.
 *
 * @example
 * ```tsx
 * <IconRenderer icon={{ kind: 'lucide', value: 'Sparkles', size: 32 }} />
 * <IconRenderer icon={{ kind: 'image', value: '/icons/check.svg', label: 'Check' }} />
 * <IconRenderer icon={{ kind: 'emoji', value: '✅', size: 20 }} />
 * ```
 */
export function IconRenderer({ icon, className, size, color }: {
  icon: IconSpec
  className?: string
  size?: number
  color?: string
}) {
  const resolvedSize = size ?? icon.size ?? 24

  switch (icon.kind) {
    case 'lucide':
      return (
        <LucideIcon
          name={icon.value}
          className={cn(icon.className, className)}
          size={resolvedSize}
          color={color ?? icon.color}
        />
      )

    case 'image':
      return (
        <img
          src={icon.value}
          alt={icon.label ?? ''}
          width={resolvedSize}
          height={resolvedSize}
          className={cn('shrink-0 object-contain', icon.className, className)}
          style={{ width: resolvedSize, height: resolvedSize }}
        />
      )

    case 'inline-svg':
      return (
        <span
          className={cn('inline-flex shrink-0 items-center justify-center', icon.className, className)}
          style={{ width: resolvedSize, height: resolvedSize }}
          aria-label={icon.label}
          // Value is CMS-authored SVG markup, not user input.
          dangerouslySetInnerHTML={{ __html: icon.value }}
        />
      )

    case 'font-class':
      return (
        <i
          className={cn(icon.value, icon.className, className)}
          style={{ fontSize: resolvedSize }}
          aria-label={icon.label}
        />
      )

    case 'emoji':
      return (
        <span
          className={cn('inline-flex shrink-0 items-center justify-center', icon.className, className)}
          style={{ fontSize: resolvedSize, width: resolvedSize, height: resolvedSize }}
          role="img"
          aria-label={icon.label ?? icon.value}
        >
          {icon.value}
        </span>
      )

    default:
      // Exhaustive check: if a new IconKind is added, TypeScript errors here.
      return null
  }
}
