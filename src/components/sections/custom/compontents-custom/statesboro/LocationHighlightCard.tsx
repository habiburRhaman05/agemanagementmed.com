import { toTelHref } from '@/lib/contact'
import type { Location } from '@/types/content'

export interface LocationHighlightCardProps {
  title: string
  location: Location
  phone: string
}

/**
 * Live-site `#contact-m` — a dark navy card pulled up over the hero, info
 * on one side and a map on the other. The source uses an interactive
 * Mapbox map here; per the client's direction this uses the same Google
 * Maps iframe embed as the Contact page instead (no Mapbox key in this
 * project). Ported 1:1 from download/_statesboro_.html; the styling lives
 * in src/app/legacy.css.
 */
export function LocationHighlightCard({ title, location, phone }: LocationHighlightCardProps) {
  return (
    <>
      <div className="lg-flexspace-neg120" />

      <div id="contact-m">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              <div className="content">
                <h2 className="lg-title">{title}</h2>

                <div className="info">
                  <ul>
                    <li>
                      {location.addressLine}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </li>
                    <li>
                      <ul>
                        {location.hours.map((h) => (
                          <li key={h.days}>
                            <span>{h.days}:</span>
                            <span>{h.time}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="cta">
                  <a href={toTelHref(phone)} className="lg-btn lg-btn-arrow-right">
                    Call: {phone}
                  </a>
                </div>
              </div>

              <div className="map">
                <iframe
                  src={location.mapEmbedUrl}
                  title={`Map of ${location.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
