import {
  FileText,
  Dna,
  PersonStanding,
  ClipboardPlus,
  UserCheck,
  Pill,
  Syringe,
  PillBottle,
  type LucideIcon,
} from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  consultation: FileText,
  labTesting: Dna,
  bodyComposition: PersonStanding,
  treatmentPlan: ClipboardPlus,
  followUp: UserCheck,
  medications: Pill,
  advancedTesting: Syringe,
  supplements: PillBottle,
}

type IconName = keyof typeof ICONS

/** Look up a lucide icon component by name, with a safe fallback. */
function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? FileText
}

interface IconProps {
  name: IconName
  className?: string
  strokeWidth?: number
}

const Icon: React.FC<IconProps> = ({ name, className = 'size-7', strokeWidth = 1.5 }) => {
  const LucideIcon = getIcon(name)
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}

interface ProgramItem {
  name: IconName
  label: string
}

const included: ProgramItem[] = [
  { name: 'consultation', label: 'Initial Consultation With A Provider' },
  { name: 'labTesting', label: 'Lab Testing And Review' },
  { name: 'bodyComposition', label: 'Body Composition Scans' },
  { name: 'treatmentPlan', label: 'Personalized Treatment Plan' },
  { name: 'followUp', label: 'Ongoing Follow Up Visits And Adjustments' },
]

const additional: ProgramItem[] = [
  { name: 'medications', label: 'Medications If Prescribed' },
  { name: 'advancedTesting', label: 'Advanced Testing If Needed' },
  { name: 'supplements', label: 'Supplements Based On Your Plan' },
]

function ProgramCard({ item }: { item: ProgramItem }) {
  return (
    <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg sm:p-8">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
        <Icon name={item.name} />
      </span>
      <p className="text-body-sm font-medium leading-snug text-ink-900">{item.label}</p>
    </div>
  )
}

function CardGrid({ items }: { items: ProgramItem[] }) {
  return (
    <StaggerGroup
      as="ul"
      stagger={0.06}
      className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3"
    >
      {items.map((item) => (
        <StaggerItem as="li" key={item.name} className="h-full">
          <ProgramCard item={item} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}

const WhatsIncluded: React.FC = () => {
  return (
    <Section background="page" spacing="lg">
      <Container width="wide">
        <SectionHeader
          eyebrow="Program details"
          title="What's Included In The Program"
          lead="We want you to know exactly what to expect."
          align="center"
        />

        <div className="mt-14 space-y-14">
          <div>
            <h3 className="text-center font-display text-title-lg text-ink-950">Included</h3>
            <div className="mt-6">
              <CardGrid items={included} />
            </div>
          </div>

          <div>
            <h3 className="text-center font-display text-title-lg text-ink-950">May Be Additional</h3>
            <div className="mt-6">
              <CardGrid items={additional} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default WhatsIncluded
export { Icon, getIcon, ICONS }
export type { IconName }
