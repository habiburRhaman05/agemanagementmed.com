import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getTreatments, pillars } from '@/content/treatments'
import type { Testimonial, Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}

/** Legacy items key off `title`; typed blocks key off `id` (falling back to index either way). */
function sectionKey(section: TreatmentSection, index: number): string | number {
  if (isTypedSection(section)) return section.id ?? `${section.type}-${index}`
  return section.title ?? index
}

interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function WeightLossMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const related = await getTreatments(treatment.related ?? [])
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

      <PersonalizedMan/>
      <WhatsIncluded/>
      <WhoThisProgramIsFor/>
      <WhyThisApproachWorks/>


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
