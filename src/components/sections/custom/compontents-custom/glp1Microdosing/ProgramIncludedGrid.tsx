export interface ProgramItem {
  /** Raw SVG markup — see glp-icons.ts. */
  icon: string
  title: string
  description: string
}

export interface ProgramIncludedGridProps {
  title: string
  lead?: string
  includedLabel?: string
  included: ProgramItem[]
  additionalLabel?: string
  additional?: ProgramItem[]
}

function ProgramCard({ item }: { item: ProgramItem }) {
  return (
    <div className="item lg-col-md-6 lg-col-lg-4 lg-col-xl-3">
      <div className="box">
        <div
          className="icon"
          // Static, author-controlled markup copied from the source site.
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
        <div className="lg-title" dangerouslySetInnerHTML={{ __html: item.title }} />
        <div className="lg-text">
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Live-site "What's Included in the Program" — a `.group` band with a
 * `.content-d` heading, an "Included" `.cards-i` grid split into two rows
 * (3 + 2 items), and an optional "May Be Additional" `.cards-i` grid. Ported
 * 1:1 from download/_glp-1-microdosing_female_.html; the styling lives in
 * src/app/legacy.css.
 */
export function ProgramIncludedGrid({
  title,
  lead,
  includedLabel = 'Included:',
  included,
  additionalLabel = 'May Be Additional:',
  additional,
}: ProgramIncludedGridProps) {
  const firstRow = included.slice(0, 3)
  const secondRow = included.slice(3)

  return (
    <div className="lg-group" style={{ backgroundColor: '#fff' }}>
      <div className="radial-gradient" aria-hidden />

      <div className="lg-flexspace-100" />

      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-title">{title}</h2>
            {lead ? (
              <div className="lg-text lg-max-width-800">
                <p style={{ fontSize: 20 }}>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 30 }} />

      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-title" style={{ fontSize: 32, marginBottom: 0 }}>
              {includedLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-40" />

      <div className="cards-i">
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid lg-justify-center">
              {firstRow.map((item) => (
                <ProgramCard item={item} key={item.title} />
              ))}
            </div>

            <div style={{ paddingTop: 36 }} />

            <div className="lg-grid lg-justify-center">
              {secondRow.map((item) => (
                <ProgramCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {additional?.length ? (
        <>
          <div className="lg-flexspace-40" />

          <div className="lg-content-d">
            <div className="lg-max-width-1440">
              <div className="lg-container">
                <div className="lg-title" style={{ fontSize: 32, marginBottom: 0 }}>
                  {additionalLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="lg-flexspace-40" />

          <div className="cards-i">
            <div className="lg-max-width-1440">
              <div className="lg-container">
                <div className="lg-grid lg-justify-center">
                  {additional.map((item) => (
                    <ProgramCard item={item} key={item.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="lg-flexspace-100" />
    </div>
  )
}
