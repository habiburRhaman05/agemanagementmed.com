'use client'

import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

function extractHeadings(html: string): TocHeading[] {
  const matches = html.match(/<h[23][^>]*>(.*?)<\/h[23]>/g) || []
  return matches.map((heading) => {
    const level = heading.startsWith('<h3') ? 3 : 2
    const text = heading.replace(/<[^>]*>/g, '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return { id, text, level }
  })
}

/**
 * "On this page" nav — a connecting rail with an active-section indicator
 * (via IntersectionObserver) so readers can tell where they are in a long
 * article, not just a flat list of links.
 */
export function TableOfContents({ html }: { html: string }) {
  const headings = useMemo(() => extractHeadings(html), [html])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
        On this page
      </h3>
      <nav className="relative space-y-1 border-l border-gray-200">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-4 text-sm leading-snug transition-colors duration-150',
                heading.level === 3 && 'pl-7 text-[13px]',
                isActive
                  ? 'border-emerald-600 font-semibold text-emerald-700'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800',
              )}
            >
              {heading.text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
