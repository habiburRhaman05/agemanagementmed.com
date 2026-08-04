import dynamic from 'next/dynamic'

import { AestheticsPromo } from '@/components/sections/AestheticsPromo'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { CredentialStrip } from '@/components/sections/CredentialStrip'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroBand, TealStatementStrip } from '@/components/sections/HeroBand'
import { HeroImmersive } from '@/components/sections/HeroImmersive'
import { HomeServices } from '@/components/sections/HomeServices'
import { WelcomeVideo } from '@/components/sections/WelcomeVideo'
import { expertsContent } from '@/content/pages/experts'
import { getPublishedTestimonials } from '@/content/testimonials'
import type { homeContent } from '@/content/pages/home'
import { PatientJourney } from '../shared/PatientJourney'

const TestimonialSet = dynamic(() =>
  import('@/components/sections/TestimonialSet').then((mod) => mod.TestimonialSet),
)

/**
 * Homepage composition. Section order and copy follow the live site
 * (see download/_index_.html); the hero and FAQ stay as they were.
 */
export async function HomeTemplate({ content }: { content: typeof homeContent }) {
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <HeroImmersive {...content.hero} />

      {/* The source lifts the awards band up over the banner by 80px. */}
      <div className="lg-flexspace-neg80" />

      <CredentialStrip
        title="Best In Savannah Since 2010"
        lead="Savannah Age Management Medicine (SAMM) was founded in 2010 by Harry S. Collins, DO, FACOG, with a clear vision: to move beyond treating symptoms and focus on restoring energy, balance, and long-term health. Through his expertise in hormone therapy and modern wellness, Dr. Collins established SAMM as a trusted provider in Savannah and surrounding areas."
        awards={expertsContent.awards}
      />

      <div className="lg-flexspace-100" />

      <HomeServices
        eyebrow="Our Services"
        title="Your Best Life Starts Now"
        lead="At Savannah Age Management Medicine, we're committed to connecting you with the latest in bioidentical hormone therapy and other cutting-edge treatments designed to supercharge your well-being."
      />

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

      <div className="lg-flexspace-100" />

      <PatientJourney {...content.journey} />

      <div className="lg-flexspace-100" />

      <TealStatementStrip title="Discover the treatments best suited for your needs." />

      <HeroBand
        eyebrow="Who We Are"
        title="Leaders in Age Management and Wellness"
        body="The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices. We pair years of experience, the latest research and technology and a commitment to personalized solutions for unprecedented results. Enjoy a warm, welcoming approach to health optimization."
        cta={{ label: 'Our experts', href: '/our-experts' }}
      />

      <FAQAccordion eyebrow="Frequently asked" title="Common questions" items={content.faqs} />

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />
    </>
  )
}
