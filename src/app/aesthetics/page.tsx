import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { aesthetics } from '@/content/treatments/aesthetics'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(aesthetics.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={aesthetics}
        testimonials={getTestimonials(['lisa-b', 'penny-m', 'leigh-ann-e'])}
      />
    </>
  )
}
