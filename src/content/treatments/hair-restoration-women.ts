import type { Treatment } from '@/types/content'

export const hairRestorationWomen: Treatment = {
  slug: 'hair-restoration-women',
  href: '/hair-restoration-women', // simplified
  pillar: 'hair-restoration',
  audience: 'women',
  kind: 'variant',

  name: 'Platelet-Rich Plasma Hair Restoration for Women',
  shortName: 'Hair Restoration for Women',
  summary: 'PRP hair restoration for women in Savannah uses growth factors from your blood to support thinning hair, hair density, and natural regrowth.',
  cardImage: {
    src: '/themes/default/assets/images/banner-34-bg.jpg',
    alt: 'Platelet-Rich Plasma Hair Restoration for Women'
  },
  cardBenefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],

  hero: {
    eyebrow: 'hair restoration',
    title: 'Restore Your Confidence With Natural Hair Restoration',
    lead: 'Our advanced PRP therapy harnesses your body\'s own healing mechanisms to combat hair loss and promote thicker, healthier hair.',
    image: {
      src: '/themes/default/assets/images/banner-34-bg.jpg',
      alt: 'Restore Your Confidence With Natural Hair Restoration'
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' }
    ]
  },

  statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

  sections: [],

  pricing: {
    eyebrow: 'What it costs',
    title: 'Included as a patient',
    lead: 'Financing options are available.',
    included: [
      'Comprehensive consultation',
      'Individualized treatment plan',
      'Follow-up monitoring'
    ],
    note: 'Costs vary based on your treatment plan.',
    cta: { label: 'View financing options', href: '/financing-options' }
  },

  providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
        "question": "Is PRP hair treatment painful?",
        "answer": "Most patients experience minimal discomfort. We use topical numbing agents and fine needles to ensure your comfort throughout the procedure."
    },
    {
        "question": "How many treatments will I need?",
        "answer": "Typically, we recommend 3-4 initial treatments spaced 4-6 weeks apart, followed by maintenance treatments every 6-12 months."
    },
    {
        "question": "When will I see results?",
        "answer": "While individual results vary, most patients begin noticing improvements in hair quality around 2-3 months, with optimal results visible at 6-12 months."
    },
    {
        "question": "Are there any side effects?",
        "answer": "PRP is extremely safe since it uses your own blood. Some patients may experience mild scalp tenderness or slight swelling for 1-2 days post-treatment."
    },
    {
        "question": "Can PRP be combined with other treatments?",
        "answer": "Yes! PRP complements other hair loss treatments including topical medications, laser therapy, and can enhance hair transplant results."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'PRP Hair Restoration for Women in Savannah, GA | SAMM',
    description: 'PRP hair restoration for women in Savannah uses growth factors from your blood to support thinning hair, hair density, and natural regrowth.',
    canonical: '/hair-restoration-women'
  }
}

