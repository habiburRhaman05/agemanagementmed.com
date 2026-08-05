import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/male/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/male/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/male/ResultsAndTimeline'


interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function HairRestoreMaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <HowPRPTreatsHairLoss />
      <PRPTreatmentProcess />
      <ResultsAndTimeline />

      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently asked questions"
          lead="Deciding on Platelet-Rich Plasma (PRP) hair treatment is important, and you likely have questions. Here are answers to common questions to help you make an informed decision."
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA
        {...treatment.closingCta}
        note="*Individual results may vary. A consultation with our medical team is required to determine if PRP hair therapy is appropriate for your specific condition.*"
      />
    </>
  )
}
