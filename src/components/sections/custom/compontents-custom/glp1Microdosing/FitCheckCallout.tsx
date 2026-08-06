import Link from 'next/link'

import type { Media } from '@/types/content'

export interface FitCheckCalloutProps {
  image: Media
  imagePosition?: string
  heading: string
  lead?: string
  points: string[]
  ctaLabel?: string
  ctaHref?: string
}

/**
 * "Is Microdosing the Right Fit for You?" — full-bleed `.photo-content-d.full-img`
 * with no container wrapper (image and copy both run edge to edge). Ported
 * 1:1 from https://www.agemanagementmed.com/glp-1-microdosing/female/;
 * styling lives in src/app/legacy.css.
 */
export function FitCheckCallout({
  image,
  imagePosition = '50% 25%',
  heading,
  lead,
  points,
  ctaLabel = 'Schedule a consultation',
  ctaHref = '/book-appointment',
}: FitCheckCalloutProps) {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-grid">
        <div className="img lg-col-lg-6">
          <div
            className="img-box"
            style={{ backgroundImage: `url('${image.src}')`, backgroundPosition: imagePosition }}
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
  )
}
