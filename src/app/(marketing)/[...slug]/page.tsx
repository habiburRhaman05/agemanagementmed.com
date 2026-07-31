import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { JsonLd } from '@/components/seo/JsonLd'
import { getPublishedTestimonials } from '@/content/testimonials'
import { getAllTreatments, getTreatmentByHref } from '@/content/treatments/main'
import { buildFaqSchema, buildMetadata, buildTreatmentSchema, getSchemaOverride } from '@/lib/seo'
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
import { BhrtHrtLayout } from '@/components/sections/custom/templates-custom/Bhrt-hrt-trtlAYOUT'
import { PrpOfferLayout } from '@/components/sections/custom/templates-custom/PrpOfferLayout'
import { StatesboroLayout } from '@/components/sections/custom/templates-custom/StatesboroLayout'
import NotFound from '../not-found'
import { RejuvenationEnhancementLayout } from '@/components/sections/custom/templates-custom/RejuvenationEnhancementLayout'



export const revalidate = 3600

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

  // Keywords come from `treatment.seo.keywords` (DB-driven, admin-editable) —
  // buildMetadata reads it directly, nothing hardcoded here anymore.
  return buildMetadata(treatment.seo, { additionalImages })
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const href = hrefFromSlug(slug)
  const treatment = await getTreatmentByHref(href)
  if (!treatment) notFound()

  const schemaOverride = await getSchemaOverride(href)
  const faqSchema = buildFaqSchema(treatment.faqs);
  const testimonials = await getPublishedTestimonials()

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
        case "bhrt-hrt-trt":
          return <BhrtHrtLayout treatment={treatment}/>
        case "prp-offer":
          return <PrpOfferLayout treatment={treatment}/>
        case "statesboro":
          return <StatesboroLayout treatment={treatment}/>
        case "rejuvenation-enhancement":
          return <RejuvenationEnhancementLayout treatment={treatment}/>
        case "bioidentical-hormone-replacement-therapy":
          return <HormoneTherapyMenLayout treatment={treatment}/>
        case "concierge-medical-weight-loss":
          return <WeightLossMaleLayout treatment={treatment}/>
        case "platelet-rich-plasma-hair":
          return <HairRestoreMaleLayout treatment={treatment}/>
      default:
       return <NotFound/>
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
      <Header overlay />

      {renderTemplate(treatment.slug)}
    </>
  )
}
