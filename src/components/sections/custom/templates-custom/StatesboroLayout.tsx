import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { CredentialStrip } from '@/components/sections/CredentialStrip'
import { FAQAccordion } from '@/components/sections/FAQAccordion'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { PeopleGrid } from '@/components/sections/PeopleGrid'
import { TestimonialSet } from '@/components/sections/TestimonialSet'
import { expertsContent } from '@/content/pages/experts'
import { getAllPeople, getPersonBySlug } from '@/content/people'
import { locations, site } from '@/content/site'
import { pillars } from '@/content/treatments'
import type { Person, Treatment, TreatmentBlockData, TreatmentSection } from '@/types/content'
import CO2LaserVsPRP from '../compontents-custom/weight-loss/female/CO2LaserVsPRP'
import FemaleSexualHealthConcerns from '../compontents-custom/weight-loss/female/FemaleSexualHealthConcerns'
import TreatmentOptions from '../compontents-custom/weight-loss/female/TreatmentOptions'
import HowPRPTreatsHairLoss from '../compontents-custom/hair-restore/female/HowPRPTreatsHairLoss'
import PRPTreatmentProcess from '../compontents-custom/hair-restore/female/PRPTreatmentProcess'
import ResultsAndTimeline from '../compontents-custom/hair-restore/female/ResultsAndTimeline'
import { LocationHighlightCard } from '../compontents-custom/statesboro/LocationHighlightCard'
import { ServiceHighlightsGrid } from '../compontents-custom/statesboro/ServiceHighlightsGrid'


function isTypedSection(section: TreatmentSection): section is TreatmentBlockData {
  return 'type' in section
}


interface TreatmentTemplateProps {
  treatment: Treatment
}


