import { prpIcons } from '../female/prp-icons'

/**
 * Live-site "Results & Timeline" (`#column-box-i-2`) and "Benefits of PRP Hair
 * Therapy" (`#content-box-d`) bands, each preceded by a `.content-d` heading.
 * Ported 1:1 from download/_platelet-rich-plasma-hair_male_.html (content is
 * identical to the female page); the styling lives in src/app/legacy.css.
 */

interface TimelineCard {
  icon: string
  title: string
  body: React.ReactNode
}

/** Icon order matches the source markup's three result cards. */
const timelineCards: TimelineCard[] = [
  {
    icon: prpIcons[4],
    title: 'Immediate Effects',
    body: (
      <div className="list">
        <ul>
          <li style={{ fontSize: 16, fontWeight: 400, }}>Minimal discomfort during treatment</li>
          <li style={{ fontSize: 16, fontWeight: 400, }}>Slight scalp tenderness for 24-48 hours</li>
          <li style={{ fontSize: 16, fontWeight: 400, }}>No significant downtime required</li>
        </ul>
      </div>
    ),
  },
  {
    icon: prpIcons[5],
    title: 'Progressive Results',
    body: (
      <>
        <p style={{ fontSize: 16, fontWeight: 400,  }}>
          <strong>2-3 months:</strong>
          <br />
          Initial signs of improved hair quality
        </p>
        <p style={{ fontSize: 16, fontWeight: 400,  }}>
          <strong>4-6 months:</strong>
          <br />
          Noticeable increase in hair thickness &amp; density
        </p>
        <p style={{ fontSize: 16, fontWeight: 400,  }}>
          <strong>6-12 months:</strong>
          <br />
          Optimal results with continued improvement
        </p>
      </>
    ),
  },
  {
    icon: prpIcons[6],
    title: 'Maintenance',
    body: (
      <>
        <p style={{ fontSize: 16, fontWeight: 400, }}>
          <strong>Initial series:</strong>
          <br />
          3-4 treatments spaced 4-6 weeks apart
        </p>
        <p style={{ fontSize: 16, fontWeight: 400, }}>
          <strong>Maintenance:</strong>
          <br />
          1-2 treatments annually
        </p>
      </>
    ),
  },
]

const benefitCards = [
  {
    title: 'Natural & Safe',
    bullets: [
      'Uses your own blood - no risk of allergic reactions',
      'No synthetic chemicals or foreign substances',
      'FDA-cleared procedure',
    ],
  },
  {
    title: 'Minimally Invasive',
    bullets: [
      'No surgery required',
      'Quick, in-office procedure',
      'Immediate return to daily activities',
    ],
  },
  {
    title: 'Proven Results',
    bullets: [
      'Clinically demonstrated hair growth improvement',
      'Increases hair density and thickness',
      'Strengthens existing hair follicles',
    ],
  },
  {
    title: 'Versatile Treatment',
    bullets: [
      'Effective for both men and women',
      'Can be combined with other hair loss treatments',
      'Enhances hair transplant outcomes',
    ],
  },
]

const ResultsAndTimeline: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div className="lg-flexspace-100" />

      <div className="lg-content-d" style={{ position: 'relative' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-top-title">What to Expect</h2>
            <h3
              className="lg-title"
              style={{ marginBottom: 0, fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}
            >
              Results &amp; Timeline
            </h3>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div id="column-box-i-2">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-gutter-y-24 lg-justify-center">
              {timelineCards.map((card) => (
                <div className="lg-col-md-6 lg-col-lg-4" key={card.title}>
                  <div className="box">
                    <div
                      className="icon"
                      // Static, author-controlled markup copied from the source site.
                      dangerouslySetInnerHTML={{ __html: card.icon }}
                    />
                    <h2
                      className="lg-title"
                      style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}
                    >
                      {card.title}
                    </h2>
                    <div className="lg-text">{card.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />

      <div className="lg-content-d" style={{ position: 'relative' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2
              className="lg-title"
              style={{
                marginBottom: 0,
                textTransform: 'none',
                fontSize: 'clamp(28px, 6vw, 48px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
              }}
            >
              Benefits of PRP Hair Therapy
            </h2>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div id="content-box-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-gutter-y-24">
              {benefitCards.map((card) => (
                <div className="lg-col-md-6" key={card.title}>
                  <div className="box">
                    <h3
                      className="lg-title"
                      style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}
                    >
                      {card.title}
                    </h3>
                    <div className="lg-text">
                      <div className="lg-list-arrow-right">
                        <ul>
                          {card.bullets.map((bullet) => (
                            <li key={bullet} style={{ fontSize: 16, fontWeight: 400, }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />
    </div>
  )
}

export default ResultsAndTimeline
