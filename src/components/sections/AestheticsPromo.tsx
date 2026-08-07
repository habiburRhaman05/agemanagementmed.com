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
                className="lg-btn lg-btn-pink lg-btn-arrow-right lg-btn-arrow-svg group whitespace-nowrap"
              >
                {ctaLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  className="absolute right-[25px] top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-x-2"
                >
                  <path
                    d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
