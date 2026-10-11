import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Default tailwind-merge doesn't know our custom font-size tokens
 * (text-body, text-label, text-display-*, text-title-*) and was treating
 * them as the same conflict group as text-color utilities — silently
 * dropping whichever of `text-ink-900` / `text-body` came first in a class
 * string. That was stripping text color off of every Button (color set by
 * `variant`, size set by `size`, merged in that order) — the invisible
 * button-text bug. This config tells it they're a distinct group.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display-xl',
        'text-display-lg',
        'text-display-md',
        'text-display-sm',
        'text-title-lg',
        'text-title-md',
        'text-body-lg',
        'text-body',
        'text-body-sm',
        'text-label',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A URL missing its scheme (e.g. an admin pastes "linkedin.com/in/jane"
 * instead of "https://linkedin.com/in/jane") is relative, not absolute —
 * `<a href>` resolves it against the *current* page, silently turning an
 * external social link into "oursite.com/linkedin.com/in/jane" instead of
 * actually leaving the site. This guarantees a real external link either way.
 */
export function ensureAbsoluteUrl(url: string): string {
  const trimmed = url.trim()
  return /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`
}
