import { Header } from '@/components/layout/Header'
import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { CredentialStrip } from '@/components/sections/CredentialStrip'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { expertsContent } from '@/content/pages/experts'
import { getAllPeople } from '@/content/people'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(expertsContent.seo)

export default async function ExpertsPage() {
  const people = await getAllPeople()

  return (
    <>
      <Header overlay />
      <HeroEditorial
      fullHeight
        {...expertsContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Experts', href: '/our-experts' }]}
      />

      {/* <EditorialPair {...expertsContent.standard} background="alt" /> */}

      <BenefitList {...expertsContent.whyChooseUs} />



      <PeopleGrid
        eyebrow="Meet our experts"
        title="The people who will look after you"
        lead="With years of experience in integrative medicine and hormone therapy, our experts create personalized solutions that help you feel your best."
        people={people}
      />

    

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />
    </>
  )
}
