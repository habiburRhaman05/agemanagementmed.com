import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { StatementBand } from '@/components/sections/StatementBand'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPeopleBySlugs } from '@/content/people'
import { getTreatments, pillars } from '@/content/treatments'
import type { Testimonial, Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import { TreatmentProcess } from '../sections/custom/hormone therapy woman/treatMnetProcess'

function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}

/** Legacy items key off `title`; typed blocks key off `id` (falling back to index either way). */
export function sectionKey(section: TreatmentSection, index: number): string | number {
  if (isTypedSection(section)) return section.id ?? `${section.type}-${index}`
  return section.title ?? index
}

interface TreatmentTemplateProps {
  treatment: Treatment
  testimonials: Testimonial[]
}

/**
 * Covers all 15 treatment, hub, and modality pages. Optional sections are
 * omitted when their content key is absent — so a hub, a male/female variant,
 * and a single-modality page differ by DATA, never by a code branch and never
 * by a second page implementation.
 *
 * See docs/03-COMPONENT-ARCHITECTURE.md §7.
 */
export async function TreatmentTemplate({ treatment, testimonials }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  const providers = await getPeopleBySlugs(treatment.providers ?? [])

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

      {/* {treatment.statement ? (
        <StatementBand text={treatment.statement} background="alt" />
      ) : null} */}

      {treatment.symptoms ? <BenefitList {...treatment.symptoms} /> : null}

      {treatment.sections?.map((section, index) => (
        <SectionRenderer key={sectionKey(section, index)} section={section} index={index} />
      ))}

      {treatment.process ? <ProcessSteps {...treatment.process} /> : null}

      {treatment.pricing ? <PricingBlock {...treatment.pricing} /> : null}

      {treatment.candidacy ? <BenefitList {...treatment.candidacy} background="page" /> : null}

     

      {/* {providers.length ? (
        <PeopleGrid
          eyebrow="Your care team"
          title="Who you will be working with"
          people={providers}
          cta={{ label: 'Meet the full team', href: '/our-experts' }}
        />
      ) : null} */}

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
