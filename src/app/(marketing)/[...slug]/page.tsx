import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { JsonLd } from '@/components/seo/JsonLd'
import { getTestimonials } from '@/content/shared/testimonials'
import { getAllTreatments, getTreatmentByHref } from '@/content/treatments/main'
import { buildFaqSchema, buildMetadata, buildTreatmentSchema, getSchemaOverride } from '@/lib/seo'

/**
 * Single dynamic route serving every treatment page — replaces the 15
 * folder-based routes. Every other static route (our-experts, contact-us,
 * blog, book, etc.) is untouched: Next.js always resolves a literal static
 * folder before falling through to this catch-all, so nothing here can
 * shadow them.
 */

export const revalidate = 3600

/**
 * Which real Google reviews to show per treatment, keyed by `Treatment.slug`.
 * Consolidated here from the 15 previous per-page hardcoded lists.
 */
const TESTIMONIALS_BY_SLUG: Record<string, string[]> = {
  'hormone-therapy-men': ['david-p'],
  'hormone-therapy-women': [],
  'weight-loss-men': ['david-p', 'robert-f', 'wesley-y'],
  'weight-loss-women': ['jennifer-c', 'christina-t', 'christine-w'],
  aesthetics: ['lisa-b', 'penny-m', 'leigh-ann-e'],
  'bhrt-hrt-trt': ['jennifer-c', 'christina-t', 'christine-w'],
  'glp1-microdosing-men': ['david-p', 'mike-d'],
  'glp1-microdosing-women': ['jennifer-c', 'christina-t', 'christine-w'],
  'hair-restoration-men': ['christina-t', 'eli-n'],
  'hair-restoration-women': ['jennifer-c', 'christina-t', 'christine-w'],
  'laser-vaginal-therapy': ['s-r', 'e-h', 'joseph-f', 'c-g'],
  'perimenopause-menopause': ['jennifer-c', 'christina-t', 'christine-w'],
  'sexual-wellness-men': ['s-r', 'e-h', 'joseph-f', 'c-g'],
  'sexual-wellness-women': ['jennifer-c', 'christina-t', 'christine-w'],
  'shockwave-therapy': ['jennifer-c', 'christina-t', 'christine-w'],
}

function hrefFromSlug(slug: string[]): string {
  return `/${slug.join('/')}`
}

export async function generateStaticParams() {
  const treatments = await getAllTreatments()
  return treatments.map((treatment) => ({
    slug: treatment.href.split('/').filter(Boolean),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const treatment = await getTreatmentByHref(hrefFromSlug(slug))
  if (!treatment) return {}
  
  // Pass hero image as additional image for OG/Twitter cards
  const additionalImages = treatment.hero?.image?.src
    ? [{ url: treatment.hero.image.src, alt: treatment.hero.image.alt }]
    : undefined
  
  // Build keywords from treatment name and default terms
  const keywords = `${treatment.name}, hormone therapy, weight loss, age management, Savannah GA`
  
  return buildMetadata(treatment.seo, { additionalImages, keywords })
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const href = hrefFromSlug(slug)
  const treatment = await getTreatmentByHref(href)
  if (!treatment) notFound()

  const schemaOverride = await getSchemaOverride(href)
  const faqSchema = buildFaqSchema(treatment.faqs)

  return (
    <>
      {schemaOverride ? (
        <JsonLd data={schemaOverride} />
      ) : (
        <JsonLd
          data={buildTreatmentSchema({
            name: treatment.name,
            summary: treatment.summary,
            href: treatment.href,
            seo: treatment.seo,
          })}
        />
      )}
      {!schemaOverride && faqSchema ? <JsonLd data={faqSchema} /> : null}
      <Header />
      <TreatmentTemplate
        treatment={treatment}
        testimonials={getTestimonials(TESTIMONIALS_BY_SLUG[treatment.slug] ?? [])}
      />
    </>
  )
}
