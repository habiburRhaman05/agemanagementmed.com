import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { sexualWellnessWomen } from '@/content/treatments/sexual-wellness-women'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(sexualWellnessWomen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={sexualWellnessWomen}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
