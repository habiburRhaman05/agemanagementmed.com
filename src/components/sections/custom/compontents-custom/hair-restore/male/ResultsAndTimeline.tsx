import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Settings2,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

const ICONS: Record<string, LucideIcon> = {
  immediateEffects: Sparkles,
  progressiveResults: TrendingUp,
  maintenance: Settings2,
  naturalSafe: ShieldCheck,
  minimallyInvasive: Zap,
  provenResults: BadgeCheck,
  versatileTreatment: Users,
}

type IconName = keyof typeof ICONS

function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? Sparkles
}

const Icon: React.FC<{ name: IconName; className?: string; strokeWidth?: number }> = ({
  name,
  className = 'size-7',
  strokeWidth = 1.5,
}) => {
  const LucideIcon = getIcon(name)
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}

interface TimelineCard {
  name: IconName
  title: string
  bg: string
  content: React.ReactNode
}

const timelineCards: TimelineCard[] = [
  {
    name: 'immediateEffects',
    title: 'Immediate Effects',
    bg: 'bg-sage-100',
    content: (
      <ul className="space-y-1.5 text-body-sm text-canvas-600">
        {[
          'Minimal discomfort during treatment',
          'Slight scalp tenderness for 24-48 hours',
          'No significant downtime required',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-600" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: 'progressiveResults',
    title: 'Progressive Results',
    bg: 'bg-sage-100',
    content: (
      <div className="space-y-3 text-body-sm text-canvas-600">
        <div>
          <p className="font-semibold text-ink-900">2–3 months</p>
          <p>Initial signs of improved hair quality</p>
        </div>
        <div>
          <p className="font-semibold text-ink-900">4–6 months</p>
          <p>Noticeable increase in hair thickness &amp; density</p>
        </div>
        <div>
          <p className="font-semibold text-ink-900">6–12 months</p>
          <p>Optimal results with continued improvement</p>
        </div>
      </div>
    ),
  },
  {
    name: 'maintenance',
    title: 'Maintenance',
    bg: 'bg-sage-100',
    content: (
      <div className="space-y-3 text-body-sm text-canvas-600">
        <div>
          <p className="font-semibold text-ink-900">Initial series</p>
          <p>3-4 treatments spaced 4-6 weeks apart</p>
        </div>
        <div>
          <p className="font-semibold text-ink-900">Maintenance</p>
          <p>1-2 treatments annually</p>
        </div>
      </div>
    ),
  },
]

interface BenefitCard {
  name: IconName
  title: string
  bullets: string[]
}

const benefitCards: BenefitCard[] = [
  {
    name: 'naturalSafe',
    title: 'Natural & Safe',
    bullets: [
      'Uses your own blood - no risk of allergic reactions',
      'No synthetic chemicals or foreign substances',
      'FDA-cleared procedure',
    ],
  },
  {
    name: 'minimallyInvasive',
    title: 'Minimally Invasive',
    bullets: ['No surgery required', 'Quick, in-office procedure', 'Immediate return to daily activities'],
  },
  {
    name: 'provenResults',
    title: 'Proven Results',
    bullets: [
      'Clinically demonstrated hair growth improvement',
      'Increases hair density and thickness',
      'Strengthens existing hair follicles',
    ],
  },
  {
    name: 'versatileTreatment',
    title: 'Versatile Treatment',
    bullets: [
      'Effective for both men and women',
      'Can be combined with other hair loss treatments',
      'Enhances hair transplant outcomes',
    ],
  },
]

const ResultsAndTimeline: React.FC = () => {
  return (
    <Section background="page" spacing="lg">
      <Container width="wide">
        <SectionHeader eyebrow="What to expect" title="Results & Timeline" align="center" />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3"
        >
          {timelineCards.map((card) => (
            <StaggerItem as="li" className="h-full" key={card.title}>
              <div className={`h-full rounded-2xl p-6 ${card.bg}`}>
                <span className="flex size-12 items-center justify-center rounded-full bg-white/60 text-sage-700">
                  <Icon name={card.name} />
                </span>
                <h3 className="mt-4 font-display text-title-md text-ink-950">{card.title}</h3>
                <div className="mt-3">{card.content}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-16">
          <h2 className="text-center font-display text-display-sm text-ink-950">Benefits of PRP Hair Therapy</h2>

          <StaggerGroup
            as="ul"
            stagger={0.08}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2"
          >
            {benefitCards.map((card) => (
              <StaggerItem as="li" key={card.title}>
                <div className="h-full rounded-2xl bg-ink-900 p-6 shadow-md md:p-7">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sage-400">
                    <Icon name={card.name} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-title-lg text-canvas-50">{card.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <ArrowRight className="mt-1 size-3.5 shrink-0 text-sage-400" aria-hidden />
                        <span className="text-body-sm leading-snug text-canvas-50/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  )
}

export default ResultsAndTimeline
export { Icon, getIcon, ICONS }
export type { IconName }