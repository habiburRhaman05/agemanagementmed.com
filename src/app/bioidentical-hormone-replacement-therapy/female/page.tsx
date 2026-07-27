import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { hormoneTherapyWomen } from '@/content/treatments/hormone-therapy-women'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(hormoneTherapyWomen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={hormoneTherapyWomen}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
