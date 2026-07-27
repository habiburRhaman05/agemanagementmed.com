import type { Treatment } from '@/types/content'

/**
 * BHRT for Men. Structure mirrors hormone-therapy-women.ts - same template,
 * different content file, per docs/04-CONTENT-ARCHITECTURE.md. Copy adapted
 * from the source page's headings (docs/00-AUDIT.md); medical hedging
 * ("may help") preserved.
 */
export const hormoneTherapyMen: Treatment = {
  slug: 'hormone-therapy-men',
  href: '/bioidentical-hormone-replacement-therapy/male',
  pillar: 'hormone-therapy',
  audience: 'men',
  kind: 'variant',

  name: 'Bioidentical Hormone Replacement Therapy for Men',
  shortName: 'BHRT for Men',
  summary: 'Testosterone and hormone optimization for energy, strength, libido, and mental clarity.',
  cardImage: {
    src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
    alt: 'A SAMM provider greeting a male patient',
  },
  cardBenefits: ['Boost energy', 'Build muscle', 'Enhance libido'],

  hero: {
    eyebrow: 'Hormone Therapy',
    title: 'Bioidentical hormone therapy for men',
    lead: 'Low testosterone affects far more than the bedroom - energy, sleep, mood, focus, and physical performance all decline as hormone levels drop. Our BHRT program starts with a full evaluation of your labs and symptoms, not a standard dose.',
    image: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg',
      alt: 'A man in natural light, representing restored strength and vitality',
    },
    ctas: [
      { label: 'Book a consultation', href: '/contact-us' },
      { label: 'How BHRT works', href: '/bhrt-hrt-trt' },
    ],
  },

  statement: 'Hormone optimization is a program, not a prescription.',

  symptoms: {
    eyebrow: 'Recognising the pattern',
    title: 'Signs of low testosterone in men',
    lead: 'Low testosterone shows up differently for every man. These are the patterns we evaluate when determining whether BHRT may help.',
    columns: 2,
    items: [
      {
        title: 'Sexual health & performance',
        items: [
          'Reduced libido',
          'Difficulty achieving or maintaining erections',
          'Lower sexual satisfaction',
        ],
      },
      {
        title: 'Energy, sleep & recovery',
        items: [
          'Persistent fatigue despite adequate sleep',
          'Slower recovery after exercise',
          'Disrupted or non-restorative sleep',
        ],
      },
      {
        title: 'Mood, focus & motivation',
        items: ['Irritability or low mood', 'Reduced motivation', 'Difficulty concentrating'],
      },
      {
        title: 'Body composition & physical performance',
        items: [
          'Increased body fat, especially abdominal',
          'Difficulty building or maintaining muscle',
          'Reduced strength and stamina',
        ],
      },
    ],
  },

  sections: [
    {
      eyebrow: 'The protocol',
      title: 'What BHRT is and how it works',
      body: [
        'Bioidentical hormones are structurally identical to the testosterone your body produces naturally. Treatment begins with a comprehensive evaluation - labs, symptoms, and health history - used to establish your baseline.',
        'From there, your provider builds a customized treatment plan. Our program may help restore energy, support muscle and strength, sharpen focus, and enhance libido.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
        alt: 'A clinician holding a blood sample for hormone lab testing',
      },
    },
    {
      eyebrow: 'Ongoing care',
      title: 'Monitoring and adjustments',
      body: [
        'Hormone optimization is tracked, not assumed. Ongoing lab monitoring and structured symptom review are how your provider confirms your dose is right and adjusts it as your body responds.',
      ],
      bullets: [
        'Follow-up lab panels at defined intervals',
        'Symptom review at every check-in',
        'Dose adjustments based on results',
        'Direct access to your provider between visits',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a male patient',
      },
    },
  ],

  pricing: {
    eyebrow: 'What it costs',
    title: "What's included as a patient",
    lead: 'Transparent pricing, no guesswork. We discuss cost openly before you start.',
    included: [
      'Comprehensive hormone lab panel',
      'In-depth provider consultation',
      'Individualized treatment plan',
      'Follow-up labs and monitoring',
      'Dose adjustments as needed',
      'Direct provider access between visits',
    ],
    note: 'Medication and supplement costs are typically separate and are reviewed with you at your consultation.',
    cta: { label: 'View financing options', href: '/financing-options' },
  },

  providers: ['harry-collins', 'evelia-johnsen'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
      question: 'How do I know if low testosterone is holding me back?',
      answer:
        'Many of the symptoms above overlap with ordinary stress or aging, which is why we start with a comprehensive lab panel alongside a review of your symptoms and health history - not a guess based on age alone.',
    },
    {
      question: 'Is BHRT safe for men?',
      answer:
        'Bioidentical hormone therapy has an established safety profile when properly prescribed and monitored. Your provider will review your personal and family history to confirm candidacy before starting.',
    },
    {
      question: 'How long before I notice a difference?',
      answer:
        'Many men notice changes in energy and mood within the first few weeks. Changes in body composition and strength typically take longer and are tracked over successive lab reviews.',
    },
    {
      question: 'Will BHRT affect fertility?',
      answer:
        'Testosterone therapy can affect fertility. If you are planning to have children, tell your provider at your consultation so your plan accounts for it.',
    },
    {
      question: 'Do I need ongoing monitoring?',
      answer:
        'Yes. Ongoing lab work and follow-up visits are a core part of the program - they are how your dose gets adjusted correctly over time.',
    },
  ],

  closingCta: {
    title: 'Ready to feel stronger, sharper, and more like yourself?',
    body: 'Start with a consultation. We will look at your symptoms and your labs, and build a plan from there.',
    cta: { label: 'Book a consultation', href: '/contact-us' },
  },

  seo: {
    title: 'BHRT for Men in Savannah, GA | Bioidentical Hormone Therapy',
    description:
      'Bioidentical hormone replacement therapy for men in Savannah and Statesboro, GA. Individualized plans built from your labs, symptoms, and health history.',
    canonical: '/bioidentical-hormone-replacement-therapy/male',
  },
}

