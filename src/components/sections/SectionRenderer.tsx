import type { ReactNode } from 'react'

import { BeforeAfterShowcase } from '@/components/sections/BeforeAfterShowcase'
import { BenefitList } from '@/components/sections/BenefitList'
import { ContentSlider } from '@/components/sections/ContentSlider'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { Notice } from '@/components/sections/Notice'
import { PricingBlock } from '@/components/sections/PricingBlock'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ReviewerBio } from '@/components/sections/ReviewerBio'
import { StatementBand } from '@/components/sections/StatementBand'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import type { BenefitItem, FaqItem, IconSpec, Media, TreatmentBlockData, TreatmentSection } from '@/types/content'

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
 * type -> adapter. Each adapter reshapes the loose JSON block into props
 * for an existing presentational component. New section kinds = one new
 * entry here + optionally one new component.
 */
const registry: Record<string, (section: TreatmentBlockData, index: number) => ReactNode> = {

  /* ── Feature / Benefit List ─────────────────────────────────── */
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

  /* ── Notice / Callout ───────────────────────────────────────── */
  notice: (section) => <Notice key={section.id} text={paragraphsOf(section.content).join(' ')} />,

  /* ── Reviewer Bio ───────────────────────────────────────────── */
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

  /* ── Before/After Slider ────────────────────────────────────── */
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

  /* ── Editorial / Two-Column ─────────────────────────────────── */
  'editorial': (section, index) => {
    const bodyArray = paragraphsOf(section.content)
    const image = section.images?.[0]
    if (!bodyArray.length && !section.heading) return null
    if (!image) return null
    return (
      <EditorialPair
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? ''}
        body={bodyArray}
        bullets={section.cards?.map((c) => String(c.title ?? c.description ?? ''))}
        image={{ src: image.src, alt: image.alt }}
        imageSide={index % 2 === 0 ? 'right' : 'left'}
        background={index % 2 === 0 ? 'alt' : 'page'}
      />
    )
  },

  /* ── FAQ Section ────────────────────────────────────────────── */
  'faq': (section, index) => {
    const faqs = (section.cards ?? [])
      .map((card) => ({
        question: String(card.title ?? ''),
        answer: String(card.description ?? card.body ?? ''),
      }))
      .filter((faq): faq is FaqItem => Boolean(faq.question && faq.answer))
    if (!faqs.length) return null
    return (
      <FAQAccordion
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? 'Frequently Asked Questions'}
        lead={paragraphsOf(section.content)[0]}
        items={faqs}
        background={index % 2 === 0 ? 'page' : 'alt'}
      />
    )
  },

  /* ── Pricing Block ──────────────────────────────────────────── */
  'pricing': (section) => {
    const included = (section.cards ?? []).map((card) => String(card.title ?? ''))
    const cta = section.buttons?.[0]
    return (
      <PricingBlock
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? ''}
        lead={paragraphsOf(section.content)[0]}
        included={included}
        note={paragraphsOf(section.content).slice(1).join(' ')}
        cta={cta ?? { label: 'Schedule a consultation', href: '/book-appointment' }}
      />
    )
  },

  /* ── Closing CTA ────────────────────────────────────────────── */
  'closing-cta': (section) => {
    const cta = section.buttons?.[0]
    return (
      <ClosingCTA
        key={section.id}
        title={section.heading ?? ''}
        body={paragraphsOf(section.content).join(' ')}
        cta={cta ?? { label: 'Get started', href: '/book-appointment' }}
      />
    )
  },

  /* ── Statement Band ─────────────────────────────────────────── */
  'statement': (section) => {
    const text = section.heading || paragraphsOf(section.content).join(' ')
    if (!text) return null
    return <StatementBand key={section.id} text={text} background="alt" />
  },

  /* ── Process Steps ──────────────────────────────────────────── */
  'process': (section, index) => {
    const steps = (section.cards ?? []).map((card) => ({
      title: String(card.title ?? ''),
      body: String(card.description ?? card.body ?? ''),
    }))
    if (!steps.length) return null
    return (
      <ProcessSteps
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? ''}
        lead={paragraphsOf(section.content)[0]}
        steps={steps}
        background={index % 2 === 0 ? 'page' : 'alt'}
      />
    )
  },

  /* ── Testimonial Set ────────────────────────────────────────── */
  'testimonials': (section, index) => {
    const testimonials = (section.cards ?? []).map((card, i) => ({
      id: String(card.id ?? `testimonial-${i}`),
      quote: String(card.text ?? card.description ?? card.body ?? ''),
      author: String(card.name ?? card.title ?? 'Anonymous'),
      source: (card.source === 'google' ? 'google' : 'site') as 'google' | 'site',
    }))
    if (!testimonials.length) return null
    return (
      <TestimonialSet
        key={section.id}
        eyebrow={section.eyebrow}
        title={section.heading ?? 'What our patients say'}
        testimonials={testimonials}
        background={index % 2 === 0 ? 'alt' : 'page'}
      />
    )
  },

  /* ── Content Slider / Carousel ──────────────────────────────── */
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

/* ── Aliases ──────────────────────────────────────────────────── */
// Register once, alias by alternate names used in existing content.
registry['icon-card-list'] = registry['feature-list']
registry['icon-feature-list'] = registry['feature-list']
registry['feature-grid-with-intro'] = registry['feature-list']
registry['content-with-feature-list'] = registry['feature-list']
registry['before-after'] = registry['before-after-slider']
registry['two-column'] = registry['editorial']
registry['content-section'] = registry['editorial']

/* ── Exports ──────────────────────────────────────────────────── */

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
