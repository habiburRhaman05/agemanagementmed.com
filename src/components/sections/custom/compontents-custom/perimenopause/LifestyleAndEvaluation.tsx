import type { ReactNode } from 'react'

import type { Media } from '@/types/content'

export interface LifestyleAndEvaluationProps {
  lifestylePanel: {
    image: Media
    heading: string
    paragraphs: string[]
  }
  evaluationPanel: {
    image: Media
    heading: string
    paragraphs: string[]
    bulletsLabel?: string
    bullets: string[]
    closingParagraphs?: ReactNode[]
  }
}

/**
 * Live-site "Why Lifestyle Changes Aren't Always Enough" (`.photo-content-d.content-right.black-text.transparent`)
 * followed by "How We Evaluate and Treat Menopausal Hormonal Imbalance"
 * (`.photo-content-d.full-img`, image on the right). Ported 1:1 from
 * download/_perimenopause-menopause_.html; the styling lives in
 * src/app/legacy.css.
 */
export function LifestyleAndEvaluation({ lifestylePanel, evaluationPanel }: LifestyleAndEvaluationProps) {
  return (
    <>
      <div className="photo-content-d content-right black-text transparent">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-items-center">
              <div className="img lg-col-lg-5">
                <div
                  className="img-box"
                  style={{ backgroundImage: `url('${lifestylePanel.image.src}')`, height: 500 }}
                  role="img"
                  aria-label={lifestylePanel.image.alt}
                />
              </div>

              <div className="content lg-col-lg-7">
                <h2 className="lg-title" style={{ color: '#0B2055' }}>
                  {lifestylePanel.heading}
                </h2>

                <div className="lg-text">
                  {lifestylePanel.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg-flexspace-100" />
      </div>

      <div className="photo-content-d full-img">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              <div className="img lg-col-lg-5 lg-order-lg-2">
                <div
                  className="img-box"
                  style={{ backgroundImage: `url('${evaluationPanel.image.src}')` }}
                  role="img"
                  aria-label={evaluationPanel.image.alt}
                />
              </div>

              <div className="content lg-col-lg-7 lg-order-lg-1">
                <h2 className="lg-title">{evaluationPanel.heading}</h2>

                <div className="lg-text">
                  {evaluationPanel.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {evaluationPanel.bulletsLabel ? <p>{evaluationPanel.bulletsLabel}</p> : null}

                  <div className="lg-list-arrow-right">
                    <ul>
                      {evaluationPanel.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  {evaluationPanel.closingParagraphs?.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
