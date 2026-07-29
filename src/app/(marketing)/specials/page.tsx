import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SpecialsGrid } from '@/components/sections/SpecialsGrid'
import { specialsContent } from '@/content/pages/specials'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(specialsContent.seo)

export default function SpecialsPage() {
  return (
    <>
      <Header />
      <HeroEditorial
        {...specialsContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Specials', href: '/specials' }]}
      />

      <SpecialsGrid specials={specialsContent.specials} />

      <ClosingCTA
        title="Ready to learn more or schedule an appointment?"
        body="Contact us today to speak with our team."
        cta={{ label: 'Schedule a consultation', href: '/book' }}
      />
    </>
  )
}
