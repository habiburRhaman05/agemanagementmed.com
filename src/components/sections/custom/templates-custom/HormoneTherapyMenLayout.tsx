import { CalendarCheck, ClipboardList, FlaskConical, Pill, Scale, SlidersHorizontal, Tag, TestTube, Utensils, Zap } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import { getPublishedTestimonials } from '@/content/testimonials'
import type { Treatment } from '@/types/content'
import { CostIncludedGrid } from '../compontents-custom/hormoneTherapy/CostIncludedGrid'
import { ProgramStepsTimeline } from '../compontents-custom/hormoneTherapy/ProgramStepsTimeline'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { SymptomsHeroCard } from '../compontents-custom/hormoneTherapy/SymptomsHeroCard'
import { BeforeAfterSliderSection } from '../compontents-custom/hormoneTherapy/BeforeAfterSliderSection'
import { SymptomsLabsReviewPanel } from '../compontents-custom/hormoneTherapy/SymptomsLabsReviewPanel'
import { MaleHeroBanner } from '../compontents-custom/hormoneTherapy/MaleHeroBanner'
import { PatientBenefitsSection } from '../compontents-custom/hormoneTherapy/PatientBenefitsSection'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function HormoneTherapyMenLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <MaleHeroBanner
        title="Bioidentical Hormone Replacement Therapy (BHRT) For Men"
        lead="Optimize Testosterone. Restore Energy. Reclaim Your Edge."
        image={treatment.hero?.image}
      />

      {treatment.symptoms ? (
        <SymptomsHeroCard
          image={{...treatment.hero.image,src:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785336801/ChatGPT_Image_Jul_29_2026_08_52_07_PM_dyqlrx.png"}}
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
            'https://res.cloudinary.com/khs2rcsr/image/upload/v1785336788/steps-img_dg4sfn.png',
            'https://res.cloudinary.com/khs2rcsr/image/upload/v1785336785/Establishing_Your_Baseline_ixdhgj.png',
            'https://res.cloudinary.com/khs2rcsr/image/upload/v1785336784/Customized_Treatment_Plan_kyrjrd.png',
          ]}
        />
      ) : null}

      <SafetyAndCandidacy
        bg="bg-[#F8F9F5]"
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785350545/photo-content-38-img_lxshmc.jpg',
          alt: 'A provider reviewing treatment safety with a male patient',
        }}
        imageSide="right"
        heading="Monitoring & Adjustments: How We Track Progress"
        subtitle="Ongoing Lab Monitoring & Symptom Review"
        paragraphs={[
          'Hormone optimization is not a one-time event - it\'s an ongoing process.',
          'At Savannah Age Management Medicine, we continuously monitor both lab values and symptom improvement to ensure your treatment remains safe, effective, and aligned with your goals. Your plan may be adjusted over time based on:',
        ]}
        questions={[
          'Follow-up lab results',
          'Symptom changes',
          'Lifestyle, training, or health changes',
        ]}
        closingParagraph="Follow-up cadence and lab intervals will be confirmed with the clinical team prior to publishing final timelines."
      />
      <SafetyAndCandidacy
      bg=''
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785350494/safety-img_xtu6j4.jpg',
          alt: 'A provider reviewing treatment safety with a male patient',
        }}
        imageSide="left"
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
          { iconName: 'provider-visits', title: 'Provider Visits And Hormone Assessments' },
          { iconName: 'body-composition', title: 'Body Composition Analysis' },
          { iconName: 'nutritional-guidance', title: 'Nutritional Guidance' },
          { iconName: 'functional-movement', title: 'Functional Movement Recommendations' },
          { iconName: 'lab-draws', title: 'In-Office Lab Draws' },
          { iconName: 'treatment-optimization', title: 'Ongoing Treatment Optimization' },
          { iconName: 'quickcare-access', title: 'QuickCare Access' },
          { iconName: 'member-pricing', title: 'Member Pricing On Supplements And Additional Services' },
        ]}
        separateLabel="What is typically separate:"
        separate={[
          { iconName: 'lab-testing', title: 'Lab Testing (Often Covered By Insurance)' },
          { iconName: 'hormone-medications', title: 'Hormone Medications (Coverage Varies By Plan)' },
        ]}
        note="Insurance commonly covers lab work but may not cover hormone medications. Flexible financing options are available through PatientFi to help make treatment more accessible."
      />

      <PatientBenefitsSection
        imageSrc="https://res.cloudinary.com/khs2rcsr/image/upload/v1785350494/safety-img_xtu6j4.jpg"
        imageAlt="A provider shaking hands with a male patient"
        title="Patient Benefits"
        subtitle="As A Savannah Age Management Medicine Patient, You Receive:"
        benefits={[
          'Priority access to care',
          'Personalized treatment optimization',
          'Exclusive member pricing on additional services',
          'Integrated wellness support beyond hormones',
        ]}
      />

      <BeforeAfterSliderSection 

        title="Real Results, Real Confidence" 
        description="Explore the actual transformations achieved through our advanced treatments. These are real patient outcomes, showing the power of our technology and expertise."
        slides={[
          {
            beforeImage: "https://res.cloudinary.com/khs2rcsr/image/upload/v1785351204/before-img_jzflom.jpg",
            afterImage: "https://res.cloudinary.com/khs2rcsr/image/upload/v1785351203/after-img_uwehcq.jpg",
            alt: "Hair restoration patient"
          },
          {
            beforeImage: "https://res.cloudinary.com/khs2rcsr/image/upload/v1785351202/before-2-img_mqiped.jpg",
            afterImage: "https://res.cloudinary.com/khs2rcsr/image/upload/v1785351200/after-2-img_iquqib.jpg",
            alt: "Skin rejuvenation patient"
          },
         
        ]}
      />

      <SymptomsLabsReviewPanel />

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
