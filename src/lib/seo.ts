import type { Metadata } from 'next'

import { locations, organizationSchemaFacts, site } from '@/content/site'
import { fromPageSeoRow } from '@/lib/pageSeoAdmin'
import { prisma } from '@/lib/prisma'
import type { FaqItem, Person, Seo } from '@/types/content'

/**
 * Turns a content `Seo` object into Next metadata. No page hand-writes
 * metadata — it always derives from the same object the page renders from.
 */
export function buildMetadata(
  seo: Seo,
  options?: {
    /** Additional images (e.g. hero) to include in OG/Twitter cards. */
    additionalImages?: Array<{ url: string; alt?: string }>
    /** Page-specific keywords. */
    keywords?: string
  }
): Metadata {
  const url = new URL(seo.canonical, site.url).toString()
  const ogImages = seo.ogImage
    ? [{ url: seo.ogImage.src, alt: seo.ogImage.alt }]
    : options?.additionalImages ?? []

  // Combine OG images with any additional images for Twitter
  const twitterImages = [
    ...(seo.ogImage ? [seo.ogImage.src] : []),
    ...(options?.additionalImages?.map((i) => i.url) ?? []),
  ]

  // OG/Twitter copy falls back through title/description when not explicitly
  // set — most pages have never diverged these, so this preserves today's
  // output exactly for every page that doesn't set the new fields.
  const ogTitle = seo.ogTitle || seo.title
  const ogDescription = seo.ogDescription || seo.description
  const twitterTitle = seo.twitterTitle || ogTitle
  const twitterDescription = seo.twitterDescription || ogDescription

  return {
    // `{ absolute: ... }` bypasses the root layout's `%s | SAMM` title
    // template entirely. Every caller here already hands over a complete,
    // final title (most of the client-audit "Recommended Title" values
    // already end in "| SAMM" themselves) — a plain string title would let
    // the template append "| SAMM" a second time on top of that, which is
    // exactly the double-suffix bug this was fixed for.
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords || options?.keywords || undefined,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: site.name,
      locale: 'en_US',
      type: (seo.ogType as 'website' | 'article' | undefined) ?? 'website',
      images: ogImages.length > 0 ? ogImages : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImages.length > 0 ? twitterImages : undefined,
    },
    other: {
      publisher: site.name,
    },
  }
}

/**
 * `PageSeo.h1` for one path, if an admin has set one — a hero-`<h1>`
 * override, distinct from `<title>`. Treatment pages and blog posts already
 * read their own `seo.h1`/`post.seo.h1` inline (see content/treatments/main.ts
 * and the blog post page); this is for the handful of static marketing pages
 * (contact-us, our-experts, home, services) that never fetched *any* PageSeo
 * data at all — their titles/descriptions are static content, so admins
 * editing those paths in the SEO admin screen had no effect whatsoever.
 * Callers still fall back to their existing hardcoded/content-file title
 * unchanged when this returns `null`.
 */
export async function getPageH1(path: string): Promise<string | null> {
  const row = await prisma.pageSeo.findUnique({ where: { path }, select: { h1Hero: true } })
  return row?.h1Hero || null
}

/**
 * Overlays a path's `PageSeo` row (title, description, OG, Twitter,
 * keywords, noindex — everything the admin SEO screen edits) onto a page's
 * hardcoded fallback `Seo` object. DB values win when the admin has set
 * them; any field never touched in the admin falls straight through to the
 * content file unchanged, so this is safe to add to every static page.
 *
 * The static marketing pages (home, contact-us, our-experts, etc.) build
 * their `Seo` object entirely from a content file and never fetched *any*
 * `PageSeo` row — `getPageH1`/`getSchemaOverride` above patch the h1 and
 * JSON-LD pieces of that same gap, but title/description/OG/Twitter still
 * came from the content file only, so admin edits to those fields had no
 * effect on these pages. This closes the rest of it.
 */
