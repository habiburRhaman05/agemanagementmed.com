import type { Media } from '@/types/content'

export interface OverviewBullet {
  title: string
  body: string
}

export interface OverviewIconItem {
  /** Raw SVG markup — see glp-icons.ts. */
  icon: string
  title: string
  body: string
}

export interface MetabolicOverviewCardsProps {
  darkCard: {
    image: Media
    heading: string
    paragraphs: string[]
    focusLabel?: string
    focusItems: OverviewBullet[]
  }
  lightCard: {
    image: Media
    heading: string
    paragraph: string
    icons: OverviewIconItem[]
    markersLabel?: string
    markers: string[]
  }
}

/**
 * Live-site `#photo-content-c.style-2` — approach card (image + arrow list)
 * stacked on a "Data-Driven Microdosing" card (image + top-icon feature list
 * + marker list), the bottom row's image on the right at xl+. Ported 1:1 from
 * download/_glp-1-microdosing_female_.html; the styling lives in
 * src/app/legacy.css.
 */
export function MetabolicOverviewCards({ darkCard, lightCard }: MetabolicOverviewCardsProps) {
  return (
    <div className="py-10 md:py-20">
      

      <div id="photo-content-c" className="style-2">
        <div className="radial-gradient" aria-hidden />

        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box overflow-hidden!">
              <div className="top lg-grid">
                <div
                  className="img lg-col-xl-5 overflow-hidden"
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

                    {darkCard.focusLabel ? (
                      <p style={{ fontSize: 20 }}>
                        <strong>{darkCard.focusLabel}</strong>
                      </p>
                    ) : null}

                    <div className="lg-list-arrow-right">
                      <ul>
                        {darkCard.focusItems.map((item) => (
                          <li key={item.title}>
                            <strong>{item.title}:</strong>
                            <br />
                            {item.body}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="lg-grid">
                  <div
                    className="img lg-col-xl-6 lg-order-xl-2 overflow-hidden"
                    style={{ backgroundImage: `url('${lightCard.image.src}')` }}
                    role="img"
                    aria-label={lightCard.image.alt}
                  />

                  <div className="content lg-col-xl-6 lg-order-xl-1">
                    <h2 className="lg-title">{lightCard.heading}</h2>

                    <div className="lg-text">
                      <p>{lightCard.paragraph}</p>

                      <div className="lg-list-icon top-icon" style={{ marginBottom: 20 }}>
                        <ul>
                          {lightCard.icons.map((item) => (
                            <li
                              key={item.title}
                              // Static, author-controlled markup copied from the source site.
                              dangerouslySetInnerHTML={{
                                __html: `${item.icon}<div><strong>${item.title}:</strong><br/>${item.body}</div>`,
                              }}
                            />
                          ))}
                        </ul>
                      </div>

                      {lightCard.markersLabel ? (
                        <p>
                          <strong>{lightCard.markersLabel}</strong>
                        </p>
                      ) : null}

                      <div className="lg-list-arrow-right">
                        <ul>
                          {lightCard.markers.map((marker) => (
                            <li key={marker}>{marker}</li>
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
    </div>
  )
}
