import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { cn } from '@/lib/utils'
import type { BenefitListData } from '@/types/content'

interface BenefitListProps extends BenefitListData {
  background?: 'page' | 'alt' | 'raised' | 'accent'
}

/**
 * Replaces the source site's four-across icon-card grids (~14 pages). Ruled
 * rows read as editorial rather than as a template, and they scale to items
 * with sub-lists — which the card version could not hold.
 */
export function BenefitList({
  eyebrow,
  title,
  lead,
  items,
  columns = 2,
  numbered = false,
  background = 'page',
}: BenefitListProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <ul
          className={cn(
            'mt-16 grid gap-x-16 gap-y-12',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 70}>
                <div className="border-t border-canvas-300 pt-6">
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
