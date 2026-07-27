import type { Treatment } from '@/types/content'

/** GLP-1 Microdosing - Men. Copy extracted verbatim from source. */
export const glp1MicrodosingMen: Treatment = {
  slug: 'glp1-microdosing-men',
  href: '/glp-1-microdosing/male',
  pillar: 'weight-loss',
  audience: 'men',
  kind: 'variant',

  name: 'GLP-1 Microdosing for Men',
  shortName: 'GLP-1 Microdosing',
  summary: 'Precision, low-dose GLP-1 therapy - the metabolic benefit without the side effects.',
  cardImage: {
    src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
    alt: 'A clinician holding a blood sample for lab testing',
  },
  cardBenefits: ['Muted food noise', 'Preserves lean muscle', 'Minimal side effects'],

  hero: {
    eyebrow: 'Weight Loss',
    title: 'GLP-1 microdosing: precision metabolic optimization',
    lead: 'A low-dose therapy to mute food noise, reduce inflammation, and enhance metabolic flexibility while minimizing GLP-1 side effects. We use precision lab testing to find your minimum effective dose - the sweet spot where you feel optimal, not overwhelmed.',
    image: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
      alt: 'A clinician holding a blood sample for lab testing',
    },
    ctas: [
      { label: 'Schedule a consultation', href: '/contact-us' },
      { label: 'View financing options', href: '/financing-options' },
    ],
  },

  statement: "At a micro-level, every milligram counts - we don't believe in one-size-fits-all.",

  symptoms: {
    eyebrow: 'A sophisticated approach',
    title: 'A sophisticated approach to sustainable metabolic health',
    lead: 'Leveraging the inflammation-fighting power of GLP-1 medicines for sustainable, systemic health with minimized side effects.',
    columns: 2,
    items: [
      {
        title: 'Muting "food noise"',
        body: 'Regaining cognitive control over cravings.',
      },
      {
        title: 'Metabolic flexibility',
        body: 'Helping your body switch efficiently between fuel sources.',
      },
      {
        title: 'Reducing systemic inflammation',
        body: 'Leveraging the under-utilized longevity benefits of GLP-1s.',
      },
      {
        title: 'Protecting lean muscle',
        body: 'Maintaining strength and vitality throughout the program.',
      },
    ],
  },

  sections: [
    {
      eyebrow: 'Data-driven microdosing',
      title: 'Advanced diagnostics, precisely tailored',
      body: [
        'We use advanced diagnostics to ensure your protocol is working with your biology, not against it. Body composition analysis tracks your progress beyond the scale - monitoring muscle mass and visceral fat to ensure your microdose is promoting a healthy, toned physique rather than just "weight" loss.',
        'GLP-1s are hormones. We review your insulin, thyroid, and sex hormone levels to ensure your microdosing protocol supports your overall hormonal balance.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider consulting with a male patient',
      },
    },
    {
      eyebrow: 'The baseline',
      title: 'Bloodwork is the foundation',
      body: [
        "Labwork is the foundation of the microdosing program. By understanding your baseline metabolic health, we can tailor a titration schedule that targets your specific needs - whether that's blood sugar stability, inflammation reduction, or appetite regulation.",
      ],
      bullets: [
        'Insulin sensitivity & glucose control',
        'Systemic inflammation',
        'Hormone balance',
        'Cardiovascular & lipid health',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
        alt: 'A SAMM provider greeting a male patient',
      },
    },
  ],

  pricing: {
    eyebrow: 'What it costs',
    title: "What's included in the program",
    lead: 'Our microdosing journey is a concierge experience, with the medical oversight needed to manage a precision peptide protocol safely.',
    included: [
      'Initial clinical consultation',
      'Comprehensive lab review',
      'Precision titration plan',
      'Ongoing monitoring',
      'Body composition scans',
    ],
    note: 'May be additional: compounded GLP-1 or GLP-1/GIP medications, BHRT integration, and advanced longevity testing.',
    cta: { label: 'View financing options', href: '/financing-options' },
  },

  candidacy: {
    eyebrow: 'Is this for you',
    title: 'Is microdosing the right fit for you?',
    lead: 'This program is a unique fit if:',
    columns: 2,
    items: [
      { title: 'You want to eliminate "food noise" and compulsive cravings' },
      {
        title: 'You are already near your goal weight but struggle with metabolic "stubbornness"',
      },
      { title: "You've tried standard GLP-1 doses and found the side effects intolerable" },
      { title: 'You are on BHRT and want to improve insulin sensitivity for better results' },
    ],
  },

  providers: ['emily-sellars', 'harry-collins'],
  related: ['weight-loss-men', 'hormone-therapy-men', 'sexual-wellness'],

  faqs: [
    {
      question: 'What is the difference between standard dosing and microdosing?',
      answer:
        'Standard dosing follows a manufacturer\'s "escalation" schedule aimed at maximum weight loss. Microdosing uses significantly smaller amounts to achieve metabolic "quiet" and health benefits without the food aversion or GI distress.',
    },
    {
      question: 'Will I still lose weight?',
      answer:
        'Yes, but the focus is on quality weight loss. By losing weight more gradually at a lower dose, you are much more likely to preserve muscle mass and maintain your metabolic rate.',
    },
    {
      question: "Can I do this if I'm already on hormone replacement therapy (BHRT)?",
      answer:
        'Absolutely. Many patients find that microdosing GLP-1s is the "missing piece" that helps their BHRT work more effectively by addressing underlying insulin resistance.',
    },
    {
      question: 'How do I know what my "microdose" is?',
      answer:
        'That is where our expertise comes in. We start low and use your feedback - and your lab data - to find the exact level where your cravings vanish and your energy peaks.',
    },
  ],

  closingCta: {
    title: 'Ready to feel like yourself again?',
    body: 'Take the next step toward personalized hormone optimization and long-term wellness.',
    cta: { label: 'Schedule a consultation', href: '/contact-us' },
  },

  seo: {
    title: 'GLP-1 Microdosing for Men in Savannah, GA | SAMM',
    description:
      'Precision, low-dose GLP-1 microdosing for men in Savannah and Statesboro, GA - metabolic benefit with minimized side effects.',
    canonical: '/glp-1-microdosing/male',
  },
}

