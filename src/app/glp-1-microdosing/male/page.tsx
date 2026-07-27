import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { glp1MicrodosingMen } from '@/content/treatments/glp1-microdosing-men'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(glp1MicrodosingMen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={glp1MicrodosingMen}
        testimonials={getTestimonials(['david-p', 'mike-d'])}
      />
    </>
  )
}
