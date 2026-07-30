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
  /** CSS object-position value (e.g. '70% 30%', 'top'). Defaults to 'center' — override per-photo when the subject isn't centered. */
  focalPoint?: string
}

export interface Seo {
  title: string
  description: string
  canonical: string
  keywords?: string
  ogImage?: Media
  noindex?: boolean
}

/* ── Design Override System ────────────────────────────────────────── */

/**
 * Per-section design override. Every field is optional — when absent the
 * component uses its default styling. `className` merges with the base via
 * `cn()` (tailwind-merge), so conflicting Tailwind utilities resolve
 * predictably. `vars` are CSS custom properties applied as inline style,
 * enabling deep overrides (hover, pseudo, animation) that className alone
 * cannot reach.
 *
 * @example
 * ```json
 * {
 *   "design": {
 *     "className": "bg-ink-900",
 *     "cardClassName": "border-2 border-gold",
 *     "vars": { "--card-radius": "24px", "--icon-size": "48px" }
 *   }
 * }
 * ```
 */
export interface DesignOverride {
  /** Root section element — overrides the component's outer container. */
  className?: string
  /** Section heading — applied to the `<h2>` / title element. */
  titleClassName?: string
  /** Each card / item wrapper — cards in grids, items in lists. */
  cardClassName?: string
  /** Image element — section or card images. */
  imageClassName?: string
  /** Content / body text wrapper. */
  contentClassName?: string
  /** Inner container (e.g. max-width wrapper). */
  containerClassName?: string
  /**
   * CSS custom properties — enables deep overrides without touching
   * component code. E.g. `{ "--gap": "3rem", "--card-bg": "#fff" }`.
   */
  vars?: Record<string, string>
}

/* ── Icon System ────────────────────────────────────────────────────── */

/**
 * Universal icon specification. Every component that renders icons
 * accepts `IconSpec` — one renderer (`IconRenderer`) handles all kinds.
 *
 * - `lucide`: a Lucide icon name, e.g. `"Sparkles"`. The renderer
 *   dynamically resolves it from `lucide-react`.
 * - `image`: a raster or SVG image URL.
 * - `inline-svg`: raw SVG markup (use sparingly — sanitized via
 *   `dangerouslySetInnerHTML` in a `<span>`).
 * - `font-class`: a font-icon class string, e.g. `"fas fa-star"`.
 * - `emoji`: a plain emoji character.
 */
export type IconKind = 'lucide' | 'image' | 'inline-svg' | 'font-class' | 'emoji'

export interface IconSpec {
  kind: IconKind
  value: string
  /** Alt text / aria-label — required for `image` kind, optional otherwise. */
  label?: string
  /** Additional class names for the icon wrapper or element. */
  className?: string
  /** Pixel dimension — applies width/height for image icons, font-size for others. Default 24. */
  size?: number
  /** Fill color — applies `color` or `fill` depending on kind. */
  color?: string
}

/* ── Section payloads ───────────────────────────────────────────────── */

export interface EditorialPairData {
  eyebrow?: string
  title: string
  body: string[]
  bullets?: string[]
  image: Media
  imageSide?: 'left' | 'right'
  /** `cutout` is for a transparent-background PNG (person cut out of their background) — no crop, no card frame. */
  imageTreatment?: 'framed' | 'cutout'
  cta?: Cta
}

/**
 * A generic, JSON-driven content block for the middle of a treatment page.
 * Deliberately loose ("content bag") rather than a closed per-type interface —
 * `SectionRenderer` owns interpreting `cards`/`content`/`images` per `type`.
 * New section kinds are added by registering a component against a new
 * `type` string; this shape and the renderer never need to change.
 */
export interface TreatmentBlockData {
  type: string
  id?: string
  eyebrow?: string
  heading?: string | null
  subheading?: string | null
  /** Plain paragraphs, or a labeled sub-list (e.g. a symptom category with its own bullets). */
  content?: Array<string | { subheading?: string; description?: string; list?: string[] }>
  cards?: Array<Record<string, unknown>>
  images?: Media[]
  buttons?: Cta[]
  /**
   * Per-section design override. All fields optional — absent means
   * "use component defaults". When present, merges via `cn()` and inline
   * CSS variables.
   */
  design?: DesignOverride
  /**
   * Icons used within this section — for section-level icon references
   * (e.g. a decorative background icon). Card-level icons go on the
   * individual card object.
   */
  icons?: IconSpec[]
}

/**
 * An item with no `type` key is the legacy shape (`EditorialPairData`) and
 * renders exactly as it always has. An item with `type` is a `TreatmentBlockData`
 * dispatched through the `SectionRenderer` registry. This is how the schema
 * evolves without a parallel field or a breaking change to the 13 pages
 * already on the legacy-only shape.
 */
export type TreatmentSection = EditorialPairData | TreatmentBlockData

export interface BenefitItem {
  title: string
  body?: string
  items?: string[]
  /** Optional icon — renders at the top of each card / start of each row. */
  icon?: IconSpec
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
  url?:string
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
    ctas: Cta[],
    actions?: {
      videoModal?: boolean
      formModal?: boolean
      videoSource?: string
      /** Matches `HeroEditorial`'s `FORM_COMPONENTS` registry. 'booking' -> full scheduling form (Appointment); 'lead' -> quick-inquiry form (Lead). */
      formSource?: 'booking' | 'lead'
    }
  }
  customsSection?: any
  statement?: string
  symptoms?: BenefitListData
  sections?: TreatmentSection[]
  process?: ProcessStepsData
  pricing?: PricingData
  candidacy?: BenefitListData
  providers?: string[]
  related?: string[],
  testimonials?:{
    name:string,
    source:string
    text:string
    rating:number
  } [],
  disclaimer?:string
  faqs: FaqItem[]
  closingCta: ClosingCtaData
  seo: Seo
}
