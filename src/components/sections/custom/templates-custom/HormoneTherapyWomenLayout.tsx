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
import { CostIncludedGrid } from '../compontents-custom/hormoneTherapy/CostIncludedGrid'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { SymptomsHeroBanner } from '../compontents-custom/hormoneTherapy/SymptomsHeroBanner'
import { BhrtHowItWorksSection } from '../compontents-custom/hormoneTherapy/BhrtHowItWorksSection'

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

      {treatment.symptoms ? (
        <SymptomsHeroBanner
          image={{...treatment.hero.image,src:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785352037/column-box-7-img_ks0u8m.jpg"}}
          heading={treatment.symptoms.title}
          lead={treatment.symptoms.lead ?? ''}
          groups={treatment.symptoms.items}
        />
      ) : null}

      {/* Renders every dynamic section (protocol, monitoring, treatment-support
          feature list, billing notice, and the reviewer bio) in the order
          already authored for this treatment — nothing here is re-hardcoded. */}
      {/* {treatment.sections?.map((section, index) => (
        <SectionRenderer key={index} section={section} index={index} />
      ))} */}

  <BhrtHowItWorksSection
  eyebrow="BHRT"
  title="How Bioidentical Hormone Therapy For Women Works"
  description="BHRT uses plant-derived hormones designed to closely match the body's natural hormones. At SAMM, therapy plans are personalized using detailed lab testing combined with symptom evaluation and health history review."
  supportLabel="Treatment May Support:"
  benefits={[
    { icon: 'energy', label: 'Energy and Sleep Quality' },
    { icon: 'wellness', label: 'Sexual Wellness and Vaginal Health' },
    { icon: 'mood', label: 'Mood Stability and Mental Clarity' },
    { icon: 'menopause', label: 'Menopause and Perimenopause Symptom Relief' },
    { icon: 'metabolic', label: 'Metabolic Balance and Body Composition' },
  ]}
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
