import type { ReactNode } from 'react'

import type { Media } from '@/types/content'

export interface LabworkGuidancePanelProps {
  image: Media
  heading: string
  boldStatement?: string
  paragraph: string
  columnALabel: string
  columnA: string[]
  columnBLabel: string
  columnB: string[]
  /** Closing paragraphs as nodes, so callers can embed real internal links. */
  closingParagraphs: ReactNode[]
}

/**
 * Live-site "How We Use Labwork to Guide Your Plan" — `.photo-content-d.full-img`
 * with a two-column bullet comparison. Ported 1:1 from
 * download/_concierge-medical-weight-loss_female_.html; the styling lives in
 * src/app/legacy.css.
 */
export function LabworkGuidancePanel({
  image,
  heading,
  boldStatement,
  paragraph,
  columnALabel,
  columnA,
  columnBLabel,
  columnB,
  closingParagraphs,
}: LabworkGuidancePanelProps) {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            <div className="img lg-col-lg-5">
              <div
                className="img-box"
                style={{ backgroundImage: `url('${image.src}')` }}
                role="img"
                aria-label={image.alt}
              />
            </div>

            <div className="content lg-col-lg-7">
              <h2 className="lg-title lg-max-width-500">{heading}</h2>

              <div className="lg-text">
                {boldStatement ? (
                  <p style={{ fontSize: 20 }}>
                    <strong>{boldStatement}</strong>
                  </p>
                ) : null}

                <p style={{ fontSize: 20 }}>{paragraph}</p>

                <div className="lg-grid lg-gutter-x-24" style={{ marginBottom: 20 }}>
                  <div className="lg-col-md-6">
                    <div className="lg-list-arrow-right">
                      <p>{columnALabel}</p>
                      <ul>
                        {columnA.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg-col-md-6">
                    <div className="lg-list-arrow-right">
                      <p>{columnBLabel}</p>
                      <ul>
                        {columnB.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {closingParagraphs.map((paragraphNode, index) => (
                  <p key={index}>{paragraphNode}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
