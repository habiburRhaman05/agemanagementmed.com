import { sexualWellnessIcons } from './sexual-wellness-icons'

const co2Points = [
  { icon: sexualWellnessIcons.co2RebuildsTissue, label: 'Rebuilds vaginal tissue structure' },
  { icon: sexualWellnessIcons.co2StimulatesCollagen, label: 'Stimulates collagen production' },
  { icon: sexualWellnessIcons.co2TreatsDryness, label: 'Helps treat dryness and laxity' },
  { icon: sexualWellnessIcons.co2BeneficialAfterMenopause, label: 'Particularly beneficial after menopause' },
]

const prpPoints = [
  { icon: sexualWellnessIcons.prpEnhancesSensitivity, label: 'Enhances sensitivity and nerve function' },
  { icon: sexualWellnessIcons.prpImprovesCirculation, label: 'Improves circulation and cellular repair' },
  { icon: sexualWellnessIcons.prpImprovesOrgasm, label: 'May improve orgasm quality and arousal' },
]

/**
 * The "CO2 Laser vs PRP Therapy" comparison band — `#column-box-vs`. Ported
 * 1:1 from https://www.agemanagementmed.com/rejuvenation-enhancement/female/;
 * styling lives in src/app/legacy.css.
 */
export function Co2VsPrpComparison() {
  return (
    <div id="column-box-vs">
      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="lg-grid">
            <div className="lg-col-lg">
              <div className="box">
                <div className="lg-title lg-font-size-36">CO2 Laser</div>

                <div className="lg-list-icon">
                  <ul>
                    {co2Points.map((point) => (
                      <li key={point.label}>
                        <span dangerouslySetInnerHTML={{ __html: point.icon }} />
                        {point.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="lg-col-lg-auto"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="lg-title lg-font-size-48" style={{ flex: '0 1 auto', marginBottom: 0 }}>
                VS
              </div>
            </div>

            <div className="lg-col-lg">
              <div className="box">
                <div className="lg-title lg-font-size-36">PRP Therapy</div>

                <div className="lg-list-icon">
                  <ul>
                    {prpPoints.map((point) => (
                      <li key={point.label}>
                        <span dangerouslySetInnerHTML={{ __html: point.icon }} />
                        {point.label}
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
  )
}
