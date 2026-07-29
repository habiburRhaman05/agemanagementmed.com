import { CalendarCheck, ClipboardList, FlaskConical, Pill, Scale, SlidersHorizontal, Tag, TestTube, Utensils, Zap } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import { getTestimonials } from '@/content/shared/testimonials'
import type { Treatment } from '@/types/content'
import { CostIncludedGrid } from '../compontents-custom/hormoneTherapy/CostIncludedGrid'
import { ProgramStepsTimeline } from '../compontents-custom/hormoneTherapy/ProgramStepsTimeline'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { SymptomsHeroCard } from '../compontents-custom/hormoneTherapy/SymptomsHeroCard'

interface TreatmentTemplateProps {
  treatment: Treatment
}

/** Matches `TESTIMONIALS_BY_SLUG['hormone-therapy-men']` in the routing file — same real reviews. */
const TESTIMONIAL_IDS = ['david-p']

export async function HormoneTherapyMenLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = getTestimonials(TESTIMONIAL_IDS)

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

      {treatment.symptoms ? (
        <SymptomsHeroCard
          image={treatment.hero.image}
          heading={treatment.symptoms.title}
          lead={treatment.symptoms.lead ?? ''}
          groups={treatment.symptoms.items}
          closingNote="Diminished hormone levels can slow you down physically and mentally, keeping you from enjoying the activities and lifestyle you once loved. You don't have to accept this as “normal aging.”"
        />
      ) : null}

    

      {treatment.process ? (
        <ProgramStepsTimeline
          eyebrow={treatment.process.eyebrow}
          title={treatment.process.title}
          steps={treatment.process.steps}
          stepImages={[
            'https://picsum.photos/seed/bhrt-men-step-1/200/200',
            'https://picsum.photos/seed/bhrt-men-step-2/200/200',
            'https://picsum.photos/seed/bhrt-men-step-3/200/200',
          ]}
        />
      ) : null}

      <SafetyAndCandidacy
        image={{
          src: 'https://picsum.photos/seed/bhrt-men-safety/1000/750',
          alt: 'A provider reviewing treatment safety with a male patient',
        }}
        imageSide="right"
        heading="Safety & What To Know Before Starting BHRT"
        paragraphs={[
          'BHRT is highly individualized and not appropriate for everyone. Before starting treatment, our providers carefully review your medical history, labs, and risk factors.',
        ]}
        questionsLabel="Common patient questions we address:"
        questions={[
          'Is testosterone therapy safe long-term?',
          'What are the potential risks or side effects?',
          'Could BHRT affect fertility?',
          'Who may not be a good candidate for therapy?',
        ]}
        closingParagraph="Men with certain medical conditions may require additional evaluation or alternative approaches. Your safety is our priority, and treatment decisions are made collaboratively with you."
        disclaimer="BHRT is a medical treatment and should only be initiated under the supervision of a qualified healthcare provider. Individual results vary, and hormone therapy is not intended to diagnose, treat, cure, or prevent disease."
      />

      <CostIncludedGrid
        title="Cost & What's Included: Transparent Pricing, No Guesswork"
        includedLabel="What's typically included as a patient:"
        included={[
          { icon: ClipboardList, title: 'Provider Visits And Hormone Assessments' },
          { icon: Scale, title: 'Body Composition Analysis' },
          { icon: Utensils, title: 'Nutritional Guidance' },
          { icon: CalendarCheck, title: 'Functional Movement Recommendations' },
          { icon: TestTube, title: 'In-Office Lab Draws' },
          { icon: SlidersHorizontal, title: 'Ongoing Treatment Optimization' },
          { icon: Zap, title: 'QuickCare Access' },
          { icon: Tag, title: 'Member Pricing On Supplements And Additional Services' },
        ]}
        separateLabel="What is typically separate:"
        separate={[
          { icon: FlaskConical, title: 'Lab Testing (Often Covered By Insurance)' },
          { icon: Pill, title: 'Hormone Medications (Coverage Varies By Plan)' },
        ]}
        note="Insurance commonly covers lab work but may not cover hormone medications. Flexible financing options are available through PatientFi to help make treatment more accessible."
        cta={treatment.pricing?.cta}
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
