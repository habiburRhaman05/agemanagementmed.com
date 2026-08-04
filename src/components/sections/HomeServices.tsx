import Link from 'next/link'

import { homeServices } from '@/content/pages/home-services'

interface HomeServicesProps {
  eyebrow: string
  title: string
  lead: string
}

/**
 * The live site's services block — a centered `.content-d` header followed by
 * the `#column-box-o` two-column card grid. Cards come from the static
 * `homeServices` list so this mirrors the live page exactly rather than
 * whatever the CMS happens to hold. Ported live-site CSS.
 */
export function HomeServices({ eyebrow, title, lead }: HomeServicesProps) {
  return (
    <>
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-top-title">{eyebrow}</h2>
            <h3 className="lg-title">{title}</h3>
            <div className="lg-text lg-max-width-800">
              <p>{lead}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-60" />

      <div id="column-box-o">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {homeServices.map((service) => (
                <div className="lg-col-lg-6" key={service.href}>
                  <div className="box">
                    <div className="img">
                      {/* Fixed 150px circular badge inside a ported layout —
                          matches the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        width={150}
                        height={150}
                        loading="lazy"
                      />
                    </div>

                    <div className="content">
                      <div className="top">
                        <h3
                          className={`lg-title${service.narrowTitle ? ' lg-max-width-300' : ''}`}
                        >
                          <Link href={service.href}>{service.title}</Link>
                        </h3>

                        {service.summary ? (
                          <div className="lg-text">
                            <p>{service.summary}</p>
                          </div>
                        ) : null}

                        <div className="lg-text">
                          <div className="lg-list-check two-col">
                            <ul>
                              {service.benefits.map((benefit) => (
                                <li key={benefit}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="cta">
                        <Link href={service.href} className="lg-link lg-link-arrow-right">
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
