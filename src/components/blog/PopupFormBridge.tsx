'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import BookingModal from '@/components/shared/BookingModal'

interface PopupFormBridgeProps {
  children: React.ReactNode
}

/**
 * Sitewide bridge for raw HTML content (blog articles, rendered via
 * `dangerouslySetInnerHTML`, so it has no React component boundary of its
 * own) — makes any embedded `<a class="btn-arrow-right" href="#popup-form">`
 * button open the same booking modal the hero CTA uses, instead of
 * navigating to a dead in-page anchor. Mounted once, wrapping the whole
 * site, so it works wherever that markup shows up — today that's blog
 * posts, but nothing here is blog-specific.
 *
 * The modal opens from local state, synchronously, in the click handler —
 * *not* by waiting on the URL to change and re-reading it. An earlier
 * version gated `open` on `useSearchParams()` after a `router.push`, which
 * meant the modal only appeared once that navigation round-tripped —
 * a real, noticeable delay compared to a plain `useState` toggle. The URL
 * is still kept in sync (via `router.replace`, non-blocking) purely so the
 * open modal survives a refresh and is shareable/back-button-friendly —
 * that part is decorative, not what makes the modal appear.
 */
export function PopupFormBridge({ children }: PopupFormBridgeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // Covers a direct/shared link landing with ?popup-form=true already set,
  // and the back button after closing (which removes the param).
  useEffect(() => {
    setOpen(searchParams.get('popup-form') === 'true')
  }, [searchParams])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a.btn-arrow-right[href="#popup-form"]')
      if (!target) return
      event.preventDefault()

      // Instant — the whole point. The URL sync below runs after, and never
      // gates this.
      setOpen(true)

      const params = new URLSearchParams(searchParams.toString())
      params.set('popup-form', 'true')
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
  }, [router, pathname, searchParams])

  function handleClose() {
    setOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('popup-form')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return (
    <div ref={containerRef}>
      {children}
      <BookingModal open={open} onClose={handleClose} title="Schedule A Consultation" />
    </div>
  )
}
