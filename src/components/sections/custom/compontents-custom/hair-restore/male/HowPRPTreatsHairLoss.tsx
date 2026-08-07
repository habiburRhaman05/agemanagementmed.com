import { prpIcons } from '../female/prp-icons'

/**
 * Live-site `#photo-content-c` + `.photo-content-d.blue-text.transparent`.
 * Ported 1:1 from download/_platelet-rich-plasma-hair_male_.html (content is
 * identical to the female page — only the two photos differ); the styling
 * lives in src/app/legacy.css.
 */

const heroPhoto =
  'https://res.cloudinary.com/khs2rcsr/image/upload/v1785306021/hair-treatment-image-male_dik98b.jpg'
const bestResultsPhoto =
  'https://res.cloudinary.com/khs2rcsr/image/upload/v1785599006/men-hair-restoration_krr29t.jpg'

const growthFactors = [
  'Stimulate dormant hair follicles',
  'Improve blood circulation to the scalp',
  'Strengthen existing hair strands',
  'Promote the growth of new, healthy hair',
]

/** Icon order matches the source markup's four candidate cards. */
const candidateItems = [
  { icon: prpIcons[0], label: 'Androgenetic alopecia (male/female pattern baldness)' },
  { icon: prpIcons[1], label: 'Thinning hair or reduced hair density' },
  { icon: prpIcons[2], label: 'Receding hairlines' },
  { icon: prpIcons[3], label: 'Crown thinning' },
]

const bestResults = [
  'Patients with hair loss in the last 2-5 years',
  'Balding patients with active hair follicles',
  'Individuals seeking natural, non-surgical solutions',
  'Patients who want to enhance hair transplant results',
]

const HowPRPTreatsHairLoss: React.FC = () => {
  return (
    <>
      <div className="lg-flexspace-100 !bg-white" />

      <div id="photo-content-c" className="!bg-white relative overflow-hidden">
        <div className="radial-gradient" aria-hidden />

        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="box">
              <div className="top lg-grid lg-gutter-x-0 lg-gutter-y-30">
                <div
                  className="img lg-col-lg-5 overflow-hidden"
                  style={{
                    backgroundImage: `url('${heroPhoto}')`,
                    backgroundPosition: '50% 70%',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                  role="img"
                  aria-label="Provider administering PRP treatment to a patient's scalp"
                />

                <div className="content lg-col-lg-7">
                  <h2 className="lg-title" style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
                    How Does PRP Treat Hair Loss?
                  </h2>

                  <div className="lg-text">
                    <p style={{ fontSize: 16, fontWeight: 400,  }}>
                      Platelet-Rich Plasma (PRP) therapy is a cutting-edge, non-surgical treatment
                      that uses your own blood&apos;s healing properties to stimulate hair growth.
                      During the procedure, we draw a small amount of your blood, process it to
                      concentrate the platelets that fuel regeneration, and inject the nutrient-rich
                      plasma directly into your scalp.
                    </p>

                    <div className="lg-list-arrow-right">
                      <h5 style={{ maxWidth: 400, fontSize: 16, fontWeight: 400,  }}>
                        These concentrated platelets contain powerful growth factors that:
                      </h5>
                      <ul>
                        {growthFactors.map((item) => (
                          <li key={item} style={{ fontSize: 16, fontWeight: 400,  }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="content lg-text-center">
                  <h2
                    className="lg-title lg-max-width-none"
                    style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}
                  >
                    Who Is a Candidate For PRP For Hair Loss?
                  </h2>

                  <div className="lg-text">
                    <p style={{ fontSize: 16, fontWeight: 400,  }}>
                      PRP hair treatment is ideal for both men and women experiencing hair loss. PRP
                      can be used for:
                    </p>
                  </div>
                </div>

                <div id="column-icon-d" className="lg-max-width-770">
                  <div className="lg-grid lg-gutter-y-24">
                    {candidateItems.map((item) => (
                      <div className="item lg-col-lg-6" key={item.label}>
                        <div
                          className="icon"
                          // Static, author-controlled markup copied from the source site.
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                        <div className="content">
                          <p style={{ fontSize: 16, fontWeight: 400,  }}>{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />

      <div className="photo-content-d blue-text transparent">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-items-center">
              <div className="img lg-col-lg-5">
                <div
                  className="img-box h-70 sm:h-90 lg:h-125"
                  style={{ backgroundImage: `url('${bestResultsPhoto}')` }}
                  role="img"
                  aria-label="Smiling patient after treatment"
                />
              </div>

              <div className="content lg-col-lg-7">
                <h2 className="lg-title" style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 500, letterSpacing: '-0.025em' }}>
                  Best Results Seen In:
                </h2>

                <div className="lg-text">
                  <div className="lg-list-arrow-right">
                    <ul>
                      {bestResults.map((item) => (
                        <li key={item} style={{ fontSize: 16, fontWeight: 400,  }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowPRPTreatsHairLoss
