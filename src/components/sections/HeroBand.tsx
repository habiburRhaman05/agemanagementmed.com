import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'

import { homeMedia } from '@/content/pages/home-media'

interface HeroBandProps {
  eyebrow?: string
  title: string
  body: string
  cta?: { label: string; href: string }
  backgroundImage?: string
  /** The source centres this band's copy on the homepage. */
  centered?: boolean
}

/**
 * The live site's `.hero-bg` statement band — a full-bleed photo behind an
 * eyebrow, heading, lead and pill CTA. Carries the homepage's "Who We Are"
 * block. Ported live-site CSS (see src/app/legacy.css).
 */
export function HeroBand({
  eyebrow,
  title,
  body,
  cta,
  backgroundImage = homeMedia.whoWeAreBackground,
  centered = true,
}: HeroBandProps) {
  return (
    <div
      className={`hero-bg${centered ? ' centered-content' : ''}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content">
            {eyebrow ? <h2 className="lg-top-title">{eyebrow}</h2> : null}
            <h3 className="lg-title">{title}</h3>

            <div className="lg-text lg-max-width-925">
              <p>{body}</p>
            </div>

            {cta ? (
              <div className="cta">
                <LegacyCtaLink
                  href={cta.href}
                  className="lg-btn lg-btn-arrow-right lg-btn-arrow-svg group"
                >
                  {cta.label}
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
                </LegacyCtaLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The live site's `#hero-p` strip — a flat teal gradient band carrying a
 * single centred statement.
 */
export function TealStatementStrip({ title }: { title: string }) {
  return (
    <div id="hero-p">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="content">
            <h2 className="lg-title">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
