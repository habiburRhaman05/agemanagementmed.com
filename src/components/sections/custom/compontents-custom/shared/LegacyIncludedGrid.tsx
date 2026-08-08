import { Container } from '@/components/shared/Container'

export interface CostGridItem {
  /** Raw SVG markup — see weight-loss-icons.ts. */
  icon: string
  /** Card title. May contain a literal `<br/>` to force a specific line break. */
  title: string
}

export interface LegacyIncludedGridProps {
  title: string
  lead?: string
  /** Label above the primary `included` grid — e.g. "Included:". Auto-shows when `separate` is set; pass explicitly to force it on/off. */
  includedLabel?: string
  included: CostGridItem[]
  separateLabel?: string
  separate?: CostGridItem[]
  note?: string
  bg?: string
  align?: 'left' | 'center' | 'right'
}

const HEADING_ALIGN: Record<'left' | 'center' | 'right', string> = {
  left: 'text-left',
  center: 'mx-auto text-center',
  right: 'ml-auto text-right',
}

function GridCard({ item }: { item: CostGridItem }) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl  bg-[#F9F9F9] p-8 text-center sm:items-start sm:p-10 sm:text-left">
      <div
        className="mb-6 flex h-16 items-center justify-center sm:justify-start [&_svg]:h-auto [&_svg]:max-h-16 [&_svg]:w-auto"
        // Static, author-controlled markup copied from the source site.
        dangerouslySetInnerHTML={{ __html: item.icon }}
      />
      <div
        className="text-lg leading-snug font-semibold text-[#14214b] sm:text-xl"
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
    </div>
  )
}

/**
 * Responsive card row — 1/2/3 columns depending on viewport. Uses flex-wrap
 * instead of a fixed grid-cols count so any array length (4, 5, 7…) wraps
 * naturally, with a short last row centered instead of left-stuck.
 */
function GridRow({ items }: { items: CostGridItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <div key={item.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
          <GridCard item={item} />
        </div>
      ))}
    </div>
  )
}

/**
 * "What's Included In The Program" — a centered heading, an optional
 * "Included:" label, a card grid of icon + title tiles, an optional second
 * "May Be Additional:" grid, and an optional closing note.
 *
 * Self-contained Tailwind (no legacy.css dependency) so every page that
 * renders this gets the identical, consistent card design regardless of
 * how many items are passed in.
 */
export function LegacyIncludedGrid({
  title,
  lead,
  includedLabel,
  included,
  separateLabel,
  separate,
  note,
  bg,
  align = 'center',
}: LegacyIncludedGridProps) {
  const resolvedIncludedLabel = includedLabel

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: bg ?? '#fff' }}>
      <Container width="wide">
        {/* Heading */}
        <div className={`max-w-[800px] ${HEADING_ALIGN[align]}`}>
          <h2 className="font-display text-[32px] leading-tight text-[#14214b] capitalize sm:text-[40px] lg:text-[48px]">
            {title}
          </h2>
          {lead ? <p className="mt-4 text-[20px] lg:text-[32px] font-display font-medium text-navy-600">{lead}</p> : null}
        </div>

        {/* Included */}
        {resolvedIncludedLabel ? (
          <p className="mt-10 mb-6 text-center font-display text-[32px] text-[#14214b] sm:mt-12 sm:mb-8">
            {resolvedIncludedLabel}
          </p>
        ) : (
          <div className="mt-10 sm:mt-12" />
        )}

        <GridRow items={included} />

        {/* May be additional */}
        {separate?.length ? (
          <>
            <p className="mt-14 mb-6 text-center font-display text-[32px] text-[#14214b] sm:mt-16 sm:mb-8 sm:text-[32px]">
              {separateLabel ?? 'May Be Additional:'}
            </p>
            <GridRow items={separate} />
          </>
        ) : null}

        {/* {note ? <p className="mt-10 text-center text-body text-canvas-600 sm:mt-12">{note}</p> : null} */}
      </Container>
    </section>
  )
}
