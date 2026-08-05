import {
  Activity,
  Atom,
  ClipboardList,
  Clock,
  Droplet,
  HeartPulse,
  Hexagon,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { SexualHealthConcerns } from '../compontents-custom/sexualWellnes/SexualHealthConcerns'
import { TreatmentComparison } from '../compontents-custom/sexualWellnes/TreatmentComparison'
import { TreatmentOptionsStack } from '../compontents-custom/sexualWellnes/TreatmentOptionsStack'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function SexualWellnessFemaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        image={{ ...treatment.hero.image, src: '/images/banner-30-bg.jpg' }}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <SexualHealthConcerns
        image={{
          src: '/images/photo-content-46-img.jpg',
          alt: 'Common Female Sexual Health Concerns',

        }}
        heading="Common Female Sexual Health Concerns"
        paragraphs={[
          'Many women experience physical changes that impact intimacy, comfort, and sexual satisfaction — especially after childbirth or during menopause.',
          'Our treatments address the underlying causes of these changes by restoring tissue health, improving circulation, and enhancing sensitivity.',
        ]}
        symptoms={[
          'Vaginal dryness or discomfort',
          'Pain during intercourse',
          'Reduced sexual sensitivity',
          'Difficulty achieving orgasm',
          'Vaginal laxity after childbirth',
          'Mild urinary leakage or stress incontinence',
        ]}
        featuresHeading="Advanced Therapies For Female Sexual Health"
        featuresParagraphs={[
          'Our treatments focus on restoring the structural health of vaginal tissue while improving nerve sensitivity and circulation.',
          'By combining regenerative medicine with advanced laser technologies, we help women regain comfort, confidence, and sexual wellness.',
        ]}
        features={[
          {
            icon: ClipboardList,
            title: 'Personalized Care',
            description: "Every woman's health journey is unique. We tailor treatments to your symptoms and goals.",
          },
          {
            icon: Atom,
            title: 'Regenerative Medicine',
            description: "PRP uses your body's natural growth factors to enhance sensitivity and cellular repair.",
          },
          {
            icon: Hexagon,
            title: 'Tissue Restoration',
            description: 'Our therapies stimulate collagen production and improve vaginal tissue health.',
          },
          {
            icon: Clock,
            title: 'Minimal Downtime',
            description: 'Treatments are quick, discreet, and designed to fit into your lifestyle.',
          },
        ]}
      />

      <TreatmentOptionsStack
        title="Premium Options"
        lead="Tailored to your needs, these services support lasting improvements in libido, performance, and satisfaction."
        treatments={[
          {
            image: '/images/column-box-14-img.png',
            title: 'Laser Vaginal Rejuvenation (CO2 Laser)',
            description:
              'Laser vaginal rejuvenation uses fractional CO2 laser energy to stimulate collagen production and restore the structure of vaginal tissue.',
            label: 'This treatment may help improve:',
            bullets: [
              'Vaginal dryness and thinning tissue',
              'Pain during intercourse',
              'Vaginal laxity',
              'Mild stress urinary incontinence',
            ],
            cta: { label: 'Learn more', href: '/laser-vaginal-therapy' },
            featured: true,
          },
          {
            image: '/images/column-box-12-img.png',
            imageBg: 'bg-[#A9B979]',
            title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
            description:
              'Hormonal fluctuations during perimenopause and menopause can impact libido, energy levels, and vaginal health.',
            label: 'BHRT may help:',
            bullets: [
              'Improve libido and sexual desire',
              'Reduce vaginal dryness',
              'Restore hormonal balance',
              'Improve mood, sleep, and energy',
            ],
          },
          {
            image: '/images/column-box-16-img.png',
            title: 'PRP Therapy For Female Sexual Wellness',
            description:
              'PRP therapy uses platelets from your own blood to stimulate cellular regeneration and nerve function in sensitive areas.',
            label: 'Benefits may include:',
            bullets: [
              'Improved sexual arousal and sensation',
              'Increased sensitivity',
              'Enhanced orgasm quality',
              'Support for urinary control',
            ],
          },
          {
            image: '/images/column-box-15-img.png',
            title: 'Supplementation & Hormonal Support',
            description:
              'Hormonal changes, stress, and lifestyle factors can all influence libido, arousal, and overall sexual wellness.',
            label: 'Treatment plans may include:',
            bullets: [
              'Hormone-supportive supplements for libido and vitality',
              'Nutritional protocols designed to support circulation and tissue health',
              'Prescription options that support female sexual health',
              'Complementary support alongside PRP or laser treatments',
            ],
          },
        ]}
      />

      <TreatmentComparison
        title="CO2 Laser Vs PRP Therapy: Understanding The Difference"
        lead="Laser therapy and PRP therapy address different aspects of female sexual health. Many women benefit from combining both therapies to address both tissue health and sexual responsiveness."
        columnA={{
          title: 'CO2 Laser',
          points: [
            { icon: Layers, label: 'Rebuilds vaginal tissue structure' },
            { icon: Sparkles, label: 'Stimulates collagen production' },
            { icon: Droplet, label: 'Helps treat dryness and laxity' },
            { icon: Clock, label: 'Particularly beneficial after menopause' },
          ],
        }}
        columnB={{
          title: 'PRP Therapy',
          points: [
            { icon: Zap, label: 'Enhances sensitivity and nerve function' },
            { icon: HeartPulse, label: 'Improves circulation and cellular repair' },
            { icon: Activity, label: 'May improve orgasm quality and arousal' },
          ],
        }}
      />

      {testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          background="alt"
          backgroundImage="/images/testimonial-17-bg.jpg"
        />
      ) : null}

      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently asked questions"
          lead="Deciding on Sexual Performance Enhancement & Rejuvenation is important, and you likely have questions. Here are answers to common questions to help you make an informed decision."
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} backgroundImage="/images/hero-17-bg.jpg" />
    </>
  )
}
