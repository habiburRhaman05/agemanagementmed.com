/**
 * Content types. Components import these; they never import content modules.
 * Shaped so a headless CMS can later become the data source without touching
 * a single component. See docs/04-CONTENT-ARCHITECTURE.md.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'inverse' | 'outlineInverse'

export interface Cta {
  label: string
  href: string
  variant?: ButtonVariant
}

export interface Media {
  src: string
  /** Required everywhere — never optional. */
  alt: string
  width?: number
  height?: number
  caption?: string
}

export interface Seo {
  title: string
  description: string
  canonical: string
  ogImage?: Media
  noindex?: boolean
}

/* ── Section payloads ───────────────────────────────────────────────── */

export interface EditorialPairData {
  eyebrow?: string
  title: string
  body: string[]
  bullets?: string[]
  image: Media
  imageSide?: 'left' | 'right'
  cta?: Cta
}

export interface BenefitItem {
  title: string
  body?: string
  items?: string[]
}

export interface BenefitListData {
  eyebrow?: string
  title: string
  lead?: string
  items: BenefitItem[]
  columns?: 1 | 2 | 3
  numbered?: boolean
}

export interface ProcessStep {
  title: string
  body: string
}

export interface ProcessStepsData {
  eyebrow?: string
  title: string
  lead?: string
  steps: ProcessStep[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricingData {
  eyebrow?: string
  title: string
  lead?: string
  included: string[]
  note?: string
  cta: Cta
}

export interface ClosingCtaData {
  title: string
  body: string
  cta: Cta
}

/* ── Entities ───────────────────────────────────────────────────────── */

export type LocationSlug = 'savannah-pooler' | 'statesboro'

export interface Person {
  slug: string
  name: string
  credentials?: string
  role: string
  portrait: Media
  summary: string
  bio: string[]
  specialties?: string[]
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  source: 'google' | 'site'
  /** Source HTML truncated some reviews with an ellipsis. */
  truncated?: boolean
}

export interface OfficeHours {
  days: string
  time: string
}

export interface Location {
  slug: LocationSlug
  name: string
  addressLine: string
  city: string
  state: string
  zip: string
  hours: OfficeHours[]
  mapEmbedUrl: string
}

export interface Award {
  src: string
  alt: string
}

/** One card, three uses — journal posts, press items, patient results. */
export interface ContentSummary {
  href: string
  title: string
  excerpt?: string
  eyebrow?: string
  date?: string
  image?: Media
  external?: boolean
}

/* ── Treatments ─────────────────────────────────────────────────────── */

export type Pillar =
  | 'hormone-therapy'
  | 'weight-loss'
  | 'sexual-wellness'
  | 'hair-restoration'
  | 'aesthetics'

export type Audience = 'men' | 'women' | 'all'

export interface TreatmentSummary {
  slug: string
  href: string
  pillar: Pillar
  audience: Audience
  name: string
  shortName: string
  summary: string
  cardImage: Media
  cardBenefits: string[]
}

export interface Treatment extends TreatmentSummary {
  kind: 'hub' | 'variant' | 'modality'
  hero: {
    eyebrow: string
    title: string
    lead: string
    image: Media
    ctas: Cta[]
  }
  statement?: string
  symptoms?: BenefitListData
  sections?: EditorialPairData[]
  process?: ProcessStepsData
  pricing?: PricingData
  candidacy?: BenefitListData
  providers?: string[]
  related?: string[]
  faqs: FaqItem[]
  closingCta: ClosingCtaData
  seo: Seo
}
