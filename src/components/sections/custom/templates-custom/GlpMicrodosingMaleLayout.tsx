import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { MidPageCTA } from '../compontents-custom/shared/MidPageCTA'
import { cardIcons, listIcons } from '../compontents-custom/glp1Microdosing/glp-icons'
import { FitCheckCallout } from '../compontents-custom/glp1Microdosing/FitCheckCallout'
import { MetabolicOverviewCards } from '../compontents-custom/glp1Microdosing/MetabolicOverviewCards'
import { ProgramIncludedGrid } from '../compontents-custom/glp1Microdosing/ProgramIncludedGrid'

interface TreatmentTemplateProps {
  treatment: Treatment
}

/** Shared across the men's/women's light card per the source design — same asset, no gendered variant. */
const DATA_DRIVEN_IMAGE = {
  src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785341630/photo-content-86-img_vh2zio.jpg',
  alt: 'Hands preparing a precision peptide injection pen',
}

export async function GlpMicrodosingMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        title="GLP-1 Microdosing: Precision Metabolic Optimization"
        lead="A low-dose therapy to mute food noise, reduce inflammation, and enhance metabolic flexibility while minimizing GLP-1 side effects."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <MetabolicOverviewCards
        darkCard={{
          image: {
            src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785341609/A_Sophisticated_Approach_To_Sustainable_Metabolic_Health_t0butq.jpg',
            alt: 'A man measuring his waist to track metabolic progress',
          },
          heading: 'A Sophisticated Approach To Sustainable Metabolic Health',
          paragraphs: [
            'Leverage the inflammation-fighting power of GLP-1 medicines for sustainable, systemic health with minimized side effects.',
            'Our GLP-1 Microdosing program is designed for individuals who want the metabolic and cognitive benefits of peptide therapy without sacrificing energy or lifestyle. We use precision lab testing and body composition data to find your "Minimum Effective Dose"—the sweet spot where you feel optimal, not overwhelmed.',
          ],
          focusLabel: 'We focus on:',
          focusItems: [
            { title: 'Muting "Food Noise"', body: 'Regaining cognitive control over cravings' },
            { title: 'Metabolic Flexibility', body: 'Helping your body switch efficiently between fuel sources' },
            {
              title: 'Reducing Systemic Inflammation',
              body: 'Leveraging the under-utilized longevity benefits of GLP-1s',
            },
            { title: 'Protecting Lean Muscle', body: 'Maintaining strength and vitality' },
          ],
        }}
        lightCard={{
          image: DATA_DRIVEN_IMAGE,
          heading: 'Data-Driven Microdosing',
          paragraph:
            'We don\'t believe in "one size fits all." At a micro-level, every milligram counts. We use advanced diagnostics to ensure your protocol is working with your biology, not against it.',
          icons: [
            {
              icon: listIcons[0],
              title: 'Body Composition Analysis',
              body: 'We track your progress beyond the scale. By monitoring muscle mass and visceral fat, we ensure your microdose is promoting a healthy, toned physique rather than just "weight" loss.',
            },
            {
              icon: listIcons[1],
              title: 'Hormonal Synergy',
              body: 'GLP-1s are hormones. We review your insulin, thyroid, and sex hormone levels to ensure your microdosing protocol supports your overall hormonal balance.',
            },
            {
              icon: listIcons[2],
              title: 'Bloodwork Baseline',
              body: "Labwork is the foundation of the Microdosing Program. By understanding your baseline metabolic health, we can tailor a titration schedule that targets your specific needs—whether that's blood sugar stability, inflammation reduction, or appetite regulation.",
            },
          ],
          markersLabel: 'We review markers related to:',
          markers: [
            'Insulin Sensitivity & Glucose Control',
            'Systemic Inflammation',
            'Hormone Balance',
            'Cardiovascular & Lipid Health',
          ],
        }}
      />

      <MidPageCTA
        backgroundImage="https://www.agemanagementmed.com/themes/default/assets/images/hero-31-bg.jpg"
        backgroundPosition="72% top"
        title="Ready to Feel Like Yourself Again?"
        body="Take the next step toward personalized hormone optimization and long-term wellness."
        align="full"
      />


      <ProgramIncludedGrid
        title="What's Included in the Program"
        lead="Our microdosing journey is a concierge experience, providing you with the medical oversight needed to manage a precision peptide protocol safely and effectively."
        included={[
          {
            icon: cardIcons[0],
            title: 'Initial Clinical Consultation',
            description: 'A deep dive into your metabolic history and goals.',
          },
          {
            icon: cardIcons[1],
            title: 'Comprehensive Lab Review',
            description: 'Establishing your data-informed baseline.',
          },
          {
            icon: cardIcons[2],
            title: 'Precision<br/>Titration Plan',
            description: 'A customized, low-dose GLP-1 schedule.',
          },
          {
            icon: cardIcons[3],
            title: 'Ongoing Monitoring',
            description: 'Regular check-ins to adjust your dose as your metabolism shifts.',
          },
          {
            icon: cardIcons[4],
            title: 'Body Composition Scans',
            description: 'Frequent data points to track muscle retention.',
          },
        ]}
        additionalLabel="May Be Additional:"
        additional={[
          {
            icon: cardIcons[5],
            title: 'Medications',
            description: 'Compounded GLP-1 or GLP-1/GIP prescriptions.',
          },
          {
            icon: cardIcons[6],
            title: 'BHRT Integration',
            description: 'Synergistic hormone replacement therapies.',
          },
          {
            icon: cardIcons[7],
            title: 'Advanced Longevity Testing',
            description: 'For those looking to optimize healthspan.',
          },
        ]}
      />

      <FitCheckCallout
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785341657/photo-content-87-img_ufo98g.jpg',
          alt: 'A man smiling during a consultation walk outdoors',
        }}
        heading="Is Microdosing the Right Fit for You?"
        lead="This program is a unique fit if:"
        points={[
          'You want to eliminate "food noise" and compulsive cravings.',
          'You are already at or near your goal weight but struggle with metabolic "stubbornness."',
          "You've tried standard GLP-1 doses and found the side effects (fatigue, nausea) intolerable.",
          'You are on BHRT and want to improve your insulin sensitivity for better results.',
          'You are focused on longevity and the anti-inflammatory benefits of peptides.',
        ]}
      />

      {treatment.faqs.length ? <FAQAccordion title="Microdosing FAQs" items={treatment.faqs} /> : null}

      <ClosingCTA
        {...treatment.closingCta}
        title="Start Your Personalized Weight Loss Plan Today"
        body="You don't have to figure this out on your own."
        cta={{ ...treatment.closingCta.cta, label: 'Schedule a Consultation' }}
        backgroundImage="/sexual man/sw.jpg"
        contentMaxWidth={552}
      />
    </>
  )
}
