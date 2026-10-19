import Link from 'next/link'
import type { ReactNode } from 'react'

const LINK_CLASS = 'text-sage-600 underline underline-offset-2 hover:text-sage-700'
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

function isAllowedHref(href: string): boolean {
  if (/\s|[\u0000-\u001F\u007F]/.test(href)) return false
  if (href.startsWith('/') && !href.startsWith('//') && !href.includes('\\')) return true

  try {
    const url = new URL(href)
    return (
      url.protocol === 'https:' &&
      url.hostname === 'www.agemanagementmed.com' &&
      !url.username &&
      !url.password
    )
  } catch {
    return false
  }
}

function parseInlineLinks(text: string): Array<{ text: string; href?: string }> {
  const parts: Array<{ text: string; href?: string }> = []
  let lastIndex = 0

  for (const match of text.matchAll(LINK_PATTERN)) {
    const matchIndex = match.index ?? 0
    const [whole, label, href] = match
    if (matchIndex > lastIndex) parts.push({ text: text.slice(lastIndex, matchIndex) })

    if (isAllowedHref(href)) parts.push({ text: label, href })
    else parts.push({ text: whole })

    lastIndex = matchIndex + whole.length
  }

  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) })
  return parts.length ? parts : [{ text }]
}

/** Render only safe internal links from the limited `[label](href)` syntax. */
export function InlineLinks({ text }: { text: string }): ReactNode {
  return parseInlineLinks(text).map((part, index) =>
    part.href ? (
      <Link className={LINK_CLASS} href={part.href} key={`${index}-${part.href}`}>
        {part.text}
      </Link>
    ) : (
      part.text
    ),
  )
}

/** Keep schema and other plain-text consumers free of link syntax. */
export function stripInlineLinkSyntax(text: string): string {
  return parseInlineLinks(text).map((part) => part.text).join('')
}
