import Link from 'next/link'

import { Media } from '@/types/content'

export interface JourneyStep {
  title: string
  body: string
  /** Optional — the photo sits inside the card next to the copy. */
  image?: Media
  url?: string
}

export interface JourneyCta {
  label: string
  href: string
}

export interface PatientJourneyProps {
  eyebrow?: string
  title: string
  lead?: string
  steps: JourneyStep[]
  cta?: JourneyCta
  background?: 'page' | 'alt' | 'raised'
}

/**
 * The live site's `#steps-d` block — a centered `.content-d` header above a
 * vertical stack of white cards, each with a circular photo overlapping its
 * left edge and a numbered mauve badge. Ported live-site CSS.
 */
export function PatientJourney({ eyebrow, title, lead, steps, cta }: PatientJourneyProps) {
  return (
    <>
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            {eyebrow ? <h2 className="lg-top-title">{eyebrow}</h2> : null}
            <h3 className="lg-title">{title}</h3>
            {lead ? (
              <div className="lg-text lg-max-width-800">
                <p>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lg-flexspace-60" />

      <div id="steps-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            {steps.map((step, index) => (
              <div className="step" key={step.title}>
                <div className="box">
                  {step.url ? (
                    <div className="img">
                      {/* Fixed 200px circular badge inside a ported layout —
                          matches the source markup exactly. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={step.url} alt={step.title} width={200} height={200} loading="lazy" />
                    </div>
                  ) : null}

                  <div className="content">
                    <div className="number">{index + 1}</div>

                    <h3 className="lg-title">{step.title}</h3>

                    <div className="lg-text">
                      <p>{step.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {cta ? (
              <div className="steps-cta">
                <Link href={cta.href} className="lg-btn lg-btn-arrow-right">
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
