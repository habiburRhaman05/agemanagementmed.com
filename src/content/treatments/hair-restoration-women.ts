import type { Treatment } from '@/types/content'

/**
 * PRP Hair Restoration - Women. The treatment mechanism, process, and
 * candidacy criteria are identical to hair-restoration-men.ts (PRP is not
 * gender-specific) - only providers/testimonials differ in the source
 * content - so the body sections below mirror the men's page rather than
 * leaving this one thin. See the Phase 2 audit report for what was restored
 * here vs. invented (none).
 */
export const hairRestorationWomen: Treatment = {
  slug: 'hair-restoration-women',
  href: '/platelet-rich-plasma-hair/female',
  pillar: 'hair-restoration',
  audience: 'women',
  kind: 'variant',

  name: 'Platelet-Rich Plasma Hair Restoration for Women',
  shortName: 'Hair Restoration for Women',
  summary:
    'PRP hair restoration for women in Savannah uses growth factors from your blood to support thinning hair, hair density, and natural regrowth.',
  cardImage: {
    src: '/images/treatments/hair-restoration-women/hero.jpg',
    alt: 'A woman with full, healthy, voluminous hair in golden-hour light',
    focalPoint: 'center 25%',
  },
  cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],

  hero: {
    eyebrow: 'Hair Restoration',
    title: 'Restore your confidence with natural hair restoration',
    lead: "Our advanced PRP therapy harnesses your body's own healing mechanisms to combat hair loss and promote thicker, healthier hair.",
    image: {
      src: '/images/treatments/hair-restoration-women/hero.jpg',
      alt: 'A woman with full, healthy, voluminous hair in golden-hour light',
      focalPoint: 'center 25%',
    },
    ctas: [
      { label: 'Schedule a consultation', href: '/book' },
      { label: 'View financing options', href: '/financing-options' },
    ],
  },

  statement: "PRP uses your own blood's healing properties to stimulate natural hair growth.",

  symptoms: {
    eyebrow: 'How it works',
    title: 'How does PRP treat hair loss?',
    lead: 'During the procedure, we draw a small amount of your blood, process it to concentrate the platelets that fuel regeneration, and inject the nutrient-rich plasma directly into your scalp. These concentrated platelets contain powerful growth factors that:',
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
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a patient',
      },
    },
    {
      type: 'reviewer-bio',
      id: 'reviewed-by',
      subheading: 'Dr. Harry S. Collins, DO, FACOG, Medical Director',
      content: [
        'Age Management Medicine Specialist',
        'Dr. Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists and is certified in Age Management Medicine through the Cenegenics Medical Institute. He earned his BA in biology from the University of Colorado (Denver) with distinction before receiving his Doctor of Osteopathic Medicine from Kansas City University of Medicine and Biosciences.',
        'After completing his residency in obstetrics and gynecology at Walter Reed Army Medical Center, Dr. Collins served as Command Physician during Operation Urgent Fury in Grenada, retiring from the U.S. Army Medical Corps as a Lt. Colonel. He trained under Dr. David Matlock at The Laser Vaginal Rejuvenation Institute of Los Angeles and has dedicated his career to hormone optimization and age management medicine.',
        'Today, Dr. Collins brings his extensive expertise in bio-identical hormone optimization to the Southeast, combining his military medical experience with advanced training in age management medicine to provide comprehensive care for his patients.',
      ],
      images: [{ src: '/images/teams/team-1-img.png', alt: 'Dr. Harry S. Collins, DO, FACOG' }],
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

  providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
      question: 'Is PRP hair treatment painful?',
      answer:
        'Most patients experience minimal discomfort. We use topical numbing agents and fine needles to ensure your comfort throughout the procedure.',
    },
    {
      question: 'How many treatments will I need?',
      answer:
        'Typically, we recommend 3-4 initial treatments spaced 4-6 weeks apart, followed by maintenance treatments every 6-12 months.',
    },
    {
      question: 'When will I see results?',
      answer:
        'While individual results vary, most patients begin noticing improvements in hair quality around 2-3 months, with optimal results visible at 6-12 months.',
    },
    {
      question: 'Are there any side effects?',
      answer:
        'PRP is extremely safe since it uses your own blood. Some patients may experience mild scalp tenderness or slight swelling for 1-2 days post-treatment.',
    },
    {
      question: 'Can PRP be combined with other treatments?',
      answer:
        'Yes! PRP complements other hair loss treatments including topical medications, laser therapy, and can enhance hair transplant results.',
    },
  ],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' },
  },

  seo: {
    title: 'PRP Hair Restoration for Women in Savannah, GA | SAMM',
    description:
      'PRP hair restoration for women in Savannah uses growth factors from your blood to support thinning hair, hair density, and natural regrowth.',
    canonical: '/platelet-rich-plasma-hair/female',
  },
}
