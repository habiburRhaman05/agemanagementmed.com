import { Activity, Atom, ClipboardList, ShieldCheck, Sparkles, Wand2, Zap } from 'lucide-react'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { getPublishedTestimonials } from '@/content/testimonials'
import { pillars } from '@/content/treatments'
import type { Treatment } from '@/types/content'
import { SexualHealthClosingBand } from '../compontents-custom/sexualWellnes/SexualHealthClosingBand'
import { SexualHealthConcerns } from '../compontents-custom/sexualWellnes/SexualHealthConcerns'
import { TreatmentOptionsStack } from '../compontents-custom/sexualWellnes/TreatmentOptionsStack'

interface TreatmentTemplateProps {
  treatment: Treatment
}

export async function SexualWellnessMaleLayout({ treatment }: TreatmentTemplateProps) {
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

      <SexualHealthConcerns
        image={{
          src:"https://res.cloudinary.com/khs2rcsr/image/upload/v1785318718/photo-content-45-img_wwkjto.jpg",
          alt:"Common Signs Of Declining Sexual Function In Men"
        }}
        heading="Common Signs Of Declining Sexual Function In Men"
        paragraphs={[
          'Many men experience changes in sexual performance as they age. Hormonal shifts, reduced circulation, and lifestyle factors can all impact erectile strength, stamina, and libido.',
          'At Savannah Age Management Medicine, we provide a private, judgment-free environment where men can address these concerns with evidence-based treatments.',
        ]}
        symptoms={[
          'Difficulty achieving or maintaining erections',
          'Reduced libido or sexual desire',
          'Decreased stamina during intimacy',
          'Weaker erections than in the past',
          'Loss of confidence in sexual performance',
          'Reduced sensitivity or pleasure',
        ]}
        featuresHeading="Medical Solutions Designed for Men's Sexual Wellness"
        featuresParagraphs={[
          'Our treatments focus on improving the underlying biological factors responsible for sexual performance including hormone balance, blood circulation, nerve sensitivity, and tissue health.',
          "Rather than masking symptoms, our therapies work with your body's natural healing mechanisms to restore function and confidence.",
        ]}
        features={[
          {
            icon: ClipboardList,
            title: 'Personalized Care',
            description: 'Each treatment plan is tailored to your specific symptoms, health history, and goals.',
          },
          {
            icon: Wand2,
            title: 'Non-Surgical Solutions',
            description: 'All treatments are minimally invasive with little to no downtime.',
          },
          {
            icon: Atom,
            title: 'Circulation & Tissue Regeneration',
            description: 'Advanced therapies stimulate blood flow and tissue repair essential for erectile function.',
          },
          {
            icon: ShieldCheck,
            title: 'Proven Medical Approaches',
            description: 'Our therapies are backed by clinical research and widely used in sexual health medicine.',
          },
        ]}
      />

      <TreatmentOptionsStack
        title="Treatment Options"
        lead="Tailored to your needs, these services support lasting improvements in libido, performance, and satisfaction."
        treatments={[
          {
            image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318812/shock-wase-image_p7iv6g.png',
            title: 'Shockwave Therapy For Erectile Dysfunction',
            description:
              'Shockwave therapy uses acoustic wave technology to stimulate blood vessel growth and improve circulation within penile tissue. Many men experience gradual improvements in erectile quality over several weeks as circulation improves.',
            label: 'Benefits may include:',
            bullets: [
              'Improved blood flow to the penis',
              'Stronger and more sustainable erections',
              'Increased responsiveness during intimacy',
              'A non-drug solution for erectile dysfunction',
            ],
            cta: { label: 'Learn more', href: '/shockwave-therapy' },
            featured: true,
          },
          {
            image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318893/column-box-8-img_cwog8d.png',
            title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
            description:
              'Low testosterone can significantly impact libido, energy, mood, and erectile function. Bioidentical Hormone Replacement Therapy helps restore hormonal balance and optimize testosterone levels.',
            label: 'BHRT may help:',
            bullets: [
              'Increase libido and sexual desire',
              'Improve energy and stamina',
              'Support stronger erections',
              'Enhance overall vitality and mood',
            ],
          },
          {
            image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318936/sexul-perfromance_opewpn.png',
            title: "PRP Therapy For Men's Sexual Performance",
            description:
              "Platelet-Rich Plasma (PRP) therapy uses growth factors from your own blood to promote tissue regeneration and improve erectile function. PRP may also stimulate new blood vessel formation, improving circulation and overall penile health.",
            label: 'Potential benefits include:',
            bullets: [
              'Enhanced erection strength and firmness',
              'Improved sensitivity and sexual pleasure',
              'Increased sexual stamina',
              'Support for nerve and tissue regeneration',
            ],
          },
          {
            image: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785318977/subliment_yul0z2.png',
            title: 'Supplementation & Pharmaceutical Support',
            description:
              'Our medical team evaluates your overall health, hormone levels, and cardiovascular factors to determine whether medications, supplements, or a combination approach may be beneficial.',
            label: 'Depending on your needs, treatment plans may include:',
            bullets: [
              'Prescription medications that improve blood flow and erectile response',
              'Physician-guided supplement protocols that support circulation and nitric oxide production',
              'Nutritional support for cardiovascular and hormonal health',
              'Combination therapy alongside PRP or shockwave treatments',
            ],
          },
        ]}
      />

      {treatment.faqs.length ? (
        <FAQAccordion
          title="Frequently Asked Questions"
          lead={`Deciding on ${treatment.shortName} is important, and you likely have questions. Here are answers to common questions to help you make an informed decision.`}
          items={treatment.faqs}
        />
      ) : null}

      {/* <TreatmentComparison
        title="Shockwave Therapy Vs PRP Therapy: Understanding The Difference"
        lead="Shockwave therapy and PRP therapy use different mechanisms to support erectile function. Many men achieve the best results by combining both approaches."
        columnA={{
          title: 'Shockwave Therapy',
          points: [
            { icon: Activity, label: 'Improves blood flow to the penis' },
            { icon: Zap, label: 'Stronger and more sustainable erections' },
            { icon: Sparkles, label: 'Increased responsiveness during intimacy' },
            { icon: ShieldCheck, label: 'A non-drug solution for erectile dysfunction' },
          ],
        }}
        columnB={{
          title: 'PRP Therapy',
          points: [
            { icon: Zap, label: 'Enhanced erection strength and firmness' },
            { icon: Sparkles, label: 'Improved sensitivity and sexual pleasure' },
            { icon: Activity, label: 'Increased sexual stamina' },
            { icon: Atom, label: 'Support for nerve and tissue regeneration' },
          ],
        }}
      /> */}

      {testimonials.length ? (
        <TestimonialSet
          eyebrow="Patient testimonials"
          title="What our patients say"
          testimonials={testimonials}
          backgroundImage="/sexual man/mans.jpg"
        />
      ) : null}

      <SexualHealthClosingBand />
    </>
  )
}
