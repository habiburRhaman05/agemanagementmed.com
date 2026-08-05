import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/Button'

export interface TreatmentOptionCard {
  image: string
  imageBg?: string
  title: string
  description: string
  label: string
  bullets: string[]
  cta?: { label: string; href: string }
  /** First/hero card in the stack — rendered on a dark card with a CTA. */
  featured?: boolean
}

export interface TreatmentOptionsStackProps {
  eyebrow?: string
  title: string
  lead?: string
  treatments: TreatmentOptionCard[]
}

function TreatmentCard({ data }: { data: TreatmentOptionCard }) {
  const isFeatured = Boolean(data.featured)

  return (
    <div
      className={
        isFeatured
          ? 'rounded-3xl bg-ink-950 p-6 sm:p-8'
          : 'rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 sm:p-8'
      }
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <div
          className={`size-24 shrink-0 overflow-hidden rounded-full bg-cover bg-center sm:size-28 ${data.imageBg ?? 'bg-canvas-200'} ${isFeatured ? 'ring-4 ring-white/15' : 'ring-4 ring-canvas-100'}`}
          style={{ backgroundImage: `url('${data.image}')` }}
          role="img"
          aria-label={data.title}
        />

        <div className="flex-1">
          <h3 className={`font-display text-[20px] lg:text-[24px] ${isFeatured ? 'text-canvas-50' : 'text-ink-950'}`}>
            {data.title}
          </h3>
          <p className={`mt-2 text-body-sm font-light leading-relaxed ${isFeatured ? 'text-canvas-50/80' : 'text-canvas-600'}`}>
            {data.description}
          </p>

          <p className={`mt-4 text-label font-bold uppercase tracking-wide ${isFeatured ? 'text-canvas-50' : 'text-ink-950'}`}>
            {data.label}
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {data.bullets.map((bullet) => (
              <li
                key={bullet}
                className={`flex items-start gap-2 text-body-sm font-light ${isFeatured ? 'text-canvas-50/90' : 'text-canvas-600'}`}
              >
                <ArrowRight
                  className={`mt-0.5 size-4 shrink-0 ${isFeatured ? 'text-sage-400' : 'text-sage-600'}`}
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {data.cta ? (
            <Button asChild size="sm" variant={isFeatured ? 'inverse' : 'primary'} className="mt-5 font-bold">
              <Link href={data.cta.href}>
                {data.cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/**
 * Reusable stacked treatment-options section — one dark "featured" card
 * followed by plain cards. Same shape works for the men's and women's
 * sexual-wellness pages by passing different `treatments` data.
 */
export function TreatmentOptionsStack({ eyebrow, title, lead, treatments }: TreatmentOptionsStackProps) {
  return (
    <Section background="alt" spacing="md">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />

        <div className="mt-10 space-y-5">
          {treatments.map((treatment) => (
            <Reveal key={treatment.title}>
              <TreatmentCard data={treatment} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
