import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { glp1MicrodosingWomen } from '@/content/treatments/glp1-microdosing-women'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(glp1MicrodosingWomen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={glp1MicrodosingWomen}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
