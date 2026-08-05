import Link from 'next/link'

interface MidPageCTAProps {
  backgroundImage: string
  backgroundPosition: string
  title: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  /** Content column: left/right (col-lg-6, weight-loss pages) or full-width (col-12, GLP-1 pages). */
  align?: 'left' | 'right' | 'full'
  /** Explicit override; defaults to true for 'left'/'full' (matches the source's per-page markup). */
  gradient?: boolean
}

/**
 * Live-site `.hero-bg` mid-page CTA band — a left-, right-, or full-width
 * content column over a full-bleed photo. Ported 1:1 from
 * download/_concierge-medical-weight-loss_{female,male}.html and
 * download/_glp-1-microdosing_{female,male}.html; the styling lives in
 * src/app/legacy.css.
 */
export function MidPageCTA({
  backgroundImage,
  backgroundPosition,
  title,
  body,
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
  align = 'left',
  gradient = align !== 'right',
}: MidPageCTAProps) {
  return (
    <div
      className="hero-bg"
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition }}
    >
      {gradient ? <div className="gradient" aria-hidden /> : null}

      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className={`lg-grid${align === 'right' ? ' lg-justify-end' : ''}`}>
            <div className={`content${align === 'full' ? '' : ' lg-col-lg-6'}`}>
              <div className="lg-title">{title}</div>

              <div className="lg-text">
                <p>{body}</p>
              </div>

              <div className="cta">
                <Link href={ctaHref} className="lg-btn lg-btn-arrow-right">
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
