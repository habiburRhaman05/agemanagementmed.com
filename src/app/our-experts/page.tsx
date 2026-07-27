import { Header } from '@/components/layout/Header'
import { BenefitList } from '@/components/sections/BenefitList'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { ContentGrid } from '@/components/sections/ContentGrid'
import { CredentialStrip } from '@/components/sections/CredentialStrip'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { expertsContent } from '@/content/pages/experts'
import { people } from '@/content/people'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(expertsContent.seo)

export default function ExpertsPage() {
  return (
    <>
      <Header />
      <HeroEditorial
        {...expertsContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Experts', href: '/our-experts' }]}
      />

      <EditorialPair {...expertsContent.standard} background="alt" />

      <BenefitList {...expertsContent.whyChooseUs} />

      <CredentialStrip
        eyebrow="Recognized for excellence"
        title="Recognized in Savannah & beyond"
        lead="These recognitions reflect our commitment to delivering high-quality aesthetic and wellness services in the Savannah area."
        awards={expertsContent.awards}
      />

      <PeopleGrid
        eyebrow="Meet our experts"
        title="The people who will look after you"
        lead="With years of experience in integrative medicine and hormone therapy, our experts create personalized solutions that help you feel your best."
        people={people}
      />

      <ContentGrid eyebrow="As seen on" title="In the news" items={expertsContent.press} columns={2} />

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book' }}
      />
    </>
  )
}
