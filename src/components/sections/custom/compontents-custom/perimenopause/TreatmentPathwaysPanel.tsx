import Link from 'next/link'

export interface TreatmentPathwayItem {
  /** Raw SVG markup — see perimenopause-icons.ts. */
  icon: string
  title: string
  href: string
}

export interface TreatmentPathwaysPanelProps {
  title: string
  lead?: string
  pathways: TreatmentPathwayItem[]
  ctaLabel?: string
}

/**
 * Live-site `.group.custom-group-3` — a dark navy box containing a
 * `.content-d` heading and a `.cards-i.style-2` grid of white "learn more"
 * mini-cards. Ported 1:1 from download/_perimenopause-menopause_.html; the
 * styling lives in src/app/legacy.css.
 */
export function TreatmentPathwaysPanel({
  title,
  lead,
  pathways,
  ctaLabel = 'Learn more',
}: TreatmentPathwaysPanelProps) {
  return (
    <div className="lg-group custom-group-3" style={{ background: '#fff' }}>
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="box">
            <div className="lg-content-d">
              <div className="content">
                <h2 className="lg-title lg-max-width-600" style={{ margin: '0 auto 30px' }}>
                  {title}
                </h2>

                {lead ? (
                  <div className="lg-text lg-max-width-600" style={{ margin: '0 auto' }}>
                    <p>{lead}</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div style={{ paddingTop: 40 }} />

            <div className="cards-i style-2">
              <div className="lg-grid lg-justify-center">
                {pathways.map((pathway) => (
                  <div className="item lg-col-md-6 lg-col-xl-4" key={pathway.title}>
                    <div className="box">
                      <div className="top">
                        <div
                          className="icon"
                          // Static, author-controlled markup copied from the source site.
                          dangerouslySetInnerHTML={{ __html: pathway.icon }}
                        />

                        <div className="lg-title">{pathway.title}</div>
                      </div>

                      <div className="cta">
                        <Link href={pathway.href} className="lg-link lg-link-arrow-right">
                          {ctaLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
