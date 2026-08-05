import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface LabworkGuidanceBandProps {
  image?: string
}

const leftMarkers = ['Metabolism and insulin function', 'Thyroid health', 'Hormone balance', 'Inflammation levels']

const rightMarkers = ["Why weight loss has stalled", 'Why you feel low energy', "Why certain diets haven't worked"]

/**
 * New "How We Use Labwork To Guide Your Plan" band: pure Tailwind, no
 * legacy.css dependency — image left, navy card right with a two-column
 * marker comparison and closing paragraphs with inline links.
 */
export function LabworkGuidanceBand({
  image = '/weightloss/weightloss1.jpg',
}: LabworkGuidanceBandProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
      <div className="grid overflow-hidden rounded-3xl bg-ink-950 lg:grid-cols-[42%_58%]">
        <div className="relative min-h-56 lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="A provider reviewing labwork results with a patient"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
          <h2 className="font-display text-[26px] leading-tight text-canvas-50 sm:text-[30px] lg:text-[32px]">
            How We Use Labwork To Guide Your Plan
          </h2>

          <p className="mt-4 text-base font-semibold text-canvas-50">We don&apos;t guess. We test.</p>
          <p className="mt-2 text-body-sm font-light leading-relaxed text-canvas-50/80">
            Labwork helps us understand what&apos;s happening inside your body so we can build a plan that
            actually works.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-body-sm font-bold text-canvas-50">We may review markers related to:</p>
              <ul className="mt-2 space-y-1.5">
                {leftMarkers.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body-sm font-light text-canvas-50/80">
                    <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-body-sm font-bold text-canvas-50">These markers help explain things like:</p>
              <ul className="mt-2 space-y-1.5">
                {rightMarkers.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body-sm font-light text-canvas-50/80">
                    <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-sage-400" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-body-sm font-light leading-relaxed text-canvas-50/80">
            <p>
              We review hormone balance and other factors that may impact weight. Learn more about our{' '}
              <Link href="/bioidentical-hormone-replacement-therapy" className="underline hover:text-canvas-50">
                BHRT Therapy
              </Link>{' '}
              services, including{' '}
              <Link
                href="/bioidentical-hormone-replacement-therapy/male"
                className="underline hover:text-canvas-50"
              >
                Hormone Therapy for Men
              </Link>{' '}
              and{' '}
              <Link
                href="/bioidentical-hormone-replacement-therapy/female"
                className="underline hover:text-canvas-50"
              >
                Hormone Therapy for Women
              </Link>
              .
            </p>
            <p>From there, we build a plan based on your results and adjust it over time as your body responds.</p>
            <p>This is what makes lab-guided weight loss more precise and sustainable.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
