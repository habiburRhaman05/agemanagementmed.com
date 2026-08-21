import type { Metadata } from 'next'

import { locations, organizationSchemaFacts, site } from '@/content/site'
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
    title: seo.title,
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
 * Admin can set a raw JSON-LD override per path (`PageSeo.schemaJsonLd`).
 * Returns the parsed object if set and valid, else `null` so callers fall
 * back to auto-generated schema.
 */
export async function getSchemaOverride(path: string): Promise<Record<string, unknown> | null> {
  const row = await prisma.pageSeo.findUnique({ where: { path } })
  if (!row?.schemaJsonLd) return null
  try {
    return JSON.parse(row.schemaJsonLd)
  } catch {
    return null
  }
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
