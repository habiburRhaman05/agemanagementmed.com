import { Prisma } from '@/lib/generated/prisma'

/**
 * `PageSeo.openGraph`/`.twitter` are consolidated `Json?` blobs (shape below),
 * `robotsMeta` is a raw string (`"noindex, nofollow"`), and `jsonLd` stores a
 * parsed object — not the flat `ogTitle`/`ogImageUrl`/`noindex`(boolean)/
 * `schemaJsonLd`(string) columns the admin UI (SeoTable, TreatmentForm) and
 * this API layer were originally built against. This module is the one place
 * that translates between the two, so the admin forms and their Zod schemas
 * don't have to change shape when the DB schema does.
 */

export interface OpenGraphJson {
  title: string | null
  description: string | null
  image: string | null
  type: string | null
}

export interface TwitterJson {
  title: string | null
  description: string | null
}

/** The flat shape the admin UI (SeoTable, TreatmentForm) reads and writes. */
export interface FlatPageSeo {
  title: string | null
  description: string | null
  canonical: string | null
  keywords: string | null
  ogImageUrl: string | null
  noindex: boolean
  schemaJsonLd: string | null
  h1: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogType: string | null
  twitterTitle: string | null
  twitterDescription: string | null
}

/** A subset of real `PageSeo` columns — matches what every call site here selects (or the full row). */
export interface PageSeoDbRow {
  metaTitle: string | null
  metaDescription: string | null
  canonical: string | null
  keywords: string | null
  h1Hero: string | null
  robotsMeta: string | null
  openGraph: unknown
  twitter: unknown
  jsonLd: unknown
}

function asOpenGraph(value: unknown): Partial<OpenGraphJson> {
  return value && typeof value === 'object' ? (value as Partial<OpenGraphJson>) : {}
}

function asTwitter(value: unknown): Partial<TwitterJson> {
  return value && typeof value === 'object' ? (value as Partial<TwitterJson>) : {}
}

/** Real `PageSeo` row (or a `select`ing subset of it) -> the admin UI's flat shape. Returns `null` for no row, matching the old flat-table lookup's `null`. */
export function fromPageSeoRow(row: PageSeoDbRow | null): FlatPageSeo | null {
  if (!row) return null
  const og = asOpenGraph(row.openGraph)
  const tw = asTwitter(row.twitter)

  return {
    title: row.metaTitle,
    description: row.metaDescription,
    canonical: row.canonical,
    keywords: row.keywords,
    ogImageUrl: og.image ?? null,
    noindex: row.robotsMeta ? /noindex/i.test(row.robotsMeta) : false,
    schemaJsonLd: row.jsonLd ? JSON.stringify(row.jsonLd) : null,
    h1: row.h1Hero,
    ogTitle: og.title ?? null,
    ogDescription: og.description ?? null,
    ogType: og.type ?? null,
    twitterTitle: tw.title ?? null,
    twitterDescription: tw.description ?? null,
  }
}

/** The admin UI's flat shape -> real `PageSeo` write columns, for both `create` and `update`. */
export function toPageSeoWrite(input: Partial<FlatPageSeo>) {
  const openGraph: OpenGraphJson = {
    title: input.ogTitle ?? null,
    description: input.ogDescription ?? null,
    image: input.ogImageUrl ?? null,
    type: input.ogType ?? null,
  }
  const twitter: TwitterJson = {
    title: input.twitterTitle ?? null,
    description: input.twitterDescription ?? null,
  }

  let jsonLd: Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined
  if (input.schemaJsonLd === undefined) {
    jsonLd = undefined
  } else if (!input.schemaJsonLd) {
    jsonLd = Prisma.JsonNull
  } else {
    try {
      jsonLd = JSON.parse(input.schemaJsonLd) as Prisma.InputJsonValue
    } catch {
      // Callers validate JSON before reaching here; fall back to clearing
      // rather than writing a string into a Json column.
      jsonLd = Prisma.JsonNull
    }
  }

  return {
    metaTitle: input.title,
    metaDescription: input.description,
    canonical: input.canonical,
    keywords: input.keywords,
    h1Hero: input.h1,
    robotsMeta: input.noindex === undefined ? undefined : input.noindex ? 'noindex, nofollow' : null,
    openGraph: openGraph as unknown as Prisma.InputJsonValue,
    twitter: twitter as unknown as Prisma.InputJsonValue,
    ...(jsonLd === undefined ? {} : { jsonLd }),
  }
}
