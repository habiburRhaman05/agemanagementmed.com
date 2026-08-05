import { programIcons } from '../../shared/weight-loss-icons'

/**
 * Live-site "What's Included in the Program" — a `.content-d` heading
 * followed by two `.cards-i` icon grids (Included / May Be Additional).
 * Ported 1:1 from download/_concierge-medical-weight-loss_male_.html (content
 * is identical to the female page); the styling lives in src/app/legacy.css.
 */

/** Icon order matches the source markup's five "included" cards. */
const included = [
  { icon: programIcons[0], title: 'Initial consultation<br/>with a provider' },
  { icon: programIcons[1], title: 'Lab testing<br/>and review' },
  { icon: programIcons[2], title: 'Body composition<br/>scans' },
  { icon: programIcons[3], title: 'Personalized<br/>treatment plan' },
  { icon: programIcons[4], title: 'Ongoing follow up visits and adjustments' },
]

/** Icon order matches the source markup's three "additional" cards. */
const additional = [
  { icon: programIcons[5], title: 'Medications if<br/>prescribed' },
  { icon: programIcons[6], title: 'Advanced testing<br/>if needed' },
  { icon: programIcons[7], title: 'Supplements based on your plan' },
]

function GridCard({ item }: { item: { icon: string; title: string } }) {
  return (
    <div className="item lg-col-md-6 lg-col-lg-4 lg-col-xl-3">
      <div className="box">
        <div
          className="icon"
          // Static, author-controlled markup copied from the source site.
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
        <div className="lg-title" dangerouslySetInnerHTML={{ __html: item.title }} />
      </div>
    </div>
  )
}

const WhatsIncluded: React.FC = () => {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-title">What&apos;s Included in the Program</h2>
            <div className="lg-text">
              <p style={{ fontSize: 20 }}>We want you to know exactly what to expect.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div className="cards-i" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {included.map((item) => (
                <GridCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />

      <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-title" style={{ fontSize: 32, marginBottom: 0 }}>
              May Be Additional:
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-40" />

      <div className="cards-i" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {additional.map((item) => (
                <GridCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-40" />

      <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-text lg-text-center">
              <p>Your provider will walk you through everything so there are no surprises.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />
    </>
  )
}

export default WhatsIncluded
