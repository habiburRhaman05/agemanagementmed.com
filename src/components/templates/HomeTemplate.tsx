import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { LocationBlock } from '@/components/sections/LocationBlock'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ProofBand } from '@/components/sections/ProofBand'
import { StatementBand } from '@/components/sections/StatementBand'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import type { homeContent } from '@/content/pages/home'
import { getFeaturedPeople } from '@/content/people'
import { locations } from '@/content/site'
import { getPublishedTestimonials } from '@/content/testimonials'
import { getAllTreatmentSummaries } from '@/content/treatments'
import { CredentialStrip } from '../sections/CredentialStrip'
import { expertsContent } from '@/content/pages/experts'
import { getServices } from '@/content/services'
import { Services } from '../shared/Services'
import { PatientJourney } from '../shared/PatientJourney'

export async function HomeTemplate({ content }: { content: typeof homeContent }) {
  const providers = await getFeaturedPeople()
  const testimonials = await getPublishedTestimonials()
const data = await getServices()
console.log(data);

  return (
    <>
      <HeroImmersive {...content.hero} />

    

      {/* <PillarGrid
        eyebrow="Our services"
        title="Your best life starts now"
        lead="We connect you with the latest in bioidentical hormone therapy and other cutting-edge treatments designed to support your well-being."
        treatments={await getServices()}
      /> */}

      <Services
        eyebrow="Our services"
        title="Your best life starts now"
        lead="We connect you with the latest in bioidentical hormone therapy and other cutting-edge treatments designed to support your well-being."
        treatments={await getServices()}
      />

      <EditorialPair {...content.origin} background="alt" />

      {/* <ProofBand {...content.proof} />
       */}
      <CredentialStrip
        eyebrow="Recognized for excellence"
        title="Recognized in Savannah & beyond"
        lead="These recognitions reflect our commitment to delivering high-quality aesthetic and wellness services in the Savannah area."
        awards={expertsContent.awards}
      />
      {/* <ProcessSteps {...content.journey} background="page" /> */}
      <PatientJourney   {...content.journey}/>

      {/* <EditorialPair {...content.philosophy} /> */}

      <PeopleGrid
        eyebrow="Our experts"
        title="The people who will look after you"
        lead="With years of experience in integrative medicine and hormone therapy, our experts create personalized solutions that help you feel your best."
        people={providers}
        cta={{ label: 'Meet the full team', href: '/our-experts' }}
        background="alt"
      />

      <TestimonialSet
        eyebrow="Patient testimonials"
        title="Real stories of real transformation"
        testimonials={testimonials}
      />

      <LocationBlock
        eyebrow="Visit us"
        title="Two clinics across coastal Georgia"
        locations={locations}
      />

      <FAQAccordion
        eyebrow="Frequently asked"
        title="Common questions"
        items={content.faqs}
      />

      <ClosingCTA {...content.closingCta} />
    </>
  )
}
