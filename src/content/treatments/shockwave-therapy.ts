import type { Treatment } from '@/types/content'

export const shockwaveTherapy: Treatment = {
  slug: 'shockwave-therapy',
  href: '/shockwave-therapy',
  pillar: 'sexual-wellness',
  audience: 'men',
  kind: 'variant',

  name: "Shockwave Therapy for Men's Sexual Function",
  shortName: 'Shockwave Therapy',
  summary:
    'A non-invasive acoustic wave treatment that supports improved blood flow, encourages new vessel growth, and helps restore natural erectile function - without injections or surgery.',
  cardImage: {
    src: '/images/treatments/shockwave-therapy/banner-32-bg.jpg',
    alt: "Shockwave Therapy for Men's Sexual Function",
  },
  cardBenefits: [
    'Supports blood flow',
    'Encourages new vessel growth',
    'Non-invasive, no surgery',
  ],

  hero: {
    eyebrow: 'Sexual Wellness',
    title: "Shockwave Therapy for Men's Sexual Function",
    lead: 'A non-invasive acoustic wave treatment that supports improved blood flow, encourages new vessel growth, and helps restore natural erectile function - without injections or surgery.',
    image: {
      src: '/images/treatments/shockwave-therapy/banner-32-bg.jpg',
      alt: "Shockwave Therapy for Men's Sexual Function",
    },
    ctas: [{ label: 'Book a consultation', href: '/contact-us' }],
  },

  sections: [
    {
      title: 'Low-Intensity Shockwave Therapy',
      body: [
        'Shockwave therapy may be used for patients with erectile dysfunction. It is often called acoustic wave therapy and uses targeted sound waves to support circulation, encourage repair of blood vessel tissue, and stimulate the growth of new vessels in penile tissue.',
        'Unlike medications, shockwave therapy is designed to work at the vascular level - making it a meaningful option for men seeking a drug-free, non-surgical approach to sexual health.',
        'Treatments are performed in-clinic by a licensed provider, using a medical acoustic sound wave device.'
      ],
      image: {
        src: '/images/treatments/shockwave-therapy/photo-content-70-img.jpg',
        alt: 'Low-Intensity Shockwave Therapy',
      },
      imageSide: 'right',
    },
    {
      title: 'Treatment Benefits',
      body: [],
      bullets: [
        'May support stronger, more reliable erections without daily medication',
        'May improve blood flow and penile tissue health',
        'May enhance sensitivity and sexual sensation',
        'May increase spontaneity - reducing reliance on pre-planned dosing',
        'Non-invasive - no needles, no surgery',
        'Minimal disruption - most men resume normal activity the same day',
        'May support improved response for men who have experienced reduced effectiveness with PDE5 inhibitors',
      ],
      image: {
        src: '/images/treatments/shockwave-therapy/photo-content-50-img.jpg',
        alt: 'Treatment Benefits',
      },
      imageSide: 'left',
    },
  ],

  candidacy: {
    title: 'Symptoms and Outcomes of Shockwave Therapy',
    lead: 'Shockwave therapy may be most applicable for men with erectile dysfunction associated with reduced blood flow. It is also explored as a supportive option for sexual performance and overall penile health. Candidacy is always determined on an individual basis during consultation.',
    items: [
      {
        title: 'Vascular health',
        body: 'Difficulty achieving or maintaining an erection - particularly when associated with vascular health or reduced circulation - may be addressed with shockwave therapy.',
      },
      {
        title: 'Medication alternative',
        body: 'Men who prefer to avoid ongoing medication - due to side effects, interactions, or personal preference - may benefit from exploring shockwave therapy as an alternative.',
      },
      {
        title: "Peyronie's disease",
        body: "Acoustic wave therapy may help address scar tissue associated with Peyronie's disease, potentially supporting improved tissue flexibility and reduced discomfort.",
      },
      {
        title: 'Post-surgical recovery',
        body: 'Men recovering from prostate surgery or other pelvic procedures may explore shockwave therapy as part of a broader plan to support the return of erectile function.',
      },
      {
        title: 'Sexual performance',
        body: 'Men seeking support for stronger erections, greater ease, and improved sexual confidence.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is shockwave therapy for ED painful?',
      answer:
        'Most men describe the sensation as mild tapping or tingling. The device is applied externally and only topical anesthesia is required. Treatment sessions typically last 20 to 30 minutes, and most men resume normal activity the same day.',
    },
    {
      question: 'How many shockwave therapy sessions will I need?',
      answer:
        'A standard protocol consists of six sessions, typically spaced one week apart. Some men notice changes during the course of treatment; any improvements often continue to develop over six to twelve weeks as tissue responds. Periodic maintenance sessions may be recommended based on individual results.',
    },
    {
      question: 'What is the difference between shockwave therapy and acoustic wave therapy?',
      answer:
        'The terms are often used interchangeably and refer to the same general category of low-intensity sound wave treatment. At SAMM, we use a professional-grade acoustic wave device to deliver targeted therapy - the same mechanism studied in clinical research on low-intensity extracorporeal shockwave therapy (LI-ESWT) for ED.',
    },
    {
      question: 'Is shockwave therapy for ED FDA approved?',
      answer:
        'Shockwave therapy for erectile dysfunction is currently considered an emerging treatment option in the United States. While low-intensity shockwave therapy has FDA-cleared devices and is supported by leading European urology guidelines, it is classified as investigational by the American Urological Association, meaning clinical evidence continues to evolve. We discuss the current research and realistic expectations with every patient during consultation.',
    },
    {
      question: 'Can shockwave therapy help if pills are less effective?',
      answer:
        'Some men who have experienced reduced effectiveness with PDE5 inhibitors have reported improvement following a course of shockwave treatment, potentially due to enhanced vascular function. Results vary by individual, and this is discussed in detail at your consultation.',
    },
    {
      question: 'Who performs shockwave therapy at SAMM?',
      answer:
        'All shockwave therapy treatments at Savannah Age Management Medicine are performed by our licensed physician, nurse practitioner, or physician assistant in a private, clinical setting. You will receive a thorough consultation and health history review before any treatment is scheduled.',
    },
    {
      question: 'Is shockwave therapy for ED covered by insurance?',
      answer:
        'Shockwave therapy for erectile dysfunction is typically not covered by insurance and is considered an elective procedure. Pricing and payment options are reviewed in full during your consultation with our team.',
    },
  ],

  closingCta: {
    title: 'Get Started',
    body: 'Schedule Your Shockwave Therapy Consultation in Savannah. Private, discreet appointments with licensed providers at Savannah Age Management Medicine. Serving Savannah, Bluffton, Hilton Head, and Coastal Georgia.',
    cta: { label: 'Book a consultation', href: '/contact-us' },
  },

  seo: {
    title: 'Shockwave Therapy for ED in Savannah, GA | SAMM',
    description:
      "Shockwave therapy for ED in Savannah uses acoustic wave treatment to support blood flow, erectile function, and men's sexual wellness without surgery.",
    canonical: '/shockwave-therapy/',
  },
}
