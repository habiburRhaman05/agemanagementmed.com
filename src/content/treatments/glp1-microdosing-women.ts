import type { Treatment } from '@/types/content'

export const glp1MicrodosingWomen: Treatment = {
  slug: 'glp1-microdosing-women',
  href: '/glp1-microdosing-women', // simplified
  pillar: 'weight-loss',
  audience: 'women',
  kind: 'variant',

  name: 'GLP-1 Microdosing for Women',
  shortName: 'GLP-1 Microdosing',
  summary: 'Low-dose, lab-guided GLP-1 therapy for women in Savannah to quiet food noise, support metabolic health and insulin sensitivity, and help preserve lean muscle.',
  cardImage: {
    src: '/themes/default/assets/images/banner-37-bg.jpg',
    alt: 'GLP-1 Microdosing for Women'
  },
  cardBenefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],

  hero: {
    eyebrow: 'weight loss',
    title: 'GLP-1 Microdosing:Precision Metabolic Optimization',
    lead: 'A low-dose therapy to mute food noise, reduce inflammation, and enhance metabolic flexibility while minimizing GLP-1 side effects.',
    image: {
      src: '/themes/default/assets/images/banner-37-bg.jpg',
      alt: 'GLP-1 Microdosing:Precision Metabolic Optimization'
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
        "question": "What is the difference between standard dosing and microdosing?",
        "answer": "Standard dosing follows a manufacturer's \"escalation\" schedule aimed at maximum weight loss. Microdosing uses significantly smaller amounts to achieve metabolic \"quiet\" and health benefits without the \"food aversion\" or GI distress."
    },
    {
        "question": "Will I still lose weight?",
        "answer": "Yes, but the focus is on quality weight loss. By losing weight more gradually at a lower dose, you are much more likely to preserve muscle mass and maintain your metabolic rate."
    },
    {
        "question": "Can I do this if I'm already on Hormone Replacement Therapy (BHRT)?",
        "answer": "Absolutely. In fact, many patients find that microdosing GLP-1s is the \"missing piece\" that helps their BHRT work more effectively by fixing underlying insulin resistance."
    },
    {
        "question": "How do I know what my \"microdose\" is?",
        "answer": "That is where our expertise comes in. We start low and use your feedback-and your lab data-to find the exact level where your cravings vanish and your energy peaks."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'GLP-1 Microdosing for Women in Savannah, GA | SAMM',
    description: 'Low-dose, lab-guided GLP-1 therapy for women in Savannah to quiet food noise, support metabolic health and insulin sensitivity, and help preserve lean muscle.',
    canonical: '/glp1-microdosing-women'
  }
}

