'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'


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

    // Skip the first child (hero) — it must paint immediately, not wait to scroll into view.
    Array.from(main.children)
      .slice(1)
      .forEach(arm)

    // Sections streamed in later (Suspense boundaries resolving, client-side
    // swaps) land here too, so they don't just pop in unanimated.
    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && node.parentElement === main && node !== main.children[0]) {
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
