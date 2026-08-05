import Link from 'next/link'

import { homeMedia } from '@/content/pages/home-media'
import type { ClosingCtaData } from '@/types/content'

interface ClosingCTAProps extends ClosingCtaData {
  /** Background photo for the band; defaults to the shared placeholder. */
  backgroundImage?: string
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
export function ClosingCTA({
  title,
  body,
  cta,
  note,
  backgroundImage = homeMedia.closingBackground,
  contentMaxWidth,
  centered = false,
}: ClosingCTAProps) {
  const contentStyle: React.CSSProperties = {
    ...(contentMaxWidth ? { maxWidth: contentMaxWidth } : null),
    ...(centered ? { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' } : null),
  }

  return (
    <div className="hero-bg" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content" style={contentStyle}>
            <h2 className="lg-title">{title}</h2>

            <div className="lg-text">
              <p>{body}</p>
            </div>

            <div className="cta" style={centered ? { display: 'flex', justifyContent: 'center' } : undefined}>
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
