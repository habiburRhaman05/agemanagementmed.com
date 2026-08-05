import Link from 'next/link'

import type { Media } from '@/types/content'

export interface FitCheckCalloutProps {
  image: Media
  heading: string
  lead?: string
  points: string[]
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Live-site "Is Microdosing the Right Fit for You?" — `.photo-content-d.full-img`,
 * col-lg-6/col-lg-6, image first, with an inline CTA button. Ported 1:1 from
 * download/_glp-1-microdosing_female_.html; the styling lives in
 * src/app/legacy.css.
 */
export function FitCheckCallout({
  image,
  heading,
  lead,
  points,
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
}: FitCheckCalloutProps) {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            <div className="img lg-col-lg-6">
              <div
                className="img-box"
                style={{ backgroundImage: `url('${image.src}')` }}
                role="img"
                aria-label={image.alt}
              />
            </div>

            <div className="content lg-col-lg-6">
              <h2 className="lg-title">{heading}</h2>

              <div className="lg-text">
                {lead ? <p style={{ fontSize: 20 }}>{lead}</p> : null}

                <div className="lg-list-arrow-right">
                  <ul>
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
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
