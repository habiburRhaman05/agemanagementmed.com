import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

const focusPoints = [
  'Ongoing monitoring and adjustments',
  'Data driven decisions',
  'Long term sustainability',
  'Treating the root cause, not just symptoms',
]

const WhyThisApproachWorks: React.FC = () => {
  return (
    <Section background="inverse" spacing="lg">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-3xl font-semibold text-canvas-50 sm:text-4xl lg:text-display-sm">
                Why This Approach Works
              </h2>

              <p className="mt-5 text-base leading-relaxed text-canvas-50/75 sm:text-lg">
                Most weight loss programs fail because they do not adjust as
                your body changes.
              </p>

              <div className="mt-8">
                <p className="text-label font-semibold uppercase tracking-[0.14em] text-sage-400">
                  We focus on
                </p>

                <ul className="mt-5 space-y-4">
                  {focusPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ArrowRight
                        className="mt-1 h-4 w-4 shrink-0 text-sage-400"
                        aria-hidden
                      />
                      <span className="text-base leading-relaxed text-canvas-50/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-canvas-50/60 sm:text-base">
                This is how we help patients achieve results that last.
              </p>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://www.agemanagementmed.com/themes/default/assets/images/photo-content-69-img.jpg"
                  alt="Doctor consulting patient"
                  className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[520px]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default WhyThisApproachWorks