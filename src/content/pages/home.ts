import type {
  Award,
  ClosingCtaData,
  EditorialPairData,
  FaqItem,
  ProcessStepsData,
  Seo,
} from '@/types/content'

/**
 * Home content. All copy extracted from the source site — see
 * docs/00-AUDIT.md §2. Nothing here is invented; the redesign changes how it
 * is arranged and paced, not what it says.
 */
export const homeContent = {
  seo: {
    title: 'Hormone Therapy & Weight Loss Clinic in Savannah, GA | SAMM',
    description:
      'Savannah Age Management Medicine offers hormone therapy, medical weight loss, PRP, sexual wellness, and age management care in Pooler and Statesboro, GA.',
    canonical: '/',
  } satisfies Seo,

  hero: {
    title: 'Optimize your health. Optimize your life.',
    lead: 'Live life feeling energetic, strong, and confident. Explore personalized solutions for age management. Reclaim vitality, build wellness, and elevate performance.',
    image: {
      src: '/images/banner-18-bg.jpg',
      alt: 'A family together outdoors, representing sustained health and vitality',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book-appointment' },
      { label: 'Explore treatments', href: '/bioidentical-hormone-replacement-therapy' },
    ],
    meta: 'Pooler · Statesboro · Since 2010',
  },

  statement:
    'Care that begins with your labs and your symptoms not with a package.',

  origin: {
    eyebrow: 'Best in Savannah since 2010',
    title: 'A practice built on a different question',
    body: [
      'Savannah Age Management Medicine was founded in 2010 by Harry S. Collins, DO, FACOG, with a clear vision: to move beyond treating symptoms and focus on restoring energy, balance, and long-term health.',
      'Through his expertise in hormone therapy and modern wellness, Dr. Collins established SAMM as a trusted provider in Savannah and the surrounding areas. His patient-centered approach continues to define the standard of care at SAMM today — a practice rooted in intention, personalization, and lasting results.',
    ],
    image: {
      src: '/images/testimonial-bg.jpg',
      alt: 'Two patients embracing and laughing outdoors',
    },
    imageSide: 'right',
    // cta: { label: 'Meet our team', href: '/our-experts' },
  } satisfies EditorialPairData,

  journey: {
    title: 'Your Patient Journey',
    lead: "This isn't just about feeling better... it's about feeling better than ever.",
    steps: [
      {
        title: 'Personalized Consultation',
        body: 'In our initial consultation, the Savannah Age Management Medicine clinic team will sit with you to learn about your current health challenges, your goals, and what\'s getting in the way of living life to the fullest.',
        url: 'https://res.cloudinary.com/khs2rcsr/image/upload/f_auto,q_auto,w_256,h_256,c_fill/v1785396121/persdonlized-cons_hnc2nk.jpg',
      },
      {
        title: 'Convenient Lab Work',
        body: "After your consultation, we'll do a complete analysis of your health metrics to find the root cause of your symptoms, craft a treatment plan, and outline a schedule for regular check-ins.",
        url: 'https://res.cloudinary.com/khs2rcsr/image/upload/f_auto,q_auto,w_256,h_256,c_fill/v1785396162/lab-work_yrq7fr.avif',
      },
      {
        title: 'Tailored Treatment Plan',
        body: "Following the latest in bio-identical hormone research and other advanced treatments, we'll make sure your plan always reflects the best protocol for you, any additional health concerns and ensure your plan continues to feel comprehensive and personalized.",
        url: 'https://res.cloudinary.com/khs2rcsr/image/upload/f_auto,q_auto,w_256,h_256,c_fill/v1785396190/treatment-plan_rdxnon.png',
      },
    ],
   
  } satisfies ProcessStepsData,

  philosophy: {
    eyebrow: 'Who we are',
    title: 'Leaders in age management and wellness',
    body: [
      'The Savannah Age Management Medicine team is dedicated to improving your quality of life through advanced age management practices.',
      'We pair years of experience, the latest research and technology, and a commitment to personalized solutions for unprecedented results — with a warm, welcoming approach to health optimization.',
    ],
    image: {
      src: '/images/teams/team-1-img.png',
      alt: 'Dr. Harry Collins, founder and medical director of Savannah Age Management Medicine',
    },
    imageSide: 'left',
    imageTreatment: 'cutout',
    cta: { label: 'Our experts', href: '/our-experts' },
  } satisfies EditorialPairData,

  proof: {
    eyebrow: 'Real stories of real transformation',
    stats: [
      { value: '15+', label: 'Years serving coastal Georgia' },
      { value: '2', label: 'Clinics — Pooler and Statesboro' },
      { value: '8', label: 'Providers and care team members' },
    ],
    awards: [
      { src: '/images/award-11-img.png', alt: 'Best of Savannah award' },
      { src: '/images/award-13-img.png', alt: 'Regional excellence award' },
      { src: '/images/award-15-img.png', alt: 'Best of Savannah Doctors award' },
      { src: '/images/award-17-img.png', alt: 'Community recognition award' },
      { src: '/images/award-19-img.png', alt: 'Wellness practice award' },
    ] satisfies Award[],
  },

  faqs: [
    {
      question: 'What treatments does SAMM offer?',
      answer:
        'Bioidentical hormone replacement therapy, concierge medical weight loss, sexual wellness treatments, PRP hair restoration, and medical aesthetics — each built from your labs, symptoms, and health history rather than a standard package.',
    },
    {
      question: 'Where are your locations?',
      answer:
        'Savannah Age Management Medicine sees patients in Pooler, GA and Statesboro, GA, serving Savannah, Bluffton, Hilton Head, and coastal Georgia.',
    },
    {
      question: 'Are virtual consultations available?',
      answer: 'Yes. Many consultations are available in person or virtually, depending on the treatment.',
    },
    {
      question: 'Do you accept insurance?',
      answer:
        'Coverage varies by plan and treatment — insurance commonly covers lab work but may not cover hormone medications or elective services. Flexible financing options are available, and costs are always discussed openly before you start.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Book a consultation online. We start by reviewing your labs and symptoms, not by fitting you into a pre-set package, then build a treatment plan from there.',
    },
  ] satisfies FaqItem[],

  closingCta: {
    title: 'Ready to transform your health?',
    body: 'Take the first step towards a healthier, more vibrant you.',
    cta: { label: 'Schedule a consultation', href: '/book-appointment' },
  } satisfies ClosingCtaData,
}
