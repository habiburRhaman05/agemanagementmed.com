import Link from 'next/link'

import type { Award } from '@/types/content'

interface CredentialStripProps {
  eyebrow?: string
  title: string
  lead?: string | string[]
  /** Year the practice was founded — kept for API compatibility with callers. */
  foundingYear?: string
  ctaLabel?: string
  ctaHref?: string
  awards: Award[]
  background?: 'page' | 'alt' | 'raised'
  /** Optional photo behind the band; defaults to the solid navy of the live site. */
  backgroundImage?: string
}

/**
 * The live site's `#awards-b` band — a photo-backed rounded card carrying the
 * founding story, a white pill of award badges, and a closing link.
 * Styling is the ported live-site CSS (see src/app/legacy.css).
 */
export function CredentialStrip({
  title,
  lead,
  ctaLabel = 'Learn more about Dr. Collins and our team of experts',
  ctaHref = '/our-experts',
  awards,
  backgroundImage,
}: CredentialStripProps) {
  return (
    <div id="awards-b">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div
            className="box"
            style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
          >
            <h2 className="lg-title lg-font-size-48 lg-white-txt">{title}</h2>

            <div className="lg-text lg-white-txt">
              {(Array.isArray(lead) ? lead : lead ? [lead] : []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="award">
                <div className="lg-grid lg-items-center lg-justify-center">
                  {awards.map((award) => (
                    <div className="item" key={award.src}>
                      {/* Plain <img>: these are small fixed-size badges inside a
                          ported layout, matching the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={award.src} alt={award.alt} width={79} height={76} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              <p>
                {ctaLabel} <Link href={ctaHref}>here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
