import Image from 'next/image'
import { ArrowRight, Dumbbell, Droplet, Gauge, Percent, type LucideIcon } from 'lucide-react'

import { AspectImage } from '@/components/ui/AspectImage'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

/**
 * Central icon registry — add new entries here and reference them by
 * name anywhere in the app instead of importing lucide icons ad hoc.
 */
const ICONS: Record<string, LucideIcon> = {
  bodyFat: Percent,
  muscleMass: Dumbbell,
  visceralFat: Gauge,
  waterBalance: Droplet,
}

type IconName = keyof typeof ICONS;

/** Look up a lucide icon component by name, with a safe fallback. */
function getIcon(name: IconName): LucideIcon {
  return ICONS[name] ?? Percent;
}

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = 'size-5', strokeWidth = 2 }) => {
  const LucideIcon = getIcon(name)
  return <LucideIcon className={className} strokeWidth={strokeWidth} />
}

const focusPoints = [
  'Understanding why weight gain is happening',
  'Creating a plan based on your body',
  'Identifying metabolic and hormonal factors',
  'Adjusting as your body changes',
]

const metrics: { name: IconName; label: string }[] = [
  { name: 'bodyFat', label: 'Body Fat Percentage' },
  { name: 'visceralFat', label: 'Visceral Fat' },
  { name: 'muscleMass', label: 'Muscle Mass' },
  { name: 'waterBalance', label: 'Water Balance' },
]

const PersonalizedMan: React.FC = () => {
  return (
    <>
      {/* Dark editorial card — image + copy, mirrors the TreatmentProcess card treatment */}
      <Section background="page" spacing="lg">
        <Container>
          <Reveal>
            <div className="grid overflow-hidden rounded-3xl bg-ink-950 shadow-xl lg:grid-cols-[44%_56%]">
              <div className="relative min-h-64 lg:min-h-full">
                <AspectImage
                  media={{
                    src: 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-64-img.jpg',
                    alt: 'A physician greeting a patient during a weight loss consultation',
                  }}
                  ratio="square"
                  rounded={false}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="h-full"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
                <h2 className="font-display text-display-sm text-canvas-50">
                  A More Personalized Approach To Weight Loss
                </h2>

                <p className="mt-5 text-body-lg leading-relaxed text-canvas-50/75">
                  This program is designed for people who want more than a
                  one-size-fits-all plan.
                </p>

                <div className="mt-8">
                  <p className="text-label font-semibold uppercase tracking-[0.14em] text-sage-400">
                    We focus on
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {focusPoints.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                        <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-8 text-body-sm leading-relaxed text-canvas-50/60">
                  This is what makes medical weight loss more effective than
                  generic programs.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Light editorial block — copy + pill metrics, image */}
      <Section background="page" spacing="lg" className="pt-20 lg:pt-20 bg-sage-100">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
            <Reveal className="flex flex-col justify-center lg:col-span-7">
              <h2 className="font-display text-display-sm text-ink-950">
                What A Body Composition Scan Tells Us
              </h2>

              <div className="mt-5 space-y-4 text-body leading-relaxed text-canvas-600">
                <p>
                  Weight alone doesn&rsquo;t tell the full story. That&rsquo;s why we use
                  body composition scans to look deeper.
                </p>
                <p className="font-medium text-ink-900">Our body composition scanner measures:</p>
              </div>

              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <li
                    key={metric.name}
                    className="flex items-center gap-3 rounded-full border border-sage-600/30 bg-sage-50/60 px-5 py-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      <Icon name={metric.name} />
                    </span>
                    <span className="text-body-sm font-medium text-ink-900">{metric.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-4 text-body leading-relaxed text-canvas-600">
                <p>
                  This helps us understand how your body is changing, not just
                  what the scale says.
                </p>
                <p>
                  For example, you might be losing fat while gaining muscle,
                  which is progress that a standard scale would miss.
                </p>
                <p>
                  If you&rsquo;re looking for a body composition scan in Savannah,
                  this is one of the most valuable tools we use to guide your
                  plan.
                </p>
              </div>
            </Reveal>

            <Reveal side="left" className="lg:col-span-5">
              <div className="relative h-full min-h-80 overflow-hidden rounded-3xl shadow-lg lg:min-h-0">
                <Image
                  src="https://www.agemanagementmed.com/themes/default/assets/images/photo-content-65-img.jpg"
                  alt="A man measuring his waist with a tape measure after a body composition scan"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default PersonalizedMan
export { Icon, getIcon, ICONS };
export type { IconName };
