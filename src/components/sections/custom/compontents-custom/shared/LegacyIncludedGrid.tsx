export interface CostGridItem {
  /** Raw SVG markup — see weight-loss-icons.ts. */
  icon: string
  title: string
}

export interface LegacyIncludedGridProps {
  title: string
  lead?: string
  included: CostGridItem[]
  separateLabel?: string
  separate?: CostGridItem[]
  note?: string
}

function GridCard({ item }: { item: CostGridItem }) {
  return (
    <div className="item lg-col-md-6 lg-col-lg-4 lg-col-xl-3">
      <div className="box">
        <div
          className="icon"
          // Static, author-controlled markup copied from the source site.
          dangerouslySetInnerHTML={{ __html: item.icon }}
        />
        <div className="lg-title" dangerouslySetInnerHTML={{ __html: item.title }} />
      </div>
    </div>
  )
}

/**
 * Live-site "What's Included in the Program" — a `.content-d` heading
 * followed by one or two `.cards-i` icon grids. Ported 1:1 from
 * download/_concierge-medical-weight-loss_female_.html; the styling lives in
 * src/app/legacy.css.
 *
 * Kept separate from `PremiumIncludedGrid` (which is still used, unstyled,
 * by not-yet-redesigned pages like HormoneTherapyWomenLayout).
 */
export function LegacyIncludedGrid({
  title,
  lead,
  included,
  separateLabel,
  separate,
  note,
}: LegacyIncludedGridProps) {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-title">{title}</h2>
            {lead ? (
              <div className="lg-text">
                <p style={{ fontSize: 20 }}>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div className="cards-i" style={{ backgroundColor: '#fff' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {included.map((item) => (
                <GridCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {separate?.length ? (
        <>
          <div className="lg-flexspace-100" />

          <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
            <div className="lg-max-width-1440">
              <div className="lg-container">
                <div className="lg-title" style={{ fontSize: 32, marginBottom: 0 }}>
                  {separateLabel ?? 'May Be Additional:'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg-flexspace-40" />

          <div className="cards-i" style={{ backgroundColor: '#fff' }}>
            <div className="lg-max-width-1440">
              <div className="lg-container">
                <div className="lg-grid">
                  {separate.map((item) => (
                    <GridCard item={item} key={item.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {note ? (
        <>
          <div className="lg-flexspace-40" />

          <div className="lg-content-d" style={{ backgroundColor: '#fff' }}>
            <div className="lg-max-width-1440">
              <div className="lg-container">
                <div className="lg-text lg-text-center">
                  <p>{note}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="lg-flexspace-100" />
    </>
  )
}
