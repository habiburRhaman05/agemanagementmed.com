import Link from 'next/link'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'

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

/** Thin long-stem arrow used throughout the site's brand CTAs/bullets — matches BookAppointmentButton. */
function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TreatmentCard({ data }: { data: TreatmentOptionCard }) {
  const isFeatured = Boolean(data.featured)

  return (
    <div
      className={cn(
        'rounded-[28px] p-8 sm:p-10 lg:p-12',
        isFeatured ? 'bg-[#0f1c3f]' : 'border border-ink-950/10 bg-white'
      )}
    >
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10 lg:gap-12">
        <div className="shrink-0 rounded-full border border-[#519B99]/70 p-2 sm:p-2.5">
          <div
            className={cn(
              'size-32 overflow-hidden rounded-full bg-cover bg-center sm:size-40 lg:size-50',
              data.imageBg ?? 'bg-canvas-200'
            )}
            style={{ backgroundImage: `url('${data.image}')` }}
            role="img"
            aria-label={data.title}
          />
        </div>

        <div className="flex-1">
          <h3
            className={cn(
              'font-display text-[24px] leading-tight sm:text-[28px] lg:text-[32px]',
              isFeatured ? 'text-white' : 'text-ink-950'
            )}
          >
            {data.title}
          </h3>
          <p
            className={cn(
              'mt-3 text-[15px] leading-relaxed font-light sm:text-[16px]',
              isFeatured ? 'text-white/80' : 'text-canvas-600'
            )}
          >
            {data.description}
          </p>

          <p
            className={cn(
              'mt-6 text-[13px] font-bold tracking-wide uppercase',
              isFeatured ? 'text-white' : 'text-ink-950'
            )}
          >
            {data.label}
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {data.bullets.map((bullet) => (
              <li
                key={bullet}
                className={cn(
                  'flex items-center gap-2.5 text-[15px] font-light sm:text-[16px]',
                  isFeatured ? 'text-white/90' : 'text-canvas-600'
                )}
              >
                <ArrowSvg className="text-[#519B99]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {data.cta ? (
            data.cta.href === '/book-appointment' ? (
              <BookAppointmentButton className="mt-7">{data.cta.label}</BookAppointmentButton>
            ) : (
              <Link
                href={data.cta.href}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#519B99] px-8 py-[15px] font-sans text-[14px] font-bold tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-[#458785]"
              >
                {data.cta.label}
                <ArrowSvg className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )
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
    <Section className='bg-white' spacing="md">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />
<div className="radial-gradient"></div>
        <div className="mt-10 space-y-6 sm:space-y-8">
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
