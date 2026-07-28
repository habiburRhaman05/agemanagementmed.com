import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { getTreatmentBySlug } from '@/content/treatments/main'
import { buildMetadata } from '@/lib/seo'

const treatment = getTreatmentBySlug('sexual-wellness-women')

export const metadata = buildMetadata(treatment!.seo)

export default function Page() {
  if (!treatment) notFound()

  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={treatment}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
