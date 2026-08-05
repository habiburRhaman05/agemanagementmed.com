import Link from 'next/link'

import type { Media } from '@/types/content'

export interface TreatmentBenefitsIntroProps {
  darkCard: {
    image: Media
    heading: string
    paragraphs: string[]
  }
  lightCard: {
    image: Media
    heading: string
    benefits: string[]
    ctaLabel?: string
    ctaHref?: string
  }
}

/**
 * Live-site `#photo-content-c.style-2` — intro card (image + paragraphs)
 * stacked on a "Treatment Benefits" card (checklist + CTA), the bottom row's
 * image on the right at xl+. Ported 1:1 from
 * download/_shockwave-therapy_.html; the styling lives in src/app/legacy.css.
 */
export function TreatmentBenefitsIntro({ darkCard, lightCard }: TreatmentBenefitsIntroProps) {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div id="photo-content-c" className="style-2">
        <div className="radial-gradient" aria-hidden />

        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              <div className="top lg-grid">
                <div
                  className="img lg-col-xl-5"
                  style={{ backgroundImage: `url('${darkCard.image.src}')` }}
                  role="img"
                  aria-label={darkCard.image.alt}
                />

                <div className="content lg-col-xl-7">
                  <h2 className="lg-title">{darkCard.heading}</h2>

                  <div className="lg-text">
                    {darkCard.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="lg-grid">
                  <div
                    className="img lg-col-xl-6 lg-order-xl-2"
                    style={{ backgroundImage: `url('${lightCard.image.src}')` }}
                    role="img"
                    aria-label={lightCard.image.alt}
                  />

                  <div className="content lg-col-xl-6 lg-order-xl-1">
                    <h2 className="lg-title">{lightCard.heading}</h2>

                    <div className="lg-text">
                      <div className="lg-list-check-2">
                        <ul>
                          {lightCard.benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="cta">
                      <Link href={lightCard.ctaHref ?? '/book-appointment'} className="lg-btn lg-btn-arrow-right">
                        {lightCard.ctaLabel ?? 'Request a consultation'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
