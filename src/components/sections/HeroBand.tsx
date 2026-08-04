import Link from 'next/link'

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
                <Link href={cta.href} className="lg-btn lg-btn-arrow-right">
                  {cta.label}
                </Link>
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
