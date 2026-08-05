/**
 * Live-site `.group` band containing two `.photo-content-cu` rows — "Who
 * This Program Is For" and "Safety And Medical Considerations", the second
 * with the image on the right. Ported 1:1 from
 * download/_concierge-medical-weight-loss_male_.html (content is identical to
 * the female page); the styling lives in src/app/legacy.css.
 */

const WhoThisProgramIsFor: React.FC = () => {
  return (
    <div className="lg-group" style={{ backgroundColor: '#fff' }}>
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
                <h2 className="lg-title">Who This Program Is For</h2>

                <div className="lg-text">
                  <p>This program is a good fit if:</p>

                  <div className="lg-list-arrow-right">
                    <ul>
                      <li>You have tried diets without lasting results</li>
                      <li>You suspect hormones or metabolism are a factor</li>
                      <li>You want a medically guided approach</li>
                      <li>You prefer ongoing support and adjustments</li>
                    </ul>
                  </div>

                  <p>
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
                <h2 className="lg-title" style={{ maxWidth: 300 }}>
                  Safety And Medical Considerations
                </h2>

                <div className="lg-text">
                  <p>You may benefit from medical supervision if you:</p>

                  <div className="lg-list-arrow-right">
                    <ul>
                      <li>Have a history of hormone imbalances</li>
                      <li>Are managing thyroid conditions</li>
                      <li>Have metabolic or blood sugar concerns</li>
                      <li>Are considering prescription weight loss medications</li>
                    </ul>
                  </div>

                  <p>
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
