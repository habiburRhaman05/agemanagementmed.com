import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'

import { bhrtHubIcons } from './bhrt-hub-icons'
import BookAppointmentButton from '@/components/shared/BookAppointmentButton';

const supports: { icon: string; label: string }[] = [
  { icon: bhrtHubIcons.sexualWellness, label: 'Enhance Sexual Wellness - Boost libido and improve overall sexual function.' },
  { icon: bhrtHubIcons.weightManagement, label: 'Support Weight Management - Help control weight and improve metabolism.' },
  { icon: bhrtHubIcons.restoreEnergy, label: 'Restore Energy Levels - Sustained energy levels throughout the day.' },
  { icon: bhrtHubIcons.betterSleep, label: 'Promote Better Sleep - Experience restful, uninterrupted sleep.' },
  { icon: bhrtHubIcons.moodStability, label: 'Improve Mood Stability - Experience a more balanced emotional state.' },
  { icon: bhrtHubIcons.hotFlashes, label: 'Alleviate Hot Flashes - Reduce discomfort and improve quality of life.' },
]

/**
 * BHRT hub page's "When Hormones Are Imbalanced, So Is Your Health" +
 * "How Bioidentical Hormone Replacement Therapy (BHRT) works" combined block
 * (`#photo-content-c` / `#column-icon-d`). Ported 1:1 from
 * download/_bioidentical-hormone-replacement-therapy_.html; styling lives in
 * src/app/legacy.css (already ported — this is a pure-addition new file, not
 * a reuse of the male/female gendered components).
 */
export function HubIntroBenefits() {
  return (
    <div id="photo-content-c">
      <div className="radial-gradient" aria-hidden />

      <div className="lg-max-width-1440">
        <div className="lg-container">
          <div className="box">
            <div className="top lg-grid">
              <div
                className="img lg-col-xl-5"
                style={{ backgroundImage: "url('https://res.cloudinary.com/khs2rcsr/image/upload/v1787369949/photo-content-72-img_stcudn.jpg')" }}
                role="img"
                aria-label="A couple embracing at home"
              />

              <div className="content lg-col-xl-7">
                <h2 className="lg-title">When Hormones Are Imbalanced, So Is Your Health</h2>

                <div className="lg-text">
                  <p>If you&apos;re not feeling like yourself - let&apos;s find out why.</p>
                  <p>Have you ever:</p>

                  <div className="lg-list-arrow-right">
                    <ul>
                      <li>Been told that how you are feeling is &lsquo;just part of getting old&rsquo;?</li>
                      <li>Had a doctor say your results are normal when you feel terrible?</li>
                      <li>Struggled doing something physically that you once found easy?</li>
                      <li>Had trouble keeping up with activities you enjoy?</li>
                    </ul>
                  </div>

                  <p>
                    As we age, diminished hormone production can slow us down, physically and mentally. Our team can
                    help you find balance again and get back to the lifestyle you love.
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom w-full">
              <div className="content">
                <div className="lg-grid lg-items-center">
                  <div className="left lg-col-xl-6">
                    <h2 className="lg-title">How Bioidentical Hormone Replacement Therapy (BHRT) works</h2>
                  </div>

                  <div className="right lg-col-xl-6">
                    <div className="lg-text">
                      <p>
                        Bioidentical Hormone Replacement Therapy utilizes hormones that are chemically identical to
                        those naturally produced by your body. This personalized treatment can:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="column-icon-d">
                <div className="lg-grid">
                  {supports.map((item) => {
                    const [strong, rest] = item.label.split(' - ')
                    return (
                      <div className="item lg-col-lg-6" key={strong}>
                        <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                        <div className="content">
                          <p>
                            <strong>{strong}</strong> - {rest}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

     <div className='w-full justify-center mt-6 flex items-center'>
            <BookAppointmentButton>
             Schedule a consultation
           </BookAppointmentButton>

     </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
