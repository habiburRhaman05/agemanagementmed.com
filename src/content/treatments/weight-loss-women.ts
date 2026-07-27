import type { Treatment } from '@/types/content'

export const weightLossWomen: Treatment = {
  slug: 'weight-loss-women',
  href: '/weight-loss-women', // simplified
  pillar: 'weight-loss',
  audience: 'women',
  kind: 'variant',

  name: 'Concierge Medical Weight Loss for Women',
  shortName: 'Weight Loss for Women',
  summary: 'Personalized medical weight loss for women in Savannah using lab testing, body composition data, hormone insights, and ongoing provider guidance.',
  cardImage: {
    src: '/themes/default/assets/images/banner-13-bg.jpg',
    alt: 'Concierge Medical Weight Loss for Women'
  },
  cardBenefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],

  hero: {
    eyebrow: 'weight loss',
    title: 'Achieve Sustainable Weight Losswith Personalized Care',
    lead: 'If you\'ve tried to lose weight before and nothing seems to stick, you\'re not alone. Most programs focus on calories and workouts, but miss what\'s actually going on in your body. Our concierge medical weight loss program in Savannah is different. Instead of guessing, we use lab testing, body composition data, and ongoing monitoring to build a plan that works for you. You\'ll work directly with an expert provider who looks at your metabolism, hormones, and overall health to create a plan based on real data, not trends.',
    image: {
      src: '/images/services/image-4.png',
      alt: 'A patient measuring their waist during a body composition check',
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
        "question": "What makes medical weight loss different?",
        "answer": "Medical weight loss uses lab testing, body composition data, and provider guidance to create a personalized plan instead of a generic program."
    },
    {
        "question": "Do I need labwork to start?",
        "answer": "Yes, in most cases. Labwork helps us understand your metabolism, hormones, and overall health so we can build an effective plan."
    },
    {
        "question": "What is a body composition scan?",
        "answer": "It is a scan that measures body fat, muscle mass, and other key metrics to give a more accurate picture than weight alone."
    },
    {
        "question": "How often will I have follow ups?",
        "answer": "Follow ups are scheduled regularly so we can track progress and adjust your plan as needed."
    },
    {
        "question": "Are medications required?",
        "answer": "Not always. Some patients benefit from medication, while others succeed with lifestyle and metabolic support alone."
    },
    {
        "question": "How quickly will I see results?",
        "answer": "Results vary, but most patients begin to see changes within the first few weeks as their plan is adjusted."
    },
    {
        "question": "Is this program safe?",
        "answer": "Yes. Your provider reviews your health history and labwork to ensure your plan is safe and appropriate."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'Medical Weight Loss for Women in Savannah, GA | SAMM',
    description: 'Personalized medical weight loss for women in Savannah using lab testing, body composition data, hormone insights, and ongoing provider guidance.',
    canonical: '/weight-loss-women'
  }
}

