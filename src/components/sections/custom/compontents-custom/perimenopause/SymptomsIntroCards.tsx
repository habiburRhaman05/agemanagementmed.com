import Link from 'next/link'

import type { Media } from '@/types/content'

export interface SymptomsIntroCardsProps {
  darkCard: {
    image: Media
    heading: string
    paragraphs: string[]
    ctaLabel?: string
    ctaHref?: string
  }
  lightCard: {
    image: Media
    heading: string
    paragraphs: string[]
    bulletsLabel?: string
    bullets: string[]
  }
}

/**
 * Live-site `#photo-content-c.style-2` — intro card (image + paragraphs +
 * CTA) stacked on a "Common Symptoms" card (image + paragraphs + arrow
 * list), the bottom row's image on the right at xl+. Ported 1:1 from
 * download/_perimenopause-menopause_.html; the styling lives in
 * src/app/legacy.css.
 */
export function SymptomsIntroCards({ darkCard, lightCard }: SymptomsIntroCardsProps) {
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

                  <div className="cta">
                    <Link href={darkCard.ctaHref ?? '/book-appointment'} className="lg-btn lg-btn-arrow-right">
                      {darkCard.ctaLabel ?? 'Schedule a consultation'}
                    </Link>
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
                      {lightCard.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {lightCard.bulletsLabel ? (
                        <p>
                          <strong style={{ fontSize: 20 }}>{lightCard.bulletsLabel}</strong>
                        </p>
                      ) : null}

                      <div className="lg-list-arrow-right">
                        <ul>
                          {lightCard.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
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
