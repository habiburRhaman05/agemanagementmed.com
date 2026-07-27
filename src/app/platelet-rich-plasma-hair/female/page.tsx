import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { hairRestorationWomen } from '@/content/treatments/hair-restoration-women'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(hairRestorationWomen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={hairRestorationWomen}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
