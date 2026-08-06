import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { Co2VsPrpComparison } from '../compontents-custom/sexualWellnes/Co2VsPrpComparison'
import { FemaleSexualHealthIntro } from '../compontents-custom/sexualWellnes/FemaleSexualHealthIntro'
import { TreatmentOptionsColumnBox } from '../compontents-custom/sexualWellnes/TreatmentOptionsColumnBox'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function SexualWellnessFemaleLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        image={{ ...treatment.hero.image, src: '/images/banner-30-bg.jpg' }}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <div className="lg-flexspace-100 bg-white" />
      <FemaleSexualHealthIntro />

      <div className="lg-flexspace-100" />

      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container text-center flex flex-col items-center">
            <h2 className="lg-title lg-text-center">Treatment Options</h2>
            <div className="lg-text lg-text-center max-w-3xl mx-auto">
              <p>Tailored to your needs, these services support lasting improvements in libido, performance, and satisfaction.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 60 }} />

      <TreatmentOptionsColumnBox />

      <div className="lg-flexspace-100" />

      <div className="lg-content-d">
        <div className="lg-max-width-1440">
          <div className="lg-container text-center flex flex-col items-center">
            <h2 className="lg-title lg-text-center">
              CO2 Laser vs PRP Therapy:
              <br />
              Understanding The Difference
            </h2>
            <div className="lg-text lg-text-center lg-max-width-1050 mx-auto">
              <p>
                Laser therapy and PRP therapy address different aspects of female sexual health. Many women benefit
                from combining both therapies to address both tissue health and sexual responsiveness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg-flexspace-50" />

      <Co2VsPrpComparison />

      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently asked questions"
          lead="Deciding on Sexual Performance Enhancement & Rejuvenation is important, and you likely have questions. Here are answers to common questions to help you make an informed decision."
          items={treatment.faqs}
        />
      ) : null}

      {testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          background="alt"
          backgroundImage="/images/testimonial-17-bg.jpg"
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} backgroundImage="/images/hero-17-bg.jpg" />
    </>
  )
}
