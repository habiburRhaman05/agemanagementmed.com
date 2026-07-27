import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { hairRestorationMen } from '@/content/treatments/hair-restoration-men'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(hairRestorationMen.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={hairRestorationMen}
        testimonials={getTestimonials(['christina-t', 'eli-n'])}
      />
    </>
  )
}
