import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { weightLossWomen } from '@/content/treatments/weight-loss-women'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(weightLossWomen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={weightLossWomen}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
