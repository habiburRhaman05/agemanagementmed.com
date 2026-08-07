import Link from 'next/link'

export interface TreatmentPathwayItem {
  /** Raw SVG markup — see perimenopause-icons.ts. */
  icon: string
  title: string
  href: string
}

export interface TreatmentPathwaysPanelProps {
  title: string
  lead?: string
  pathways: TreatmentPathwayItem[]
  ctaLabel?: string
}

export function TreatmentPathwaysPanel({
  title,
  lead,
  pathways,
  ctaLabel = 'LEARN MORE',
}: TreatmentPathwaysPanelProps) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 my-16">
      <div className="bg-[#101b3b] rounded-[20px] p-10 md:p-16 lg:px-20 lg:py-24 text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-[44px] leading-[1.2] text-white mb-6 font-display"
          
        >
          {title}
        </h2>
        {lead ? (
          <p className="text-white/90 text-[15px] md:text-[17px] leading-relaxed max-w-[800px] mx-auto mb-16 font-light">
            {lead}
          </p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="bg-white rounded-xl p-10 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className="mb-8 w-16 h-16 [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: pathway.icon }}
              />

              <h3
                className="text-[#101b3b] text-[24px] font-medium leading-[1.3] mb-12 font-display"
                
              >
                {pathway.title}
              </h3>

              <div className="mt-auto">
                <Link
                  href={pathway.href}
                  className="inline-flex items-center gap-3 text-[#30a7a0] hover:text-[#278d87] text-[11px] font-bold tracking-[0.15em] uppercase group transition-colors"
                >
                  {ctaLabel}
                  <div className="w-6 h-6 rounded-full bg-[#30a7a0] group-hover:bg-[#278d87] text-white flex items-center justify-center transition-colors">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
