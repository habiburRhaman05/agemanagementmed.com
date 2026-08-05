import { ArrowRight } from 'lucide-react'

/**
 * "Why This Approach Works" — full-bleed, image left ~50% / dark-navy panel
 * right ~50%. Matches the reference screenshot exactly: no rounded corners,
 * no max-width wrapper, teal accent arrows, highlighted words in subtitle.
 */

const focusPoints = [
  'Ongoing monitoring and adjustments',
  'Data driven decisions',
  'Long term sustainability',
  'Treating the root cause, not just symptoms',
]

const IMAGE_URL =
  'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-69-img.jpg'

const WhyThisApproachWorks: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-[#1a2744]">
      <div className="grid lg:grid-cols-2">

        {/* ── Left: photo ── */}
        <div className="relative min-h-64 overflow-hidden lg:min-h-[500px]">
          <img
            src={IMAGE_URL}
            alt="Doctor consulting patient about weight loss approach"
            className="absolute top-0 left-0 w-full"
            style={{ height: 'auto' }}
          />
        </div>

        {/* ── Right: navy content panel ── */}
        <div className="flex flex-col justify-center bg-[#1a2744] px-8 py-12 sm:px-10 lg:px-14 lg:py-16">

          <h2 className="font-display text-[20px] font-semibold leading-snug text-white sm:text-[22px] lg:text-[24px]">
            Why This Approach Works
          </h2>

          {/* Subtitle with highlighted words */}
          <p className="mt-3 text-xs leading-relaxed text-white">
            Most weight loss programs fail because they do not adjust as your body changes.
          </p>

          <p className="mt-3 text-xs text-white">We focus on:</p>

          <ul className="mt-2 space-y-1.5">
            {focusPoints.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs text-white">
                <ArrowRight className="mt-0.5 size-3 shrink-0 text-white" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-white">
            This is how we help patients achieve results that last.
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhyThisApproachWorks
