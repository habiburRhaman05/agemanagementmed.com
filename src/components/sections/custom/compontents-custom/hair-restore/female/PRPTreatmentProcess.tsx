/**
 * Live-site `.group` band containing five `.photo-content-d.step` rows.
 * Ported 1:1 from download/_platelet-rich-plasma-hair_female_.html; the
 * styling lives in src/app/legacy.css.
 */

interface Step {
  number: number
  imageAlt: string
  title: string
  description: string
  url: string
}

const steps: Step[] = [
  {
    number: 1,
    imageAlt: "Provider examining a patient's scalp during a consultation",
    url: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-1-female_b95t44.jpg',
    title: 'Consultation & Assessment',
    description:
      'Our expert team evaluates your hair loss pattern, discusses your goals, and determines if PRP is right for you.',
  },
  {
    number: 2,
    imageAlt: "Clinician drawing blood from a patient's arm",
    title: 'Blood Draw',
    description: 'A small amount of blood (similar to routine lab work) is drawn from your arm.',
    url: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785304803/hair-treatment-step-2-female_u1mico.jpg',
  },
  {
    number: 3,
    imageAlt: 'Vial of blood being processed to concentrate platelets',
    title: 'Platelet Concentration',
    description:
      'Your blood is processed in a specialized centrifuge to separate and concentrate the platelets.',
    url: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-3-female_y7wzqe.jpg',
  },
  {
    number: 4,
    imageAlt: "Clinician preparing a patient's scalp for treatment",
    title: 'Scalp Preparation',
    description: 'The treatment area is cleansed and a topical numbing agent is applied for comfort.',
    url: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785304805/hair-treatment-step-4-female_wqfqfc.jpg',
  },
  {
    number: 5,
    imageAlt: "PRP being injected into a patient's scalp",
    title: 'PRP Injection',
    description:
      'The concentrated platelet-rich plasma is carefully injected into targeted areas of your scalp using fine needles.',
    url: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785304804/hair-treatment-step-5-female_awrdtf.jpg',
  },
]

const PRPTreatmentProcess: React.FC = () => {
  return (
    <>
      <div className="lg-flexspace-100" />

      {/* Source band colour: rgba(163, 195, 210, 0.5) */}
      <div className="lg-group" style={{ backgroundColor: 'rgba(163, 195, 210, 0.5)' }}>
        <div className="lg-flexspace-80" />

        <div className="lg-content-d" style={{ position: 'relative' }}>
          <div className="lg-max-width-1440">
            <div className="lg-container">
              <h3 className="lg-title" style={{ marginBottom: 0 }}>
                The PRP Hair Treatment Process
              </h3>
            </div>
          </div>
        </div>

        {steps.map((step, index) => (
          <div key={step.number}>
            {/* 50px under the heading, 40px between each step — as in the source. */}
            <div className={index === 0 ? 'lg-flexspace-50' : 'lg-flexspace-40'} />

            <div className="photo-content-d step" style={{ backgroundColor: 'transparent' }}>
              <div className="lg-max-width-1440">
                <div className="lg-container">
                  <div className="lg-grid">
                    <div className="img lg-col-lg-5">
                      <div
                        className="img-box"
                        style={{ backgroundImage: `url('${step.url}')` }}
                        role="img"
                        aria-label={step.imageAlt}
                      />
                    </div>

                    <div className="content lg-col-lg-7">
                      <div className="content-box">
                        <h2 className="lg-top-title">Step {step.number}</h2>
                        <h3 className="lg-title">{step.title}</h3>
                        <div className="lg-text">
                          <p>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="lg-flexspace-80" />

        <div className="lg-content-d" style={{ position: 'relative' }}>
          <div className="lg-max-width-1440">
            <div className="lg-container">
              <div className="lg-text">
                <p style={{ color: '#14214B' }}>
                  Treatment Time: <strong>60-90 minutes</strong>
                  <br />
                  Downtime: <strong>Minimal - return to normal activities immediately</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg-flexspace-80" />
      </div>
    </>
  )
}

export default PRPTreatmentProcess
