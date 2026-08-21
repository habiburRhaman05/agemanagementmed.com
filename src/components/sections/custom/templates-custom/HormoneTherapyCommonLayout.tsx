import { CalendarCheck, ClipboardList, FlaskConical, Pill, Scale, SlidersHorizontal, Tag, TestTube, Utensils, Zap } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SectionRenderer } from '@/components/sections/SectionRenderer'

import { pillars } from '@/content/treatments'
import { getPublishedTestimonials } from '@/content/testimonials'
import type { Treatment } from '@/types/content'
import { bhrtIcons } from '../compontents-custom/hormoneTherapy/bhrt-icons'
import { ProgramStepsTimeline } from '../compontents-custom/hormoneTherapy/ProgramStepsTimeline'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { SymptomsHeroCard } from '../compontents-custom/hormoneTherapy/SymptomsHeroCard'
import { BeforeAfterSliderSection } from '../compontents-custom/hormoneTherapy/BeforeAfterSliderSection'
import { SymptomsLabsReviewPanel } from '../compontents-custom/hormoneTherapy/SymptomsLabsReviewPanel'
import { TrustMarkers } from '@/components/sections/TrustMarkers'
import { PatientSuccessStories } from '@/components/sections/PatientSuccessStories'
import { MaleHeroBanner } from '../compontents-custom/hormoneTherapy/MaleHeroBanner'
import { PatientBenefitsSection } from '../compontents-custom/hormoneTherapy/PatientBenefitsSection'
import { LegacyIncludedGrid } from '../compontents-custom/shared/LegacyIncludedGrid'
import { HubIntroBenefits } from '../compontents-custom/hormoneTherapy/hub/HubIntroBenefits'
import { HubIncludedCarousel } from '../compontents-custom/hormoneTherapy/hub/HubIncludedCarousel'
import { HubOtherTreatments } from '../compontents-custom/hormoneTherapy/hub/HubOtherTreatments'
import { WelcomeVideo } from '@/components/sections/WelcomeVideo'
import { PatientJourney } from '@/components/shared/PatientJourney'
import { HomeServices } from '../../HomeServices'
import dynamic from 'next/dynamic'
import { WhoWeAreBand } from '../compontents-custom/hormoneTherapy/hub/WhoWeAreBand'

interface TreatmentTemplateProps {
  treatment: Treatment
}
const TestimonialSet = dynamic(() =>
  import('@/components/sections/TestimonialSet').then((mod) => mod.TestimonialSet),
)
export async function HormoneTherapyCommonLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <MaleHeroBanner
        title="Bioidentical Hormone Replacement Therapy (BHRT) For Men"
        lead="Optimize Testosterone. Restore Energy. Reclaim Your Edge."
        image={treatment.hero?.image}
      />

      <HubIntroBenefits />

      <WelcomeVideo title="Tools Of Transformation: BHRT" videoHref="https://vimeo.com/1081534475" />
<PatientJourney 
title='Your Patient Journey'
    lead="This isn't just about feeling better... it's about feeling better than ever."
    steps={
      [
         {
        title: 'Personalized Consultation',
        body: 'In our initial consultation, the Savannah Age Management Medicine clinic team will sit with you to learn about your current health challenges, your goals, and what\'s getting in the way of living life to the fullest.',
        url: '/steps-img.png',
        image: { src: '/steps-img.png', alt: 'Patient Appointment' },
      },
      {
        title: 'Convenient Lab Work',
        body: "After your consultation, we'll do a complete analysis of your health metrics to find the root cause of your symptoms, craft a treatment plan, and outline a schedule for regular check-ins.",
        url: '/steps-2-img.png',
        image: { src: '/steps-2-img.png', alt: 'Doctor Research' },
      },
      {
        title: 'Tailored Treatment Plan',
        body: "Following the latest in bio-identical hormone research and other advanced treatments, we'll make sure your plan always reflects the best protocol for you, any additional health concerns and ensure your plan continues to feel comprehensive and personalized.",
        url: '/steps-3-img.png',
        image: { src: '/steps-3-img.png', alt: 'Men Interaction' },
      },
      ]
    }
/>

    

      <HubIncludedCarousel />

 

      {/* <LegacyIncludedGrid
        title="Cost & What's Included: Transparent Pricing, No Guesswork"
        lead="What's typically included as a patient:"
        included={[
          { icon: bhrtIcons.costConsultation, title: 'Provider Visits And Hormone Assessments' },
          { icon: bhrtIcons.patientBodyComposition, title: 'Body Composition Analysis' },
          { icon: bhrtIcons.patientNutritionalGuidance, title: 'Nutritional Guidance' },
          { icon: bhrtIcons.patientFunctionalMovement, title: 'Functional Movement Recommendations' },
          { icon: bhrtIcons.costLabTesting, title: 'In-Office Lab Draws' },
          { icon: bhrtIcons.patientTreatmentOptimization, title: 'Ongoing Treatment Optimization' },
          { icon: bhrtIcons.patientQuickcare, title: 'QuickCare Access' },
          { icon: bhrtIcons.patientMembershipPricing, title: 'Member Pricing On Supplements And Additional Services' },
        ]}
        separateLabel="What is typically separate:"
        separate={[
          { icon: bhrtIcons.costLabTesting, title: 'Lab Testing (Often Covered By Insurance)' },
          { icon: bhrtIcons.patientSavingsSupplements, title: 'Hormone Medications (Coverage Varies By Plan)' },
        ]}
        note="Insurance commonly covers lab work but may not cover hormone medications. Flexible financing options are available through PatientFi to help make treatment more accessible."
      />

      <PatientBenefitsSection
        imageSrc="/photo-content-40-img.jpg"
        imageAlt="A provider shaking hands with a male patient"
        title="Patient Benefits"
        subtitle="As A Savannah Age Management Medicine Patient, You Receive:"
        benefits={[
          'Priority access to care',
          'Personalized treatment optimization',
          'Exclusive member pricing on additional services',
          'Integrated wellness support beyond hormones',
        ]}
      /> */}

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

  

      {treatment.faqs.length ? (
        <FAQAccordion
          eyebrow="Frequently asked"
          title={`${treatment.shortName} questions`}
          items={treatment.faqs}
        />
      ) : null}

      <HomeServices eyebrow='' title='Explore Other Treatments We Offer' lead='We go beyond hormonal health to provide a wide range of treatments tailored to support your overall wellness, vitality, and confidence.' />


      <TestimonialSet
        eyebrow="Patient Testimonials"
        title="Real stories of real transformation."
        lead="See how we've helped our clients transform their lives."
        testimonials={testimonials}
      />

      <WhoWeAreBand
        eyebrow="Who We Are"
        title="Leaders In Age Management And Wellness"
        body="The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices. We pair years of experience, the latest research and technology and a commitment to personalized solutions for unprecedented results. Enjoy a warm, welcoming approach to health optimization."
        cta={{ label: 'Our experts', href: '/our-experts' }}
      />

      {/* <ClosingCTA 
     
        title="Leaders In Age Management And Wellness"
        body="The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices. We pair years of experience, the latest research and technology and a commitment to personalized solutions for unprecedented results. Enjoy a warm, welcoming approach to health optimization."
        cta={{ label: 'Our experts', href: '/our-experts' }}
        centered={false}
      backgroundImage="/images/hero-2-bg (1).jpg" /> */}

      <ClosingCTA {...treatment.closingCta} backgroundImage="/images/hero-2-bg (1).jpg" />

      
   

   

    </>
  )
}
