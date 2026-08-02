import {
    Activity,
    AlertCircle,
    BatteryLow,
    ClipboardList,
    Droplets,
    FlaskConical,
    Frown,
    Heart,
    HeartCrack,
    HeartHandshake,
    Leaf,
    Pill,
    RefreshCw,
    Scale,
    Smile,
    Sparkles,
    Stethoscope,
    Target,
    TrendingDown,
    TrendingUp,
    Zap,
} from 'lucide-react'
import Link from 'next/link'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import { AboutAndCtaBanner } from '../compontents-custom/rejuvenation/AboutAndCtaBanner'
import { ChecklistPanelGroup } from '../compontents-custom/rejuvenation/ChecklistPanel'
import { DualIconGridBanner, IconGridPanelGroup } from '../compontents-custom/rejuvenation/IconGridPanel'
import { SymptomsAndProcessPanel } from '../compontents-custom/rejuvenation/SymptomsAndProcessPanel'
import { TreatmentOptionsGrid } from '../compontents-custom/rejuvenation/TreatmentOptionsGrid'
import { TreatmentOptionsStack } from '../compontents-custom/sexualWellnes/TreatmentOptionsStack'
import { Services } from '@/components/shared/Services'
import { getServices } from '@/content/services'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function RejuvenationEnhancementOfferLayout({ treatment }: TreatmentTemplateProps) {
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

            <SymptomsAndProcessPanel
        symptomsHeading="Are You Experiencing Any Of These Issues?"
        symptomsLead="It can be equally difficult for both men and women to discuss or divulge sexual performance concerns. Our staff provide an open and judgment-free atmosphere to discuss the root cause of these issues and the therapies that can help."
        symptomsLabel="Common Symptoms Treated:"
        symptoms={[
          'Reduced libido',
          'Erectile dysfunction',
          'Difficulty achieving or maintaining an erection',
          'Low energy or stamina during intimacy',
          'Vaginal dryness or discomfort',
          'Loss of confidence in sexual performance',
        ]}
        processHeading="How Our Treatments Work"
        processLead="Our non-surgical therapies use your body's natural healing processes to improve sexual health, personalized for optimal results."
        processSteps={[
          {
            icon: ClipboardList,
            title: 'Tailored Solutions',
            description:
              'Every plan starts with a full evaluation of your health history, hormone levels, and goals, so your treatment is built around you rather than a generic protocol.',
          },
          {
            icon: Sparkles,
            title: 'Non-Invasive Therapies',
            description:
              'Our therapies work with your body’s own healing response. No surgery, incisions, or downtime, most patients return to normal activity the same day.',
          },
          {
            icon: HeartHandshake,
            title: 'Comprehensive Care',
            description:
              'We look beyond a single symptom to the full picture, addressing physical health alongside confidence, mood, and emotional well-being.',
          },
          {
            icon: TrendingUp,
            title: 'Proven Results',
            description:
              'Patients typically see steady improvements in libido, performance, and satisfaction, with ongoing support to help keep results on track.',
          },
        ]}
        ctaLabel="Schedule A Consultation"
        ctaHref="/book-appointment"
      />

      <TreatmentOptionsStack
            title="Treatment Options"
            lead="Tailored to your needs, these services support lasting improvements in libido, performance, and satisfaction."
            treatments={[
              {
                image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318812/shock-wase-image_p7iv6g.png',
                title: 'Shockwave Therapy For Erectile Dysfunction',
                description:
                  'Shockwave therapy uses acoustic wave technology to stimulate blood vessel growth and improve circulation within penile tissue. Many men experience gradual improvements in erectile quality over several weeks as circulation improves.',
                label: 'Benefits may include:',
                bullets: [
                  'Improved blood flow to the penis',
                  'Stronger and more sustainable erections',
                  'Increased responsiveness during intimacy',
                  'A non-drug solution for erectile dysfunction',
                ],
                cta: { label: 'Learn more', href: '/shockwave-therapy' },
                featured: true,
              },
              {
                image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318893/column-box-8-img_cwog8d.png',
                title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
                description:
                  'Low testosterone can significantly impact libido, energy, mood, and erectile function. Bioidentical Hormone Replacement Therapy helps restore hormonal balance and optimize testosterone levels.',
                label: 'BHRT may help:',
                bullets: [
                  'Increase libido and sexual desire',
                  'Improve energy and stamina',
                  'Support stronger erections',
                  'Enhance overall vitality and mood',
                ],
              },
              {
                image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318936/sexul-perfromance_opewpn.png',
                title: "PRP Therapy For Men's Sexual Performance",
                description:
                  "Platelet-Rich Plasma (PRP) therapy uses growth factors from your own blood to promote tissue regeneration and improve erectile function. PRP may also stimulate new blood vessel formation, improving circulation and overall penile health.",
                label: 'Potential benefits include:',
                bullets: [
                  'Enhanced erection strength and firmness',
                  'Improved sensitivity and sexual pleasure',
                  'Increased sexual stamina',
                  'Support for nerve and tissue regeneration',
                ],
              },
              {
                image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318977/subliment_yul0z2.png',
                title: 'Supplementation & Pharmaceutical Support',
                description:
                  'Our medical team evaluates your overall health, hormone levels, and cardiovascular factors to determine whether medications, supplements, or a combination approach may be beneficial.',
                label: 'Depending on your needs, treatment plans may include:',
                bullets: [
                  'Prescription medications that improve blood flow and erectile response',
                  'Physician-guided supplement protocols that support circulation and nitric oxide production',
                  'Nutritional support for cardiovascular and hormonal health',
                  'Combination therapy alongside PRP or shockwave treatments',
                ],
              },
            ]}
          />


      <AboutAndCtaBanner
        eyebrow="Who We Are"
        heading="Leaders In Age Management And Wellness"
        lead="The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices. We pair years of experience, the latest research and technology, and a commitment to personalized solutions for unprecedented results."
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407018/photo-content-54-img_uz9klt.jpg',
          alt: 'A member of our care team',
        }}
        ctaLabel="Our Experts"
        ctaHref="/our-experts"
      />


      <DualIconGridBanner
        columns={[
          {
            heading: 'Why Patients Choose Our Approach',
            items: [
              { icon: Stethoscope, label: 'Care Led By Medical Providers' },
              { icon: ClipboardList, label: 'Personalized Treatment Plans' },
              { icon: Target, label: 'Focus On Root Causes, Not Quick Fixes' },
              { icon: RefreshCw, label: 'Ongoing Support And Adjustments' },
            ],
          },
          {
            heading: 'What Patients Typically Experience',
            items: [
              { icon: Smile, label: 'Improved Confidence' },
              { icon: Heart, label: 'Increased Desire And Satisfaction' },
              { icon: Zap, label: 'Better Energy And Mood' },
              { icon: HeartHandshake, label: 'More Comfort During Intimacy' },
            ],
          },
        ]}
      />

      {/* <IconGridPanelGroup
        panels={[
          {
            tone: 'light',
            imageSide: 'left',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785475166/hormone-replacement_zvjw8a.avif',
              alt: 'A couple relaxing together at home',
            },
            heading: 'A Personalized Approach To Sexual Wellness',
            lead: 'There is no one-size-fits-all solution when it comes to sexual health.',
            itemsLabel: 'We look at the full picture, including:',
            items: [
              { icon: Scale, label: 'Hormone Balance' },
              { icon: Droplets, label: 'Blood Flow And Circulation' },
              { icon: Zap, label: 'Energy Levels And Metabolism' },
              { icon: Leaf, label: 'Overall Health And Lifestyle' },
            ],
            closingParagraphs: [
              'From there, we create a plan that fits your body and your goals.',
              <>
                In many cases, sexual health is closely connected to hormone levels. You can learn more
                about{' '}
                <Link
                  href="/bioidentical-hormone-replacement-therapy"
                  className="font-medium text-sage-700 underline underline-offset-2 hover:text-sage-800"
                >
                  hormone therapy
                </Link>{' '}
                and how it supports overall wellness.
              </>,
            ],
          },
          {
            tone: 'light',
            imageSide: 'right',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407018/photo-content-54-img_uz9klt.jpg',
              alt: 'A close-up portrait of a patient reflecting on her health',
            },
            heading: 'Common Concerns We Treat',
            lead: 'If something feels off, there is usually a reason behind it.',
            itemsLabel: 'We commonly help patients with:',
            items: [
              { icon: AlertCircle, label: 'Erectile Dysfunction (ED)' },
              { icon: Droplets, label: 'Vaginal Dryness' },
              { icon: HeartCrack, label: 'Low Libido Or Loss Of Desire' },
              { icon: Frown, label: 'Pain With Intimacy' },
              { icon: TrendingDown, label: 'Difficulty With Performance' },
              { icon: Activity, label: 'Hormone Related Changes' },
            ],
            closingParagraphs: ['Our goal is to identify the cause and help you move forward with a clear plan.'],
          },
        ]}
      /> */}

      <DualIconGridBanner
        columns={[
          {
            heading: 'Sexual Wellness For Men',
            lead: 'For men, sexual health concerns often show up as changes in performance, energy, or confidence.',
            items: [
              { icon: AlertCircle, label: 'Erectile Dysfunction' },
              { icon: BatteryLow, label: 'Reduced Stamina' },
              { icon: TrendingDown, label: 'Low Testosterone' },
              { icon: HeartCrack, label: 'Decreased Libido' },
            ],
            closingParagraphs: ['These symptoms are often tied to hormone levels, circulation, or overall health.'],
            cta: { label: 'Explore Male Sexual Health Treatment Options', href: '/rejuvenation-enhancement/male' },
          },
          {
            heading: 'Sexual Wellness For Women',
            lead: 'For women, sexual health can be affected by hormone changes, especially during and after menopause.',
            items: [
              { icon: HeartCrack, label: 'Low Libido' },
              { icon: Frown, label: 'Pain During Intimacy' },
              { icon: Droplets, label: 'Vaginal Dryness' },
              { icon: Activity, label: 'Changes In Sensitivity' },
            ],
            closingParagraphs: ['These issues are often treatable with the right approach.'],
            cta: { label: 'Explore Female Sexual Health Treatment Options', href: '/rejuvenation-enhancement/female' },
          },
        ]}
      />

      <ChecklistPanelGroup
        panels={[
          {
            imageSide: 'right',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469249/photo-content-24-img_t5dmp1.jpg',
              alt: 'A couple enjoying time together outdoors',
            },
            heading: 'How Hormones Impact Sexual Health',
            lead: 'Hormones play a major role in how you feel, both physically and emotionally.',
            itemsLabel: 'Changes in hormone levels can affect:',
            items: ['Desire And Arousal', 'Energy And Mood', 'Circulation And Response', 'Overall Comfort'],
            closingParagraphs: [
              'That is why many treatment plans include hormone evaluation and support.',
              'If appropriate, your provider may recommend hormone optimization as part of your plan.',
            ],
          }
        ]}
      />

      <Services
      align="center"
        eyebrow="Other Treatments"
        title="Explore Other Treatments We Offer"
        lead="We go beyond hormonal health to provide a wide range of treatments tailored to support your overall wellness, vitality, and confidence."
        treatments={(await getServices()).filter(s => s.slug !== treatment.slug)}
        visibleCount={3}
      />

      <TestimonialSet
      width="w-full mx-auto"
      title='Real success stories'
      eyebrow='Patient Testimonials'
      testimonials={(treatment.testimonials ?? []).map((t, i) => ({
        id: `${treatment.slug}-testimonial-${i}`,
        quote: t.text,
        author: t.name,
        source: t.source === 'google' ? 'google' : 'site',
      }))}
      />
      

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
