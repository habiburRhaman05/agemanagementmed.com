import type { ReactNode } from 'react'

import { BeforeAfterShowcase } from '@/components/sections/BeforeAfterShowcase'
import { BenefitList } from '@/components/sections/BenefitList'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { Notice } from '@/components/sections/Notice'
import { ReviewerBio } from '@/components/sections/ReviewerBio'
import type { BenefitItem, Media, TreatmentBlockData, TreatmentSection } from '@/types/content'

function isTypedBlock(section: TreatmentSection): section is TreatmentBlockData {
  return typeof (section as TreatmentBlockData).type === 'string'
}

function paragraphsOf(content: TreatmentBlockData['content']): string[] {
  return (content ?? []).filter((item): item is string => typeof item === 'string')
}

/**
 * type -> adapter. Each adapter's only job is reshaping the loose JSON block
 * into props for an existing, pure presentational component — no business
 * logic lives in the components themselves (BenefitList, EditorialPair, etc.
 * are unchanged). A future section kind is one new entry here plus, if no
 * existing component fits, one new small component — the registry and this
 * file's structure never need to change.
 */
const registry: Record<string, (section: TreatmentBlockData, index: number) => ReactNode> = {
  'feature-list': (section, index) => (
    <BenefitList
      key={section.id}
      title={section.heading ?? ''}
      lead={paragraphsOf(section.content)[0]}
      columns={3}
      cardStyle
      items={(section.cards ?? []).map(
        (card): BenefitItem => ({
          title: String(card.title ?? ''),
          body: card.description ? String(card.description) : undefined,
        }),
      )}
      background={index % 2 === 0 ? 'alt' : 'page'}
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
      <EditorialPair
        {...section}
        imageSide={section.imageSide ?? side}
        background={index % 2 === 0 ? 'alt' : 'page'}
      />
    )
  }

  const render = registry[section.type]
  return render ? <>{render(section, index)}</> : null
}
