import dynamic from 'next/dynamic'

import { AestheticsPromo } from '@/components/sections/AestheticsPromo'
import { BestOfSavannahSection } from '@/components/sections/BestOfSavannahSection'
import { CredentialStrip } from '@/components/sections/CredentialStrip'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroBand, TealStatementStrip } from '@/components/sections/HeroBand'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { HomeServices } from '@/components/sections/HomeServices'
import { expertsContent } from '@/content/pages/experts'
import { getAllPeople } from '@/content/people'
import { getPublishedTestimonials } from '@/content/testimonials'
import type { homeContent } from '@/content/pages/home'

// Below-the-fold client components — dynamic() keeps `ssr: true` (the default),
// so the server-rendered HTML output is identical to a static import; only
// the hydration JS is split into its own chunk instead of shipping in the
// page's main bundle. Same page, same pixels, less main-thread work
// competing during the initial load window (Total Blocking Time).
const TestimonialSet = dynamic(() =>
  import('@/components/sections/TestimonialSet').then((mod) => mod.TestimonialSet),
)
const WelcomeVideo = dynamic(() =>
  import('@/components/sections/WelcomeVideo').then((mod) => mod.WelcomeVideo),
)
const PatientJourney = dynamic(() =>
  import('@/components/shared/PatientJourney').then((mod) => mod.PatientJourney),
)
const ClosingCTA = dynamic(() =>
  import('@/components/sections/ClosingCTA').then((mod) => mod.ClosingCTA),
)

/**
 * Homepage composition. Section order and copy follow the live site
 * (see download/_index_.html); the hero and FAQ stay as they were.
 */
export async function HomeTemplate({ content }: { content: typeof homeContent }) {
  const [testimonials, people] = await Promise.all([getPublishedTestimonials(), getAllPeople()])

  return (
    <div className="bg-[#F7F8F2]">
      <HeroImmersive {...content.hero}  
      
      />

      {/* The source lifts the awards band up over the banner by 80px. */}
      <div className="lg-flexspace-neg80" />

      <CredentialStrip
        title="Best In Savannah Since 2010"
        lead={[
          'Savannah Age Management Medicine (SAMM) was founded in 2010 by Harry S. Collins, DO, FACOG, with a clear vision: to move beyond treating symptoms and focus on restoring energy, balance, and long-term health. Through his expertise in hormone therapy and modern wellness, Dr. Collins established SAMM as a trusted provider in Savannah and surrounding areas.',
          'His patient-centered approach continues to define the standard of care at SAMM today, shaping a practice rooted in intention, personalization, and lasting results.',
        ]}
        highlight="Voted Best of Savannah 2026 for Functional Medicine & Hormone Therapy, as featured in Savannah Magazine."
        awards={expertsContent.awards}
      />

      <div className="lg-flexspace-100" />

      <HomeServices
        eyebrow="Our Services"
        title="Your Best Life Starts Now"
        lead="At Savannah Age Management Medicine, we're committed to connecting you with the latest in bioidentical hormone therapy and other cutting-edge treatments designed to supercharge your well-being."
      />

      <div className="lg-flexspace-100" />

      <BestOfSavannahSection people={people} />

      <div className="lg-flexspace-100" />

      <AestheticsPromo
        title="Discover our Medical Aesthetic services"
        lead="Specialized medical aesthetic services personalized to your skin care goals."
        ctaLabel="Medical Aesthetics"
        href="https://www.savannahskinmed.com/"
      />

      <WelcomeVideo
        title="Welcome To Savannah Age Management Medicine"
        videoHref="https://vimeo.com/1080951303"
      />

      <TestimonialSet
        eyebrow="Patient Testimonials"
        title="Real stories of real transformation."
        lead="See how we've helped our clients transform their lives."
        testimonials={testimonials}
      />

      {/* <div className="lg-flexspace-100" /> */}

      <PatientJourney {...content.journey} />

      {/* <div className="lg-flexspace-100" /> */}

      <TealStatementStrip title="Discover the treatments best suited for your needs." />

      <HeroBand
        eyebrow="Who We Are"
        title="Leaders in Age Management and Wellness"
        body="The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices. We pair years of experience, the latest research and technology and a commitment to personalized solutions for unprecedented results. Enjoy a warm, welcoming approach to health optimization."
        cta={{ label: 'Our experts', href: '/our-experts' }}
      />

      {/* <FAQAccordion eyebrow="Frequently asked" title="Common questions" items={content.faqs} /> */}

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        backgroundImage='/themes/default/assets/images/hero-29-bg_xzb0sa.jpg'
      />
    </div>
  )
}
