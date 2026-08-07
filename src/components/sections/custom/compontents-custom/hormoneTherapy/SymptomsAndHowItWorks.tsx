import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'

import { bhrtIcons } from './bhrt-icons'

interface SymptomCard {
  icon: string
  title: string
  paragraph: string
  bullets: string[]
}

const quadrants: SymptomCard[] = [
  {
    icon: bhrtIcons.symptomEnergySleep,
    title: 'Energy, Sleep, And Physical Vitality',
    paragraph: 'Hormonal changes often impact overall stamina and sleep quality. Women may experience:',
    bullets: [
      'Persistent fatigue or low energy',
      'Difficulty falling or staying asleep',
      'Waking up feeling unrested',
      'Increased afternoon energy crashes',
      'Reduced motivation for exercise or daily activities',
    ],
  },
  {
    icon: bhrtIcons.symptomMoodCognitive,
    title: 'Mood, Cognitive Function, And Mental Clarity',
    paragraph: 'Hormone fluctuations can affect emotional and cognitive health. Common experiences include:',
    bullets: [
      'Increased anxiety or irritability',
      'Mood swings or emotional sensitivity',
      'Difficulty concentrating or “brain fog”',
      'Memory lapses or reduced mental clarity',
      'Loss of motivation or decreased stress tolerance',
    ],
  },
  {
    icon: bhrtIcons.symptomWeightMetabolism,
    title: 'Weight, Metabolism, And Body Composition',
    paragraph: 'Hormonal shifts can influence metabolism and fat storage patterns. Women may notice:',
    bullets: [
      'Unexplained weight gain',
      'Increased abdominal fat',
      'Difficulty losing weight despite diet or exercise',
      'Slower metabolism',
      'Changes in muscle tone or strength',
    ],
  },
  {
    icon: bhrtIcons.symptomSexualHealth,
    title: 'Sexual Health And Intimacy',
    paragraph: 'Hormones play a major role in sexual wellness and comfort. Symptoms may include:',
    bullets: ['Low libido', 'Vaginal dryness or discomfort', 'Reduced sexual satisfaction', 'Difficulty with arousal or orgasm'],
  },
]

const menstrual: SymptomCard = {
  icon: bhrtIcons.symptomMenstrual,
  title: 'Menstrual Changes, Perimenopause, And Menopause Symptoms',
  paragraph: 'Hormonal imbalance often appears through cycle and menopause-related changes, including:',
  bullets: [
    'Irregular menstrual cycles',
    'Heavy or unpredictable periods',
    'Hot flashes and night sweats',
    'Increased PMS symptoms',
    'Symptoms associated with perimenopause or menopause',
    'Symptoms sometimes linked to estrogen dominance',
  ],
}

const supports: { icon: string; label: string }[] = [
  { icon: bhrtIcons.supportEnergySleep, label: 'Energy and Sleep Quality' },
  { icon: bhrtIcons.supportSexualWellness, label: 'Sexual Wellness and Vaginal Health' },
  { icon: bhrtIcons.supportMoodStability, label: 'Mood Stability and Mental Clarity' },
  { icon: bhrtIcons.supportSymptomRelief, label: 'Menopause and Perimenopause Symptom Relief' },
  { icon: bhrtIcons.supportMetabolicBalance, label: 'Metabolic Balance and Body Composition' },
]

const cardBody = (card: SymptomCard) => (
  <>
    <h3 className="lg-title">{card.title}</h3>

    <div className="lg-text">
      <p>{card.paragraph}</p>

      <div className="lg-list-arrow-right">
        <ul>
          {card.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
)

/** The 4 quadrant cards stack icon-then-content vertically; the wide 5th
 * (menstrual) card instead lays icon and content side by side in a row. */
function SymptomBox({ card, wide = false }: { card: SymptomCard; wide?: boolean }) {
  if (wide) {
    return (
      <div className="lg-col-lg-10">
        <div className="box">
          <div className="lg-grid">
            <div className="icon lg-col-lg-auto" dangerouslySetInnerHTML={{ __html: card.icon }} />

            <div className="content lg-col-lg">{cardBody(card)}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg-col-lg-6">
      <div className="box">
        <div className="icon" dangerouslySetInnerHTML={{ __html: card.icon }} />

        <div className="content">{cardBody(card)}</div>
      </div>
    </div>
  )
}

/**
 * The BHRT-for-Women "Symptoms Of Hormone Imbalance" (dark card, `.top`) +
 * "How Bioidentical Hormone Therapy Works" (white card, `.bottom`) combined
 * block. Ported 1:1 from
 * https://www.agemanagementmed.com/bioidentical-hormone-replacement-therapy/female/
 * (`.column-box-ib-group` / `#column-box-ib` / `#column-icon-d`); styling
 * lives in src/app/legacy.css.
 */
export function SymptomsAndHowItWorks() {
  return (
    <div className="column-box-ib-group pt-24">
      <div className="radial-gradient" aria-hidden />

      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="top">
            <div className="box">
              <div
                className="img"
                style={{ backgroundImage: "url('/images/column-box-7-img.jpg')" }}
                role="img"
                aria-label="A woman relaxing at home"
              />

              <div className="content">
                <h2 className="lg-title">Symptoms Of Hormone Imbalance In Women</h2>

                <div className="lg-text">
                  <p>
                    Hormonal imbalances can affect multiple systems in the body. Many women notice symptoms gradually,
                    while others experience sudden changes. Below are common patterns SAMM evaluates when determining
                    whether BHRT may help.
                  </p>
                </div>
              </div>

              <div id="column-box-ib">
                <div className="lg-grid lg-justify-center">
                  {quadrants.map((card) => (
                    <SymptomBox card={card} key={card.title} />
                  ))}
                  <SymptomBox card={menstrual} wide />

                  <div className="lg-col-12">
                    <div className="cta lg-text-center">
                      <LegacyCtaLink href="/book-appointment" className="lg-btn lg-btn-arrow-right">
                        Schedule Hormone Testing
                      </LegacyCtaLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="box">
              <div className="content">
                <div className="lg-grid">
                  <div className="left lg-col-xl-6">
                    <h2 className="lg-title font-medium lg-max-width-450">How Bioidentical Hormone Therapy For Women Works</h2>
                  </div>

                  <div className="right lg-col-xl-6">
                    <div className="lg-text font-medium">
                      <p>
                        BHRT uses plant-derived hormones designed to closely match the body&apos;s natural hormones. At
                        SAMM, therapy plans are personalized using detailed lab testing combined with symptom
                        evaluation and health history review.
                      </p>
                    </div>
                  </div>

                  <div className="lg-flexspace-50" />

                  <div className="lg-col-12">
                    <div className="lg-title lg-text-center" style={{ fontSize: 32, marginBottom: 0 }}>
                      Treatment May Support:
                    </div>
                  </div>
                </div>
              </div>

              <div id="column-icon-d">
                <div className="lg-grid gap-y-5">
                  {supports.map((item) => (
                    <div className="item lg-col-lg-6 " key={item.label}>
                      <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                      <div className="content">
                        <p>
                          <strong>{item.label}</strong>
                        </p>
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
  )
}
