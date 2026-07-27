import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { EditorialPair } from '@/components/sections/EditorialPair'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { LocationBlock } from '@/components/sections/LocationBlock'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { PillarGrid } from '@/components/sections/PillarGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ProofBand } from '@/components/sections/ProofBand'
import { StatementBand } from '@/components/sections/StatementBand'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import type { homeContent } from '@/content/pages/home'
import { providers } from '@/content/people'
import { locations } from '@/content/site'
import { treatments } from '@/content/treatments'

/**
 * Section order is the funnel from docs/01-INFORMATION-ARCHITECTURE.md §5:
 * land → understand → treatments → trust → process → people → proof → book.
 * Two dark bands (ProofBand, ClosingCTA) give the page its rhythm.
 */
export function HomeTemplate({ content }: { content: typeof homeContent }) {
  return (
    <>
      <HeroImmersive {...content.hero} />

      {/* <StatementBand text={content.statement} /> */}

      <PillarGrid
        eyebrow="Our services"
        title="Your best life starts now"
        lead="We connect you with the latest in bioidentical hormone therapy and other cutting-edge treatments designed to support your well-being."
        treatments={treatments}
      />

      <EditorialPair {...content.origin} background="alt" />

      <ProofBand {...content.proof} />

      <ProcessSteps {...content.journey} background="page" />

      <EditorialPair {...content.philosophy} />

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
        testimonials={content.testimonials}
      />

      <LocationBlock
        eyebrow="Visit us"
        title="Two clinics across coastal Georgia"
        locations={locations}
      />

      <ClosingCTA {...content.closingCta} />
    </>
  )
}
