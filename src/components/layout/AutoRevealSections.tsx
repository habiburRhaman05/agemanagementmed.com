'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'


// `<Header>` renders three sibling DOM nodes into `#main` — the bar itself
// plus the off-canvas `#mobile-nav` drawer and its `#mobile-nav-overlay` —
// not one. Treating "the first child of #main" as "the hero" (as this used
// to) is off by two: the real hero lands at index 3, gets wrongly armed
// with the `.reveal` (opacity: 0) class, and sits waiting on an
// IntersectionObserver that may never trip it (e.g. the homepage wraps its
// entire section list in one outer div, so "12% visible" of that single,
// page-length element rarely happens near the top) — the whole page reads
// as a blank/invisible screen. Filtering these out by id, rather than by
// position, keeps the skip-the-hero logic correct regardless of how many
// nodes the header contributes.
const HEADER_IDS = new Set(['header', 'mobile-nav', 'mobile-nav-overlay'])

export function AutoRevealSections() {
  const pathname = usePathname()

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    )

    const arm = (el: Element) => {
      el.classList.add('reveal')
      io.observe(el)
    }

    // Skip the header's own nodes, then skip the first real content child
    // (the hero) — it must paint immediately, not wait to scroll into view.
    Array.from(main.children)
      .filter((el) => !HEADER_IDS.has(el.id))
      .slice(1)
      .forEach(arm)

    // Sections streamed in later (Suspense boundaries resolving, client-side
    // swaps) land here too, so they don't just pop in unanimated.
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && node.parentElement === main && !HEADER_IDS.has(node.id)) {
            arm(node)
          }
        })
      }
    })
    mo.observe(main, { childList: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
