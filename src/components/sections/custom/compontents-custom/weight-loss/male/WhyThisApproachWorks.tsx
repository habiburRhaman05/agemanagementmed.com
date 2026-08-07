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

interface Props {
  image?: string;
}

const WhyThisApproachWorks: React.FC<Props> = ({ image }) => {
  const finalImage = image || 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-69-img.jpg';
  
  return (
    <section className="w-full overflow-hidden bg-[#1a2744]">
      <div className="grid lg:grid-cols-2">

        {/* ── Left: photo ── */}
        <div className="relative min-h-64 overflow-hidden lg:min-h-[500px]">
          <img
            src={finalImage}
            alt="Doctor consulting patient about weight loss approach"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>

        {/* ── Right: navy content panel ── */}
        <div className="flex flex-col justify-center bg-[#1a2744] px-8 py-12 sm:px-10 lg:pl-28 lg:py-20">

          <h2
            className="font-display text-white text-[36px]! sm:text-[48px]! tracking-tight"
            style={{ fontWeight: 500, letterSpacing: '-0.025em' }}
          >
            Why This Approach Works
          </h2>

          {/* Subtitle with highlighted words */}
          <p className="mt-3 leading-relaxed text-white" style={{ fontSize: 20 }}>
            Most weight loss programs fail because they do not adjust as your body changes.
          </p>

          <p className="mt-3 text-white" style={{ fontSize: 16 }}>We focus on:</p>

          <ul className="mt-2 space-y-1.5">
            {focusPoints.map((item) => (
              <li key={item} className="flex items-center gap-2 text-white" style={{ fontSize: 16 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none"><path d="M15.5 1L20.5 6L15.5 11" stroke="#519B98" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 6H1" stroke="#519B98" stroke-width="1.5" stroke-linecap="round"/></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 leading-relaxed text-white" style={{ fontSize: 16 }}>
            This is how we help patients achieve results that last.
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhyThisApproachWorks
