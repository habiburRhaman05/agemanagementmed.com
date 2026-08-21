import { WeightLossClosingCTA } from '../compontents-custom/weight-loss/male/WeightLossClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'
import { WeightLossMaleHeroBanner } from '../compontents-custom/weight-loss/male/WeightLossMaleHeroBanner'
import { HeroEditorial } from '../../HeroEditorial'


interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function WeightLossMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  return (
    <>
      {/* <HeroEditorial  image={treatment.hero?.image} /> */}

     <HeroEditorial
        {...treatment.hero}
        fullHeight
        textWidth='900'
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />
      <div className="lg-flexspace-100" />

      <PersonalizedMan />


     
      <WhatsIncluded />

      <WhoThisProgramIsFor />
      <WhyThisApproachWorks />

<div className='bg-[#F7F8F2]'>

      {treatment.faqs.length ? (
        <FAQAccordion title="Medical Weight Loss FAQs" items={treatment.faqs} />
      ) : null}
</div>


      <WeightLossClosingCTA />
    </>
  )
}