export async function resolveStaticPageSeo(path: string, fallback: Seo): Promise<Seo> {
  const row = await prisma.pageSeo.findUnique({
    where: { path },
    select: {
      metaTitle: true,
      metaDescription: true,
      canonical: true,
      keywords: true,
      h1Hero: true,
      robotsMeta: true,
      openGraph: true,
      twitter: true,
      jsonLd: true,
    },
  })
  const flat = fromPageSeoRow(row)
  if (!flat) return fallback

  return {
    ...fallback,
    title: flat.title || fallback.title,
    description: flat.description || fallback.description,
    canonical: flat.canonical || fallback.canonical,
    keywords: flat.keywords || fallback.keywords,
    noindex: flat.noindex || fallback.noindex,
    h1: flat.h1 || fallback.h1,
    ogTitle: flat.ogTitle || fallback.ogTitle,
    ogDescription: flat.ogDescription || fallback.ogDescription,
    ogType: flat.ogType || fallback.ogType,
    twitterTitle: flat.twitterTitle || fallback.twitterTitle,
    twitterDescription: flat.twitterDescription || fallback.twitterDescription,
    ogImage: flat.ogImageUrl
      ? { src: flat.ogImageUrl, alt: fallback.ogImage?.alt ?? fallback.title }
      : fallback.ogImage,
  }
}

/**
 * Admin can set a raw JSON-LD override per path (`PageSeo.jsonLd`).
 * Returns the object if set, else `null` so callers fall back to
 * auto-generated schema. Stored as a parsed `Json` column, not a string.
 *
 * `FAQPage` is stripped defensively here, at read time — not just at seed
 * time — so a manually-pasted override (via the admin's raw JSON-LD
 * textarea) can never reintroduce a stale/duplicate FAQ block, even if it
 * somehow reached the DB with one still in it.
 */
export async function getSchemaOverride(path: string): Promise<Record<string, unknown> | null> {
  const row = await prisma.pageSeo.findUnique({ where: { path }, select: { jsonLd: true } })
  if (!row?.jsonLd || typeof row.jsonLd !== 'object') return null
  return stripSchemaType(row.jsonLd, 'FAQPage')
}

/**
 * Recursively checks a JSON-LD object (single schema or a `@graph` array of
 * them) for a given `@type` — handles `@type` as either a string or an
 * array, per the schema.org spec. Used so an admin-entered manual schema
 * override only *suppresses* an auto-generated schema (e.g. FAQPage) when it
 * genuinely already supplies one of its own, rather than an override for one
 * thing (say, business/address facts) silently discarding an unrelated
 * auto-generated schema (FAQ) that has nothing to do with it.
 */
export function schemaContainsType(schema: unknown, type: string): boolean {
  if (!schema || typeof schema !== 'object') return false
  if (Array.isArray(schema)) return schema.some((entry) => schemaContainsType(entry, type))

  const obj = schema as Record<string, unknown>
  const ownType = obj['@type']
  const matchesOwnType = Array.isArray(ownType) ? ownType.includes(type) : ownType === type
  if (matchesOwnType) return true

  if (Array.isArray(obj['@graph'])) {
    return (obj['@graph'] as unknown[]).some((entry) => schemaContainsType(entry, type))
  }

  return false
}

/**
 * Removes any entry of the given `@type` from a JSON-LD object — a
 * top-level match returns `null` (nothing sensible left to keep), a match
 * inside `@graph` is filtered out of that array. A `@graph` left with
 * exactly one entry is unwrapped back to a plain object (no point keeping
 * the wrapper for a single schema). Used to keep `PageSeo.jsonLd` /
 * `PostSeo.schemaJsonLd` free of content-derived types (FAQPage, and
 * elsewhere BreadcrumbList/BlogPosting) that are always rendered live
 * instead — see the comment above `buildFaqSchema`'s call site in
 * `[...slug]/page.tsx` for why a frozen copy of one of these causes a
 * duplicate/stale JSON-LD block rather than just redundant data.
 */
export function stripSchemaType(schema: unknown, type: string): Record<string, unknown> | null {
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
    return (schema as Record<string, unknown>) ?? null
  }

  const obj = { ...(schema as Record<string, unknown>) }
  const ownType = obj['@type']
  const ownIsType = Array.isArray(ownType) ? ownType.includes(type) : ownType === type
  if (ownIsType) return null

  if (Array.isArray(obj['@graph'])) {
    const graph = (obj['@graph'] as unknown[]).filter((entry) => !schemaContainsTypeAtTop(entry, type))
    if (graph.length === 0) return null
    if (graph.length === 1) return graph[0] as Record<string, unknown>
    obj['@graph'] = graph
  }

  return obj
}

