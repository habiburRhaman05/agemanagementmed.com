import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { weightLossMen } from '@/content/treatments/weight-loss-men'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(weightLossMen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={weightLossMen}
        testimonials={getTestimonials(['david-p', 'robert-f', 'wesley-y'])}
      />
    </>
  )
}
