import type { Treatment } from '@/types/content'

/**
 * Concierge Medical Weight Loss - Women. The program mechanism (body
 * composition scanning, labwork-driven planning) is identical to
 * weight-loss-men.ts - only providers/testimonials differ in the source
 * content - so the body sections below mirror the men's page rather than
 * leaving this one thin. See the Phase 2 audit report for what was restored
 * here vs. invented (none).
 */
export const weightLossWomen: Treatment = {
  slug: 'weight-loss-women',
  href: '/concierge-medical-weight-loss/female',
  pillar: 'weight-loss',
  audience: 'women',
  kind: 'variant',

  name: 'Concierge Medical Weight Loss for Women',
  shortName: 'Weight Loss for Women',
  summary:
    'Personalized medical weight loss for women in Savannah using lab testing, body composition data, hormone insights, and ongoing provider guidance.',
  cardImage: {
    src: '/images/services/image-4.png',
    alt: 'A patient measuring their waist during a body composition check',
  },
  cardBenefits: ['Safe & sustainable', 'Expert-guided', 'Comprehensive program'],

  hero: {
    eyebrow: 'weight loss',
    title: 'Achieve Sustainable Weight Loss with Personalized Care',
    lead: "If you've tried to lose weight before and nothing seems to stick, you're not alone. Most programs focus on calories and workouts, but miss what's actually going on in your body. Our concierge medical weight loss program in Savannah is different. Instead of guessing, we use lab testing, body composition data, and ongoing monitoring to build a plan that works for you. You'll work directly with an expert provider who looks at your metabolism, hormones, and overall health to create a plan based on real data, not trends.",
    image: {
      src: '/images/services/image-4.png',
      alt: 'A patient measuring their waist during a body composition check',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' },
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
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a patient',
      },
    },
    {
      eyebrow: 'The data behind the plan',
      title: 'How we use labwork to guide your plan',
      body: [
        "We don't guess. We test. Labwork helps us understand what's happening inside your body - reviewing markers related to metabolism and insulin function, thyroid health, hormone balance, and inflammation levels.",
        "These markers help explain why weight loss has stalled, why energy is low, or why certain diets haven't worked. From there, we build a plan based on your results and adjust it over time.",
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Monitoring.jpg',
        alt: "A SAMM clinician reviewing a patient's lab and treatment notes",
      },
    },
    {
      type: 'reviewer-bio',
      id: 'reviewed-by',
      subheading: 'Dr. Harry S. Collins, DO, FACOG, Medical Director',
      content: [
        'Age Management Medicine Specialist',
        'Dr. Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists and is certified in Age Management Medicine through the Cenegenics Medical Institute. He earned his BA in biology from the University of Colorado (Denver) with distinction before receiving his Doctor of Osteopathic Medicine from Kansas City University of Medicine and Biosciences.',
        'After completing his residency in obstetrics and gynecology at Walter Reed Army Medical Center, Dr. Collins served as Command Physician during Operation Urgent Fury in Grenada, retiring from the U.S. Army Medical Corps as a Lt. Colonel. He has dedicated his career to hormone optimization and age management medicine.',
        'Today, Dr. Collins brings his extensive expertise in bio-identical hormone optimization to the Southeast, combining his military medical experience with advanced training in age management medicine to provide comprehensive care for his patients.',
      ],
      images: [{ src: '/images/teams/team-1-img.png', alt: 'Dr. Harry S. Collins, DO, FACOG' }],
    },
  ],

  pricing: {
    eyebrow: 'What it costs',
    title: 'Included as a patient',
    lead: 'Financing options are available.',
    included: [
      'Comprehensive consultation',
      'Individualized treatment plan',
      'Follow-up monitoring',
    ],
    note: 'Costs vary based on your treatment plan.',
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

  providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

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
      question: 'How often will I have follow ups?',
      answer: 'Follow ups are scheduled regularly so we can track progress and adjust your plan as needed.',
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
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' },
  },

  seo: {
    title: 'Medical Weight Loss for Women in Savannah, GA | SAMM',
    description:
      'Personalized medical weight loss for women in Savannah using lab testing, body composition data, hormone insights, and ongoing provider guidance.',
    canonical: '/concierge-medical-weight-loss/female',
  },
}
