import { HeartHandshake, HeartPulse, ShieldOff, Target, Waves } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Testimonial, Treatment } from '@/types/content'
import { SymptomsOutcomesGrid } from '../compontents-custom/shared/SymptomsOutcomesGrid'
import { TreatmentBenefitsIntro } from '../compontents-custom/shockwaveTherapy/TreatmentBenefitsIntro'

interface TreatmentTemplateProps {
  treatment: Treatment
}

const testimonials: Testimonial[] = [
  {
    id: 's-r',
    quote:
      'All members of the staff are absolutely wonderful. They are polite and address any questions or concerns you have in a professional approach. They have literally changed my life for the better.',
    author: 'S.R.',
    source: 'google',
  },
  {
    id: 'e-h',
    quote:
      'Dr. Collins has been an absolute delight and so informative and patient. He has a great personality and is very passionate about his profession to inform, teach, guide, and give his patients the most beneficial advice for good health and longevity. He has been very helpful for both my Husband and myself. The staff is very helpful and friendly as well.',
    author: 'E.H.',
    source: 'google',
  },
  {
    id: 'j-f',
    quote:
      "Every experience has been excellent. All questions and concerns were answered. I've recommended them to my family and friends.",
    author: 'J.F.',
    source: 'google',
  },
  {
    id: 'c-g',
    quote: 'Great employees to work with. The staff is very knowledgeable and explain all processes.',
    author: 'C.G.',
    source: 'google',
  },
]

export async function ShockwaveTherapyLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]

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
            src: 'https://picsum.photos/seed/shockwave-intro/1200/900',
            alt: 'A relaxed patient resting comfortably before treatment',
          },
          heading: 'Low-Intensity Shockwave Therapy',
          paragraphs: [
            'Shockwave therapy may be used for patients with erectile dysfunction. It is often called acoustic wave therapy and uses targeted sound waves to support circulation, encourage repair of blood vessel tissue, and stimulate the growth of new vessels in penile tissue.',
            'Unlike medications, shockwave therapy is designed to work at the vascular level — making it a meaningful option for men seeking a drug-free, non-surgical approach to sexual health.',
            'Treatments are performed in-clinic by a licensed provider, using a medical acoustic sound wave device.',
          ],
        }}
        lightCard={{
          image: {
            src: 'https://picsum.photos/seed/shockwave-benefits/1200/900',
            alt: 'A man reviewing his treatment plan on a tablet',
          },
          heading: 'Treatment Benefits',
          benefits: [
            'May support stronger, more reliable erections without daily medication',
            'May improve blood flow and penile tissue health',
            'May enhance sensitivity and sexual sensation',
            'May increase spontaneity — reducing reliance on pre-planned dosing',
            'Non-invasive — no needles, no surgery',
            'Minimal disruption — most men resume normal activity the same day',
            'May support improved response for men who have experienced reduced effectiveness with PDE5 inhibitors',
          ],
          ctaLabel: 'Request a consultation',
          ctaHref: '/book',
        }}
      />

      <SymptomsOutcomesGrid
        title="Symptoms And Outcomes Of Shockwave Therapy"
        lead="Shockwave therapy may be most applicable for men with erectile dysfunction associated with reduced blood flow. It is also explored as a supportive option for sexual performance and overall penile health. Candidacy is always determined on an individual basis during consultation."
        items={[
          {
            icon: HeartPulse,
            title: 'Erectile dysfunction (ED)',
            description:
              'Difficulty achieving or maintaining an erection — particularly when associated with vascular health or reduced circulation — may be addressed with shockwave therapy.',
          },
          {
            icon: ShieldOff,
            title: 'Drug-free approach to sexual health',
            description:
              'Men who prefer to avoid ongoing medication — due to side effects, interactions, or personal preference — may benefit from exploring shockwave therapy as an alternative.',
          },
          {
            icon: Waves,
            title: "Peyronie's disease",
            description:
              "Acoustic wave therapy may help address scar tissue associated with Peyronie's disease, potentially supporting improved tissue flexibility and reduced discomfort.",
          },
          {
            icon: HeartHandshake,
            title: 'Post-procedure rehabilitation support',
            description:
              'Men recovering from prostate surgery or other pelvic procedures may explore shockwave therapy as part of a broader plan to support the return of erectile function.',
          },
          {
            icon: Target,
            title: 'Sexual performance optimization',
            description:
              'Men seeking support for stronger erections, greater ease, and improved sexual confidence.',
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
          eyebrow="Frequently asked"
          title={`${treatment.shortName} questions`}
          items={treatment.faqs}
        />
      ) : null}

      <ClosingCTA {...treatment.closingCta} />
    </>
  )
}
