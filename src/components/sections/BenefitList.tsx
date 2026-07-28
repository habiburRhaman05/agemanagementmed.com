import { Container } from '@/components/shared/Container'
import { IconRenderer } from '@/components/shared/IconRenderer'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { cn } from '@/lib/utils'
import type { BenefitListData, DesignOverride } from '@/types/content'

interface BenefitListProps extends BenefitListData {
  background?: 'page' | 'alt' | 'raised' | 'accent'
  /** When true, renders each item as a premium aesthetic card instead of a ruled row. */
  cardStyle?: boolean
  /** Per-section design override — className, vars, etc. */
  design?: DesignOverride
  /** Stable section id for targeting via `data-section-id` + overrides.css. */
  sectionId?: string
}

/**
 * Replaces the source site's four-across icon-card grids (~14 pages). Ruled
 * rows read as editorial rather than as a template, and they scale to items
 * with sub-lists — which the card version could not hold.
 *
 * `cardStyle` is automatically applied when columns === 2 and no numbered flag
 * is set — giving the /our-experts "Why choose us" section a premium card
 * treatment while keeping the rest of the site on the editorial ruled row.
 */
export function BenefitList({
  eyebrow,
  title,
  lead,
  items,
  columns = 2,
  numbered = false,
  background = 'page',
  cardStyle,
  design,
  sectionId,
}: BenefitListProps) {
  // Auto-enable card style for 2-col, non-numbered grids (the "Why choose us" pattern)
  const useCards = cardStyle ?? (columns === 2 && !numbered)

  if (useCards) {
    return (
      <Section
        background={background}
        spacing="lg"
        className={design?.className}
        data-section-id={sectionId}
        style={design?.vars as React.CSSProperties}
      >
        <Container className={design?.containerClassName}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            lead={lead}
            className={design?.titleClassName}
          />

          <StaggerGroup
            as="ul"
            stagger={0.09}
            className={cn(
              'mt-16 grid gap-6',
              columns === 2 && 'md:grid-cols-2',
              columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
              design?.cardClassName,
            )}
          >
            {items.map((item, index) => (
              <StaggerItem as="li" key={item.title}>
                {/* Premium card with layered bg, mesh gradient, glass border and ambient shadow */}
                <div className={cn(
                  'group relative h-full overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 p-8 shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-sage-600/30 hover:shadow-xl lg:p-10',
                  design?.cardClassName,
                )} style={design?.vars as React.CSSProperties}>

                  {/* Soft ambient mesh glow — unique per card using nth-position hue shift */}
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                      index % 4 === 0 && 'bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--color-sage-100)_60%,transparent)_0%,transparent_65%)]',
                      index % 4 === 1 && 'bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-sage-100)_60%,transparent)_0%,transparent_65%)]',
                      index % 4 === 2 && 'bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_srgb,var(--color-rose-100)_50%,transparent)_0%,transparent_65%)]',
                      index % 4 === 3 && 'bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in_srgb,var(--color-sage-100)_60%,transparent)_0%,transparent_65%)]',
                    )}
                    aria-hidden
                  />

                  {/* Static very-subtle tint — always visible, card reads warm not flat-white */}
                  <div
                    className={cn(
                      'pointer-events-none absolute inset-0',
                      index % 4 === 0 && 'bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--color-sage-50)_80%,transparent)_0%,transparent_55%)]',
                      index % 4 === 1 && 'bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-sage-50)_80%,transparent)_0%,transparent_55%)]',
                      index % 4 === 2 && 'bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_srgb,var(--color-rose-100)_40%,transparent)_0%,transparent_55%)]',
                      index % 4 === 3 && 'bg-[radial-gradient(ellipse_at_bottom_right,color-mix(in_srgb,var(--color-sage-50)_80%,transparent)_0%,transparent_55%)]',
                    )}
                    aria-hidden
                  />

                  {/* Decorative corner accent line */}
                  <span
                    className="absolute left-0 top-0 h-px w-16 bg-gradient-to-r from-sage-600/60 to-transparent transition-all duration-500 group-hover:w-28 group-hover:from-sage-600/80"
                    aria-hidden
                  />
                  <span
                    className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-sage-600/60 to-transparent transition-all duration-500 group-hover:h-28 group-hover:from-sage-600/80"
                    aria-hidden
                  />

                  {/* Icon or number badge */}
                  {item.icon ? (
                    <div className="relative mb-6">
                      <IconRenderer icon={item.icon} className="text-sage-600" />
                    </div>
                  ) : (
                    <span className="relative mb-6 inline-flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 font-display text-body font-medium text-sage-700 shadow-sm ring-1 ring-sage-200/80 transition-all duration-300 group-hover:from-sage-600 group-hover:to-sage-700 group-hover:text-canvas-50 group-hover:ring-sage-600/40 group-hover:shadow-glow">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}

                  <div className="relative">
                    <h3 className="text-title-lg transition-colors duration-300 group-hover:text-sage-700">
                      {item.title}
                    </h3>

                    {item.body ? (
                      <p className="mt-4 text-body text-canvas-600 leading-relaxed">
                        {item.body}
                      </p>
                    ) : null}

                    {item.items?.length ? (
                      <ul className="mt-5 space-y-2.5">
                        {item.items.map((sub) => (
                          <li key={sub} className="flex gap-3 text-body-sm text-canvas-600">
                            <span
                              className="mt-2 size-1 shrink-0 rounded-full bg-sage-600"
                              aria-hidden
                            />
                            {sub}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </Section>
    )
  }

  // Original ruled-row layout (treatment pages, numbered lists, etc.)
  return (
    <Section
      background={background}
      spacing="lg"
      className={design?.className}
      data-section-id={sectionId}
      style={design?.vars as React.CSSProperties}
    >
      <Container className={design?.containerClassName}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          className={design?.titleClassName}
        />

        <ul
          className={cn(
            'mt-16 grid gap-x-16 gap-y-12',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
            design?.cardClassName,
          )}
        >
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 70}>
                <div className={cn('border-t border-canvas-300 pt-6', design?.cardClassName)}>
                  {/* Icon row for ruled layout */}
                  {item.icon ? (
                    <div className="mb-4">
                      <IconRenderer icon={item.icon} className="text-sage-600" />
                    </div>
                  ) : null}

                  {numbered ? (
                    <span className="mb-4 block font-display text-title-lg text-sage-600 tabular">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  ) : null}

                  <h3 className="text-title-lg">{item.title}</h3>

                  {item.body ? (
                    <p className="mt-4 text-body text-canvas-600">{item.body}</p>
                  ) : null}

                  {item.items?.length ? (
                    <ul className="mt-5 space-y-2.5">
                      {item.items.map((sub) => (
                        <li key={sub} className="flex gap-3 text-body-sm text-canvas-600">
                          <span
                            className="mt-2 size-1 shrink-0 rounded-full bg-sage-600"
                            aria-hidden
                          />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
