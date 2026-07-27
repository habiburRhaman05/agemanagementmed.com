import type { Treatment } from '@/types/content'

/** Concierge Medical Weight Loss - Men. Copy extracted verbatim from source. */
export const weightLossMen: Treatment = {
  slug: 'weight-loss-men',
  href: '/concierge-medical-weight-loss/male',
  pillar: 'weight-loss',
  audience: 'men',
  kind: 'variant',

  name: 'Concierge Medical Weight Loss for Men',
  shortName: 'Weight Loss for Men',
  summary: 'Lab-guided, physician-supervised weight management built from your own data.',
  cardImage: {
    src: '/images/services/image-4.png',
    alt: 'A patient measuring their waist during a body composition check',
  },
  cardBenefits: ['Safe & sustainable', 'Expert-guided', 'Comprehensive program'],

  hero: {
    eyebrow: 'Weight Loss',
    title: 'Achieve sustainable weight loss with personalized care',
    lead: "If you've tried to lose weight before and nothing seems to stick, you're not alone. Most programs focus on calories and workouts but miss what's actually going on in your body. Our program uses lab testing, body composition data, and ongoing monitoring to build a plan that works for you.",
    image: {
      src: '/images/treatments/weight-loss-men/hero.jpg',
      alt: 'An active man building strength in the gym',
      focalPoint: 'center 25%',
    },
    ctas: [
      { label: 'Schedule a consultation', href: '/book' },
      { label: 'View financing options', href: '/financing-options' },
    ],
  },

  statement: 'Most weight loss programs fail because they never adjust as your body changes.',

  symptoms: {
    eyebrow: 'A different approach',
    title: 'A more personalized approach to weight loss',
    lead: 'This program is designed for people who want more than a one-size-fits-all plan.',
    columns: 2,
    items: [
      {
        title: 'We focus on',
        items: [
          'Understanding why weight gain is happening',
          'Identifying metabolic and hormonal factors',
          'Creating a plan based on your body',
          'Adjusting as your body changes',
        ],
      },
      {
        title: 'Why this approach works',
        items: [
          'Ongoing monitoring and adjustments',
          'Data-driven decisions',
          'Long-term sustainability',
          'Treating the root cause, not just symptoms',
        ],
      },
    ],
  },

  sections: [
    {
      eyebrow: 'Measuring what matters',
      title: 'What a body composition scan tells us',
      body: [
        "Weight alone doesn't tell the full story. Our body composition scanner measures body fat percentage, muscle mass, visceral fat, and water balance - helping us understand how your body is changing, not just what the scale says.",
        'You might be losing fat while gaining muscle, which is progress a standard scale would miss entirely.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider consulting with a male patient',
      },
    },
    {
      eyebrow: 'The data behind the plan',
      title: 'How we use labwork to guide your plan',
      body: [
        "We don't guess. We test. Labwork helps us understand what's happening inside your body - reviewing markers related to metabolism and insulin function, thyroid health, hormone balance, and inflammation levels.",
        'These markers help explain why weight loss has stalled, why energy is low, or why certain diets haven\'t worked. From there, we build a plan based on your results and adjust it over time.',
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
    lead: 'Your provider will walk you through everything so there are no surprises.',
    included: [
      'Initial consultation with a provider',
      'Lab testing and review',
      'Body composition scans',
      'Personalized treatment plan',
      'Ongoing follow-up visits and adjustments',
    ],
    note: 'May be additional, depending on your plan: medications if prescribed, advanced testing if needed, and supplements.',
    cta: { label: 'View financing options', href: '/financing-options' },
  },

  candidacy: {
    eyebrow: 'Is this for you',
    title: 'Who this program is for',
    columns: 2,
    items: [
      {
        title: 'This program is a good fit if',
        items: [
          'You have tried diets without lasting results',
          'You suspect hormones or metabolism are a factor',
          'You want a medically guided approach',
          'You prefer ongoing support and adjustments',
        ],
      },
      {
        title: 'Safety and medical considerations',
        body: 'You may benefit from medical supervision if you:',
        items: [
          'Have a history of hormone imbalances',
          'Are managing thyroid conditions',
          'Have metabolic or blood sugar concerns',
          'Are considering prescription weight loss medications',
        ],
      },
    ],
  },

  providers: ['emily-sellars', 'harry-collins'],
  related: ['hormone-therapy-men', 'sexual-wellness', 'hair-restoration'],

  faqs: [
    {
      question: 'What makes medical weight loss different?',
      answer:
        'Medical weight loss uses lab testing, body composition data, and provider guidance to create a personalized plan instead of a generic program.',
    },
    {
      question: 'Do I need labwork to start?',
      answer:
        'Yes, in most cases. Labwork helps us understand your metabolism, hormones, and overall health so we can build an effective plan.',
    },
    {
      question: 'What is a body composition scan?',
      answer:
        'It is a scan that measures body fat, muscle mass, and other key metrics to give a more accurate picture than weight alone.',
    },
    {
      question: 'How often will I have follow-ups?',
      answer: 'Follow-ups are scheduled regularly so we can track progress and adjust your plan as needed.',
    },
    {
      question: 'Are medications required?',
      answer:
        'Not always. Some patients benefit from medication, while others succeed with lifestyle and metabolic support alone.',
    },
    {
      question: 'How quickly will I see results?',
      answer:
        'Results vary, but most patients begin to see changes within the first few weeks as their plan is adjusted.',
    },
    {
      question: 'Is this program safe?',
      answer:
        'Yes. Your provider reviews your health history and labwork to ensure your plan is safe and appropriate.',
    },
  ],

  closingCta: {
    title: 'Start your personalized weight loss plan today',
    body: "You don't have to figure this out on your own.",
    cta: { label: 'Schedule a consultation', href: '/book' },
  },

  seo: {
    title: 'Medical Weight Loss for Men in Savannah, GA | SAMM',
    description:
      'Concierge medical weight loss for men in Savannah and Statesboro, GA - lab-guided, physician-supervised, and personalized to your body.',
    canonical: '/concierge-medical-weight-loss/male',
  },
}

