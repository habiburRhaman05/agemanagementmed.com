/**
 * Live-site `.group` band containing two `.photo-content-cu` rows — "Who
 * This Program Is For" and "Safety And Medical Considerations", the second
 * with the image on the right. Ported 1:1 from
 * download/_concierge-medical-weight-loss_male_.html (content is identical to
 * the female page); the styling lives in src/app/legacy.css.
 */

const WhoThisProgramIsFor: React.FC = () => {
  return (
    <div className="lg-group pb-10! md:pb-20!" style={{ backgroundColor: '#fff' }} >
      <div className="photo-content-cu">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              <div
                className="img lg-col-lg-5"
                style={{
                  backgroundImage:
                    "url('https://www.agemanagementmed.com/themes/default/assets/images/photo-content-67-img.jpg')",
                }}
                role="img"
                aria-label="A patient discussing their weight loss goals with a provider"
              />

              <div className="content lg-col-lg-7">
                <h2
                  className="lg-title text-[36px]! sm:text-[48px]!"
                  style={{ fontWeight: 500, letterSpacing: '-0.025em' }}
                >
                  Who This Program Is For
                </h2>

                <div className="lg-text">
                  <p style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>This program is a good fit if:</p>

                  <div className="lg-list-arrow-right">
                    <ul>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        You have tried diets without lasting results
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        You suspect hormones or metabolism are a factor
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        You want a medically guided approach
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        You prefer ongoing support and adjustments
                      </li>
                    </ul>
                  </div>

                  <p style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                    If you are searching for a{' '}
                    <a href="/our-experts">weight loss doctor in Savannah</a>, this program offers a
                    more personalized and informed approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-40" />

      <div className="photo-content-cu">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              <div
                className="img lg-col-lg-5 lg-order-lg-2"
                style={{
                  backgroundImage:
                    "url('https://www.agemanagementmed.com/themes/default/assets/images/photo-content-68-img.jpg')",
                }}
                role="img"
                aria-label="A provider reviewing a patient's measurements during a check-in"
              />

              <div className="content lg-col-lg-7 lg-order-lg-1">
                <h2
                  className="lg-title text-[36px]! sm:text-[48px]!"
                  style={{ maxWidth: 300, fontWeight: 500, letterSpacing: '-0.025em' }}
                >
                  Safety And Medical Considerations
                </h2>

                <div className="lg-text">
                  <p style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                    You may benefit from medical supervision if you:
                  </p>

                  <div className="lg-list-arrow-right">
                    <ul>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        Have a history of hormone imbalances
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        Are managing thyroid conditions
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        Have metabolic or blood sugar concerns
                      </li>
                      <li style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                        Are considering prescription weight loss medications
                      </li>
                    </ul>
                  </div>

                  <p style={{ fontSize: 16, fontWeight: 400, color: '#14214b' }}>
                    Your provider will review your health history and labs to make sure your plan is
                    appropriate and safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoThisProgramIsFor
