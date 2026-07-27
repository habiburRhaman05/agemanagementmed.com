import type { Treatment } from '@/types/content'

/** Sexual Performance Enhancement & Rejuvenation - Men. Copy extracted verbatim from source. */
export const sexualWellnessMen: Treatment = {
  slug: 'sexual-wellness-men',
  href: '/rejuvenation-enhancement/male',
  pillar: 'sexual-wellness',
  audience: 'men',
  kind: 'variant',

  name: "Men's Sexual Wellness",
  shortName: 'Sexual Wellness for Men',
  summary: 'Medical treatment for ED, low libido, and declining performance - discreet, non-surgical.',
  cardImage: {
    src: '/images/services/image-3.png',
    alt: 'A couple embracing, representing renewed intimacy and confidence',
  },
  cardBenefits: ['Non-invasive', 'Personalized programs', 'Boosts confidence'],

  hero: {
    eyebrow: 'Sexual Wellness',
    title: 'Reclaim your confidence with advanced sexual health treatments',
    lead: "If you're experiencing erectile dysfunction, low libido, or declining sexual performance, you're not alone. Our medical therapies help restore circulation, hormone balance, and sexual confidence without surgery or downtime.",
    image: {
      src: '/images/services/image-3.png',
      alt: 'A couple embracing, representing renewed intimacy and confidence',
    },
    ctas: [
      { label: 'Schedule a consultation', href: '/book' },
      { label: 'View financing options', href: '/financing-options' },
    ],
  },

  statement: "We work with your body's natural healing mechanisms, not just to mask symptoms.",

  symptoms: {
    eyebrow: 'Recognising the pattern',
    title: 'Common signs of declining sexual function in men',
    lead: 'Hormonal shifts, reduced circulation, and lifestyle factors can all impact erectile strength, stamina, and libido. We provide a private, judgment-free environment to address these concerns.',
    columns: 2,
    items: [
      { title: 'Difficulty achieving or maintaining erections' },
      { title: 'Reduced libido or sexual desire' },
      { title: 'Decreased stamina during intimacy' },
      { title: 'Weaker erections than in the past' },
      { title: 'Loss of confidence in sexual performance' },
      { title: 'Reduced sensitivity or pleasure' },
    ],
  },

  sections: [
    {
      eyebrow: 'Treatment options',
      title: 'Shockwave therapy for erectile dysfunction',
      body: [
        'Shockwave therapy uses acoustic wave technology to stimulate blood vessel growth and improve circulation within penile tissue. Many men experience gradual improvements in erectile quality over several weeks as circulation improves.',
      ],
      bullets: [
        'Improved blood flow to the penis',
        'Stronger and more sustainable erections',
        'Increased responsiveness during intimacy',
        'A non-drug solution for erectile dysfunction',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider consulting with a male patient',
      },
    },
    {
      eyebrow: 'Treatment options',
      title: 'Bioidentical hormone replacement therapy (BHRT)',
      body: [
        'Low testosterone can significantly impact libido, energy, mood, and erectile function. BHRT helps restore hormonal balance and optimize testosterone levels.',
      ],
      bullets: [
        'Increase libido and sexual desire',
        'Improve energy and stamina',
        'Support stronger erections',
        'Enhance overall vitality and mood',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
        alt: 'A clinician holding a blood sample for lab testing',
      },
    },
  ],

  candidacy: {
    eyebrow: 'More treatment options',
    title: 'PRP therapy and supplementation support',
    columns: 2,
    items: [
      {
        title: "PRP therapy for men's sexual performance",
        body: 'Uses growth factors from your own blood to promote tissue regeneration and improve erectile function.',
        items: [
          'Enhanced erection strength and firmness',
          'Improved sensitivity and sexual pleasure',
          'Increased sexual stamina',
        ],
      },
      {
        title: 'Supplementation & pharmaceutical support',
        body: 'Depending on your needs, treatment plans may include:',
        items: [
          'Prescription medications that improve blood flow',
          'Physician-guided supplement protocols',
          'Combination therapy alongside PRP or shockwave treatments',
        ],
      },
    ],
  },

  providers: ['harry-collins', 'evelia-johnsen'],
  related: ['hormone-therapy-men', 'weight-loss-men', 'hair-restoration-men'],

  faqs: [
    {
      question: 'What causes erectile dysfunction?',
      answer:
        'Erectile dysfunction can be caused by reduced blood flow, hormonal imbalance, nerve issues, stress, or underlying health conditions such as diabetes or cardiovascular disease.',
    },
    {
      question: 'Is erectile dysfunction treatable without medication?',
      answer:
        'Yes. Treatments such as shockwave therapy, hormone optimization, and PRP therapy can address the root causes of erectile dysfunction without relying solely on medication.',
    },
    {
      question: 'How quickly will I see results?',
      answer:
        'Some patients notice improvements within weeks, while others experience gradual progress over several months as tissue regeneration and circulation improve.',
    },
    {
      question: 'Are these treatments safe?',
      answer:
        'All therapies offered at our clinic are performed by trained medical professionals and use established medical protocols.',
    },
  ],

  closingCta: {
    title: 'Ready to take control of your sexual health?',
    body: 'Our treatments are discreet, effective, and personalized to meet your needs.',
    cta: { label: 'Schedule a consultation', href: '/book' },
  },

  seo: {
    title: "ED & Low Libido Treatment in Savannah, GA | Men's Sexual Wellness",
    description:
      "Medical treatment for erectile dysfunction, low libido, and declining performance in Savannah and Statesboro, GA - discreet and non-surgical.",
    canonical: '/rejuvenation-enhancement/male',
  },
}

