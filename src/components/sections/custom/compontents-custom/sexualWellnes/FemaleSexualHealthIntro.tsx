import Link from 'next/link'

import { sexualWellnessIcons } from './sexual-wellness-icons'

const symptoms = [
  'Vaginal dryness or discomfort',
  'Pain during intercourse',
  'Reduced sexual sensitivity',
  'Difficulty achieving orgasm',
  'Vaginal laxity after childbirth',
  'Mild urinary leakage or stress incontinence',
]

const features: { icon: string; title: string; body: string }[] = [
  {
    icon: sexualWellnessIcons.personalizedCare,
    title: 'Personalized Care',
    body: "Every woman's health journey is unique. We tailor treatments to your symptoms and goals.",
  },
  {
    icon: sexualWellnessIcons.regenerativeMedicine,
    title: 'Regenerative Medicine',
    body: "PRP uses your body's natural growth factors to enhance sensitivity and cellular repair.",
  },
  {
    icon: sexualWellnessIcons.tissueRestoration,
    title: 'Tissue Restoration',
    body: 'Our therapies stimulate collagen production and improve vaginal tissue health.',
  },
  {
    icon: sexualWellnessIcons.minimalDowntime,
    title: 'Minimal Downtime',
    body: 'Treatments are quick, discreet, and designed to fit into your lifestyle.',
  },
]

/**
 * The Sexual-Wellness-for-Women "Common Female Sexual Health Concerns" +
 * "Advanced Therapies For Female Sexual Health" combined block —
 * `#photo-content-c`. Ported 1:1 from
 * https://www.agemanagementmed.com/rejuvenation-enhancement/female/;
 * styling lives in src/app/legacy.css.
 */
export function FemaleSexualHealthIntro() {
  return (
    <div id="photo-content-c" style={{ backgroundColor: '#fff' }}>
      <div className="radial-gradient" aria-hidden />

      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="box">
            <div className="top lg-grid">
              <div className="img lg-col-xl-5" style={{ backgroundImage: "url('/images/photo-content-46-img.jpg')" }} role="img" aria-label="A woman sitting on her bed" />

              <div className="content lg-col-xl-7">
                <h2 className="lg-title lg-max-width-450">Common Female Sexual Health Concerns</h2>

                <div className="lg-text">
                  <p>
                    Many women experience physical changes that impact intimacy, comfort, and sexual satisfaction -
                    especially after childbirth or during menopause.
                  </p>
                  <p>
                    Our treatments address the underlying causes of these changes by restoring tissue health,
                    improving circulation, and enhancing sensitivity.
                  </p>

                  <h3
                    style={{
                      backgroundColor: '#fff',
                      color: '#14214B',
                      display: 'inline-block',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 15,
                      padding: '8px 10px',
                    }}
                  >
                    Common Symptoms Treated:
                  </h3>

                  <div className="lg-list-arrow-right">
                    <ul>
                      {symptoms.map((symptom) => (
                        <li key={symptom}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="content">
                <h2 className="lg-title lg-text-center" style={{ marginBottom: 20, maxWidth: 'none' }}>
                  Advanced Therapies For Female Sexual Health
                </h2>

                <div className="lg-text lg-text-center">
                  <p style={{ fontSize: 16 }}>
                    Our treatments focus on restoring the structural health of vaginal tissue while improving nerve
                    sensitivity and circulation.
                  </p>
                  <p style={{ fontSize: 16 }}>
                    By combining regenerative medicine with advanced laser technologies, we help women regain
                    comfort, confidence, and sexual wellness.
                  </p>
                </div>
              </div>

              <div id="column-icon-d">
                <div className="lg-grid">
                  {features.map((feature) => (
                    <div className="item lg-col-lg-6" key={feature.title}>
                      <div className="icon" dangerouslySetInnerHTML={{ __html: feature.icon }} />
                      <div className="content">
                        <p>
                          <strong>{feature.title}</strong> - {feature.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cta flex justify-center mt-10">
                <Link href="/book-appointment" className="lg-btn lg-btn-arrow-right uppercase">
                  SCHEDULE A CONSULTATION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
