import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { hormoneTherapyMen } from '@/content/treatments/hormone-therapy-men'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(hormoneTherapyMen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={hormoneTherapyMen}
        testimonials={getTestimonials(['david-p', 'wesley-y', 'mike-d'])}
      />
    </>
  )
}
