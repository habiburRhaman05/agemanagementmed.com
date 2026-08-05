import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { MidPageCTA } from '../compontents-custom/shared/MidPageCTA'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'
import { LabworkGuidanceSection } from '../compontents-custom/weight-loss/male/LabworkGuidanceSection'


interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function WeightLossMaleLayout({ treatment }: TreatmentTemplateProps) {
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

      <PersonalizedMan />
      <WhatsIncluded />

      <MidPageCTA
        backgroundImage="https://www.agemanagementmed.com/themes/default/assets/images/hero-26-bg.jpg"
        backgroundPosition="72% top"
        title="Ready to Take a Smarter Approach to Weight Loss?"
        body="Stop guessing and start working with real data."
        align="left"
      />

      <WhoThisProgramIsFor />
      <LabworkGuidanceSection />
      <WhyThisApproachWorks />

      {treatment.faqs.length ? (
        <FAQAccordion title="Medical Weight Loss FAQs" items={treatment.faqs} />
      ) : null}

      <ClosingCTA {...treatment.closingCta} />
    </>
  )
}
