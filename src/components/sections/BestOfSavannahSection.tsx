import Image from 'next/image'

import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'
import { type AwardHonoree, type AwardPlacement, bestOfSavannah2026 } from '@/content/awards'
import { cn } from '@/lib/utils'
import type { Person } from '@/types/content'

interface BestOfSavannahSectionProps {
  /** Published providers, used only to pull each honoree's real portrait. */
  people: Person[]
  title?: string
  lead?: string
}

/** Winner reads in the brand teal, runner-up in the brand navy, everywhere in the card. */
const TONES: Record<
  AwardPlacement,
  { band: string; chip: string; iconBg: string; medal: string; label: string }
> = {
  Winner: {
    band: 'from-[#cfe6df] via-[#e2f0eb] to-[#f4f9f7]',
    chip: 'bg-[#427f7d] text-white',
    iconBg: 'bg-[#427f7d]/10',
    medal: '#427f7d',
    label: 'text-[#427f7d]',
  },
  'Runner-up': {
    band: 'from-[#d8dfee] via-[#e7ebf5] to-[#f5f7fb]',
    chip: 'bg-[#14214b] text-white',
    iconBg: 'bg-[#14214b]/5',
    medal: '#14214b',
    label: 'text-[#14214b]/70',
  },
}

/** "2× Winner" / "Runner-up": the headline placement shown on each card's chip. */
function headlinePlacement(honoree: AwardHonoree): { placement: AwardPlacement; text: string } {
  const placement: AwardPlacement = honoree.honors.some((h) => h.placement === 'Winner')
    ? 'Winner'
    : 'Runner-up'
  const count = honoree.honors.filter((h) => h.placement === placement).length
  return { placement, text: count > 1 ? `${count}× ${placement}` : placement }
}

function MedalIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
      <path d="M7.5 1.5h3.6l1.4 6.2-3.3 1.4-1.7-7.6Z" fill={color} opacity="0.5" />
      <path d="M16.5 1.5h-3.6l-1.4 6.2 3.3 1.4 1.7-7.6Z" fill={color} opacity="0.75" />
      <circle cx="12" cy="15.5" r="6.5" fill={color} />
      <path
        d="M12 11.9l1.08 2.2 2.42.35-1.75 1.7.41 2.41L12 17.42l-2.16 1.14.41-2.41-1.75-1.7 2.42-.35L12 11.9Z"
        fill="#fff"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className="h-3 w-3" fill="currentColor">
      <path d="M6 .8l1.53 3.1 3.42.5-2.47 2.41.58 3.4L6 8.6 2.94 10.2l.58-3.4L1.05 4.4l3.42-.5L6 .8Z" />
    </svg>
  )
}

/**
 * Homepage "Best of Savannah 2026" spotlight. Pale sage band (`sage-50`, the
 * design system's alternating section tint against the ivory page) holding a
 * centered legacy-style header with the seal, a single category-wins stat
 * pill, one card per honored provider, and a CTA styled identically to the
 * other ported `lg-btn` CTAs on the page (see `HeroBand`'s `cta` block).
 */
