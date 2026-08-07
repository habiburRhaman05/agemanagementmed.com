import type { Media } from '@/types/content'

export interface MeasureBadge {
  /** Raw SVG markup — see weight-loss-icons.ts. */
  icon: string
  label: string
}

export interface OverviewApproachCardsProps {
  darkCard: {
    image: Media
    heading: string
    lead: string
    focusLabel?: string
    focusItems: string[]
  }
  lightCard: {
    image: Media
    heading: string
    paragraph: string
    measuresLabel?: string
    measures: MeasureBadge[]
    closingParagraphs: string[]
  }
}

/**
 * Live-site `#photo-content-c.style-2` — approach card (image + 2-col focus
 * list) stacked on a body-composition card (content + pill measure badges +
 * image). Ported 1:1 from download/_concierge-medical-weight-loss_female_.html;
 * the styling lives in src/app/legacy.css.
 */
export function OverviewApproachCards({ darkCard, lightCard }: OverviewApproachCardsProps) {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div id="photo-content-c" className="style-2">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              <div className="top lg-grid lg-gutter-y-30">
                <div
                  className="img lg-col-xl-5"
                  style={{ backgroundImage: `url('${darkCard.image.src}')` }}
                  role="img"
                  aria-label={darkCard.image.alt}
                />

                <div className="content lg-col-xl-7">
                  <h2 className="lg-title lg-max-width-500">{darkCard.heading}</h2>

                  <div className="lg-text">
                    <p>{darkCard.lead}</p>

                    {darkCard.focusLabel ? (
                      <div className="lg-list-arrow-right two-col">
                        <h5>{darkCard.focusLabel}</h5>
                        <ul>
                          {darkCard.focusItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="lg-grid">
                  <div className="content lg-col-xl-7">
                    <h2 className="lg-title" style={{ maxWidth: 'none' }}>
                      {lightCard.heading}
                    </h2>

                    <div className="lg-text">
                      <p>{lightCard.paragraph}</p>

                      {lightCard.measuresLabel ? (
                        <>
                          <p>{lightCard.measuresLabel}</p>

                          <div className="lg-list-icon-2 two-col">
                            <ul>
                              {lightCard.measures.map((measure) => (
                                <li
                                  key={measure.label}
                                  // Static, author-controlled markup copied from the source site.
                                  dangerouslySetInnerHTML={{
                                    __html: `${measure.icon}${measure.label}`,
                                  }}
                                />
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : null}

                      {lightCard.closingParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div
                    className="img lg-col-xl-5"
                    style={{ backgroundImage: `url('${lightCard.image.src}')` }}
                    role="img"
                    aria-label={lightCard.image.alt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
