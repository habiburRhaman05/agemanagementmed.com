export interface SymptomOutcomeItem {
  /** Raw SVG markup — see each treatment's own -icons.ts file. */
  icon: string
  title: string
  description: string
}

export interface SymptomsOutcomesGridProps {
  title: string
  lead?: string
  items: SymptomOutcomeItem[]
  /** 'left' matches Shockwave Therapy's heading; 'center' (default) matches Laser Vaginal Therapy's. */
  align?: 'left' | 'center'
  /** Shockwave Therapy's card grid uses the wider 1292px container; other pages use the default 1054px. */
  wide?: boolean
  /** 'inline' (default) matches Shockwave/Laser's `<strong>Title</strong><br/>body` paragraph; 'heading' matches Perimenopause's separate `<h3>`/`<p>`. */
  titleAs?: 'inline' | 'heading'
}

/**
 * Live-site `#column-box-i.style-2` — icon-left cards in a 2-column grid,
 * preceded by a `.content-d` heading. Ported 1:1 from
 * download/_shockwave-therapy_.html and download/_laser-vaginal-therapy_.html
 * (reused by every single-audience treatment page with this section); the
 * styling lives in src/app/legacy.css.
 */
export function SymptomsOutcomesGrid({
  title,
  lead,
  items,
  align = 'center',
  wide = false,
  titleAs = 'inline',
}: SymptomsOutcomesGridProps) {
  return (
    <>
      <div className="lg-flexspace-100" />

      <div className={`lg-content-d${align === 'left' ? ' text-left' : ''}`}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className={`lg-title ${align === "center" ? "mx-auto":""} lg-max-width-500" style={lead ? undefined : { marginBottom: 0 }`}>
              {title}
            </h2>
            {lead ? (
              <div className="lg-text lg-max-width-925" style={align === 'left' ? { marginLeft: 0 } : undefined}>
                <p>{lead}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <div id="column-box-i" className={`style-2${wide ? ' max-width-container-1292' : ''}`}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="lg-grid">
              {items.map((item) => (
                <div className="lg-col-lg-6" key={item.title}>
                  <div className="box">
                    <div
                      className="icon"
                      // Static, author-controlled markup copied from the source site.
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />

                    <div className="content">
                      <div className="lg-text">
                        {titleAs === 'heading' ? (
                          <>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                          </>
                        ) : (
                          <p>
                            <strong>{item.title}</strong>
                            <br />
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