export async function StatesboroLayout({ treatment }: TreatmentTemplateProps) {
  const pillar = pillars[treatment.pillar]
  const statesboro = locations.find((location) => location.slug === 'statesboro') ?? locations[0]

  const emilySellars = await getPersonBySlug('emily-sellars')
//   const statesboroExperts: Person[] = [
//     ...(emilySellars ? [emilySellars] : []),
//     {
//       slug: 'rebecca-spacek',
//       name: 'Rebecca Spacek',
//       role: 'Laser Practitioner & Aesthetician',
//       portrait: {
//         src: 'https://picsum.photos/seed/statesboro-rebecca-spacek/400/400',
//         alt: 'Rebecca Spacek, Laser Practitioner & Aesthetician',
//       },
//       summary: 'Assistant Cosmetic Laser Practitioner and Master Cosmetologist with 22 years of experience.',
//       bio: [
//         'Rebecca Spacek is an Assistant Cosmetic Laser Practitioner, a Master Cosmetologist, and has been a professional Aesthetician and Certified Lasographer for 22 years. She is licensed in the State of Georgia and studied at the Scottsdale Institute for Medical Aesthetics in Arizona. Becca began her professional career as an Assistant Cosmetic Laser Practitioner and Aesthetician in Savannah and has been helping to establish multiple med spas here in the local area.',
//         'She is most proud of her work at Cannon Plastic and Reconstructive Surgery and Cannon MedSpa where she worked closely with cancer patients. Becca provided these vulnerable patients with treatment plans that helped rid them of the scarring caused by radiation treatments and surgeries. The services Becca provides helped boost the confidence of her patients while ensuring they remained completely comfortable during her services. Becca holds 12 different certificates, loves her work and prides herself on getting outstanding results for her patients.',
//       ],
//     },
//     {
//       slug: 'tamara-bell',
//       name: 'Tamara Bell',
//       role: 'Exercise Physiologist and Nutritionist',
//       portrait: {
//         src: 'https://picsum.photos/seed/statesboro-tamara-bell/400/400',
//         alt: 'Tamara Bell, Exercise Physiologist and Nutritionist',
//       },
//       summary: 'Exercise Physiologist and Nutritionist providing personalized fitness and nutrition guidance.',
//       bio: [
//         'Tamara has been an integral team member for the past 10 years, leveraging her expertise as an Exercise Physiologist and Nutritionist. She provides personalized care to help you reach your fitness and nutrition goals.',
//         'Tamara graduated from Auburn University and the University of North Texas and holds a Bachelor of Science in Kinesiology. Before joining, she served as Head Instructor for the Universal Cheerleader Association, sharing her passion across the United States, Tokyo, Paris and London.',
//       ],
//     },
//   ]

const statesboroExperts = await getAllPeople()

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

      <LocationHighlightCard
        title="Find Us In Downtown Statesboro!"
        location={statesboro}
        phone={site.phone}
      />

      <ServiceHighlightsGrid
        eyebrow="Statesboro Location"
        title="Explore Our Services"
        lead="Clients at our Statesboro office have access to experts in each of the areas listed below. Schedule your initial consultation today."
        items={[
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785406940/fitness-woman-measuring-her-body-isolated-weight-loss-concepts_231208-10391_pchkxx.avif',
              alt: 'Woman measuring her waist to track medical weight loss progress',
            },
            title: 'Concierge Medical Weight Loss',
            description:
              'Our Concierge Medical Weight Loss program offers customized plans and cutting-edge GLP-1 or Lipostat protocols designed to fit your unique health goals and lifestyle. In order to set you up for success, our experts will evaluate your lab results, weight loss goals, and lifestyle to structure a personalized weight loss plan. As your guide and champion, we will stay with you every step of the way to ensure optimal success.',
            ctaLabel: 'Book a consultation',
            href: '/book-appointment',
          },
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785475166/hormone-replacement_zvjw8a.avif',
              alt: 'Couple relaxing together at home after bioidentical hormone replacement therapy',
            },
            title: 'Bioidentical Hormone Therapy (BHRT)',
            description:
              'Tailored for both men and women, BHRT helps restore optimal hormonal balance for a healthier, more vibrant life. Bioidentical Hormone Replacement Therapy utilizes hormones that are chemically identical to those naturally produced by your body. Under the guidance of our Medical Director, Dr. Harry Collins, you will benefit from 15 years of experience in BHRT to help boost energy, libido, support weight management, and promote better sleep. Initial consultations and blood draws are performed in Statesboro, and clinical consultations can be done from our Pooler location.',
            ctaLabel: 'Book a consultation',
            href: '/book-appointment',
          },
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785474802/customized-facial_bs4wui.webp',
              alt: "Esthetician applying a customized facial treatment to a client's skin",
            },
            title: 'Customized Facials',
            description:
              "Experience the perfect facial tailored exclusively to your skin's needs. Our expert estheticians begin with a thorough double cleanse, followed by precise exfoliation, a targeted mask with steam, and finish with toner and moisturizer specifically selected for your skin concerns. Every facial is built around a brief skin consultation, so the products and techniques used match what your skin actually needs that day, not a one-size-fits-all routine.",
            ctaLabel: 'Book your custom facial',
            href: '/book-appointment',
          },
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785474849/Dermalogica_Facial-1_sbowfo.webp',
              alt: 'Esthetician performing a MicroPeel exfoliating facial treatment',
            },
            title: 'MicroPeel Facials',
            description:
              "Reveal your skin's natural radiance with our no-downtime MicroPeel Facials! These treatments use concentrated acids to deeply exfoliate while delivering custom benefits for your unique skin type. Each peel concludes with pH-balanced hydrating serum and SPF protection. Choose from gentle lactic acid for hydration, glycolic acid for brightening, or salicylic acid for acne-prone skin. A great introduction to peels that can be done over your lunch hour!",
            ctaLabel: 'Book your MicroPeel',
            href: '/book-appointment',
          },
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785474917/daimond-facrila_z2gvhf.webp',
              alt: 'Esthetician performing a DiamondGlow hydrating facial treatment',
            },
            title: 'Diamond Glow Hydrating Facial',
            description:
              'Cleanse, exfoliate and moisturize with clinical precision with our premium 3-in-1 DiamondGlow treatment! After a gentle cleanse, we\'ll select a personalized infusion tonic before using our diamond-tipped device to simultaneously exfoliate, extract impurities, and infuse hydrating ingredients deep into your skin. We complete your treatment with moisturizer and SPF to protect your refreshed complexion.',
            ctaLabel: 'Book your DiamondGlow facial',
            href: '/book-appointment',
          },
          {
            image: {
              src: 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785475006/iv-im_fcdnry.webp',
              alt: 'Provider administering an IV nutrient infusion treatment',
            },
            title: 'IV & IM Nutrient Therapy',
            description:
              'The most convenient way to quickly improve your hydration and nutrient levels is through our IV drips and IM injections. Work with our team to determine the right combination of nutrients for effects you can feel. Our treatments are perfect for busy lifestyles or targeted recovery sessions. Bounce back from fatigue, support recovery, and boost your wellness in just one quick session. Choose from the Ultimate Quench for complete hydration, the Inner Beauty Blend for hair, skin, and nails, the B12 Boost for energy and metabolism support, or the Reboot Blend for detoxification and anti-inflammation.',
            ctaLabel: 'Book your infusion',
            href: '/book-appointment',
          },
        ]}
      />

      <CredentialStrip
        eyebrow="Best in Savannah"
        title="Transforming Health As Savannah's Best Since 2010"
        lead="The team at Savannah Age Management Medicine has served the Savannah and Pooler communities since 2010. It is our pleasure to bring transformational treatments to our patients, so they can live more active and vibrant lives than they ever thought possible. We're proud to have been named the Best Hormone Doctor in Savannah for over 10 years in a row. We would be delighted to be your partner on your journey to health optimization."
        awards={expertsContent.awards}
      />

      <PeopleGrid
        eyebrow="Our team"
        title="Meet Our Experts"
        lead="The Statesboro team bringing personalized hormone health, weight loss, and aesthetic care to Bulloch County."
        people={statesboroExperts}
        background="alt"
        align="center"
      />


      <TestimonialSet
      title='Real Results, True Confidence