/**
 * Canonical render order for JSON-LD blocks, broadest entity first:
 * the business, then the page's place in the site, then the page itself,
 * then its content. Mirrors the order production emits (MedicalClinic →
 * BreadcrumbList → VideoObject → FAQPage) so the two are diffable, and —
 * more importantly — makes the order *deterministic* rather than a
 * side effect of whatever sequence entries happen to sit in inside a
 * stored `@graph`. Types not listed here keep their relative order and
 * sort after the known ones.
 */
const SCHEMA_TYPE_ORDER = [
  'MedicalClinic',
  'MedicalBusiness',
  'LocalBusiness',
  'Organization',
  'BreadcrumbList',
  'VideoObject',
  'ImageObject',
  'MedicalWebPage',
  'WebPage',
  'BlogPosting',
  'Article',
  'Person',
  'FAQPage',
]

function schemaOrderIndex(schema: Record<string, unknown>): number {
  const type = schema['@type']
  const primary = Array.isArray(type) ? type[0] : type
  const index = SCHEMA_TYPE_ORDER.indexOf(String(primary))
  return index === -1 ? SCHEMA_TYPE_ORDER.length : index
}

/** Sorts JSON-LD blocks into `SCHEMA_TYPE_ORDER`. Stable — equal/unknown types keep their input order. */
export function sortSchemas(schemas: Record<string, unknown>[]): Record<string, unknown>[] {
  return schemas
    .map((schema, index) => ({ schema, index }))
    .sort((a, b) => schemaOrderIndex(a.schema) - schemaOrderIndex(b.schema) || a.index - b.index)
    .map(({ schema }) => schema)
}

/**
 * Unwraps a `@graph` wrapper into its individual schema objects, each
 * carrying its own `@context`, so callers can render one
 * `<script type="application/ld+json">` per schema rather than a single
 * combined block.
 *
 * This matches how the production site emits its schema — one separate
 * script tag per type (MedicalClinic, BreadcrumbList, VideoObject, …) —
 * which is also the shape Google's own examples and the Rich Results Test
 * present. A non-`@graph` object is returned as a single-item list, so
 * callers can treat both shapes identically.
 */
export function splitSchemaGraph(schema: unknown): Record<string, unknown>[] {
  if (!schema || typeof schema !== 'object') return []
  if (Array.isArray(schema)) {
    return schema.flatMap((entry) => splitSchemaGraph(entry))
  }

  const obj = schema as Record<string, unknown>
  const graph = obj['@graph']
  if (!Array.isArray(graph)) return [obj]

  const parentContext = obj['@context'] ?? 'https://schema.org'

  return graph
    .filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
    .map((entry) => ({
      '@context': entry['@context'] ?? parentContext,
      ...entry,
    }))
}

/** `schemaContainsType`, but only checking the entry's own `@type` — not recursing into a nested `@graph` (an `@graph` entry never itself contains another `@graph`, so this is just the cheaper non-recursive half, kept private to this file). */
function schemaContainsTypeAtTop(entry: unknown, type: string): boolean {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false
  const t = (entry as Record<string, unknown>)['@type']
  return Array.isArray(t) ? t.includes(type) : t === type
}

/**
 * Sitewide MedicalClinic (a LocalBusiness/MedicalBusiness subtype) schema —
 * rendered once, in the marketing layout, on every page. Matches the shape
 * already proven live on agemanagementmed.com (address, geo, hours,
 * specialties, services) rather than the bare name/url/phone the previous
 * version shipped — that stripped-down version was a real regression
 * against the live site's local-SEO markup, not an intentional redesign.
 */
