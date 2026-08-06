import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { AuthorityCard } from '../compontents-custom/hormoneTherapy/AuthorityCard'
import { bhrtIcons } from '../compontents-custom/hormoneTherapy/bhrt-icons'
import { LegacyIncludedGrid } from '../compontents-custom/shared/LegacyIncludedGrid'
import { PhotoContentPanel } from '../compontents-custom/hormoneTherapy/PhotoContentPanel'
import { SymptomsAndHowItWorks } from '../compontents-custom/hormoneTherapy/SymptomsAndHowItWorks'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function HormoneTherapyWomenLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        image={{ ...treatment.hero.image, src: '/images/banner-24-bg.jpg' }}
        fullHeight
        centerUntilTablet
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <SymptomsAndHowItWorks />

      <PhotoContentPanel
        bg="#fff"
        image={{
          src: '/images/photo-content-42-img.jpg',
          alt: 'A SAMM provider reviewing a patient’s hormone treatment plan',
        }}
        imageSide="right"
        heading="Monitoring And Ongoing Hormone Optimization"
        headingMaxWidth={500}
        paragraphs={[
          'BHRT is not a one-time prescription. SAMM approaches hormone therapy as an ongoing, carefully monitored medical process.',
          'Providers track progress through a combination of laboratory testing and patient-reported symptom improvements. Treatment plans are adjusted as hormone levels and symptom patterns evolve over time. This monitoring allows providers to refine dosage, delivery method, and hormone balance safely and effectively.',
          'Regular follow-ups help ensure treatment remains aligned with your goals, lifestyle, and long-term health outcomes.',
        ]}
      />
      <PhotoContentPanel
        bg="#F9F9F9"
        image={{
          src: '/images/photo-content-43-img.jpg',
          alt: 'A SAMM provider discussing BHRT safety and candidacy with a patient',
        }}
        imageSide="left"
        heading="Safety, Candidacy, And What To Know Before Starting BHRT"
        paragraphs={[
          'Many women have important safety questions before starting hormone therapy. SAMM providers carefully review medical history, risk factors, and treatment goals to determine candidacy.',
          'BHRT may not be appropriate for every patient. Women with certain hormone-sensitive conditions, active cancers, untreated thyroid disorders, or specific cardiovascular risk factors may require alternative approaches or additional medical evaluation.',
          <>
            Patients often ask about breast cancer risk, fertility considerations, and family history factors. These
            concerns are addressed through individualized consultations, risk screening, and evidence-based treatment
            planning.
          </>,
          'BHRT is always prescribed and monitored by licensed medical professionals.',
          <em key="disclaimer">
            <strong>Medical Disclaimer:</strong> Hormone therapy recommendations vary by individual. Consultation and
            medical evaluation are required before beginning treatment.
          </em>,
        ]}
      />

      <LegacyIncludedGrid
        title="Cost And What To Expect From BHRT Treatment"
        lead="BHRT costs vary depending on individual treatment needs and lab testing requirements. SAMM focuses on transparent treatment planning so patients understand the full scope of care."
        included={[
          { icon: bhrtIcons.costConsultation, title: 'Comprehensive<br/>consultation' },
          { icon: bhrtIcons.costLabTesting, title: 'Hormone lab<br/>testing' },
          { icon: bhrtIcons.costTreatmentPlanning, title: 'Personalized<br/>treatment planning' },
          { icon: bhrtIcons.costFollowup, title: 'Follow-up visits and ongoing monitoring' },
        ]}
        note="Some medications, specialty testing, or compounded prescriptions may be billed separately. Insurance coverage varies, and many patients use flexible payment or financing options when available."
      />

      <LegacyIncludedGrid
        title="Included As A Patient"
        lead="As a Savannah Age Management Medicine patient, you receive added benefits that support your hormone treatment, health goals, and long term wellness."
        included={[
          { icon: bhrtIcons.patientBodyComposition, title: 'Body Composition<br/>Analysis' },
          { icon: bhrtIcons.patientNutritionalGuidance, title: 'Nutritional<br/>Guidance' },
          { icon: bhrtIcons.patientFunctionalMovement, title: 'Functional<br/>Movement Training' },
          { icon: bhrtIcons.patientTreatmentOptimization, title: 'Treatment<br/>Optimization' },
          { icon: bhrtIcons.patientQuickcare, title: 'Quick Care Access' },
          { icon: bhrtIcons.patientSavingsSupplements, title: 'Savings On<br/>Supplements' },
          { icon: bhrtIcons.patientMembershipPricing, title: 'Membership Pricing on<br/>Additional Services' },
        ]}
      />

      <AuthorityCard
        image={{
          src: '/images/photo-content-44-img.png',
          alt: 'Harry S. Collins, DO, FACOG, Medical Director',
        }}
        name="SAMM Medical Provider"
        lastUpdated="March 5, 2026"
        blurb="SAMM focuses on personalized, medically supervised hormone optimization designed around patient safety and measurable results."
      />


      {treatment.faqs.length ? <FAQAccordion title="BHRT For Women FAQs" items={treatment.faqs} /> : null}

      <ClosingCTA {...treatment.closingCta} backgroundImage="/images/hero-2-bg.jpg" />
    </>
  )
}
