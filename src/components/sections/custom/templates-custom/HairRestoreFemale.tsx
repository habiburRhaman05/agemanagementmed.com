import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/female/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/female/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/female/ResultsAndTimeline'


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function HairRestoreFemaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        fullHeight
        centerUntilTablet
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <HowPRPTreatsHairLoss/>
      <PRPTreatmentProcess/>
      <ResultsAndTimeline/>



      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently asked questions"
          lead="Deciding on Platelet-Rich Plasma (PRP) hair treatment is important, and you likely have questions. Here are answers to common questions to help you make an informed decision."
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA
        title="Restore Your Hair Naturally!"
        body="Take the first step toward thicker, healthier hair with PRP therapy. Our expert team is ready to help you achieve your hair restoration goals using this revolutionary, natural treatment."
        cta={{ label: 'SCHEDULE A CONSULTATION →', href: '/book-appointment' }}
        backgroundImage="/images/hero-24-bg.jpg"
        note="*Individual results may vary. A consultation with our medical team is required to determine if PRP hair therapy is appropriate for your specific condition.*"
      />
    </>
  )
}
