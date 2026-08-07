import Link from 'next/link'

import type { Media } from '@/types/content'

export interface ProgramFitCard {
  image: Media
  imageSide?: 'left' | 'right'
  heading: string
  lead: string
  bulletsLabel?: string
  bullets: string[]
  note?: {
    prefix: string
    linkLabel: string
    linkHref: string
    suffix: string
  }
  closingText?: string
}

export interface ProgramFitCardsProps {
  fitCard: ProgramFitCard
  safetyCard: ProgramFitCard
}

function FitCard({ card }: { card: ProgramFitCard }) {
  const imageSide = card.imageSide ?? 'left'

  const imageBlock = (
    <div
      className={`img lg-col-lg-5${imageSide === 'right' ? ' lg-order-lg-2' : ''}`}
      style={{ backgroundImage: `url('${card.image.src}')` }}
      role="img"
      aria-label={card.image.alt}
    />
  )

  const contentBlock = (
    <div className={`content lg-col-lg-7${imageSide === 'right' ? ' lg-order-lg-1' : ''}`}>
      <h2 className="lg-title">{card.heading}</h2>

      <div className="lg-text">
        <p>{card.lead}</p>

        {card.bulletsLabel ? <p>{card.bulletsLabel}</p> : null}

        <div className="lg-list-arrow-right">
          <ul>
            {card.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        {card.note ? (
          <p>
            {card.note.prefix}{' '}
            <Link href={card.note.linkHref}>{card.note.linkLabel}</Link> {card.note.suffix}
          </p>
        ) : null}

        {card.closingText ? <p>{card.closingText}</p> : null}
      </div>
    </div>
  )

  return (
    <div className="photo-content-cu">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            {imageBlock}
            {contentBlock}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Live-site `.group` band containing two `.photo-content-cu` rows — "Who
 * This Program Is For" and "Safety And Medical Considerations", the second
 * with the image on the right. Ported 1:1 from
 * download/_concierge-medical-weight-loss_female_.html; the styling lives in
 * src/app/legacy.css.
 */
export function ProgramFitCards({ fitCard, safetyCard }: ProgramFitCardsProps) {
  return (
    <div className="lg-group" style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <FitCard card={{ ...fitCard, imageSide: fitCard.imageSide ?? 'left' }} />
      <div className="lg-flexspace-40" />
      <FitCard card={{ ...safetyCard, imageSide: safetyCard.imageSide ?? 'right' }} />
      <div className="lg-flexspace-100" style={{ backgroundColor: '#fff' }} />
    </div>
  )
}
