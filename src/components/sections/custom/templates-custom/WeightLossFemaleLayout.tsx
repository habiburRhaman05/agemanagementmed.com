import Link from 'next/link'
import { CalendarCheck, ClipboardList, Droplet, Dumbbell, FlaskConical, Pill, Scale, Waves } from 'lucide-react'

import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { SectionRenderer } from '@/components/sections/SectionRenderer'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { getTreatments, pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import PersonalizedMan from '../compontents-custom/weight-loss/male/PersonalizedMan'
import WhatsIncluded from '../compontents-custom/weight-loss/male/WhatsIncluded'
import WhoThisProgramIsFor from '../compontents-custom/weight-loss/male/WhoThisProgramIsFor'
import WhyThisApproachWorks from '../compontents-custom/weight-loss/male/WhyThisApproachWorks'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import { CostIncludedGrid } from '../compontents-custom/hormoneTherapy/CostIncludedGrid'
import { LabworkGuidancePanel } from '../compontents-custom/weightLossFemale/LabworkGuidancePanel'
import { OverviewApproachCards } from '../compontents-custom/weightLossFemale/OverviewApproachCards'
import { ProgramFitCards } from '../compontents-custom/weightLossFemale/ProgramFitCards'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}

/** Legacy items key off `title`; typed blocks key off `id` (falling back to index either way). */
function sectionKey(section: TreatmentSection, index: number): string | number {
  if (isTypedSection(section)) return section.id ?? `${section.type}-${index}`
  return section.title ?? index
}

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function WeightLossFeMaleLayout({ treatment }: TreatmentTemplateProps) {
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

      <OverviewApproachCards
        darkCard={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785406940/fitness-woman-measuring-her-body-isolated-weight-loss-concepts_231208-10391_pchkxx.avif',
            alt: 'A woman at home, taking a mindful moment in her kitchen',
          },
          heading: 'A More Personalized Approach To Weight Loss',
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
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785406992/photo-content-53-img_kefend.jpg',
            alt: 'A woman stretching during an active session',
          },
          heading: 'What A Body Composition Scan Tells Us',
          paragraph: "Weight alone doesn't tell the full story. That's why we use body composition scans to look deeper.",
          measuresLabel: 'Our body composition scanner measures:',
          measures: [
            { icon: Scale, label: 'Body Fat Percentage' },
            { icon: Droplet, label: 'Visceral Fat' },
            { icon: Dumbbell, label: 'Muscle Mass' },
            { icon: Waves, label: 'Water Balance' },
          ],
          closingParagraphs: [
            'This helps us understand how your body is changing, not just what the scale says.',
            'For example, you might be losing fat while gaining muscle, which is progress that a standard scale would miss.',
            'If you are looking for a body composition scan in Savannah, this is one of the most valuable tools we use to guide your plan.',
          ],
        }}
      />

      <CostIncludedGrid
        title="What's Included In The Program"
        lead="We want you to know exactly what to expect."
        includedLabel="Included:"
        included={[
          { icon: ClipboardList, title: 'Initial Consultation With A Provider' },
          { icon: FlaskConical, title: 'Lab Testing And Review' },
          { icon: Scale, title: 'Body Composition Scans' },
          { icon: ClipboardList, title: 'Personalized Treatment Plan' },
          { icon: CalendarCheck, title: 'Ongoing Follow Up Visits And Adjustments' },
        ]}
        separateLabel="May be additional:"
        separate={[
          { icon: Pill, title: 'Medications If Prescribed' },
          { icon: FlaskConical, title: 'Advanced Testing If Needed' },
          { icon: Pill, title: 'Supplements Based On Your Plan' },
        ]}
        note="Your provider will walk you through everything so there are no surprises."
      />

      <ProgramFitCards
        fitCard={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407292/medical-appointment-female-doctor-gives-professional-medical-help-to-male-patient-explains-written-information-on-paper-in-clipboard-gives-support-and-good-service-pose-at_sogm8s.jpg',
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
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785350545/photo-content-38-img_lxshmc.jpg',
            alt: 'A provider reviewing a patient’s health history',
          },
          imageSide: 'right',
          heading: 'Safety And Medical Considerations',
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

      <LabworkGuidancePanel
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407018/photo-content-54-img_uz9klt.jpg',
          alt: 'A close-up portrait of a patient in natural light',
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
            <Link href="/bioidentical-hormone-replacement-therapy" className="font-medium text-sage-400 underline underline-offset-2 hover:text-sage-300">
              BHRT Therapy
            </Link>{' '}
            services, including{' '}
            <Link href="/bioidentical-hormone-replacement-therapy/male" className="font-medium text-sage-400 underline underline-offset-2 hover:text-sage-300">
              Hormone Therapy for Men
            </Link>{' '}
            and{' '}
            <Link href="/bioidentical-hormone-replacement-therapy/female" className="font-medium text-sage-400 underline underline-offset-2 hover:text-sage-300">
              Hormone Therapy for Women
            </Link>
            .
          </>,
          'From there, we build a plan based on your results and adjust it over time as your body responds.',
          'This is what makes lab-guided weight loss more precise and sustainable.',
        ]}
      />

      <ClosingCTA
        title="Ready To Take A Smarter Approach To Weight Loss?"
        body="Stop guessing and start working with real data."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
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
