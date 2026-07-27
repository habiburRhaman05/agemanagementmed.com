import { Header } from '@/components/layout/Header'
import { TreatmentTemplate } from '@/components/templates/TreatmentTemplate'
import { getTestimonials } from '@/content/shared/testimonials'
import { laserVaginalTherapy } from '@/content/treatments/laser-vaginal-therapy'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(laserVaginalTherapy.seo)

export default function Page() {
  return (
    <>
      <Header />
      <TreatmentTemplate
        treatment={laserVaginalTherapy}
        testimonials={getTestimonials(['jennifer-c', 'christina-t', 'christine-w'])}
      />
    </>
  )
}
