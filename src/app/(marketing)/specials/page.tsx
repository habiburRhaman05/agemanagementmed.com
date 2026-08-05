import { Header } from '@/components/layout/Header'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SpecialsGrid } from '@/components/sections/SpecialsGrid'
import { SpecialsClosingCTA } from '@/components/sections/custom/compontents-custom/specials/SpecialsClosingCTA'
import { Reveal } from '@/components/shared/Reveal'
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

      <Reveal>
        <SpecialsClosingCTA />
      </Reveal>
    </>
  )
}
