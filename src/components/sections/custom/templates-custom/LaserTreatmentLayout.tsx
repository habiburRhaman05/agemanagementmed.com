import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { SymptomsOutcomesGrid } from '../compontents-custom/shared/SymptomsOutcomesGrid'
import { laserIcons } from '../compontents-custom/laserVaginalTherapy/laser-icons'
import { TreatmentBenefitsIntro } from '../compontents-custom/shockwaveTherapy/TreatmentBenefitsIntro'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function LaserTreatMentLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const testimonials = await getPublishedTestimonials()

  return (
    <>
      <HeroEditorial
        {...treatment.hero}
        fullHeight
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pillar.label, href: pillar.href },
          { label: treatment.shortName, href: treatment.href },
        ]}
      />

      <TreatmentBenefitsIntro
        darkCard={{
          image: {
            src: 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-47-img.jpg',
            alt: 'A relaxed patient before a Laser Vaginal Therapy treatment',
          },
          heading: 'Gentle and Precise, Designed for Intimate Areas',
          paragraphs: [
            'Laser Vaginal Therapy is an in-clinic treatment using non-surgical CO2 laser technology to stimulate collagen remodeling, strengthen vaginal walls, and restore vaginal mucosa — delivering meaningful rejuvenation without invasive surgery.',
            'Patients enjoy improved tone, lubrication, and tissue integrity. Our Laser Vaginal Therapy treatments are performed by licensed clinicians trained in vaginal rejuvenation protocols. Most patients complete a series of three in-office treatments.',
          ],
        }}
        lightCard={{
          image: {
            src: 'https://www.agemanagementmed.com/themes/default/assets/images/photo-content-71-img.jpg',
            alt: 'A patient discussing Laser Vaginal Therapy benefits with a provider',
          },
          heading: 'Benefits of Laser Vaginal Therapy',
          benefits: [
            'Reduced vaginal dryness and improved lubrication',
            'Improved vaginal tone, tightness, and reduction of laxity',
            'Increased comfort and satisfaction during intercourse',
            'Decreased incontinence and urgency',
            'Enhanced sensitivity and satisfaction',
          ],
          ctaLabel: 'Request a consultation',
          ctaHref: '/book-appointment',
        }}
      />

      <SymptomsOutcomesGrid
        title="Symptoms Treated by Laser Vaginal Therapy"
        items={[
          {
            icon: laserIcons[0],
            title: 'Vaginal Dryness',
            description: 'Persistent dryness and irritation, often felt during intercourse.',
          },
          {
            icon: laserIcons[1],
            title: 'Discomfort',
            description: 'Pain during intercourse, particularly during menopause or following cancer treatment.',
          },
          {
            icon: laserIcons[2],
            title: 'Laxity or Loss of Tone',
            description: 'A feeling of looseness or reduced sensation after childbirth or with age.',
          },
          {
            icon: laserIcons[3],
            title: 'Urinary Incontinence',
            description: 'Leakage while laughing, coughing, sneezing, or exercising.',
          },
        ]}
      />

      {testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          background="alt"
        />
      ) : null}

      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently asked questions"
          lead="Deciding on Laser Vaginal Therapy is important, and you likely have questions. Here are answers to common questions to help you make an informed decision."
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} />
    </>
  )
}
