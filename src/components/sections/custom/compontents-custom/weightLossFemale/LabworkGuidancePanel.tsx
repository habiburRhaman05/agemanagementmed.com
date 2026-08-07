import type { ReactNode } from 'react'

import type { Media } from '@/types/content'

export interface LabworkGuidancePanelProps {
  image: Media
  heading: string
  boldStatement?: string
  paragraph: string
  columnALabel: string
  columnA: string[]
  columnBLabel: string
  columnB: string[]
  /** Closing paragraphs as nodes, so callers can embed real internal links. */
  closingParagraphs: ReactNode[]
}

/**
 * Live-site "How We Use Labwork to Guide Your Plan" — page-specific
 * full-bleed layout (not the shared `.photo-content-d.full-img` grid, which
 * caps at 1292px and splits 5/7 columns): full section width, content flush
 * to the left edge, image filling a true 50% column on the right. Ported
 * from download/_concierge-medical-weight-loss_female_.html; only used here
 * (see LabworkGuidancePanel usages), so safe to keep inline rather than a
 * separate component.
 */
export function LabworkGuidancePanel({
  image,
  heading,
  boldStatement,
  paragraph,
  columnALabel,
  columnA,
  columnBLabel,
  columnB,
  closingParagraphs,
}: LabworkGuidancePanelProps) {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-12">
      <div
        className="min-h-[360px] bg-cover   col-span-5"
        style={{ backgroundImage: `url('${image.src}')` }}
        role="img"
        aria-label={image.alt}
      />

      <div
        className="flex flex-col min-w-full justify-center  bg-[#14214B] px-6 py-12 sm:px-10 sm:py-16 lg:order-2 lg:py-20 col-span-7"
        style={{ paddingLeft: 125, paddingRight: 64 }}
      >
        <h2
          className="font-display  max-w-full text-[36px] text-white lg:text-[48px]"
          style={{ fontWeight: 600, lineHeight: 1.1, marginBottom: 30 }}
        >
          {heading}
        </h2>

        <div className="[&_li]:!text-white [&_p]:!text-white [&_strong]:!text-white">
          {boldStatement ? (
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
              <strong style={{ fontWeight: 600 }}>{boldStatement}</strong>
            </p>
          ) : null}

          <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>{paragraph}</p>

          <div className="lg-grid lg-gutter-x-24" style={{ marginBottom: 20 }}>
            <div className="lg-col-md-6">
              <div className="lg-list-arrow-right">
                <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>{columnALabel}</p>
                <ul>
                  {columnA.map((item) => (
                    <li key={item} style={{ fontSize: 16, fontWeight: 500 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg-col-md-6">
              <div className="lg-list-arrow-right">
                <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>{columnBLabel}</p>
                <ul>
                  {columnB.map((item) => (
                    <li key={item} style={{ fontSize: 16, fontWeight: 500 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {closingParagraphs.map((paragraphNode, index) => (
            <p key={index} style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
              {paragraphNode}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
