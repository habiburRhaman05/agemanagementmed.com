import { Activity, Clock, Droplet, HeartPulse, Layers, Sparkles, Zap, type LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

interface ComparisonPoint {
  icon: LucideIcon
  label: string
}

interface ComparisonColumn {
  title: string
  points: ComparisonPoint[]
}

const co2Laser: ComparisonColumn = {
  title: 'CO2 Laser',
  points: [
    { icon: Layers, label: 'Rebuilds vaginal tissue structure' },
    { icon: Sparkles, label: 'Stimulates collagen production' },
    { icon: Droplet, label: 'Helps treat dryness and laxity' },
    { icon: Clock, label: 'Particularly beneficial after menopause' },
  ],
}

const prpTherapy: ComparisonColumn = {
  title: 'PRP Therapy',
  points: [
    { icon: Zap, label: 'Enhances sensitivity and nerve function' },
    { icon: HeartPulse, label: 'Improves circulation and cellular repair' },
    { icon: Activity, label: 'May improve orgasm quality and arousal' },
  ],
}

function ComparisonCard({ column }: { column: ComparisonColumn }) {
  return (
    <div className="h-full rounded-2xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-sm sm:p-8">
      <h3 className="font-display text-title-lg text-ink-950">{column.title}</h3>
      <ul className="mt-5 space-y-4">
        {column.points.map(({ icon: PointIcon, label }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <PointIcon className="size-4" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="pt-1 text-body-sm leading-snug text-canvas-600">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CO2LaserVsPRP: React.FC = () => {
  return (
    <Section background="alt" spacing="lg">
      <Container width="wide">
        <SectionHeader
          title="CO2 Laser Vs PRP Therapy: Understanding The Difference"
          lead="Laser therapy and PRP therapy address different aspects of female sexual health. Many women benefit from combining both therapies to address both tissue health and sexual responsiveness."
          align="center"
        />

        <Reveal>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
            <ComparisonCard column={co2Laser} />

            <span
              className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-body-sm font-semibold text-canvas-50"
              aria-hidden
            >
              VS
            </span>

            <ComparisonCard column={prpTherapy} />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export default CO2LaserVsPRP
