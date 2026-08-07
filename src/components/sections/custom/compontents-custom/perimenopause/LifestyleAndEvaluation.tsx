import type { ReactNode } from 'react'

import type { Media } from '@/types/content'

export interface LifestyleAndEvaluationProps {
  lifestylePanel: {
    image: Media
    heading: string
    paragraphs: string[]
  }
  evaluationPanel: {
    image: Media
    heading: string
    paragraphs: string[]
    bulletsLabel?: string
    bullets: string[]
    closingParagraphs?: ReactNode[]
  }
}

/**
 * Live-site "Why Lifestyle Changes Aren't Always Enough" (`.photo-content-d.content-right.black-text.transparent`)
 * followed by "How We Evaluate and Treat Menopausal Hormonal Imbalance"
 * (`.photo-content-d.full-img`, image on the right). Ported 1:1 from
 * download/_perimenopause-menopause_.html; the styling lives in
 * src/app/legacy.css.
 */
export function LifestyleAndEvaluation({ lifestylePanel, evaluationPanel }: LifestyleAndEvaluationProps) {
  return (
    <>
      <div className="photo-content-d content-right black-text transparent pt-10 pb-5">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-items-center">
              <div className="img lg-col-lg-5">
                <div
                  className="img-box"
                  style={{ backgroundImage: `url('${lifestylePanel.image.src}')`, height: 500 }}
                  role="img"
                  aria-label={lifestylePanel.image.alt}
                />
              </div>

              <div className="content lg-col-lg-7">
                <h2 className="lg-title" style={{ color: '#0B2055' }}>
                  {lifestylePanel.heading}
                </h2>

                <div className="lg-text">
                  {lifestylePanel.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg-flexspace-100" />
      </div>

      {/* Evaluation panel — page-specific full-bleed layout (not the shared
          `.photo-content-d.full-img` grid, which caps at 1292px and splits
          5/7 columns): full section width, content flush to the left edge,
          image filling a true 50% column on the right. See the reference UI
          this was built to match. Only used here — safe to keep inline
          rather than a separate component. */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-12">
        <div
          className="flex col-span-7  flex-col justify-center bg-[#14214B]   px-6 py-12 sm:pl-10  sm:py-16 lg:py-20"
          style={{ paddingLeft: 125, paddingRight: 64 }}
        >
          <h1 className="lg-title text-[36px] sm:text-[48px] min-w-full" style={{ color: '#fff', maxWidth: 560 }}>
            {evaluationPanel.heading}
          </h1>

          <div
            className="lg-text [&_li]:!text-white [&_p]:!text-white [&_strong]:!text-white min-w-full"
            style={{ maxWidth: 560 }}
          >
            {evaluationPanel.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {evaluationPanel.bulletsLabel ? <p className='min-w-full text-[16px]'>{evaluationPanel.bulletsLabel}</p> : null}

            <div className="lg-list-arrow-right">
              <ul>
                {evaluationPanel.bullets.map((bullet) => (
                  <li key={bullet} className='text-[16px]'>{bullet}</li>
                ))}
              </ul>
            </div>

            {evaluationPanel.closingParagraphs?.map((paragraph, index) => (
              <p key={index} className='min-w-full text-[16px] mt-3'>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className="min-h-[360px] col-span-5 bg-cover bg-center lg:min-h-full"
          style={{ backgroundImage: `url('${evaluationPanel.image.src}')` }}
          role="img"
          aria-label={evaluationPanel.image.alt}
        />
      </div>
    </>
  )
}
