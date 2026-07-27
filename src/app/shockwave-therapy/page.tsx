import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { shockwaveTherapy } from '@/content/treatments/shockwave-therapy'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(shockwaveTherapy.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={shockwaveTherapy}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
