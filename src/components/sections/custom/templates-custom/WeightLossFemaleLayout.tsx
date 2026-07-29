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

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "All members of the staff are absolutely wonderful. They are polite and address any questions or concerns you have in a professional approach. They have literally changed my life for the better.",
    author: 'S.R.',
    source: 'google'
  },
  {
    id: '2',
    quote: "Dr. Collins has been an absolute delight and so informative and patient. He has a great personality and is very passionate about his profession to inform, teach, guide, and give his patients the most beneficial advice for good health and longevity. He has been very helpful for both my Husband and myself. The staff is very helpful and friendly as well.",
    author: 'E.H.',
    source: 'google'
  },
  {
    id: '3',
    quote: "Every experience has been excellent. All questions and concerns were answered. I've recommended them to my family and friends.",
    author: 'J.F.',
    source: 'google'
  },
  {
    id: '4',
    quote: "Great employees to work with. The staff is very knowledgeable and explain all processes.",
    author: 'C.G.',
    source: 'google'
  }
];
export async function WeightLossFeMaleLayout({ treatment }: TreatmentTemplateProps) {
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

      <FemaleSexualHealthConcerns/>
      <TreatmentOptions/>
      <CO2LaserVsPRP/>

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
