import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { JsonLd } from '@/components/seo/JsonLd'
import { getTestimonials } from '@/content/shared/testimonials'
import { getAllTreatments, getTreatmentByHref } from '@/content/treatments/main'
import { buildFaqSchema, buildMetadata, buildTreatmentSchema, getSchemaOverride } from '@/lib/seo'
import TreatLayout from '@/components/TreatLayout'
import { WeightLossMaleLayout } from '@/components/sections/custom/templates-custom/WeightLossMaleLayout'
import { WeightLossFeMaleLayout } from '@/components/sections/custom/templates-custom/WeightLossFemaleLayout'
import { HairRestoreFemaleLayout } from '@/components/sections/custom/templates-custom/HairRestoreFemale'
import { HairRestoreMaleLayout } from '@/components/sections/custom/templates-custom/HairRestoreMaleLayout'
import { SexualWellnessMaleLayout } from '@/components/sections/custom/templates-custom/SexualWellnessMaleLayout'
import { SexualWellnessFemaleLayout } from '@/components/sections/custom/templates-custom/SexualWellnessFemaleLayout'
import { GlpMicrodosingMaleLayout } from '@/components/sections/custom/templates-custom/GlpMicrodosingMaleLayout'
import { GlpMicrodosingFemaleLayout } from '@/components/sections/custom/templates-custom/GlpMicrodosingFemaleLayout'
import { ShockwaveTherapyLayout } from '@/components/sections/custom/templates-custom/ShockwaveTherapyLayout'
import { PerimenopauseMenopauseLayout } from '@/components/sections/custom/templates-custom/PerimenopauseMenopauseLayout'
import { HormoneTherapyMenLayout } from '@/components/sections/custom/templates-custom/HormoneTherapyMenLayout'
import { HormoneTherapyWomenLayout } from '@/components/sections/custom/templates-custom/HormoneTherapyWomenLayout'
import { LaserTreatMentLayout } from '@/components/sections/custom/templates-custom/LaserTreatmentLayout'

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
  const faqSchema = buildFaqSchema(treatment.faqs);

  const renderTemplate = (slug: string) =>{
    switch (slug) {
      case "weight-loss-men":
        return <WeightLossMaleLayout
        treatment={treatment}
        />
    
        case "weight-loss-women":
          return <WeightLossFeMaleLayout treatment={treatment}/>
        case "hair-restoration-women":
          return <HairRestoreFemaleLayout treatment={treatment}/>
        case "hair-restoration-men":
          return <HairRestoreMaleLayout treatment={treatment}/>
        case "sexual-wellness-men":
          return <SexualWellnessMaleLayout treatment={treatment}/>
        case "sexual-wellness-women":
          return <SexualWellnessFemaleLayout treatment={treatment}/>
        case "glp1-microdosing-men":
          return <GlpMicrodosingMaleLayout treatment={treatment}/>
        case "glp1-microdosing-women":
          return <GlpMicrodosingFemaleLayout treatment={treatment}/>
        case "shockwave-therapy":
          return <ShockwaveTherapyLayout treatment={treatment}/>
        case "perimenopause-menopause":
          return <PerimenopauseMenopauseLayout treatment={treatment}/>
        case "hormone-therapy-men":
          return <HormoneTherapyMenLayout treatment={treatment}/>
        case "hormone-therapy-women":
          return <HormoneTherapyWomenLayout treatment={treatment}/>
        case "laser-vaginal-therapy":
          return <LaserTreatMentLayout treatment={treatment}/>
      default:
       return <TreatmentTemplate
        treatment={treatment}
        testimonials={getTestimonials(TESTIMONIALS_BY_SLUG[treatment.slug] ?? [])}
      /> 
    }
  }

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


      {/* <TreatmentTemplate
        treatment={treatment}
        testimonials={getTestimonials(TESTIMONIALS_BY_SLUG[treatment.slug] ?? [])}
      /> */}

     {renderTemplate(treatment.slug)}

    </>
  )
}
