import { CalendarCheck, ClipboardList, FlaskConical, Percent, SlidersHorizontal, Tag, Utensils, Zap } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import { getPublishedTestimonials } from '@/content/testimonials'
import type { Treatment } from '@/types/content'
import { AuthorityTrustCard } from '../compontents-custom/hormoneTherapy/AuthorityTrustCard'
import { PremiumIncludedGrid as CostIncludedGrid } from '../compontents-custom/shared/PremiumIncludedGrid'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { SymptomsGridStatic } from '../compontents-custom/hormoneTherapy/SymptomsGridStatic'
import { BhrtHowItWorksPremium } from '../compontents-custom/hormoneTherapy/BhrtHowItWorksPremium'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function HormoneTherapyWomenLayout({ treatment }: TreatmentTemplateProps) {
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

      <SymptomsGridStatic />

      {/* Renders every dynamic section (protocol, monitoring, treatment-support
          feature list, billing notice, and the reviewer bio) in the order
          already authored for this treatment — nothing here is re-hardcoded. */}
      {/* {treatment.sections?.map((section, index) => (
        <SectionRenderer key={index} section={section} index={index} />
      ))} */}

      <BhrtHowItWorksPremium />
  <SafetyAndCandidacy
      bg='bg-sage-100'
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785350545/photo-content-38-img_lxshmc.jpg',
          alt: 'A provider reviewing treatment safety with a male patient',
        }}
        imageSide="left"
        heading="Monitoring & Adjustments:
How We Track Progress"
        paragraphs={[
          'At Savannah Age Management Medicine, we continuously monitor both lab values and symptom improvement to ensure your treatment remains safe, effective, and aligned with your goals. Your plan may be adjusted over time based on:',
        ]}
        questionsLabel="Common patient questions we address:"
        questions={[
          'Follow-up lab results',
          'Symptom changes',
          'Lifestyle, training, or health changes',

        ]}
        closingParagraph="Follow-up cadence and lab intervals will be confirmed with the clinical team prior to publishing final timelines."
 disclaimer="BHRT is a medical treatment and should only be initiated under the supervision of a qualified healthcare provider. Individual results vary, and hormone therapy is not intended to diagnose, treat, cure, or prevent disease."
      />
      <SafetyAndCandidacy
      bg=''
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785352168/photo-content-43-img_caanhm.jpg',
          alt: 'A provider reviewing treatment safety and candidacy with a patient',
        }}
        imageSide="left"
        heading="Safety, Candidacy, And What To Know Before Starting BHRT"
        paragraphs={[
          'Many women have important safety questions before starting hormone therapy. SAMM providers carefully review medical history, risk factors, and treatment goals to determine candidacy.',
          'BHRT may not be appropriate for every patient. Women with certain hormone-sensitive conditions, active cancers, untreated thyroid disorders, or specific cardiovascular risk factors may require alternative approaches or additional medical evaluation.',
          'Patients often ask about breast cancer risk, fertility considerations, and family history factors. These concerns are addressed through individualized consultations, risk screening, and evidence-based treatment planning.',
        ]}
        closingParagraph="BHRT is always prescribed and monitored by licensed medical professionals."
        disclaimer="Hormone therapy recommendations vary by individual. Consultation and medical evaluation are required before beginning treatment."
      />

      <CostIncludedGrid
        title="Cost And What To Expect From BHRT Treatment"
        lead="BHRT costs vary depending on individual treatment needs and lab testing requirements. SAMM focuses on transparent treatment planning so patients understand the full scope of care."
        includedLabel="Treatment typically includes:"
        included={[
          { icon: ClipboardList, title: 'Comprehensive Consultation' },
          { icon: FlaskConical, title: 'Hormone Lab Testing' },
          { icon: SlidersHorizontal, title: 'Personalized Treatment Planning' },
          { icon: CalendarCheck, title: 'Follow-Up Visits And Ongoing Monitoring' },
        ]}
        note="Some medications, specialty testing, or compounded prescriptions may be billed separately. Insurance coverage varies, and many patients use flexible payment or financing options when available."
      />

      <CostIncludedGrid
        title="Included As A Patient"
        lead="As a Savannah Age Management Medicine patient, you receive added benefits that support your hormone treatment, health goals, and long term wellness."
        includedLabel=""
        included={[
          { icon: Utensils, title: 'Body Composition Analysis' },
          { icon: ClipboardList, title: 'Nutritional Guidance' },
          { icon: CalendarCheck, title: 'Functional Movement Training' },
          { icon: SlidersHorizontal, title: 'Treatment Optimization' },
          { icon: Zap, title: 'Quick Care Access' },
          { icon: Percent, title: 'Savings On Supplements' },
          { icon: Tag, title: 'Membership Pricing On Additional Services' },
        ]}
        cta={treatment.pricing?.cta}
      />

      <AuthorityTrustCard
        image={{
          src: '/images/teams/team-1-img.png',
          alt: 'SAMM medical provider',
        }}
        name="SAMM Medical Provider"
        lastUpdated="March 5, 2026"
        blurb="SAMM focuses on personalized, medically supervised hormone optimization designed around patient safety and measurable results."
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
