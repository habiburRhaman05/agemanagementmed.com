import type { Treatment } from '@/types/content'

/** PRP Hair Restoration - Men. Copy extracted verbatim from source. */
export const hairRestorationMen: Treatment = {
  slug: 'hair-restoration-men',
  href: '/platelet-rich-plasma-hair/male',
  pillar: 'hair-restoration',
  audience: 'men',
  kind: 'variant',

  name: 'Platelet-Rich Plasma Hair Restoration for Men',
  shortName: 'PRP Hair Restoration',
  summary: "Concentrated platelets from your own blood, used to stimulate natural hair regrowth.",
  cardImage: {
    src: '/images/hero-11-bg.jpg',
    alt: 'A woman laughing outdoors, representing renewed confidence',
  },
  cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],

  hero: {
    eyebrow: 'Hair Restoration',
    title: 'Restore your confidence with natural hair restoration',
    lead: "Our advanced PRP therapy harnesses your body's own healing mechanisms to combat hair loss and promote thicker, healthier hair.",
    image: {
      src: '/images/hero-11-bg.jpg',
      alt: 'A person laughing outdoors, representing renewed confidence',
    },
    ctas: [
      { label: 'Schedule a consultation', href: '/contact-us' },
      { label: 'View financing options', href: '/financing-options' },
    ],
  },

  statement: "PRP uses your own blood's healing properties to stimulate natural hair growth.",

  symptoms: {
    eyebrow: 'How it works',
    title: 'How does PRP treat hair loss?',
    lead: "During the procedure, we draw a small amount of your blood, process it to concentrate the platelets that fuel regeneration, and inject the nutrient-rich plasma directly into your scalp. These concentrated platelets contain powerful growth factors that:",
    columns: 2,
    items: [
      { title: 'Stimulate dormant hair follicles' },
      { title: 'Improve blood circulation to the scalp' },
      { title: 'Strengthen existing hair strands' },
      { title: 'Promote the growth of new, healthy hair' },
    ],
  },

  process: {
    eyebrow: 'The treatment process',
    title: 'The PRP hair treatment process',
    lead: 'Treatment time: 60–90 minutes. Downtime: minimal - return to normal activities immediately.',
    steps: [
      {
        title: 'Consultation & assessment',
        body: 'Our expert team evaluates your hair loss pattern, discusses your goals, and determines if PRP is right for you.',
      },
      {
        title: 'Blood draw',
        body: 'A small amount of blood - similar to routine lab work - is drawn from your arm.',
      },
      {
        title: 'Platelet concentration',
        body: 'Your blood is processed in a specialized centrifuge to separate and concentrate the platelets.',
      },
      {
        title: 'Scalp preparation',
        body: 'The treatment area is cleansed and a topical numbing agent is applied for comfort.',
      },
      {
        title: 'PRP injection',
        body: 'The concentrated platelet-rich plasma is carefully injected into targeted areas of your scalp using fine needles.',
      },
    ],
  },

  sections: [
    {
      eyebrow: 'Results & timeline',
      title: 'What to expect',
      body: [
        'Immediate effects are minimal - mild discomfort during treatment and slight scalp tenderness for 24–48 hours, with no significant downtime required.',
        'Results build progressively: initial signs of improved hair quality at 2–3 months, a noticeable increase in thickness and density at 4–6 months, and optimal results with continued improvement at 6–12 months.',
      ],
      bullets: [
        'Initial series: 3–4 treatments spaced 4–6 weeks apart',
        'Maintenance: 1–2 treatments annually',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider consulting with a male patient',
      },
    },
  ],

  candidacy: {
    eyebrow: 'Is this for you',
    title: 'Who is a candidate for PRP hair loss treatment?',
    lead: 'PRP hair treatment is ideal for both men and women experiencing hair loss.',
    columns: 2,
    items: [
      {
        title: 'PRP can be used for',
        items: [
          'Androgenetic alopecia (pattern baldness)',
          'Thinning hair or reduced hair density',
          'Receding hairlines',
          'Crown thinning',
        ],
      },
      {
        title: 'Best results seen in',
        items: [
          'Patients with hair loss in the last 2–5 years',
          'Balding patients with active hair follicles',
          'Individuals seeking natural, non-surgical solutions',
          'Patients who want to enhance hair transplant results',
        ],
      },
    ],
  },

  providers: ['evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-men', 'weight-loss-men', 'sexual-wellness'],

  faqs: [
    {
      question: 'Is PRP hair treatment painful?',
      answer:
        'Most patients experience minimal discomfort. We use topical numbing agents and fine needles to ensure your comfort throughout the procedure.',
    },
    {
      question: 'How many treatments will I need?',
      answer:
        'Typically, we recommend 3–4 initial treatments spaced 4–6 weeks apart, followed by maintenance treatments every 6–12 months.',
    },
    {
      question: 'When will I see results?',
      answer:
        'While individual results vary, most patients begin noticing improvements in hair quality around 2–3 months, with optimal results visible at 6–12 months.',
    },
    {
      question: 'Are there any side effects?',
      answer:
        'PRP is extremely safe since it uses your own blood. Some patients may experience mild scalp tenderness or slight swelling for 1–2 days post-treatment.',
    },
    {
      question: 'Can PRP be combined with other treatments?',
      answer:
        'Yes. PRP complements other hair loss treatments including topical medications and laser therapy, and can enhance hair transplant results.',
    },
  ],

  closingCta: {
    title: 'Restore your hair naturally',
    body: 'Take the first step toward thicker, healthier hair with PRP therapy.',
    cta: { label: 'Schedule a consultation', href: '/contact-us' },
  },

  seo: {
    title: 'PRP Hair Restoration for Men in Savannah, GA | SAMM',
    description:
      'Platelet-rich plasma hair restoration for men in Savannah and Statesboro, GA - a natural, non-surgical treatment using your own blood.',
    canonical: '/platelet-rich-plasma-hair/male',
  },
}

