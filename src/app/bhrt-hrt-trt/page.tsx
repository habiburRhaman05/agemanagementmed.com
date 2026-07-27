import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { bhrtHrtTrt } from '@/content/treatments/bhrt-hrt-trt'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(bhrtHrtTrt.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={bhrtHrtTrt}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
