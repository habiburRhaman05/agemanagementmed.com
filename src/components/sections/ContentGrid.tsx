import { ContentCard } from '@/components/features/ContentCard'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
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

        <ul
          className={`mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 ${
            columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          }`}
        >
          {items.map((item, index) => (
            <li key={item.href}>
              <Reveal delay={(index % 3) * 70}>
                <ContentCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
