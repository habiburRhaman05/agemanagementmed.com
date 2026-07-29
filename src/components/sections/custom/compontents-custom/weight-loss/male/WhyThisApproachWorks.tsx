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
         <div className='flex items-center'>
           <div className="max-w-2xl">
            <h2 className="font-display text-display-sm text-canvas-50">Why This Approach Works</h2>

            <p className="mt-5 text-body-lg leading-relaxed text-canvas-50/75">
              Most weight loss programs fail because they do not adjust as your body changes.
            </p>

            <div className="mt-8">
              <p className="text-label font-semibold uppercase tracking-[0.14em] text-sage-400">
                We focus on
              </p>
              <ul className="mt-4 space-y-3">
                {focusPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body leading-snug text-canvas-50/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-body-sm leading-relaxed text-canvas-50/60">
              This is how we help patients achieve results that last.
            </p>
          </div>
          <div className='max-w-2xl'>
            <img src={"https://www.agemanagementmed.com/themes/default/assets/images/photo-content-69-img.jpg"}/>
          </div>
         </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default WhyThisApproachWorks
