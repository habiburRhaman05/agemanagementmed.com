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
                        <Link href={service.href} className="lg-link inline-flex items-center gap-2">
                          Learn more
                          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <circle cx="12.8086" cy="12.5662" r="12.5" fill="#519B98" />
                            <path d="M11.3516 7.5813L16.3364 12.5662L11.3516 17.551" stroke="white" />
                          </svg>
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
