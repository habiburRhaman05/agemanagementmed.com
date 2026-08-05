import { WeightLossClosingCTA } from '../compontents-custom/weight-loss/male/WeightLossClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import type { Treatment } from '@/types/content'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'
import { WeightLossMaleHeroBanner } from '../compontents-custom/weight-loss/male/WeightLossMaleHeroBanner'


interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function WeightLossMaleLayout({ treatment }: TreatmentTemplateProps) {
  return (
    <>
      <WeightLossMaleHeroBanner image={treatment.hero?.image} />

      <PersonalizedMan />
      <WhatsIncluded />

      <WhoThisProgramIsFor />
      <WhyThisApproachWorks />

      {treatment.faqs.length ? (
        <FAQAccordion title="Medical Weight Loss FAQs" items={treatment.faqs} />
      ) : null}

      <WeightLossClosingCTA />
    </>
  )
}
