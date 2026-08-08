import { programIcons } from '../../shared/weight-loss-icons'

/**
 * "What's Included In The Program" section — pure Tailwind, matches the
 * reference screenshot exactly: white background, centred navy heading,
 * teal "exactly" accent, two icon-card grids (Included / May Be Additional),
 * and a closing amber italic note.
 */

const included = [
  { icon: programIcons[0], title: 'Initial Consultation\nWith A Provider' },
  { icon: programIcons[1], title: 'Lab Testing\nAnd Review' },
  { icon: programIcons[2], title: 'Body Composition\nScans' },
  { icon: programIcons[3], title: 'Personalized\nTreatment Plan' },
  { icon: programIcons[4], title: 'Ongoing Follow Up\nVisits And Adjustments' },
]

const additional = [
  { icon: programIcons[5], title: 'Medications If\nPrescribed' },
  { icon: programIcons[6], title: 'Advanced Testing\nIf Needed' },
  { icon: programIcons[7], title: 'Supplements Based On\nYour Plan' },
]

function IconCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col rounded-[8px] bg-[#f0f2f5] p-6">
      {/* Icon */}
      <div
        className="mb-5 h-16 w-16"
        // Static, author-controlled SVG markup copied from the source site.
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      {/* Title */}
      <p className="text-[24px] font-semibold leading-snug text-[#1a3060]">
        {title.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < title.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}

const WhatsIncluded: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* ── Heading block ── */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-[28px] font-semibold leading-snug text-[#1a3060] sm:text-[32px] lg:text-[48px]">
            What&apos;s Included In The Program
          </h2>
          <p className="mt-3 text-[20px] text-black font-medium">
            We want you to know <em>exactly</em> what to expect.
          </p>
        </div>

        {/* ── "Included:" label ── */}
        <p className="mb-5 text-center text-[32px] font-semibold text-[#1a3060]">Included:</p>

        {/* ── Included cards — first row: 3 cols, second row: 2 centred ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {included.slice(0, 3).map((item) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-[calc(66.666%+1rem)]">
          {included.slice(3).map((item) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} />
          ))}
        </div>

        {/* ── "May Be Additional:" label ── */}
        <p className="mb-5 mt-14 text-center text-[32px] font-semibold text-[#1a3060] lg:text-[26px]">
          May Be Additional:
        </p>

        {/* ── Additional cards — 3 columns ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {additional.map((item) => (
            <IconCard key={item.title} icon={item.icon} title={item.title} />
          ))}
        </div>

        {/* ── Closing note ── */}
        <p className="mt-12 text-center text-[16px]  text-black">
          Your provider will walk you through everything so there are no surprises.
        </p>
      </div>
    </section>
  )
}

export default WhatsIncluded
