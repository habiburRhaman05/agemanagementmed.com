import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { measureIcons, programIcons } from '../compontents-custom/shared/weight-loss-icons'
import { MidPageCTA } from '../compontents-custom/shared/MidPageCTA'
import { LegacyIncludedGrid as CostIncludedGrid } from '../compontents-custom/shared/LegacyIncludedGrid'
import { LabworkGuidancePanel } from '../compontents-custom/weightLossFemale/LabworkGuidancePanel'
import { OverviewApproachCards } from '../compontents-custom/weightLossFemale/OverviewApproachCards'
import { ProgramFitCards } from '../compontents-custom/weightLossFemale/ProgramFitCards'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'


interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function WeightLossFeMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        image={{ ...treatment.hero.image, src: '/images/banner-13-bg.jpg' }}
        fullHeight
        centerUntilTablet
        containerOverride="py-24 md:py-50 lg:py-60"
        mobileFocalPoint="70% center"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <OverviewApproachCards
        darkCard={{
          image: {
            src: '/images/photo-content-5-img.jpg',
            alt: 'A woman stepping on a scale in a kitchen',
          },
          heading: 'A Data-Driven Approach To Weight Loss',
          lead: 'This program is designed for people who want more than a one-size-fits-all plan.',
          focusLabel: 'We focus on:',
          focusItems: [
            'Understanding why weight gain is happening',
            'Identifying metabolic and hormonal factors',
            'Creating a plan based on your body',
            'Adjusting as your body changes',
          ],
        }}
        lightCard={{
          image: {
            src: '/images/photo-content-51-img.jpg',
            alt: 'A woman in athletic wear stretching her leg',
          },
          heading: 'What A Body Composition Scan Tells Us',
          paragraph: "Weight alone doesn't tell the full story. That's why we use body composition scans to look deeper.",
          measuresLabel: 'Our body composition scanner measures:',
          measures: [
            { icon: measureIcons[0], label: 'Body Fat Percentage' },
            { icon: measureIcons[1], label: 'Muscle Mass' },
            { icon: measureIcons[2], label: 'Visceral Fat' },
            { icon: measureIcons[3], label: 'Water Balance' },
          ],
          closingParagraphs: [
            'This helps us understand how your body is changing, not just what the scale says.',
            'For example, you might be losing fat while gaining muscle, which is progress that a standard scale would miss.',
            'If you are looking for a body composition scan in Savannah, this is one of the most valuable tools we use to guide your plan.',
          ],
        }}
      />

      <LabworkGuidancePanel
        image={{
          src: '/images/photo-content-52-img.jpg',
          alt: 'A close-up portrait of a patient talking to a provider',
        }}
        heading="How We Use Labwork To Guide Your Plan"
        boldStatement="We don't guess. We test."
        paragraph="Labwork helps us understand what's happening inside your body so we can build a plan that actually works."
        columnALabel="We may review markers related to:"
        columnA={['Metabolism and insulin function', 'Thyroid health', 'Hormone balance', 'Inflammation levels']}
        columnBLabel="These markers help explain things like:"
        columnB={['Why weight loss has stalled', 'Why you feel low energy', "Why certain diets haven't worked"]}
        closingParagraphs={[
          <>
            We review hormone balance and other factors that may impact weight. Learn more about our{' '}
            <a href="/bioidentical-hormone-replacement-therapy">BHRT Therapy</a> services, including{' '}
            <a href="/bioidentical-hormone-replacement-therapy/male">Hormone Therapy for Men</a> and{' '}
            <a href="/bioidentical-hormone-replacement-therapy/female">Hormone Therapy for Women</a>.
          </>,
          'From there, we build a plan based on your results and adjust it over time as your body responds.',
          'This is what makes lab-guided weight loss more precise and sustainable.',
        ]}
      />

      <MidPageCTA
        backgroundImage="/images/hero-21-bg.jpg"
        backgroundPosition="13% center"
        title="Ready To Take A Smarter Approach To Weight Loss?"
        body="Stop guessing and start working with real data."
        align="right"
      />

      <CostIncludedGrid
        title="What's Included In The Program"
        lead="We want you to know exactly what to expect."
        included={[
          { icon: programIcons[0], title: 'Initial Consultation<br/>With A Provider' },
          { icon: programIcons[1], title: 'Lab Testing<br/>And Review' },
          { icon: programIcons[2], title: 'Body Composition<br/>Scans' },
          { icon: programIcons[3], title: 'Personalized<br/>Treatment Plan' },
          { icon: programIcons[4], title: 'Ongoing Follow Up Visits And Adjustments' },
        ]}
        separateLabel="May Be Additional:"
        separate={[
          { icon: programIcons[5], title: 'Medications If<br/>Prescribed' },
          { icon: programIcons[6], title: 'Advanced Testing<br/>If Needed' },
          { icon: programIcons[7], title: 'Supplements Based On Your Plan' },
        ]}
        note="Your provider will walk you through everything so there are no surprises."
      />

      <ProgramFitCards
        fitCard={{
          image: {
            src: '/images/photo-content-53-img.jpg',
            alt: 'A patient reviewing her plan with a provider',
          },
          imageSide: 'left',
          heading: 'Who This Program Is For',
          lead: 'This program is a good fit if:',
          bullets: [
            'You have tried diets without lasting results',
            'You suspect hormones or metabolism are a factor',
            'You want a medically guided approach',
            'You prefer ongoing support and adjustments',
          ],
          note: {
            prefix: 'If you are searching for a',
            linkLabel: 'weight loss doctor in Savannah',
            linkHref: '/our-experts',
            suffix: 'this program offers a more personalized and informed approach.',
          },
        }}
        safetyCard={{
          image: {
            src: '/images/photo-content-54-img.jpg',
            alt: 'A provider reviewing a patient’s health history',
          },
          imageSide: 'right',
          heading: 'Comprehensive Consultations',
          lead: 'Because this is a medical program, your safety comes first.',
          bulletsLabel: 'You may benefit from medical supervision if you:',
          bullets: [
            'Have a history of hormone imbalances',
            'Are managing thyroid conditions',
            'Have metabolic or blood sugar concerns',
            'Are considering prescription weight loss medications',
          ],
          closingText: 'Your provider will review your health history and labs to make sure your plan is appropriate and safe.',
        }}
      />

      <WhyThisApproachWorks image="/images/photo-content-55-img.jpg" />

      {treatment.faqs.length ? (
        <FAQAccordion title="Medical Weight Loss FAQs" items={treatment.faqs} />
      ) : null}

      <ClosingCTA
        {...treatment.closingCta}
        backgroundImage="/images/hero-22-bg.jpg"
        backgroundPosition="80% center"
      />
    </>
  )
}
