'use client'

import { useState } from 'react'
import Link from 'next/link'

import BookingModal from './BookingModal'

interface LegacyCtaLinkProps {
  href: string
  className?: string
  children: React.ReactNode
  modalTitle?: string
}

/** Booking CTAs open the shared modal instead of navigating — everything else stays a real `<Link>`. */
function isBookingHref(href: string) {
  return href === '/book-appointment'
}

/**
 * Drop-in replacement for a `<Link className="lg-btn lg-btn-arrow-right">`
 * (or any other pixel-matched legacy CTA styling) that needs to open the
 * shared booking modal instead of navigating, without changing its visual
 * markup at all. Non-booking hrefs render as a real `<Link>` unchanged.
 */
export function LegacyCtaLink({
  href,
  className,
  children,
  modalTitle = 'Schedule a Consultation',
}: LegacyCtaLinkProps) {
  const [open, setOpen] = useState(false)

  if (!isBookingHref(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} title={modalTitle} />
    </>
  )
}
