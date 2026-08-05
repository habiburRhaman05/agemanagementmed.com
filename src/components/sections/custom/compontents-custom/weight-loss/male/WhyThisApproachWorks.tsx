/**
 * Live-site "Why This Approach Works" — the second `.photo-content-d.full-img`
 * on the page, col-lg-6/col-lg-6, image first. Ported 1:1 from
 * download/_concierge-medical-weight-loss_{female,male}.html (content is
 * identical on both); the styling lives in src/app/legacy.css.
 */

const focusPoints = [
  'Ongoing monitoring and adjustments',
  'Data driven decisions',
  'Long term sustainability',
  'Treating the root cause, not just symptoms',
]

const WhyThisApproachWorks: React.FC = () => {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            <div className="img lg-col-lg-6">
              <div
                className="img-box"
                style={{
                  backgroundImage:
                    "url('https://www.agemanagementmed.com/themes/default/assets/images/photo-content-69-img.jpg')",
                }}
                role="img"
                aria-label="Doctor consulting patient"
              />
            </div>

            <div className="content lg-col-lg-6">
              <h2 className="lg-title">Why This Approach Works</h2>

              <div className="lg-text">
                <p>We focus on:</p>

                <div className="lg-list-arrow-right">
                  <ul>
                    {focusPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p>This is how we help patients achieve results that last.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyThisApproachWorks
