import type { Media } from '@/types/content'

export interface TextImagePanelProps {
  image: Media
  /** 'left' = image on the left, content on the right (source's `.content-right`). 'right' = reversed (source's `.content-left`, image pushed right via order). */
  imageSide?: 'left' | 'right'
  heading: string
  lead?: string
  items: string[]
}

/**
 * Live-site `.photo-content-d.content-right/.content-left.black-text.transparent`
 * — image + arrow-bullet checklist, used for "Why Women Choose SAMM" (image
 * left) and "What Patients Often Notice After Treatment" (image right).
 * Ported 1:1 from download/_perimenopause-menopause_.html; the styling
 * lives in src/app/legacy.css.
 */
export function TextImagePanel({ image, imageSide = 'left', heading, lead, items }: TextImagePanelProps) {
  const isRight = imageSide === 'right'

  return (
    <div className={`photo-content-d ${isRight ? 'content-left' : 'content-right'} black-text transparent`}>
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid lg-items-center">
            <div className={`img lg-col-lg-5${isRight ? ' lg-order-lg-2' : ''}`}>
              <div
                className="img-box"
                style={{ backgroundImage: `url('${image.src}')`, height: 500 }}
                role="img"
                aria-label={image.alt}
              />
            </div>

            <div className={`content lg-col-lg-7${isRight ? ' lg-order-lg-1' : ''}`}>
              <h2 className="lg-title" style={{ color: '#0B2055' }}>
                {heading}
              </h2>

              <div className="lg-text">
                {lead ? <p>{lead}</p> : null}

                <div className="lg-list-arrow-right">
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />
    </div>
  )
}
