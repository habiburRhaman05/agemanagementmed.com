import Link from 'next/link'

export interface TreatmentOptionCard {
  image: string
  imageAlt: string
  title: string
  description: string
  bulletsLabel: string
  bullets: string[]
  cta?: { label: string; href: string }
  featured?: boolean
}

const treatments: TreatmentOptionCard[] = [
  {
    image: '/images/column-box-14-img.png',
    imageAlt: 'Rejuvenation Machine',
    title: 'Laser Vaginal Rejuvenation (CO2 Laser)',
    description:
      'Laser vaginal rejuvenation uses fractional CO2 laser energy to stimulate collagen production and restore the structure of vaginal tissue.',
    bulletsLabel: 'This treatment may help improve:',
    bullets: ['Vaginal dryness and thinning tissue', 'Vaginal laxity', 'Pain during intercourse', 'Mild stress urinary incontinence'],
    cta: { label: 'Learn more', href: '/laser-vaginal-therapy' },
    featured: true,
  },
  {
    image: '/images/column-box-12-img.png',
    imageAlt: 'Woman Happy',
    title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
    description: 'Hormonal fluctuations during perimenopause and menopause can impact libido, energy levels, and vaginal health.',
    bulletsLabel: 'BHRT may help:',
    bullets: ['Improve libido and sexual desire', 'Restore hormonal balance', 'Reduce vaginal dryness', 'Improve mood, sleep, and energy'],
  },
  {
    image: '/images/column-box-16-img.png',
    imageAlt: 'Fit Woman',
    title: 'PRP Therapy For Female Sexual Wellness',
    description: 'PRP therapy uses platelets from your own blood to stimulate cellular regeneration and nerve function in sensitive areas.',
    bulletsLabel: 'Benefits may include:',
    bullets: ['Improved sexual arousal and sensation', 'Enhanced orgasm quality', 'Increased sensitivity', 'Support for urinary control'],
  },
  {
    image: '/images/column-box-15-img.png',
    imageAlt: 'Woman Taking Supplement',
    title: 'Supplementation & Hormonal Support',
    description: 'Hormonal changes, stress, and lifestyle factors can all influence libido, arousal, and overall sexual wellness.',
    bulletsLabel: 'Treatment plans may include:',
    bullets: [
      'Hormone-supportive supplements for libido and vitality',
      'Prescription options that support female sexual health',
      'Nutritional protocols designed to support circulation and tissue health',
      'Complementary support alongside PRP or laser treatments',
    ],
  },
]

/**
 * The Sexual-Wellness-for-Women "Treatment Options" card stack —
 * `#column-box-d`. Ported 1:1 from
 * https://www.agemanagementmed.com/rejuvenation-enhancement/female/;
 * styling lives in src/app/legacy.css.
 */
export function TreatmentOptionsColumnBox() {
  return (
    <div id="column-box-d">
      <div className="radial-gradient" aria-hidden />

      <div className="lg-max-width-1440">
        <div className="lg-container">
          {treatments.map((card) => (
            <div className={`box${card.featured ? ' blue-bg' : ''}`} key={card.title}>
              <div className="img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.imageAlt} width={270} height={270} />
              </div>

              <div className="content">
                <h3 className={`lg-title${card.featured ? ' lg-white-txt' : ''}`}>{card.title}</h3>

                <div className={`lg-text${card.featured ? ' lg-white-txt' : ''}`}>
                  <p>{card.description}</p>

                  <div className="lg-list-arrow-right lg-two-col">
                    <h5
                      style={{
                        fontSize: 14,
                        letterSpacing: '1.4px',
                        marginBottom: 16,
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.bulletsLabel}
                    </h5>
                    <ul>
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  {card.cta ? (
                    <div className="cta">
                      <Link href={card.cta.href} className="lg-btn lg-btn-arrow-right">
                        {card.cta.label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
