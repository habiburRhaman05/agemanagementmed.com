import { measureIcons } from '../../shared/weight-loss-icons'
import { LabworkGuidanceBand } from './LabworkGuidanceBand'
import { MidPageCTA } from '../../shared/MidPageCTA'

/**
 * Live-site `#photo-content-c.style-2` — approach card (image + 2-col focus
 * list) stacked on a body-composition card (content + pill measure badges +
 * image). Ported 1:1 from download/_concierge-medical-weight-loss_male_.html
 * (content is identical to the female page — only the two photos differ);
 * the styling lives in src/app/legacy.css.
 */

const approachPhoto = 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-64-img.jpg'
const bodyCompPhoto = 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-65-img.jpg'

const focusItems = [
  'Understanding why weight gain is happening',
  'Identifying metabolic and hormonal factors',
  'Creating a plan based on your body',
  'Adjusting as your body changes',
]

/** Order matches the source markup: Body Fat %, Muscle Mass, Visceral Fat, Water Balance. */
const measures = [
  { icon: measureIcons[0], label: 'Body Fat Percentage' },
  { icon: measureIcons[1], label: 'Muscle Mass' },
  { icon: measureIcons[2], label: 'Visceral Fat' },
  { icon: measureIcons[3], label: 'Water Balance' },
]

const PersonalizedMan: React.FC = () => {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div id="photo-content-c" className="style-2 relative overflow-hidden">
        <div className="radial-gradient" aria-hidden />

        <div className="lg-max-width-1440">
          <div className="lg-container !overflow-hidden">
            <div className="box overflow-hidden">
              <div className="top lg-grid lg-gutter-y-30">
                <div
                  className="img lg-col-lg-5 m-0!"
                  style={{ backgroundImage: `url('${approachPhoto}')` }}
                  role="img"
                  aria-label="A physician greeting a patient during a weight loss consultation"
                />

                <div className="content lg-col-lg-7">
                  <h2
                    className="lg-title lg-max-width-500 text-[36px]! sm:text-[48px]!"
                    style={{ fontWeight: 500, letterSpacing: '-0.025em' }}
                  >
                    A More Personalized Approach To Weight Loss
                  </h2>

                  <div className="lg-text">
                    <p style={{ fontSize: 16, fontWeight: 400,   }}>
                      This program is designed for people who want more than a one-size-fits-all plan.
                    </p>

                    <div className="lg-list-arrow-right two-col">
                      <h5 style={{ fontSize: 16, fontWeight: 400,   }}>We focus on:</h5>
                      <ul>
                        {focusItems.map((item) => (
                          <li key={item} style={{ fontSize: 16, fontWeight: 400,   }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p style={{ fontSize: 16, fontWeight: 400,   }}>
                      This is what makes medical weight loss more effective than generic programs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bottom">
                <div className="lg-grid">
                  <div className="content lg-col-lg-7">
                    <h2
                      className="lg-title text-[36px]! sm:text-[48px]!"
                      style={{ maxWidth: 'none', fontWeight: 500, letterSpacing: '-0.025em' }}
                    >
                      What A Body Composition Scan Tells Us
                    </h2>

                    <div className="lg-text">
                      <p style={{ fontSize: 16, fontWeight: 400,   }}>
                        Weight alone doesn&apos;t tell the full story. That&apos;s why we use body
                        composition scans to look deeper.
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 400,   }}>
                        Our body composition scanner measures:
                      </p>

                      <div className="lg-list-icon-2 two-col">
                        <ul>
                          {measures.map((measure) => (
                            <li
                              key={measure.label}
                              style={{ fontSize: 16, fontWeight: 400,   }}
                              // Static, author-controlled markup copied from the source site.
                              dangerouslySetInnerHTML={{ __html: `${measure.icon}${measure.label}` }}
                            />
                          ))}
                        </ul>
                      </div>

                      <p style={{ fontSize: 16, fontWeight: 400,   }}>
                        This helps us understand how your body is changing, not just what the scale says.
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 400,   }}>
                        For example, you might be losing fat while gaining muscle, which is progress
                        that a standard scale would miss.
                      </p>
                      <p style={{ fontSize: 16, fontWeight: 400,   }}>
                        If you&apos;re looking for a body composition scan in Savannah, this is one of
                        the most valuable tools we use to guide your plan.
                      </p>
                    </div>
                  </div>

                  <div
                    className="img lg-col-lg-5"
                    style={{ backgroundImage: `url('${bodyCompPhoto}')` }}
                    role="img"
                    aria-label="A man measuring his waist with a tape measure after a body composition scan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-100" />
      <LabworkGuidanceBand />

      {/* <div className="lg-flexspace-100" /> */}
      <MidPageCTA
        backgroundImage="/weightloss/weightloss.jpg"
        backgroundPosition="72% top"
        title="Ready to Take a Smarter Approach to Weight Loss?"
        body="Stop guessing and start working with real data."
        align="left"
      />
    </>
  )
}

export default PersonalizedMan
