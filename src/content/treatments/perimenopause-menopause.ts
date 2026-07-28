import type { Treatment } from '@/types/content'

export const perimenopauseMenopause: Treatment = {
  slug: 'perimenopause-menopause',
  href: '/perimenopause-menopause',
  pillar: 'hormone-therapy',
  audience: 'women',
  kind: 'variant',

  name: 'Perimenopause & Menopause',
  shortName: 'Menopause Relief',
  summary: 'Struggling with hot flashes, fatigue, or brain fog? SAMM offers personalized menopause treatment in Savannah with hormone testing.',
  cardImage: {
    src: '/images/treatments/perimenopause-menopause/hero.jpg',
    alt: 'An active mature woman, strength training',
  },
  cardBenefits: ['Personalized lab testing', 'Symptom tracking', 'Data-driven care'],

  hero: {
    eyebrow: 'hormone therapy',
    title: 'Perimenopause & Menopause Relief Solutions',
    lead: 'Perimenopause and menopause can affect nearly every part of your day to day life. For some women, symptoms show up gradually. For others, they seem to appear overnight. Hot flashes may be the most talked about symptom, but hormonal changes can also affect your energy, mood, sleep, metabolism, focus, libido, and overall sense of well being. At Savannah Age Management Medicine, we take a personalized and data driven approach to menopause care. Instead of offering generic advice, we use detailed lab testing, symptom tracking, and ongoing evaluations to understand what your body actually needs. Our goal is to help you feel more like yourself again with treatment plans designed around your symptoms, lifestyle, and long term health goals.',
    image: {
      src: '/images/treatments/perimenopause-menopause/hero.jpg',
      alt: 'An active mature woman, strength training',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' }
    ]
  },

  statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

  sections: [
    {
      eyebrow: 'Recognising the pattern',
      title: 'Perimenopause vs. menopause',
      body: [
        'Perimenopause is the transition phase leading up to menopause, when hormone levels begin fluctuating. Menopause officially begins after 12 consecutive months without a menstrual cycle.',
        'Early symptoms may include irregular periods, mood changes, fatigue, sleep issues, brain fog, low libido, and hot flashes - and hormonal changes can affect metabolism, muscle mass, and insulin sensitivity, making weight management more difficult for some women.',
      ],
      bullets: [
        'Comprehensive lab testing before any treatment plan',
        'Hormone levels, thyroid function, and metabolic markers reviewed together',
        'Treatment plans personalized to your labwork and symptoms',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
        alt: 'A woman resting outdoors, representing restored energy and balance',
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
      'Follow-up monitoring'
    ],
    note: 'Costs vary based on your treatment plan.',
    cta: { label: 'View financing options', href: '/financing-options' }
  },

  providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
        "question": "What's the difference between perimenopause and menopause?",
        "answer": "Perimenopause is the transition phase leading up to menopause when hormone levels begin fluctuating. Menopause officially begins after 12 consecutive months without a menstrual cycle."
    },
    {
        "question": "What are the early signs of perimenopause?",
        "answer": "Early symptoms may include irregular periods, mood changes, fatigue, sleep issues, brain fog, low libido, and hot flashes."
    },
    {
        "question": "When should I consider hormone therapy?",
        "answer": "If symptoms are affecting your quality of life, daily routine, sleep, relationships, or energy levels, it may be time to consider a medical evaluation and discuss hormone therapy options."
    },
    {
        "question": "Can perimenopause cause weight gain?",
        "answer": "Yes. Hormonal changes can affect metabolism, muscle mass, insulin sensitivity, and fat storage, making weight management more difficult."
    },
    {
        "question": "Is hormone therapy safe?",
        "answer": "Hormone therapy may be safe and effective for many women when carefully monitored by a qualified medical provider. Treatment plans should always be personalized based on medical history, symptoms, and labwork."
    },
    {
        "question": "Do I need lab testing before treatment?",
        "answer": "Yes. Comprehensive lab testing helps us understand hormone levels, thyroid function, metabolic health, and other important markers before creating a treatment plan."
    },
    {
        "question": "How long does treatment take to work?",
        "answer": "Some women notice improvements within weeks, while others may need more time and ongoing adjustments depending on their symptoms and treatment plan."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'Perimenopause & Menopause Treatment in Savannah, GA | SAMM',
    description: 'Struggling with hot flashes, fatigue, or brain fog? SAMM offers personalized menopause treatment in Savannah with hormone testing.',
    canonical: '/perimenopause-menopause'
  }
}