export function buildOrganizationSchema(settings: {
  siteName: string
  phone: string | null
  email: string | null
  /** Defaults to the site logo; pass explicit photo URLs to match the live site's 1x1/4x3/16x9 set once those exist in this app. */
  images?: string[]
}) {
  const primary = locations[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: settings.siteName,
    url: site.url,
    telephone: settings.phone ?? undefined,
    email: settings.email ?? undefined,
    image: settings.images?.length ? settings.images : undefined,
    address: primary
      ? {
          '@type': 'PostalAddress',
          streetAddress: primary.addressLine,
          addressLocality: primary.city,
          addressRegion: primary.state,
          postalCode: primary.zip,
          addressCountry: 'US',
        }
      : undefined,
    geo: primary?.geo
      ? { '@type': 'GeoCoordinates', latitude: primary.geo.latitude, longitude: primary.geo.longitude }
      : undefined,
    medicalSpecialty: organizationSchemaFacts.medicalSpecialty,
    priceRange: organizationSchemaFacts.priceRange,
    openingHoursSpecification: primary
      ? primary.hours
          .filter((h) => h.time.toLowerCase() !== 'closed')
          .map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: expandDayRange(h.days),
            ...parseHoursRange(h.time),
          }))
      : undefined,
    availableService: organizationSchemaFacts.availableServices.map((s) => ({
      '@type': s.type,
      name: s.name,
    })),
  }
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** "Mon – Thu" → ["Monday", "Tuesday", "Wednesday", "Thursday"]; "Friday" → ["Friday"]. */
function expandDayRange(days: string): string[] {
  const abbrevToIndex: Record<string, number> = {
    sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
  }
  const parts = days.split(/[–-]/).map((p) => p.trim().slice(0, 3).toLowerCase())
  const start = abbrevToIndex[parts[0]]
  const end = abbrevToIndex[parts[1] ?? parts[0]]
  if (start === undefined || end === undefined) return [days]
  const result: string[] = []
  for (let i = start; i <= end; i++) result.push(DAY_NAMES[i])
  return result
}

/** "9:00 AM – 5:00 PM" → { opens: "09:00", closes: "17:00" }. */
function parseHoursRange(time: string): { opens: string; closes: string } | Record<string, never> {
  const [openRaw, closeRaw] = time.split(/[–-]/).map((p) => p.trim())
  const to24h = (t?: string) => {
    const match = t?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (!match) return undefined
    let [, h, m, period] = match
    let hour = Number(h)
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0
    return `${String(hour).padStart(2, '0')}:${m}`
  }
  const opens = to24h(openRaw)
  const closes = to24h(closeRaw)
  return opens && closes ? { opens, closes } : {}
}

/** BlogPosting schema for one blog article. */
export function buildArticleSchema(post: {
  title: string
  excerpt?: string | null
  image?: string | null
  publishedAt?: Date | string | null
  updatedAt?: Date | string | null
  authorName?: string | null
  href: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.image ?? undefined,
    url: new URL(post.href, site.url).toString(),
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    author: {
      '@type': post.authorName ? 'Person' : 'Organization',
      name: post.authorName || site.name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
    },
  }
}

/** Person schema for a provider/staff profile — links back to the practice via `worksFor`. */
export function buildPersonSchema(person: Person) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    honorificSuffix: person.credentials || undefined,
    jobTitle: person.role,
    description: person.summary || undefined,
    image: person.portrait?.src || undefined,
    url: new URL('/our-experts', site.url).toString(),
    worksFor: {
      '@type': 'MedicalClinic',
      name: site.name,
      url: site.url,
    },
    knowsAbout: person.specialties?.length ? person.specialties : undefined,
  }
}

/** FAQPage schema for a treatment page's existing `faqs` — real content already on the page, not invented. */
export function buildFaqSchema(faqs: FaqItem[] | undefined) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/** Re-exported from breadcrumb-schema.ts — see that file for why it's split out (no `prisma` import, so `HeroEditorial` — a client component — can use it directly). */
export { buildBreadcrumbSchema } from './breadcrumb-schema'

/** MedicalWebPage schema for one treatment, combining its own facts (not invented) with the practice's identity. */
export function buildTreatmentSchema(treatment: {
  name: string
  summary: string
  href: string
  seo: Seo
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: treatment.name,
    description: treatment.summary,
    url: new URL(treatment.href, site.url).toString(),
    lastReviewed: undefined,
    publisher: { '@type': 'MedicalBusiness', name: site.name },
  }
}
