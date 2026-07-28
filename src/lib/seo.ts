import type { Metadata } from 'next'

import { site } from '@/content/site'
import { prisma } from '@/lib/prisma'
import type { FaqItem, Seo } from '@/types/content'

/**
 * Turns a content `Seo` object into Next metadata. No page hand-writes
 * metadata — it always derives from the same object the page renders from.
 */
export function buildMetadata(seo: Seo): Metadata {
  const url = new URL(seo.canonical, site.url).toString()
  const images = seo.ogImage ? [{ url: seo.ogImage.src, alt: seo.ogImage.alt }] : undefined

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: site.name,
      locale: 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: images?.map((i) => i.url),
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

/** Sitewide MedicalBusiness schema — used once, in the root layout. */
export function buildOrganizationSchema(settings: {
  siteName: string
  phone: string | null
  email: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: settings.siteName,
    url: site.url,
    telephone: settings.phone ?? undefined,
    email: settings.email ?? undefined,
  }
}

/** FAQPage schema for a treatment page's existing `faqs` — real content already on the page, not invented. */
export function buildFaqSchema(faqs: FaqItem[]) {
  if (!faqs.length) return null
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

/** BreadcrumbList schema — mirrors whatever crumb trail `HeroEditorial` renders visually for the same page. */
export function buildBreadcrumbSchema(crumbs: Array<{ label: string; href: string }>) {
  if (!crumbs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, site.url).toString(),
    })),
  }
}

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
