import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import type { Award } from '@/types/content'
import Link from 'next/link'

interface CredentialStripProps {
  eyebrow?: string
  title: string
  lead?: string
  /** Year the practice was founded, shown in the eyebrow badge. */
  foundingYear?: string
  ctaLabel?: string
  ctaHref?: string
  awards: Award[]
  background?: 'page' | 'alt' | 'raised'
}

export function CredentialStrip({
  title,
  lead,
  foundingYear = '2010',
  ctaLabel = 'Meet Dr. Collins and our team',
  ctaHref = '#team',
  awards,
  background = 'alt',
}: CredentialStripProps) {
  return (
    <Section background={background} spacing="md">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0B1330] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          {/* subtle diagonal watermark, echoes a ribbon/sash motif */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="credential-lines"
                width="64"
                height="64"
                patternTransform="rotate(35)"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="64" stroke="#F5F1E8" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#credential-lines)" />
          </svg>

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E8C766]">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                  <path d="M10 1.5l2.35 4.76 5.25.77-3.8 3.7.9 5.23L10 13.5l-4.7 2.46.9-5.23-3.8-3.7 5.25-.77L10 1.5z" />
                </svg>
                Trusted Since {foundingYear}
              </span>

              <h2 className="mt-5 font-serif text-3xl leading-[1.1] text-[#F5F1E8] sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>

              {lead && (
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#C7CCDE] sm:text-base">
                  {lead}
                </p>
              )}

              <Link
                href="/our-experts"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#F5F1E8] transition-colors hover:text-[#E8C766]"
              >
                <span className="border-b-2 border-[#C9A227] pb-0.5">Meet With Our Teams</span>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 -translate-y-px">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="hidden border-l border-white/10 pl-10 lg:block">
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8B93B0]">
                Recognized locally
              </p>
              <p className="mt-2 text-4xl font-serif text-[#F5F1E8]">
                {awards.length}
                <span className="ml-1 text-base font-sans font-normal text-[#8B93B0]">
                  awards &amp; honors
                </span>
              </p>
            </div>
          </div>

          {/* award row: wraps to a new line rather than clipping/scrolling, so every badge stays visible */}
          <div className="relative mt-12 lg:mt-14">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10  from-[#0B1330] to-transparent sm:w-16" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10  from-[#0B1330] to-transparent sm:w-16" />

            <ul className="flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-1 py-2 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
              {awards.map((award) => (
                <li key={award.src} className="flex-none snap-start">
                  <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-white/95 p-3 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-8px_rgba(0,0,0,0.6)] sm:h-28 sm:w-28">
                    <Image
                      src={award.src}
                      alt={award.alt}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}