import type { LucideIcon } from 'lucide-react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'

export interface PrpOfferSymptomsItem {
  icon: LucideIcon
  title: string
  description: string
}

export interface PrpOfferSymptomsSectionProps {
  /** Top (navy) half — opening "why this treatment" statement. */
  image: Media
  heading: string
  paragraph: string
  bulletsLabel?: string
  bullets: string[]
  /** Bottom (white) half — "how it works" explainer. */
  worksHeading: string
  worksLead: string
  items: PrpOfferSymptomsItem[]
  cta?: { label: string; modalTitle?: string }
}

/**
 * PRP offer page's opening statement + "how it works" explainer, merged into
 * ONE continuous elevated card (navy top half seamlessly into a white bottom
 * half — no gap/shadow break between them), matching the reference design.
 * Combines what `WhyChoosePrpCard` + `HowPrpWorksGrid` render as two
 * separate sections into a single unit.
 */
export function PrpOfferSymptomsSection({
  image,
  heading,
  paragraph,
  bulletsLabel,
  bullets,
  worksHeading,
  worksLead,
  items,
  cta,
}: PrpOfferSymptomsSectionProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            {/* TOP HALF — navy image + copy */}
            <div className="grid grid-cols-1 bg-[#0B1938] text-white lg:grid-cols-[42%_58%]">
              <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: image.focalPoint ?? 'center' }}
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <h2
                  className="text-[32px] font-medium leading-tight text-white sm:text-[40px] font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  {heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/75">{paragraph}</p>

                {bulletsLabel ? <p className="mt-6 text-base font-bold text-white">{bulletsLabel}</p> : null}

                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-base text-white/90">
                      <span className="mt-0.5 shrink-0 text-[#519B99]">→</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BOTTOM HALF — white "how it works" explainer */}
            <div className="bg-white p-6 sm:p-10 lg:p-12 xl:p-16">
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <h3
                  className="text-[32px] font-medium leading-tight text-ink-950 sm:text-[40px] font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  {worksHeading}
                </h3>
                <p className="text-base leading-relaxed text-ink-950 md:pt-2">{worksLead}</p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:gap-x-16">
                {items.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 text-[#519B99]">
                      <item.icon className="size-7" strokeWidth={1.75} aria-hidden />
                    </span>
                    <p className="text-base leading-relaxed text-ink-950">
                      <span className="font-bold">{item.title}</span> - {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {cta ? (
                <div className="mt-12 flex justify-center">
                  <BookAppointmentButton variant="teal" modalTitle={cta.modalTitle ?? 'Schedule A Consultation'}>
                    {cta.label}
                  </BookAppointmentButton>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
