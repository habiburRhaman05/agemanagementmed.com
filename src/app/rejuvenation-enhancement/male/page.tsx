import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { sexualWellnessMen } from '@/content/treatments/sexual-wellness-men'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(sexualWellnessMen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={sexualWellnessMen}
        testimonials={getTestimonials(['s-r', 'e-h', 'joseph-f', 'c-g'])}
      />
    </>
  )
}
