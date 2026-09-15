'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import BookingModal from '@/components/shared/BookingModal'

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
 *
 * Deliberately does NOT wrap the page. It reads `useSearchParams()`, which
 * forces its Suspense boundary to render client-side; when it wrapped
 * `{children}`, React threw away the server-rendered page after hydration
 * and mounted the whole thing a second time. That doubled the rendering work
 * and re-created the hero image ~2.4 s into the load (the LCP "render
 * delay"). Listening on `document` instead means only the modal sits inside
 * the boundary.
 */
export function PopupFormBridge() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  // Covers a direct/shared link landing with ?popup-form=true already set,
  // and the back button after closing (which removes the param).
  useEffect(() => {
    setOpen(searchParams.get('popup-form') === 'true')
  }, [searchParams])

  useEffect(() => {
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

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router, pathname, searchParams])

  function handleClose() {
    setOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('popup-form')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return <BookingModal open={open} onClose={handleClose} title="Schedule A Consultation" />
}
