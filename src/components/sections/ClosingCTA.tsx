import Link from 'next/link'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'

interface ClosingCTAProps extends ClosingCtaData {
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
}

/**
 * The live site's closing `.hero-bg` band — a full-bleed photo behind a
 * left-aligned heading, lead and pill CTA. Ported live-site CSS.
 */
export function ClosingCTA({
  title,
  body,
  cta,
  backgroundImage = homeMedia.closingBackground,
}: ClosingCTAProps) {
  return (
    <div className="hero-bg" style={{ backgroundImage: `url('${backgroundImage}')` }}>
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
          </div>
        </div>
      </div>
    </div>
  )
}
