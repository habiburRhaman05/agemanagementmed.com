import Link from 'next/link'

/**
 * Live-site "How We Use Labwork to Guide Your Plan" — `.photo-content-d.full-img`
 * with a two-column bullet comparison. Ported 1:1 from
 * download/_concierge-medical-weight-loss_male_.html (content is identical to
 * the female page); the styling lives in src/app/legacy.css.
 */
export function LabworkGuidanceSection() {
  return (
    <div className="photo-content-d full-img">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            <div className="img lg-col-lg-5">
              <div
                className="img-box"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/khs2rcsr/image/upload/v1785339098/How_We_Use_Labwor_mzioxu.jpg')",
                }}
                role="img"
                aria-label="A physician greeting a patient during a weight loss consultation"
              />
            </div>

            <div className="content lg-col-lg-7">
              <h2 className="lg-title lg-max-width-500">How We Use Labwork to Guide Your Plan</h2>

              <div className="lg-text">
                <p style={{ fontSize: 20 }}>
                  <strong>We don&apos;t guess. We test.</strong>
                </p>
                <p style={{ fontSize: 20 }}>
                  Labwork helps us understand what&apos;s happening inside your body so we can build a
                  plan that actually works.
                </p>

                <div className="lg-grid lg-gutter-x-24" style={{ marginBottom: 20 }}>
                  <div className="lg-col-md-6">
                    <div className="lg-list-arrow-right">
                      <p>We may review markers related to:</p>
                      <ul>
                        <li>Metabolism and insulin function</li>
                        <li>Thyroid health</li>
                        <li>Hormone balance</li>
                        <li>Inflammation levels</li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg-col-md-6">
                    <div className="lg-list-arrow-right">
                      <p>These markers help explain things like:</p>
                      <ul>
                        <li>Why weight loss has stalled</li>
                        <li>Why you feel low energy</li>
                        <li>Why certain diets haven&apos;t worked</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p>
                  We review hormone balance and other factors that may impact weight. Learn more about
                  our <Link href="/bioidentical-hormone-replacement-therapy">BHRT Therapy</Link>{' '}
                  services, including{' '}
                  <Link href="/bioidentical-hormone-replacement-therapy/male">
                    Hormone Therapy for Men
                  </Link>{' '}
                  and{' '}
                  <Link href="/bioidentical-hormone-replacement-therapy/female">
                    Hormone Therapy for Women
                  </Link>
                  .
                </p>
                <p>From there, we build a plan based on your results and adjust it over time as your body responds.</p>
                <p>This is what makes lab-guided weight loss more precise and sustainable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