'
      eyebrow='Patient Testimonials'

      testimonials={[
  {
    "id": "0",
    "quote": "I've recently started going to the Statesboro office of Savannah Age Management Medicine and I couldn't be more impressed. From the beginning, Emily has been incredibly attentive and welcoming. She truly listens to my concerns and has made me feel comfortable and supported as a new patient. I appreciate her thoughtful approach and look forward to her continued guidance as I navigate the changes that come with menopause. I'm so grateful to have found a provider who genuinely cares and listens!",
    "author": "Pamela D.",
    "source": "google"
  },
  {
    "id": "1",
    "quote": "Savannah Age Management Medicine is a top notch practice committed to providing the best care to their patients and operating in a standard of excellence. The statesboro location is easily accessible and very well kept. Emily (their RN) is always kind and professional, she never hesitated to make sure all needs are met and questions are answered. I love being able to come to the Statesboro location for lab draws, B12 injections, and hydration IV therapy!",
    "author": "Brittany J.",
    "source": "google"
  },
  {
    "id": "2",
    "quote": "Simply the BEST!! Dr. Collins is so knowledgeable and passionate about making his patients feel their absolute best! And there are no words to explain how incredible Nurse Emily is as SAMM's RN, but as a person as well. I love everyone and everything about this medical team and the care they give everyone. 10 out 10 recommend to anyone who wants to take that journey to feel their best by a team that truly cares.",
    "author": "Laura N.",
    "source": "google"
  },
  {
    "id": "3",
    "quote": "I gave been seeing Becca for a few months to reduce some age spots and acne scaring. She worked at my skin's pace to help it heal. Dark spots are barely visible and acne scars the same. I can now go out without make up with confidence!",
    "author": "Beth P.",
    "source": "google"
  },
  {
    "id": "4",
    "quote": "It's not just about addressing aging, but looking at the whole person. I had a primary Doctor who ignored some bloodwork numbers, where Age Management asked questions then asked me to look into it. If I ignored the advice of Age Management I would have died from prostate cancer. Age Management looked at me holistically to help me be the best version of me. 5 stars all around!!!",
    "author": "John D.",
    "source": "google"
  },
  {
    "id": "5",
    "quote": "I have had laser treatments with Becca for at least 16 years and would not go to anyone else. She is professional and very knowledgeable concerning lasers. I trust her 100%! The office is professional, clean and runs many specials.",
    "author": "Penny M.",
    "source": "google"
  },
  {
    "id": "6",
    "quote": "Emily is amazing! She takes the time to listen and answer any questions. I never feel rushed to get in and out of the office. Totally recommend her!!",
    "author": "Carey F.",
    "source": "google"
  },
  {
    "id": "7",
    "quote": "Every experience has been excellent. All questions and concerns were answered. I've recommended them to my family and friends.",
    "author": "Joseph F.",
    "source": "google"
  },
  {
    "id": "8",
    "quote": "There are just no words to express the difference I feel in my life now. I went from being depressed, no energy, no enthusiasm, to feeling 10 years younger, sleeping better, more energy! Plus the staff is very easy to work with and always listen to the patient. Thanks for giving me back my life!",
    "author": "Donna F.",
    "source": "google"
  },
  {
    "id": "9",
    "quote": "Intelligent, genuine, forward-thinking, and now an integral part of my health management protocol. Thank you to the team at Savannah Age Management!",
    "author": "Penny E.",
    "source": "google"
  },
  {
    "id": "10",
    "quote": "I would just like to say what a wonderful experience I had as a patient. The office manager Tara has been extremely helpful. She was very diligent in dealing with my insurance about a prescription. And she followed promptly to make sure a …",
    "author": "Joseph W.",
    "source": "google"
  },
  {
    "id": "11",
    "quote": "Great practice. Tara and Dr. Collins have been extremely helpful to me even though I live out of the area. My health and fitness level have never been higher. I have nothing, but great things to say about them. I would recommend anyone to go just to see if you can increase your health with preventative health care.",
    "author": "Robert F.",
    "source": "google"
  },
  {
    "id": "12",
    "quote": "Google doesn't have enough space for me to explain what Dr. Collins and his staff have done for me!  Life changer! After years of struggling with hormones, weight loss and energy (and doctors who weren't \"hearing \" me) I finally feel great! …",
    "author": "Jennifer C.",
    "source": "google"
  },
  {
    "id": "13",
    "quote": "I can't say enough great things about SAMM, Dr. Collins and his staff. I have to admit that I was a little skeptical in the beginning, but Dr. C, Tara, and others took extra time to explain their life changing approach to men's health. I've been a patient for over three years now and couldn't be happier with the results!",
    "author": "Wesley Y.",
    "source": "google"
  },
  {
    "id": "14",
    "quote": "I've been with Savannah Age Management since 2018. I was an older mom going through perimenopause. My husband suggested I go see them and it changed my life. Not only did my perimenopause symptoms go away, I felt 10 years younger. So, not only could I keep up with the kids, I still had energy for mommy daddy time. I'll be staying with the Savannah Age Management Team until I'm ready to be old!",
    "author": "Angie G.",
    "source": "google"
  },
  {
    "id": "15",
    "quote": "Professional and outstanding customer care!",
    "author": "Jeremy M.",
    "source": "google"
  },
  {
    "id": "16",
    "quote": "Best experience EVER! So glad I found this office!",
    "author": "Wendi K.",
    "source": "google"
  },
  {
    "id": "17",
    "quote": "They have been a pleasure to work with and have helped me with all my health needs.",
    "author": "Christine W.",
    "source": "google"
  }
]}
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
