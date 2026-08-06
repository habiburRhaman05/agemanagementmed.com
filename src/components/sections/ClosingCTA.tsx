import Link from 'next/link'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'

interface ClosingCTAProps extends ClosingCtaData {
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
  /** Background alignment for the band photo. */
  backgroundPosition?: string
  /** Extra class(es) added to the .hero-bg wrapper. */
  className?: string
  /** Small print under the CTA — e.g. the treatment pages' results disclaimer. */
  note?: string
}

/**
 * The live site's closing `.hero-bg` band — a full-bleed photo behind a
 * left-aligned heading, lead and pill CTA. Ported live-site CSS.
 */
export function ClosingCTA({
  title,
  body,
  cta,
  note,
  backgroundImage = homeMedia.closingBackground,
  backgroundPosition = 'center top',
  className,
}: ClosingCTAProps) {
  return (
    <div
      className={`hero-bg${className ? ` ${className}` : ''}`}
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content">
            <h2 className="lg-title">{title}</h2>

            <div className="lg-text">
              <p>{body}</p>
            </div>

            <div className="cta">
              <Link href={cta.href} className="lg-btn lg-btn-arrow-right">
                {cta.label}
              </Link>
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
