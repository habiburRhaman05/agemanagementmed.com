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
  columns?: 2 | 3
  background?: 'page' | 'alt' | 'raised'
}

/** Journal index, press index, "As seen on" preview — one grid, three uses. */
export function ContentGrid({
  eyebrow,
  title,
  lead,
  items,
  columns = 3,
  background = 'page',
}: ContentGridProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className={`mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 ${
            columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          }`}
        >
          {items.map((item) => (
            <StaggerItem as="li" key={item.href} className="h-full">
              <ContentCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
