import type { ReactNode } from 'react'

import { BeforeAfterShowcase } from '@/components/sections/BeforeAfterShowcase'
import { BenefitList } from '@/components/sections/BenefitList'
import { ContentSlider } from '@/components/sections/ContentSlider'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { Notice } from '@/components/sections/Notice'
import { ReviewerBio } from '@/components/sections/ReviewerBio'
import type { BenefitItem, IconSpec, Media, TreatmentBlockData, TreatmentSection } from '@/types/content'

function isTypedBlock(section: TreatmentSection): section is TreatmentBlockData {
  return typeof (section as TreatmentBlockData).type === 'string'
}

function paragraphsOf(content: TreatmentBlockData['content']): string[] {
  return (content ?? []).filter((item): item is string => typeof item === 'string')
}

/** Resolve a stable section id for `data-section-id` attribute. */
function sectionId(section: TreatmentBlockData, index: number): string {
  return section.id ?? `${section.type}-${index}`
}

/**
 * Adapt a loose `cards[]` item to `BenefitItem`, preserving icon data.
 */
function toBenefitItem(card: Record<string, unknown>): BenefitItem {
  return {
    title: String(card.title ?? ''),
    body: card.description ? String(card.description) : undefined,
    items: Array.isArray(card.items) ? (card.items as string[]) : undefined,
    icon: card.icon ? (card.icon as IconSpec) : undefined,
  }
}

/**
 * type -> adapter. Each adapter's only job is reshaping the loose JSON block
 * into props for an existing, pure presentational component — no business
 * logic lives in the components themselves (BenefitList, EditorialPair, etc.
 * are unchanged). A future section kind is one new entry here plus, if no
 * existing component fits, one new small component — the registry and this
 * file's structure never need to change.
 *
 * Every adapter receives the section's `design` and `id` for CSS override.
 */
const registry: Record<string, (section: TreatmentBlockData, index: number) => ReactNode> = {
  'feature-list': (section, index) => (
    <BenefitList
      key={section.id}
      title={section.heading ?? ''}
      lead={paragraphsOf(section.content)[0]}
      columns={3}
      cardStyle
      items={(section.cards ?? []).map(toBenefitItem)}
      background={index % 2 === 0 ? 'alt' : 'page'}
      design={section.design}
      sectionId={sectionId(section, index)}
    />
  ),

  notice: (section) => <Notice key={section.id} text={paragraphsOf(section.content).join(' ')} />,

  'reviewer-bio': (section, index) => {
    const portrait = section.images?.[0]
    const bio = paragraphsOf(section.content)
    if (!portrait || !bio.length) return null

    return (
      <ReviewerBio
        key={section.id}
        name={section.subheading ?? portrait.alt}
        bio={bio}
        portrait={portrait}
        background={index % 2 === 0 ? 'alt' : 'page'}
      />
    )
  },

  'before-after-slider': (section, index) => {
    const pairs = (section.cards ?? [])
      .map((card) => card as { before?: Media; after?: Media })
      .filter((card): card is { before: Media; after: Media } => Boolean(card.before && card.after))
    if (!pairs.length) return null

    return (
      <BeforeAfterShowcase
        key={section.id}
        title={section.heading ?? ''}
        lead={paragraphsOf(section.content)[0]}
        pairs={pairs}
        background={index % 2 === 0 ? 'alt' : 'page'}
      />
    )
  },

  /* ── NEW: Icon Card Grid ──────────────────────────────────────── */
  'icon-card-list': (section, index) => {
    const items = (section.cards ?? []).map(toBenefitItem)
    return (
      <BenefitList
        key={section.id}
        title={section.heading ?? ''}
        lead={paragraphsOf(section.content)[0]}
        columns={3}
        cardStyle
        items={items}
        background={index % 2 === 0 ? 'alt' : 'page'}
        design={section.design}
        sectionId={sectionId(section, index)}
      />
    )
  },

  /* ── NEW: Icon Feature List (ruled rows with icons) ───────────── */
  'icon-feature-list': (section, index) => {
    const items = (section.cards ?? []).map(toBenefitItem)
    return (
      <BenefitList
        key={section.id}
        title={section.heading ?? ''}
        lead={paragraphsOf(section.content)[0]}
        columns={2}
        numbered={false}
        items={items}
        background={index % 2 === 0 ? 'alt' : 'page'}
        design={section.design}
        sectionId={sectionId(section, index)}
      />
    )
  },

  /* ── NEW: Content Slider / Carousel ────────────────────────────── */
  'content-slider': (section, index) => {
    const cards = (section.cards ?? []).map((card) => ({
      title: String(card.title ?? ''),
      description: card.description ? String(card.description) : undefined,
      icon: card.icon ? (card.icon as IconSpec) : undefined,
      image: card.image as { src: string; alt: string } | undefined,
      href: card.href ? String(card.href) : undefined,
    }))

    return (
      <ContentSlider
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? 'Featured'}
        lead={paragraphsOf(section.content)[0]}
        cards={cards}
        background={index % 2 === 0 ? 'alt' : 'page'}
        design={section.design}
        sectionId={sectionId(section, index)}
        autoplayInterval={5000}
      />
    )
  },
}

// A block type composed of the same shape as another — register once, alias here.
registry['feature-grid-with-intro'] = registry['feature-list']
registry['content-with-feature-list'] = registry['feature-list']

interface SectionRendererProps {
  section: TreatmentSection
  index: number
}

/**
 * Renders one item from `Treatment.sections`. An item with no `type` is the
 * legacy shape and always renders as `EditorialPair`, alternating image side
 * and background by position exactly as it always has. An item with `type`
 * is dispatched through the registry above. An unregistered `type` is
 * skipped silently — never an error, never an empty placeholder.
 */
export function SectionRenderer({ section, index }: SectionRendererProps) {
  if (!isTypedBlock(section)) {
    const side = index % 2 === 0 ? 'right' : 'left'
    return (
      <div data-section-id={`legacy-${index}`} data-section-type="editorial-pair">
        <EditorialPair
          {...section}
          imageSide={section.imageSide ?? side}
          background={index % 2 === 0 ? 'alt' : 'page'}
        />
      </div>
    )
  }

  const render = registry[section.type]
  if (!render) return null

  return (
    <div
      data-section-id={sectionId(section, index)}
      data-section-type={section.type}
    >
      {render(section, index)}
    </div>
  )
}
