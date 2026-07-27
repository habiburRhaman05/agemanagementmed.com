import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { StatementBand } from '@/components/sections/StatementBand'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPerson } from '@/content/people'
import { getTreatments, pillars } from '@/content/treatments'
import type { Person, Testimonial, Treatment } from '@/types/content'

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
export function TreatmentTemplate({ treatment, testimonials }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  const providers = (treatment.providers ?? [])
    .map(getPerson)
    .filter((p): p is Person => Boolean(p))

  const related = getTreatments(treatment.related ?? [])

  // Alternate the image side down the page so consecutive pairs don't stack.
  let pairIndex = 0

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      {treatment.statement ? (
        <StatementBand text={treatment.statement} background="alt" />
      ) : null}

      {treatment.symptoms ? <BenefitList {...treatment.symptoms} /> : null}

      {treatment.sections?.map((section) => {
        const side = pairIndex++ % 2 === 0 ? 'right' : 'left'
        return (
          <EditorialPair
            key={section.title}
            {...section}
            imageSide={section.imageSide ?? side}
            background={pairIndex % 2 === 0 ? 'alt' : 'page'}
          />
        )
      })}

      {treatment.process ? <ProcessSteps {...treatment.process} /> : null}

      {treatment.pricing ? <PricingBlock {...treatment.pricing} /> : null}

      {treatment.candidacy ? <BenefitList {...treatment.candidacy} background="page" /> : null}

      {related.length ? (
        <PillarGrid
          eyebrow="Related care"
          title="Other ways we can help"
          treatments={related}
          background="alt"
        />
      ) : null}

      {providers.length ? (
        <PeopleGrid
          eyebrow="Your care team"
          title="Who you will be working with"
          people={providers}
          cta={{ label: 'Meet the full team', href: '/our-experts' }}
        />
      ) : null}

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
