'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import BookingModal from '@/components/shared/BookingModal'
import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'
import BookAppointmentButton from '../shared/BookAppointmentButton'

interface ClosingCTAProps extends ClosingCtaData {
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
  /** Background alignment for the band photo. */
  backgroundPosition?: string
  /** Extra class(es) added to the .hero-bg wrapper. */
  className?: string
  /** Small print under the CTA — e.g. the treatment pages' results disclaimer. */
  note?: string
  /** Caps the text column width (px) so the title wraps onto multiple lines instead of running the full container width. Opt-in — omit to keep the existing full-width behavior. */
  contentMaxWidth?: number
  /** Centers the text column (horizontally, within contentMaxWidth) and centers the title/body/CTA instead of the default left alignment. Opt-in — omit to keep the existing left-aligned behavior. */
  centered?: boolean
   textWidth?:string
  // titleWidth?:string
}

/**
 * The live site's closing `.hero-bg` band — a full-bleed photo behind a
 * left-aligned heading, lead and pill CTA. Ported live-site CSS.
 */
/** Booking CTAs open the shared modal instead of navigating — everything else (e.g. a link to a specific treatment page) stays a real `<Link>`. */
function isBookingHref(href: string) {
  return href === '/book-appointment'
}

export function ClosingCTA({
  title,
  body,
  cta,
  note,
  backgroundImage = homeMedia.closingBackground,
  backgroundPosition,
  className,
  contentMaxWidth,
  centered = false,
   textWidth,

}: ClosingCTAProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const contentStyle: React.CSSProperties = {
    ...(contentMaxWidth ? { maxWidth: contentMaxWidth } : null),
    ...(centered ? { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } : null),
  }

  return (
    <div
      className={`hero-bg${className ? ` ${className}` : ''}`}
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div 
     className="content text-center lg:text-left"
style={{ ...contentStyle, maxWidth: textWidth ? `${textWidth}px` : undefined }}
>
            <h2 className="lg-title">{title}</h2>

            <div className="lg-text !text-left">
              <p>{body}</p>
            </div>
<BookAppointmentButton>
  Schedule a consultation
</BookAppointmentButton>
            {/* <div className="cta" style={centered ? { display: 'flex', justifyContent: 'center' } : undefined}>
              {isBookingHref(cta.href) ? (
                <button type="button" onClick={() => setModalOpen(true)} className="lg-btn lg-btn-arrow-right">
                  {cta.label}
                </button>
              ) : (
                <Link href={cta.href} className="lg-btn lg-btn-arrow-right">
                  {cta.label}
                </Link>
              )}
            </div> */}

            {note ? (
              <div
                className="lg-text lg-max-width-825"
                style={{ marginBottom: 0, marginTop: 25 }}
              >
                <p style={{ fontSize: 16 }}>{note}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isBookingHref(cta.href) ? (
        <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} title="Schedule a Consultation" />
      ) : null}
    </div>
  )
}
