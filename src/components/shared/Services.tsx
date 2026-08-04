import Link from 'next/link'

import { Audience, Media, Pillar } from '@/types/content'

export interface TreatmentSummary {
  slug: string
  href: string
  pillar: Pillar
  audience: Audience
  name: string
  shortName: string
  summary: string
  cardImage: Media
  cardBenefits: string[]
}

interface ServicesProps {
  eyebrow?: string
  title: string
  lead?: string
  treatments: TreatmentSummary[]
  background?: 'page' | 'alt' | 'raised'
  visibleCount?: number
  viewAllHref?: string
  align?: 'center' | 'left'
}

/**
 * The live site's services block — a centered `.content-d` header followed by
 * the `#column-box-o` two-column card grid, where each card carries a circular
 * image overlapping its left edge, a linked title, a two-column check list and
 * a "Learn more" arrow link. Styling is the ported live-site CSS.
 */
export function Services({
  eyebrow,
  title,
  lead,
  treatments,
  visibleCount = 6,
}: ServicesProps) {
  const visible = treatments.slice(0, visibleCount)

  return (
    <>
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            {eyebrow ? <h2 className="lg-top-title">{eyebrow}</h2> : null}
            <h3 className="lg-title">{title}</h3>
            {lead ? (
              <div className="lg-text lg-max-width-800">
                <p>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lg-flexspace-60" />

      <div id="column-box-o">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {visible.map((treatment) => (
                <div className="lg-col-lg-6" key={treatment.slug}>
                  <div className="box">
                    <div className="img">
                      {/* Fixed 150px circular badge inside a ported layout —
                          matches the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={treatment.cardImage.src}
                        alt={treatment.cardImage.alt}
                        width={150}
                        height={150}
                        loading="lazy"
                      />
                    </div>

                    <div className="content">
                      <div className="top">
                        <h3 className="lg-title">
                          <Link href={treatment.href}>{treatment.name}</Link>
                        </h3>

                        <div className="lg-text">
                          {treatment.cardBenefits.length ? (
                            <div className="lg-list-check two-col">
                              <ul>
                                {treatment.cardBenefits.map((benefit) => (
                                  <li key={benefit}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p>{treatment.summary}</p>
                          )}
                        </div>
                      </div>

                      <div className="cta">
                        <Link href={treatment.href} className="lg-link lg-link-arrow-right">
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