export function BestOfSavannahSection({
  people,
  title = "Recognized by Savannah. Trusted by You.",
  lead = 'Savannah Magazine readers named our providers among the best in the city, with top honors for Functional Medicine and Hormone Therapy and a runner-up finish for Weight Loss. We’re deeply grateful to every patient who voted for us.',
}: BestOfSavannahSectionProps) {
  const { seal, year, honorees } = bestOfSavannah2026
  const categoryWins = honorees
    .flatMap((honoree) => honoree.honors)
    .filter((h) => h.placement === 'Winner').length

  return (
    <section
      id="best-of-savannah"
      aria-labelledby="best-of-savannah-title"
      className="relative w-full overflow-hidden bg-sage-50 py-20 md:py-28"
    >
      {/* Soft light from above so the band doesn't read as a flat fill. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.85),transparent_65%)]"
      />

      <div className="lg-max-width-1440 relative">
        <div className="lg-container">
          <div className="lg-content-d">
            {/* <div className="mb-6 flex justify-center">
              <Image
                src={seal.src}
                alt={seal.alt}
                width={236}
                height={256}
                className="h-28 w-auto drop-shadow-[0_18px_30px_rgba(20,33,75,0.25)] md:h-32"
              />
            </div> */}

            <h2 className="lg-top-title">Best of Savannah {year}</h2>

            <h3 id="best-of-savannah-title" className="lg-title text-[34px]! md:text-[48px]!">
              {title}
            </h3>
            <div className="lg-text lg-max-width-800">
              <p className="mb-0!">{lead}</p>
            </div>
          </div>

          {/* <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 shadow-[0_3.8px_47.5px_0_rgba(0,0,0,0.05)]">
              <span className="font-display text-[32px] leading-none text-[#427f7d]">{categoryWins}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Category Wins
              </span>
            </div>
          </div> */}

          <div className="mx-auto mt-12 grid max-w-md gap-7 md:mt-14 lg:max-w-none lg:grid-cols-3">
            {honorees.map((honoree) => {
              const person = people.find((p) => p.name.toLowerCase().includes(honoree.match))
              const name = person?.name ?? honoree.name
              const credentials = person?.credentials ?? honoree.credentials
              const headline = headlinePlacement(honoree)
              const tone = TONES[headline.placement]
              const initials = name
                .split(' ')
                .filter(Boolean)
                .map((part) => part[0])
                .slice(0, 2)
                .join('')

              return (
                <article
                  key={honoree.match}
                  className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_-30px_rgba(20,33,75,0.3)] ring-1 ring-[#14214b]/5 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-30px_rgba(20,33,75,0.4)]"
                >
                  <div className={cn('relative h-28 bg-gradient-to-br', tone.band)}>
                    <span aria-hidden className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/40" />
                    <span
                      className={cn(
                        'absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] shadow-sm',
                        tone.chip,
                      )}
                    >
                      <StarIcon />
                      {headline.text}
                    </span>
                    <span className="absolute right-5 top-6 text-[11px] font-bold tracking-[0.2em] text-[#14214b]/55">
                      {year}
                    </span>
                  </div>

                  <div className="relative -mt-16 flex justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-[5px] border-white bg-[#eef1f8] shadow-[0_14px_30px_-12px_rgba(20,33,75,0.45)]">
                      {person?.portrait?.src ? (
                        <Image
                          src={person.portrait.src}
                          alt={person.portrait.alt || name}
                          fill
                          sizes="128px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-display text-4xl text-[#14214b]">
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5 text-center md:px-7">
                    <h4 className="font-display text-[28px] leading-tight text-[#14214b]">{name}</h4>
                    {credentials ? (
                      <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                        {credentials}
                      </p>
                    ) : null}

                    <ul className="mt-6 flex-1 space-y-2.5 text-left">
                      {honoree.honors.map((honor) => {
                        const honorTone = TONES[honor.placement]
                        return (
                          <li
                            key={`${honor.placement}-${honor.category}`}
                            className="flex items-center gap-3.5 rounded-2xl border border-[#14214b]/10 px-4 py-3"
                          >
                            <span
                              className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                                honorTone.iconBg,
                              )}
                            >
                              <MedalIcon color={honorTone.medal} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[15px] font-semibold leading-snug text-[#14214b]">
                                {honor.category}
                              </p>
                              <p
                                className={cn(
                                  'mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em]',
                                  honorTone.label,
                                )}
                              >
                                {honor.placement}
                              </p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>

                    <p className="mt-6 border-t border-[#14214b]/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Savannah Magazine · Best of Doctors
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <LegacyCtaLink href="/our-experts" className="lg-btn lg-btn-arrow-right lg-btn-arrow-svg group">
              Meet our award-winning experts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                className="absolute right-[25px] top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover:translate-x-2"
              >
                <path
                  d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
                  fill="white"
                />
              </svg>
            </LegacyCtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
