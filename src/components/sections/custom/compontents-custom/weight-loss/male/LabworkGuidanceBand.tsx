import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface LabworkGuidanceBandProps {
  image?: string
}

const leftMarkers = [
  'Mitochondrial and insulin function',
  'Thyroid health',
  'Hormone balance',
  'Inflammation levels',
]

const rightMarkers = [
  'Why weight loss has stalled',
  'Why you feel low energy',
  "Why certain diets haven't worked",
]

/**
 * "How We Use Labwork To Guide Your Plan" band — full-bleed, no rounded
 * corners, image left ~55% / dark-navy content panel right ~45%.
 * Matches the reference screenshot exactly.
 */
export function LabworkGuidanceBand({
  image = '/weightloss/weightloss1.jpg',
}: LabworkGuidanceBandProps) {
  return (
    <section className="w-full overflow-hidden bg-[#1a2744]">
      <div className="grid lg:grid-cols-[55%_45%]">
        {/* ── Left: full-bleed photo (top 40% visible) ── */}
        <div className="relative overflow-hidden min-h-64 lg:min-h-[635px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="A provider reviewing labwork results with a patient"
            className="absolute top-0 left-0 w-full"
            style={{ height: 'auto' }}
          />
        </div>

        {/* ── Right: navy content panel ── */}
        <div className="flex flex-col justify-center bg-[#1a2744] px-8 py-10 sm:px-10 lg:px-12 lg:py-14">
          <h2 className="font-display text-[22px] font-semibold leading-snug text-white sm:text-[26px] lg:text-[28px]">
            How We Use Labwork To<br className="hidden sm:block" /> Guide Your Plan
          </h2>

          <p className="mt-4 text-sm font-semibold text-white">We don&apos;t guess. We test.</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/80">
            Labwork helps us understand what&apos;s happening inside your body so we can build a plan that
            actually works.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {/* Left column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/90">
                We may review markers related to:
              </p>
              <ul className="mt-2 space-y-1.5">
                {leftMarkers.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-light text-white/75">
                    <ArrowRight className="mt-0.5 size-3 shrink-0 text-white/60" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/90">
                These markers help explain things like:
              </p>
              <ul className="mt-2 space-y-1.5">
                {rightMarkers.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-light text-white/75">
                    <ArrowRight className="mt-0.5 size-3 shrink-0 text-white/60" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 text-sm font-light leading-relaxed text-white/75">
            <p>
              We review hormone balance and other factors that may impact weight. Learn more about our{' '}
              <Link
                href="/bioidentical-hormone-replacement-therapy"
                className="underline underline-offset-2 hover:text-white"
              >
                BHRT Therapy
              </Link>{' '}
              services, including{' '}
              <Link
                href="/bioidentical-hormone-replacement-therapy/male"
                className="underline underline-offset-2 hover:text-white"
              >
                Hormone Therapy for Men
              </Link>{' '}
              and{' '}
              <Link
                href="/bioidentical-hormone-replacement-therapy/female"
                className="underline underline-offset-2 hover:text-white"
              >
                Hormone Therapy for Women
              </Link>
              .
            </p>
            <p>
              From there, we build a plan based on your results and adjust it over time as your body
              responds.
            </p>
            <p>This is what makes data-guided weight loss more precise and sustainable.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

