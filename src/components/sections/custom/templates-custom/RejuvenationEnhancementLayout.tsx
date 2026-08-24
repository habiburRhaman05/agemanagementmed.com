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
import { IconGridPanelGroup } from '../compontents-custom/rejuvenation/IconGridPanel'
import { ChecklistPanelGroup } from '../compontents-custom/rejuvenation/ChecklistPanel'
import { PhotoArrowListQuadPanel } from '../compontents-custom/rejuvenation/PhotoArrowListQuadPanel'
import { FullBleedIconListSection } from '../compontents-custom/rejuvenation/FullBleedIconListSection'
import {
  BloodFlowIcon,
  EnergyMetabolismIcon,
  ErectileDysfunctionIcon,
  HormoneBalanceIcon,
  HormoneChangesIcon,
  IntimacySnowflakeIcon,
  LifestyleIcon,
  LowLibidoIcon,
  PerformanceHourglassIcon,
  ReducedStaminaIcon,
  SensitivityNodesIcon,
  VaginalDrynessIcon,
} from '../compontents-custom/rejuvenation/icons'
import { WhyMedicalApproachPanel } from '../compontents-custom/rejuvenation/hub/WhyMedicalApproachPanel'
import { MidPageCTA } from '../compontents-custom/shared/MidPageCTA'
import { getPublishedTestimonials } from '@/content/testimonials'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function RejuvenationEnhancementLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const isFemale = treatment.href.includes('/female')
    const testimonials = await getPublishedTestimonials()
  
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
        textWidth='800'
        
      />

      <PhotoArrowListQuadPanel
        rows={[
          {
            image: {
              src: '/themes/default/assets/images/photo-content-75-img.jpg',
              alt: 'A couple smiling together in bed',
            },
            imageSide: 'left',
            heading: 'Why Patients Choose Our Approach',
            items: [
              'Care Led By Medical Providers',
              'Personalized Treatment Plans',
              'Focus On Root Causes, Not Quick Fixes',
              'Ongoing Support And Adjustments',
            ],
          },
          {
            image: {
              src: '/themes/default/assets/images/photo-content-76-img.jpg',
              alt: 'An older couple embracing outdoors',
            },
            imageSide: 'right',
            heading: 'What Patients Typically Experience',
            items: [
              'Improved Confidence',
              'Increased Desire And Satisfaction',
              'Better Energy And Mood',
              'More Comfort During Intimacy',
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
              src: '/themes/default/assets/images/photo-content-77-img.jpg',
              alt: 'A couple relaxing together at home',
            },
            heading: 'A Personalized Approach To Sexual Wellness',
            lead: 'There is no one-size-fits-all solution when it comes to sexual health.',
            itemsLabel: 'We look at the full picture, including:',
            iconStyle: 'bare',
            // Interleaved so the row-major grid renders the source's
            // column-major order: Hormone/Energy left, Blood Flow/Lifestyle right.
            items: [
              { icon: HormoneBalanceIcon, label: 'Hormone Balance' },
              { icon: BloodFlowIcon, label: 'Blood Flow And Circulation' },
              { icon: EnergyMetabolismIcon, label: 'Energy Levels And Metabolism' },
              { icon: LifestyleIcon, label: 'Overall Health And Lifestyle' },
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
              src: '/themes/default/assets/images/photo-content-78-img.jpg',
              alt: 'A close-up portrait of a patient reflecting on her health',
            },
            heading: 'Common Concerns We Treat',
            lead: 'If something feels off, there is usually a reason behind it.',
            itemsLabel: 'We commonly help patients with:',
            iconStyle: 'bare',
            items: [
              { icon: ErectileDysfunctionIcon, label: 'Erectile Dysfunction (ED)' },
              { icon: VaginalDrynessIcon, label: 'Vaginal Dryness' },
              { icon: LowLibidoIcon, label: 'Low Libido Or Loss Of Desire' },
              { icon: IntimacySnowflakeIcon, label: 'Pain With Intimacy' },
              { icon: PerformanceHourglassIcon, label: 'Difficulty With Performance' },
              { icon: HormoneChangesIcon, label: 'Hormone Related Changes' },
            ],
            closingParagraphs: ['Our goal is to identify the cause and help you move forward with a clear plan.'],
          },
        ]}
      />


      <FullBleedIconListSection
        image={{
          src: '/themes/default/assets/images/photo-content-79-img.jpg',
          alt: 'A confident, distinguished middle-aged man',
        }}
        imageSide="left"
        heading="Sexual Wellness for Men"
        lead="For men, sexual health concerns often show up as changes in performance, energy, or confidence."
        itemsLabel="Common issues include:"
        items={[
          { icon: ErectileDysfunctionIcon, label: 'Erectile Dysfunction' },
          { icon: ReducedStaminaIcon, label: 'Reduced Stamina' },
          { icon: PerformanceHourglassIcon, label: 'Low Testosterone' },
          { icon: LowLibidoIcon, label: 'Decreased Libido' },
        ]}
        closingParagraphs={['These symptoms are often tied to hormone levels, circulation, or overall health.']}
        cta={{
          label: 'Explore male sexual health treatment options',
          href: '/rejuvenation-enhancement/male',
        }}
      />

 
     <TestimonialSet
        width="w-full mx-auto"
        title="Real success stories"
        eyebrow="Patient Testimonials"
        lead={`See how we've helped our clients transform their lives.`}
        testimonials={testimonials}
        backgroundImage='/themes/default/assets/images/testimonial-18-bg.jpg'
        height='900px'
      />

      <FullBleedIconListSection
        image={{
          src: '/themes/default/assets/images/photo-content-80-img.jpg',
          alt: 'A close, tender moment between a couple',
        }}
        imageSide="left"
        heading="Sexual Wellness for Women"
        lead="For women, sexual health can be affected by hormone changes, especially during and after menopause."
        itemsLabel="Common concerns include:"
        items={[
          { icon: LowLibidoIcon, label: 'Low Libido' },
          { icon: IntimacySnowflakeIcon, label: 'Pain During Intimacy' },
          { icon: VaginalDrynessIcon, label: 'Vaginal Dryness' },
          { icon: SensitivityNodesIcon, label: 'Changes In Sensitivity' },
        ]}
        closingParagraphs={['These issues are often treatable with the right approach.']}
        cta={{
          label: 'Explore female sexual health treatment options',
          href: '/rejuvenation-enhancement/female',
        }}
      />

      <ChecklistPanelGroup
        panels={[
          {
            imageSide: 'right',
            image: {
              src: '/themes/default/assets/images/photo-content-81-img.jpg',
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
                            src: '/themes/default/assets/images/photo-content-82-img.jpg',

              alt: 'A provider reviewing lab results with a patient',
            },
            heading: 'What to Expect During Your Consultation',
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
            imageSide: 'right',
            image: {
                           src: '/themes/default/assets/images/photo-content-83-img.jpg',

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

      <MidPageCTA
        backgroundImage="/themes/default/assets/images/hero-30-bg.jpg"
        backgroundPosition="center"
        title="Take the First Step Toward Feeling Like Yourself Again"
        body="You do not have to figure this out on your own."
        titleWidth="700"
        paraWidth="525"
        ctaLabel="Schedule A Consultation To Review ED Symptoms And Hormone Labs"
        align="full"
        gradient={false}
      />

      <WhyMedicalApproachPanel />

      {treatment.faqs.length ? (
        <FAQAccordion
          eyebrow="Frequently asked"
          title={`${treatment.shortName} questions`}
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA 
      
      title='Ready to Improve Your Confidence and Comfort'
      body='A personalized plan can make a real difference.

'
textWidth={"600"}
cta={{
  label:"Book Schedule",
  href:"#"
}}
      backgroundImage='/themes/default/assets/images/hero-7-bg.jpg'
     />
    </>
  )
}
