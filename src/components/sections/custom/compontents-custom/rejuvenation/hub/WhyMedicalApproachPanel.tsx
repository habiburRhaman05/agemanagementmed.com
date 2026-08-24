/**
 * Rejuvenation & Enhancement hub page's "Why a Medical Approach Matters"
 * panel (`.photo-content-d.full-img`). Ported 1:1 from
 * download/_rejuvenation-enhancement_.html; styling lives in
 * src/app/legacy.css (already ported — this is a pure-addition new file, not
 * a reuse of the male/female gendered components).
 */
export function WhyMedicalApproachPanel() {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-grid">
        <div className="img lg-col-lg-5">
          <div
            className="img-box"
            style={{ backgroundImage: "url('/themes/default/assets/images/photo-content-84-img.jpg')", backgroundPosition: '50% 25%' }}
            role="img"
            aria-label="A patient consulting with a provider"
          />
        </div>

        <div className="content lg-col-lg-7">
          <h2 className="lg-title">Why a Medical Approach Matters</h2>

          <div className="lg-text">
            <p>Many solutions on the market focus on quick fixes, but they do not address the root cause.</p>
            <p>We focus on:</p>

            <div className="lg-list-arrow-right">
              <ul>
                <li>Identifying What Is Actually Causing The Issue</li>
                <li>Using Data To Guide Treatment</li>
                <li>Adjusting Your Plan Over Time</li>
                <li>Supporting Long Term Results</li>
              </ul>
            </div>

            <p>This approach leads to better outcomes and more confidence.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
