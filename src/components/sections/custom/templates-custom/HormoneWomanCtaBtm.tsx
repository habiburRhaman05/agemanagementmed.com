import Link from 'next/link'
import type { CSSProperties } from 'react'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { MoveRight } from 'lucide-react'
import { BookingForm } from '@/components/shared/BookingForm'
import BookAppointmentButton from '@/components/shared/BookAppointmentButton'

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
}

/**
 * The live site's closing `.hero-bg` band — a full-bleed photo behind a
 * left-aligned heading, lead and pill CTA. Ported live-site CSS.
 */
export function HormoneWomanCtaBtm({
  title,
  body,
  cta,
  note,
  backgroundImage = homeMedia.closingBackground,
  backgroundPosition,
  className,
  contentMaxWidth,
  centered = false,
}: ClosingCTAProps) {
  const contentStyle: CSSProperties = {
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
          <div className="content text-center lg:text-left" style={contentStyle}>
            <h2 className="lg-title">{title}</h2>

            <div className="lg-text max-w-[500px]">
              <p>{body}</p>
            </div>

            <div
              className="cta flex justify-center lg:justify-start"
              style={centered ? { display: 'flex', justifyContent: 'center' } : undefined}
            >
           <BookAppointmentButton>
             Schedule consultation
           </BookAppointmentButton>
            </div>

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
    </div>
  )
}
