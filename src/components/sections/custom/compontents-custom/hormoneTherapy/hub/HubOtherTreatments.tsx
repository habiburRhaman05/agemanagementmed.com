import Link from 'next/link'

interface CrossSellCard {
  image: string
  alt: string
  title: string
  narrow?: boolean
  text: string
  href: string
}

const cards: CrossSellCard[] = [
  {
    image: '/themes/default/assets/images/column-box-5-img.png',
    alt: 'Muscle Pain',
    title: 'Platelet-Rich Plasma (PRP) therapy',
    narrow: true,
    text: "Accelerate healing and rejuvenation using your body's natural growth factors.",
    href: '/platelet-rich-plasma-therapy',
  },
  {
    image: '/themes/default/assets/images/column-box-3-img.png',
    alt: 'Muscle Pain',
    title: 'Sexual Performance Enhancement & Rejuvenation',
    text: 'Boost intimacy and confidence with non-invasive treatments tailored to your needs.',
    href: '/rejuvenation-enhancement',
  },
  {
    image: '/themes/default/assets/images/column-box-6-img.png',
    alt: 'Happy Couple',
    title: 'Concierge medical weight loss',
    narrow: true,
    text: 'Achieve sustainable results with expert guidance and personalized weight management plans.',
    href: '/concierge-medical-weight-loss',
  },
]

/**
 * BHRT hub page's "Explore Other Treatments We Offer" 3-card cross-sell
 * (`#column-box-o-2`). Ported 1:1 from
 * download/_bioidentical-hormone-replacement-therapy_.html; styling lives in
 * src/app/legacy.css. The 3 card images aren't migrated into this project's
 * public/ folder yet, so they reference the live site directly (same
 * un-migrated-asset convention already used for other legacy images
 * elsewhere in this codebase).
 */
export function HubOtherTreatments() {
  return (
    <>
      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-title">Explore Other Treatments We Offer</h2>

            <div className="lg-text lg-max-width-850">
              <p>
                We go beyond hormonal health to provide a wide range of treatments tailored to support your overall
                wellness, vitality, and confidence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-70" />

      <div id="column-box-o-2">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-justify-center">
              {cards.map((card) => (
                <div className="lg-col-md-6 lg-col-xl-4" key={card.title}>
                  <div className="box">
                    <div className="img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={card.image} alt={card.alt} width={95} height={95} loading="lazy" />
                    </div>

                    <div className="content">
                      <div className="top">
                        <h2 className={`lg-title${card.narrow ? ' lg-max-width-300' : ''}`}>{card.title}</h2>

                        <div className="lg-text">
                          <p>{card.text}</p>
                        </div>
                      </div>

                      <div className="cta">
                        <Link href={card.href} className="lg-link lg-link-arrow-right">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
