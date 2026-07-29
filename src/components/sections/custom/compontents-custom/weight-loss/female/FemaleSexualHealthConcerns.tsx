import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ClipboardList, Atom, Hexagon, Clock, type LucideIcon } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  personalizedCare: ClipboardList,
  regenerativeMedicine: Atom,
  tissueRestoration: Hexagon,
  minimalDowntime: Clock,
}

type IconName = keyof typeof ICONS

function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? ClipboardList
}

const Icon: React.FC<{ name: IconName; className?: string; strokeWidth?: number }> = ({
  name,
  className = 'size-6',
  strokeWidth = 1.5,
}) => {
  const LucideIcon = getIcon(name)
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}

const symptoms = [
  'Vaginal dryness or discomfort',
  'Pain during intercourse',
  'Reduced sexual sensitivity',
  'Difficulty achieving orgasm',
  'Vaginal laxity after childbirth',
  'Mild urinary leakage or stress incontinence',
]

interface FeatureItem {
  name: IconName
  title: string
  description: string
}

const features: FeatureItem[] = [
  {
    name: 'personalizedCare',
    title: 'Personalized Care',
    description: "Every woman's health journey is unique. We tailor treatments to your symptoms and goals.",
  },
  {
    name: 'regenerativeMedicine',
    title: 'Regenerative Medicine',
    description: "PRP uses your body's natural growth factors to enhance sensitivity and cellular repair.",
  },
  {
    name: 'tissueRestoration',
    title: 'Tissue Restoration',
    description: 'Our therapies stimulate collagen production and improve vaginal tissue health.',
  },
  {
    name: 'minimalDowntime',
    title: 'Minimal Downtime',
    description: 'Treatments are quick, discreet, and designed to fit into your lifestyle.',
  },
]

const FemaleSexualHealthConcerns: React.FC = () => {
  return (
    <Section background="page" spacing="lg">
      <Container>
        {/* Dark editorial card — image + symptoms, mirrors the site's other treatment intro cards */}
        <Reveal>
          <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[42%_58%]">
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785348763/sexual-wellniess_j4jzp4.jpg"
                alt="A woman reflecting on changes to her intimacy and wellness"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
              {/* Color must be set directly on the heading — globals.css's `h1..h6 { color: var(--text-heading) }`
                  base rule outranks an inherited `text-white` from a parent, which was making this heading
                  render nearly invisible against the dark card. */}
              <h2 className="font-display text-display-sm text-canvas-50">
                Common Female Sexual Health Concer
              </h2>

              <p className="mt-5 text-body-lg leading-relaxed text-canvas-50/75">
                Many women experience physical changes that impact intimacy, comfort, and sexual
                satisfaction — especially after childbirth or during menopause.
              </p>

              <p className="mt-4 text-body leading-relaxed text-canvas-50/75">
                Our treatments address the underlying causes of these changes by restoring tissue
                health, improving circulation, and enhancing sensitivity.
              </p>

              <Eyebrow tone="inverse" className="mt-7">
                Common symptoms treated
              </Eyebrow>

              <ul className="mt-4 space-y-2.5">
                {symptoms.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                    <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Light content — therapies overview + feature cards */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <Reveal>
            <h2 className="font-display text-display-sm text-ink-950">
              Advanced Therapies For Female Sexual Health
            </h2>
            <p className="mt-5 text-body leading-relaxed text-canvas-600">
              Our treatments focus on restoring the structural health of vaginal tissue while
              improving nerve sensitivity and circulation.
            </p>
            <p className="mt-4 text-body leading-relaxed text-canvas-600">
              By combining regenerative medicine with advanced laser technologies, we help women
              regain comfort, confidence, and sexual wellness.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-5 text-left sm:grid-cols-2"
        >
          {features.map((feature) => (
            <StaggerItem as="li" key={feature.name} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-canvas-300/60 bg-canvas-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <Icon name={feature.name} />
                </span>
                <p className="text-body-sm leading-relaxed text-canvas-600">
                  <span className="font-semibold text-ink-900">{feature.title}</span> — {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/book-appointment">
              Schedule a consultation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default FemaleSexualHealthConcerns
export { Icon, getIcon, ICONS }
export type { IconName }
