import {
  Droplets,
  Stethoscope,
  ClipboardList,
  Target,
  RefreshCw,
  Smile,
  Heart,
  Zap,
  HeartHandshake,
  Scale,
  Activity,
  Leaf,
  AlertCircle,
  HeartCrack,
  TrendingDown,
  Frown,
  BatteryLow,
} from 'lucide-react'
import Link from 'next/link'

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
import { WhyChoosePrpCard } from '../compontents-custom/prp/WhyChoosePrpCard'
import { HowPrpWorksGrid } from '../compontents-custom/prp/HowPrpWorksGrid'
import { ProviderSpotlightCard } from '../compontents-custom/prp/ProviderSpotlightCard'
import { OtherTreatmentsGrid } from '../compontents-custom/prp/OtherTreatmentsGrid'
import { Services } from '@/components/shared/Services'
import { getServices } from '@/content/services'
import { IconGridPanelGroup, DualIconGridBanner } from '../compontents-custom/rejuvenation/IconGridPanel'
import { ChecklistPanelGroup } from '../compontents-custom/rejuvenation/ChecklistPanel'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function RejuvenationEnhancementLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const isFemale = treatment.href.includes('/female')
  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        primaryCtaLabel='Schedule A Consultation'
        image={
          isFemale
            ? { ...treatment.hero.image, src: '/images/hero-17-bg.jpg' }
            : treatment.hero.image
        }
        mobileFocalPoint={isFemale ? '90% center' : undefined}
        leftAlignMobile={isFemale}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
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

      <IconGridPanelGroup
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
      />

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
          },
          {
            imageSide: 'left',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338054/photo-content-92-img_nitez0.jpg',
              alt: 'A provider reviewing lab results with a patient',
            },
            heading: 'What To Expect During Your Consultation',
            lead: 'Your first visit is focused on understanding your concerns and goals.',
            itemsLabel: 'We will:',
            items: [
              'Review Your Health History',
              'Discuss Symptoms And Changes',
              'Evaluate Hormone And Health Factors',
              'Build A Personalized Treatment Plan',
            ],
            closingParagraphs: [
              'Every treatment plan is created after a full evaluation to make sure it is safe and appropriate for you. Every plan is tailored. Nothing is rushed or one-size-fits-all.',
            ],
          },
          {
            imageSide: 'left',
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785348927/shock-wase_a81nyl.jpg',
              alt: 'A relaxed patient resting comfortably before treatment',
            },
            heading: 'Is Treatment Right For You',
            lead: 'If you are unsure whether treatment is right for you, that is completely normal.',
            itemsLabel: 'You may be a good candidate if:',
            items: [
              'You Have Noticed Changes In Libido Or Performance',
              'You Feel Less Confident Or Comfortable',
              'You Suspect Hormones May Be A Factor',
              'You Want A Medical Approach Instead Of Guesswork',
            ],
            closingParagraphs: ['A consultation is the best way to get clear answers.'],
          },
        ]}
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
