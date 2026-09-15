import { getImageProps } from 'next/image'
import Link from 'next/link'

import type { Award } from '@/types/content'

/**
 * Optimized (WebP, resized) src/srcSet for a badge, for use on a plain
 * `<img>`. The badges keep their own width/height attributes and legacy CSS,
 * so the rendered size stays exactly as before. Only the file sent changes;
 * several badge PNGs are ~40–975 KB at full size.
 */
function badgeSources(award: Award) {
  // 96 → 96px (1x) / 256px (2x) candidates. Badges are ~1:1, so even the 1x
  // file stays taller than the row's 80px max-height and renders at the same size.
  const { props } = getImageProps({ src: award.src, alt: award.alt, width: 96, height: 96 })
  return { src: props.src, srcSet: props.srcSet }
}

interface CredentialStripProps {
  /** Unused — kept for API compatibility with callers (see `foundingYear` below). */
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
  /** Short bold line under the lead copy naming the newest win specifically. */
  highlight?: string
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
  highlight,
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

              {highlight ? (
                <p className="!mt-5 font-semibold text-[#8FD6C4]">{highlight}</p>
              ) : null}

              <div className="award">
                <div className="lg-grid lg-items-center lg-justify-center">
                  {awards.map((award) => (
                    <div className="item" key={award.src}>
                      {/* Plain <img>: these are small fixed-size badges inside a
                          ported layout, matching the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        {...badgeSources(award)}
                        alt={award.alt}
                        width={84}
                        height={80}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <p>
                {ctaLabel} <Link href={ctaHref} className="text-white!">here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
