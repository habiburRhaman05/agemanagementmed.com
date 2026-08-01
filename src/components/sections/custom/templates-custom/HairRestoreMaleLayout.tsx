import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/male/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/male/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/male/ResultsAndTimeline'
import { Reveal } from '@/components/shared/Reveal'
import { ArrowRight } from 'lucide-react'




interface TreatmentTemplateProps {
  treatment: Treatment
}
const bestResults = [
  'Patients with hair loss in the last 2-5 years',
  'Balding patients with active hair follicles',
  'Individuals seeking natural, non-surgical solutions',
  'Patients who want to enhance hair transplant results',
]

export async function HairRestoreMaleLayout({ treatment }: TreatmentTemplateProps) {
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

      <HowPRPTreatsHairLoss/>
      <PRPTreatmentProcess/>
         {/* Bottom image + text row */}
                <div className="rounded-3xl bg-white p-6 md:p-8 lg:p-10 shadow-sm border border-canvas-200 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                    <Reveal>
                      <img
                        src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785599006/men-hair-restoration_krr29t.jpg"
                        alt="Smiling patient outdoors after treatment"
                        className="w-full aspect-[4/3] rounded-2xl object-cover"
                      />
                    </Reveal>
      
                    <Reveal side="left">
                      <div className="md:px-6">
                        <h2 className="font-display text-display-sm text-ink-950">Best Results Seen In:</h2>
                        <ul className="mt-6 space-y-3.5">
                          {bestResults.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <ArrowRight className="mt-1 size-4 shrink-0 text-sage-600" aria-hidden />
                              <span className="text-body leading-relaxed text-canvas-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                </div>
      <ResultsAndTimeline/>



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
