import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/female/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/female/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/female/ResultsAndTimeline'
import { BenefitList } from '../../BenefitList'
import { SectionRenderer } from '../../SectionRenderer'
import { ProcessSteps } from '../../ProcessSteps'
import { PricingBlock } from '../../PricingBlock'
import { sectionKey } from '@/components/templates/TreatmentTemplate'
import { SymptomsOutcomesGrid } from '../compontents-custom/shared/SymptomsOutcomesGrid'
import { HeartHandshake, HeartPulse, ShieldOff, Waves } from 'lucide-react'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function LaserTreatMentLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

  
 {treatment.symptoms ? <BenefitList {...treatment.symptoms} /> : null}

      {treatment.sections?.map((section, index) => (
        <SectionRenderer key={sectionKey(section, index)} section={section} index={index} />
      ))}

      <SymptomsOutcomesGrid
  title="Symptoms And Outcomes Of Shockwave Therapy"
  lead="Shockwave therapy may be most applicable for men with erectile dysfunction associated with reduced blood flow. It is also explored as a supportive option for sexual performance and overall penile health. Candidacy is always determined on an individual basis during consultation."
  align="center" 
  items={[
    {
      icon: HeartPulse,
      title: 'Erectile dysfunction (ED)',
      description:
        'Difficulty achieving or maintaining an erection — particularly when associated with vascular health or reduced circulation — may be addressed with shockwave therapy.',
    },
    {
      icon: ShieldOff,
      title: 'Drug-free approach to sexual health',
      description:
        'Men who prefer to avoid ongoing medication — due to side effects, interactions, or personal preference — may benefit from exploring shockwave therapy as an alternative.',
    },
    {
      icon: Waves,
      title: "Peyronie's disease",
      description:
        "Acoustic wave therapy may help address scar tissue associated with Peyronie's disease, potentially supporting improved tissue flexibility and reduced discomfort.",
    },
    {
      icon: HeartHandshake,
      title: 'Post-procedure rehabilitation support',
      description:
        'Men recovering from prostate surgery or other pelvic procedures may explore shockwave therapy as part of a broader plan to support the return of erectile function.',
    },
    // Note: Removed the 5th item to ensure a clean 2x2 grid layout matching the example image.
  ]}
/>

      {/* {treatment.process ? <ProcessSteps {...treatment.process} /> : null} */}

      {/* {treatment.pricing ? <PricingBlock {...treatment.pricing} /> : null}

      {treatment.candidacy ? <BenefitList {...treatment.candidacy} background="page" /> : null} */}



      {treatment.faqs.length ? (
        <FAQAccordion
          eyebrow="Frequently asked"
          title={`${treatment.shortName} questions`}
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} />
    </>
  )
}
