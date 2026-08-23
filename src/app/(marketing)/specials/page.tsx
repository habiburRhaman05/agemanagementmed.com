import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { SpecialsGrid } from '@/components/sections/SpecialsGrid'
import { SpecialsClosingCTA } from '@/components/sections/custom/compontents-custom/specials/SpecialsClosingCTA'
import { SpecialsHero } from '@/components/sections/custom/templates-custom/SpecialsHero'
import { Reveal } from '@/components/shared/Reveal'
import type { Metadata } from 'next'

import { specialsContent } from '@/content/pages/specials'
import { buildMetadata, getPageH1, resolveStaticPageSeo } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await resolveStaticPageSeo('/specials', specialsContent.seo))
}

export default async function SpecialsPage() {
  const h1Override = await getPageH1('/specials')

  return (
    <>
      <Header />
      <SpecialsHero
        {...specialsContent.hero}
        title={h1Override || specialsContent.hero.title}
        hideDefaultCta
        centerUntilTablet
        containerOverride="py-35 md:py-50 lg:pt-[201px] lg:pb-[94px]"
        overlay={false}
        overideMinheight="lg:min-h-auto"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Specials', href: '/specials' }]}
        
      />

      <SpecialsGrid specials={specialsContent.specials} />

      <ClosingCTA
        title="Ready To Learn More Or Schedule An Appointment?"
        body="Contact us today to speak with our team."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        backgroundImage="/images/hero-16-bg.jpg"
        centered
        textWidth={"620"}
        
      />
    </>
  )
}
