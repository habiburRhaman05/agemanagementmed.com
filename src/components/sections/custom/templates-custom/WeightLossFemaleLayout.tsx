import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { getTreatments, pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'


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

export async function WeightLossFeMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()
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

   

{testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          background="alt"
        />
      ) : null}
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
