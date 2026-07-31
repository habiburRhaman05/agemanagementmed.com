import { ArrowRight, UserRound, Hand, UserCircle2, Crown, type LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  androgeneticAlopecia: UserRound,
  thinningHair: Hand,
  recedingHairlines: UserCircle2,
  crownThinning: Crown,
}

type IconName = keyof typeof ICONS

function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? UserRound
}

const Icon: React.FC<{ name: IconName; className?: string; strokeWidth?: number }> = ({
  name,
  className = 'size-6',
  strokeWidth = 1.5,
}) => {
  const LucideIcon = getIcon(name)
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}

function TreatmentPhoto({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden bg-ink-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
     
    </div>
  )
}

const growthFactors = [
  'Stimulate dormant hair follicles',
  'Improve blood circulation to the scalp',
  'Strengthen existing hair strands',
  'Promote the growth of new, healthy hair',
]

interface CandidateItem {
  name: IconName
  label: string
}

const candidateItems: CandidateItem[] = [
  { name: 'androgeneticAlopecia', label: 'Androgenetic alopecia (male/female pattern baldness)' },
  { name: 'thinningHair', label: 'Thinning hair or reduced hair density' },
  { name: 'recedingHairlines', label: 'Receding hairlines' },
  { name: 'crownThinning', label: 'Crown thinning' },
]

const bestResults = [
  'Patients with hair loss in the last 2-5 years',
  'Balding patients with active hair follicles',
  'Individuals seeking natural, non-surgical solutions',
  'Patients who want to enhance hair transplant results',
]

const HowPRPTreatsHairLoss: React.FC = () => {
  return (
    <Section background="alt" spacing="lg">
      <Container>
        <div className="space-y-16">
          {/* Dark editorial card — image + copy */}
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl md:grid-cols-2">
              {/* <TreatmentPhoto className="min-h-40 md:min-h-full" /> */}
 <img
        src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785303991/hair-image_cb9wro.jpg"
        alt="Provider using a device to treat a patient's scalp"
        className="h-full w-full object-cover"
      />
              <div className="flex flex-col justify-center p-7 sm:p-9 md:p-10">
                <h2 className="font-display text-display-sm text-canvas-50">How Does PRP Treat Hair Loss?</h2>
                <p className="mt-4 text-body leading-relaxed text-canvas-50/75">
                  Platelet-Rich Plasma (PRP) therapy is a cutting-edge, non-surgical treatment that uses your
                  own blood&rsquo;s healing properties to stimulate hair growth. During the procedure, we draw a
                  small amount of your blood, process it to concentrate the platelets that fuel regeneration,
                  and inject the nutrient-rich plasma directly into your scalp.
                </p>
                <p className="mt-5 text-body-sm font-semibold text-canvas-50">
                  These concentrated platelets contain powerful growth factors that:
                </p>
                <ul className="mt-3 space-y-2">
                  {growthFactors.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                      <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Candidate section */}
          <div>
            <SectionHeader
              title="Who Is a Candidate For PRP For Hair Loss?"
              lead="PRP hair treatment is ideal for both men and women experiencing hair loss. PRP can be used for:"
              align="center"
            />

            <StaggerGroup
              as="ul"
              stagger={0.06}
              className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {candidateItems.map((item) => (
                <StaggerItem as="li" key={item.name}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Icon name={item.name} />
                    </span>
                    <p className="text-body-sm leading-snug text-canvas-600">{item.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Bottom image + text row */}
          <div className="rounded-3xl bg-white p-6 md:p-8 lg:p-10 shadow-sm border border-canvas-200 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
              <Reveal>
                <img
                  src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785304360/bets-result-in-see_y9elck.jpg"
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
        </div>
      </Container>
    </Section>
  )
}

export default HowPRPTreatsHairLoss
export { Icon, getIcon, ICONS }
export type { IconName }
