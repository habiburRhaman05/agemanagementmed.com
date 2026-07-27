import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { perimenopauseMenopause } from '@/content/treatments/perimenopause-menopause'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(perimenopauseMenopause.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={perimenopauseMenopause}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
