export interface AestheticsPromoProps {
  title: string
  lead: string
  ctaLabel: string
  href: string
}

/**
 * The live site's `#hero-d` band — a gradient card holding the aesthetics
 * pitch on the left and a pink pill CTA on the right. Ported live-site CSS.
 */
export function AestheticsPromo({ title, lead, ctaLabel, href }: AestheticsPromoProps) {
  return (
    <div id="hero-d" className="mb-10 md:mb-15">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="box">
            <div className="content">
              <h2 className="lg-title">{title}</h2>

              <div className="lg-text">
                <p>{lead}</p>
              </div>
            </div>

            <div className="cta">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="lg-btn lg-btn-pink lg-btn-arrow-right"
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
