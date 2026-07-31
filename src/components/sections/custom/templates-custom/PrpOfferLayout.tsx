import { HeartPulse, Crosshair, Droplets, Sparkles } from 'lucide-react'

import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { pillars } from '@/content/treatments'
import type { Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/female/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/female/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/female/ResultsAndTimeline'
import { WhyChoosePrpCard } from '../compontents-custom/prp/WhyChoosePrpCard'
import { HowPrpWorksGrid } from '../compontents-custom/prp/HowPrpWorksGrid'
import { ProviderSpotlightCard } from '../compontents-custom/prp/ProviderSpotlightCard'
import { OtherTreatmentsGrid } from '../compontents-custom/prp/OtherTreatmentsGrid'
import { Services } from '@/components/shared/Services'
import { getServices } from '@/content/services'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function PrpOfferLayout({ treatment }: TreatmentTemplateProps) {
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

      <WhyChoosePrpCard
        image={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785470555/prp-therefy_o0t8bx.jpg',
          alt: 'An active man serving a tennis ball outdoors',
        }}
        heading="Why Choose PRP Therapy?"
        paragraph="PRP therapy is a safe and minimally invasive procedure to help manage chronic pain without the use of opioids or medication. PRP injections are particularly effective for soft tissue injuries, joint pain, and minor tendon and muscle tears."
        bulletsLabel="Commonly Treated by PRP Therapy:"
        bullets={[
          'Sports injuries',
          'Shoulder pain',
          'Knee pain',
          'Plantar fasciitis',
          'Wrist pain',
          'Meniscus tears',
          'Tennis elbow',
          'Cartilage damage',
          'Arthritis',
          'Tendon injuries',
          'Tendonitis',
        ]}
      />

      <HowPrpWorksGrid
        eyebrow="The Process"
        heading="How Platelet-Rich Plasma (PRP) Therapy Works"
        lead="PRP therapy uses a concentrated sample of your own platelets to stimulate healing and tissue regeneration. Platelets are rich in growth factors."
        items={[
          {
            icon: HeartPulse,
            title: 'Minimally Invasive',
            description: 'PRP therapy treatments are administered entirely in-office, avoiding the risks of surgery. Patients can typically return to their normal daily activities immediately after the procedure with very little downtime.',
          },
          {
            icon: Crosshair,
            title: 'Precision Treatment',
            description: 'To ensure the best possible results, injections are guided using advanced ultrasound technology. This allows for incredibly safe, targeted, and accurate delivery of plasma directly to the affected tissues.',
          },
          {
            icon: Sparkles,
            title: 'Powerful Healing',
            description:
              "Platelets are harvested and spun from the patient's blood, then re-concentrated into an injectable plasma. The growth factors in the platelets help to amplify the body's repair and anti-inflammatory processes.",
          },
          {
            icon: Droplets,
            title: 'Dynamic Application',
            description:
              'PRP therapy is highly versatile and safe for treating most areas of the body. Beyond joint and tissue repair, it has powerful applications in bolstering sexual function, hair restoration, and overall wellness in both men and women.',
          },
        ]}
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />

      <ProviderSpotlightCard
        eyebrow="Physician Associate"
        name="John Kurtz, MPAS, PA-C"
        photo={{
          src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785470601/jhon_kurtz_ovd4j1.png',
          alt: 'John Kurtz, MPAS, PA-C',
        }}
        paragraphs={[
          'Mr. Kurtz is a certified Physician Associate with 17 years of NCCPA certification and over 20 years of experience in various medical fields, including Primary Care, Emergency Medicine, and Orthopedic Medicine. This extensive experience has refined his skills in individualized care, focusing on illness and injury prevention and treatment.',
          'A graduate of the Interservice Physician Associate Program in 2007, Mr. Kurtz is a 27-year Veteran of the United States Army and a Fellow of the American Academy of Physician Associates. His dedication is evident in his military accomplishments and the 2012 AAAA Medicine Award. Recently, he trained in Bioidentical Hormone Replacement Therapy (BHRT) and Platelet-Rich Plasma (PRP) injections, expanding his treatment capabilities.',
        ]}
      />

      <Services
      align="center"
        eyebrow="Other Treatments"
        title="Explore Other Treatments We Offer"
        lead="We go beyond hormonal health to provide a wide range of treatments tailored to support your overall wellness, vitality, and confidence."
        treatments={(await getServices()).filter(s => s.slug !== treatment.slug)}
        visibleCount={3}
      />



     
      <TestimonialSet
      width="w-full mx-auto"
      title='Real success stories'
      eyebrow='Patient Testimonials'
      testimonials={[{
        author:"Lovelight B.",
        quote:"Savannah Age management and especially John Kurtz, P.A  is amazing. He takes time to answer your questions explain all your options and listen to concerns. I had PRP in my left knee. They use your own blood and separate the platelets out to inject into the joint. My knees have thousands of miles on them from running, teaching group exercise classes and competing in Iron Man. I've been in pain for 10 years. 6 weeks after PRP I'm running a few miles again and zero pain or swelling! And the results are supposed to get better for 6 months! I highly recommend.",
        source:"google",
        id:"1"
      }]}
      />
      

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
