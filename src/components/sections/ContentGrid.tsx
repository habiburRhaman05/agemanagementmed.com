import { ContentCard } from '@/components/features/ContentCard'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import type { ContentSummary } from '@/types/content'

interface ContentGridProps {
  eyebrow?: string
  title: string
  lead?: string
  items: ContentSummary[]
  columns?: 2 | 3 | 4
  background?: 'page' | 'alt' | 'raised'
  /** Slightly more compact card (smaller image ratio, tighter padding) — useful at 4 columns. */
  compact?: boolean
}

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-2 xl:grid-cols-4',
}

/** Journal index, press index, "As seen on" preview — one grid, several uses. */
export function ContentGrid({
  eyebrow,
  title,
  lead,
  items,
  columns = 3,
  background = 'page',
  compact = false,
}: ContentGridProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className={`mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 ${COLUMN_CLASSES[columns]}`}
        >
          {items.map((item) => (
            <StaggerItem as="li" key={item.href} className="h-full">
              <ContentCard item={item} compact={compact} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
