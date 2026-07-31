import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/female/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/female/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/female/ResultsAndTimeline'
import { SafetyAndCandidacy } from '../compontents-custom/hormoneTherapy/SafetyAndCandidacy'
import { ThreeTherapiesCard } from '../compontents-custom/hormoneTherapy/ThreeTherapiesCard'
import { TextImagePanel } from '../compontents-custom/perimenopause/TextImagePanel'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function BhrtHrtLayout({ treatment }: TreatmentTemplateProps) {
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
   

      <SafetyAndCandidacy
        bg=""
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469122/bhrt-therapy-1_l5crff.jpg',
          alt: 'A woman stretching outdoors as part of an active, healthy lifestyle',
        }}
        imageSide="left"
        heading="What Is Hormone Replacement Therapy?"
        paragraphs={[
          "Hormone Replacement Therapy (HRT) is more than just a medical treatment—it's a pathway to renewed health and energy. Whether you're seeking Testosterone Replacement Therapy (TRT) or experiencing disruptive hormonal imbalances, our comprehensive approach ensures you receive the most advanced, personalized care possible. Below, we'll review the differences between HRT, TRT, and BHRT, and why our team uses BHRT to treat our patients.",
        ]}
      />

      <ThreeTherapiesCard
        title="The Three Key Hormone Therapies Explained"
        rows={[
          {
            heading: 'Hormone Replacement Therapy (HRT)',
            paragraph:
              'An umbrella term referring to the broader approach to hormonal balance that addresses various hormonal needs across different life stages. This approach may or may not be bioidentical.',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469157/photo-content-22-img_t5x05r.jpg',
              alt: 'A woman reviewing paperwork at home',
            },
          },
          {
            heading: 'Testosterone Replacement Therapy (TRT)',
            paragraph:
              'Testosterone replacement therapy (TRT) is designed for individuals experiencing low testosterone and can significantly improve quality of life. However, for men, a protocol that includes only testosterone is often incomplete, as proper hormone balance typically requires addressing other key hormones as well. Similarly, for women, a hormone optimization plan that excludes testosterone may not fully support overall well-being. A truly effective approach considers the broader hormonal picture to ensure optimal health and symptom relief.',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469215/bhrt-therapy-2_a6fw5h.jpg',
              alt: 'A man being active outdoors in the mountains',
            },
          },
          {
            heading: 'Bioidentical Hormone Replacement Therapy (BHRT)',
            paragraph:
              'The most advanced and synchronous approach to hormone optimization. Unlike synthetic hormone treatments, bioidentical hormones are molecularly identical to the hormones naturally produced by your body. These are the hormones that we leverage at Savannah Age Management Medicine to get the best results for our patients.',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469249/photo-content-24-img_t5dmp1.jpg',
              alt: 'A couple enjoying time together outdoors',
            },
          },
        ]}
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469289/photo-content-25-img_ohyzgw.jpg',
          alt: 'A woman looking fatigued while working at her laptop',
        }}
        imageSide="left"
        heading="Signs You Might Need Hormone Replacement Therapy"
        lead="Our patients often come to us experiencing:"
        items={[
          'Persistent fatigue and low energy',
          'Difficulty maintaining muscle mass',
          'Unexplained weight gain',
          'Reduced mental clarity',
          'Decreased libido and performance',
          'Disrupted sleep patterns',
          'Mood fluctuations',
        ]}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785470190/bhrt-comprehence_lb683e.jpg',
          alt: 'A provider consulting with a patient in Pooler, GA',
        }}
        imageSide="right"
        heading="Our Comprehensive Approach in Pooler, GA"
        lead="At Savannah Age Management, we don't just treat symptoms—we provide a holistic path to hormonal wellness:"
        items={[
          'Personalized Treatment Plans',
          'Advanced Hormone Testing',
          'Cutting-Edge Diagnostic Technologies',
          'Experienced Medical Professionals',
          'Holistic Health Optimization',
        ]}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785470222/unique-compreence_eozbll.jpg',
          alt: 'Two providers reviewing lab paperwork together',
        }}
        imageSide="left"
        heading="Our Unique Consultation Process"
        lead="Your journey to hormonal balance begins with a comprehensive, three-hour personalized appointment:"
        items={[
          'Full blood panel and lab draw',
          'Detailed medical history review',
          'Comprehensive physical examination',
          'Nutrition and exercise consultation',
          'Precise medication dosing',
          'Hands-on testosterone injection training',
        ]}
      />

      <TextImagePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785470245/benifit-bhrt_l8h8uu.jpg',
          alt: 'A happy couple enjoying time together outdoors',
        }}
        imageSide="right"
        heading="Potential Benefits of Hormone Replacement Therapy"
        lead="Patients who undergo our BHRT treatments in place of just TRT often experience:"
        items={[
          'Increased energy and vitality',
          'Enhanced mental clarity and focus',
          'Improved body composition',
          'Supported weight loss',
          'Muscle building support',
          'Restored libido and sexual function',
          'Better sleep quality',
        ]}
      />

      <Section background="page" spacing="none" className="pb-12 lg:pb-16">
        <Container className="flex justify-center">
          <Button asChild size="md">
            <Link href="/book-appointment">Schedule a consultation</Link>
          </Button>
        </Container>
      </Section>

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
