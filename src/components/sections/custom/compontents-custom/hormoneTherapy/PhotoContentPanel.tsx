import type { ReactNode } from 'react'

import type { Media } from '@/types/content'

export interface PhotoContentPanelProps {
  image: Media
  /** 'right' pushes the image to the right column at lg+ (source's `order-lg-2`); 'left' leaves default DOM order. */
  imageSide?: 'left' | 'right'
  heading: string
  headingMaxWidth?: number
  paragraphs: ReactNode[]
  bg?: string
}

/**
 * The BHRT-for-Women Monitoring/Safety panels — `.photo-content-d.curve-img
 * .black-text.padding-0.padding-right` / `.padding-left`. Ported 1:1 from
 * https://www.agemanagementmed.com/bioidentical-hormone-replacement-therapy/female/
 * (distinct from the content-left/content-right variant used elsewhere);
 * styling lives in src/app/legacy.css.
 */
export function PhotoContentPanel({
  image,
  imageSide = 'left',
  heading,
  headingMaxWidth,
  paragraphs,
  bg,
}: PhotoContentPanelProps) {
  const isRight = imageSide === 'right'

  return (
    <div
      className={`photo-content-d black-text padding-0 ${isRight ? 'padding-right' : 'padding-left'}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid lg-items-center">
            <div className={`img lg-col-lg-6 lg-col-xl-5${isRight ? ' lg-order-lg-2' : ''}`}>
              <div
                className="img-box"
                style={{ backgroundImage: `url('${image.src}')`, backgroundPosition: 'center top' }}
                role="img"
                aria-label={image.alt}
              />
            </div>

            <div className={`content lg-col-lg-6 lg-col-xl-7${isRight ? ' lg-order-lg-1' : ''}`}>
              <h2 className={`lg-title${headingMaxWidth ? ` lg-max-width-${headingMaxWidth}` : ''}`} style={{ color: '#0B2055' }}>
                {heading}
              </h2>

              <div className="lg-text">
                {paragraphs.map((paragraph, index) => (
                  // Content is CMS-authored copy, not a dynamic list — index keys are stable here.
                  // eslint-disable-next-line react/no-array-index-key
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
