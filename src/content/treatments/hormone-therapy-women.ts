import type { Treatment } from '@/types/content'

/**
 * BHRT for Women. Copy extracted from the source page - medical claims,
 * hedged phrasing ("may help"), and candidacy language are transcribed
 * verbatim. Layout and section order are new.
 *
 * Images marked below reference assets already recovered; the remaining
 * treatment pages need the missing asset pack (docs/00-AUDIT.md §5.1).
 */
export const hormoneTherapyWomen: Treatment = {
  slug: 'hormone-therapy-women',
  href: '/bioidentical-hormone-replacement-therapy/female',
  pillar: 'hormone-therapy',
  audience: 'women',
  kind: 'variant',

  name: 'Bioidentical Hormone Replacement Therapy for Women',
  shortName: 'BHRT for Women',
  summary:
    'Restore hormonal balance with protocols built from your labs, symptoms, and health history.',
  cardImage: {
    src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
    alt: 'A woman resting outdoors, representing restored energy and balance',
  },
  cardBenefits: ['Stabilize mood and sleep', 'Restore energy', 'Support metabolism'],

  hero: {
    eyebrow: 'Hormone Therapy',
    title: 'Bioidentical hormone therapy for women',
    lead: 'Hormonal changes can affect energy, mood, metabolism, sleep, and overall quality of life - from early adulthood through perimenopause and menopause. BHRT is designed to help restore balance using plans tailored to your symptoms, lab results, and health history.',
    image: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/banner-bg.jpg',
      alt: 'A mother and daughter embracing outdoors, representing restored balance and wellbeing',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' },
      { label: 'How BHRT works', href: '/bhrt-hrt-trt' },
    ],
  },

  statement: 'BHRT is never a one-size-fits-all solution.',

  symptoms: {
    eyebrow: 'Recognising the pattern',
    title: 'Symptoms of hormone imbalance in women',
    lead: 'Hormonal imbalances can affect multiple systems at once. Many women notice symptoms gradually; others experience sudden changes. These are the patterns we evaluate when determining whether BHRT may help.',
    columns: 2,
    items: [
      {
        title: 'Energy, sleep, and physical vitality',
        body: 'Hormonal changes often affect overall stamina and sleep quality.',
        items: [
          'Persistent fatigue or low energy',
          'Difficulty falling or staying asleep',
          'Waking up feeling unrested',
          'Increased afternoon energy crashes',
          'Reduced motivation for exercise or daily activities',
        ],
      },
      {
        title: 'Mood, cognitive function, and mental clarity',
        body: 'Shifts in estrogen and progesterone can influence mood regulation and focus.',
        items: [
          'Irritability or mood swings',
          'Increased anxiety or low mood',
          'Difficulty concentrating',
          'Brain fog or memory lapses',
        ],
      },
      {
        title: 'Weight, metabolism, and body composition',
        body: 'Metabolic changes are among the most commonly reported symptoms.',
        items: [
          'Weight gain despite no change in diet',
          'Increased abdominal fat',
          'Difficulty building or maintaining muscle',
          'Slower metabolism',
        ],
      },
      {
        title: 'Sexual health and intimacy',
        body: 'Hormonal decline can affect desire, comfort, and satisfaction.',
        items: [
          'Reduced libido',
          'Vaginal dryness or discomfort',
          'Decreased sensitivity',
          'Discomfort during intimacy',
        ],
      },
      {
        title: 'Menstrual changes, perimenopause, and menopause',
        body: 'Cycle changes are often the earliest signal of hormonal transition.',
        items: [
          'Irregular or unpredictable cycles',
          'Heavier or lighter bleeding',
          'Hot flashes and night sweats',
          'Changes in cycle length',
        ],
      },
    ],
  },

  sections: [
    {
      eyebrow: 'The protocol',
      title: 'How bioidentical hormone therapy works',
      body: [
        'Bioidentical hormones are structurally identical to the hormones your body produces. Treatment begins with comprehensive lab testing and a full review of your symptoms and health history.',
        'From there, your provider builds an individualized plan - the hormone, the route, and the dose are all chosen for you, then adjusted as your labs and symptoms respond.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a patient',
      },
    },
    {
      eyebrow: 'Ongoing care',
      title: 'Monitoring and hormone optimization',
      body: [
        'Hormone therapy is not a single prescription. Your response is tracked through follow-up labs and structured check-ins, and your plan is adjusted as your body changes.',
        'This ongoing monitoring is what separates optimization from replacement - and it is included as part of being a patient.',
      ],
      bullets: [
        'Follow-up lab panels at defined intervals',
        'Symptom review at every check-in',
        'Dose adjustments based on results, not on a schedule',
        'Direct access to your provider between visits',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Monitoring.jpg',
        alt: "A SAMM clinician reviewing a patient's lab and treatment notes",
      },
    },
  ],

  pricing: {
    eyebrow: 'What it costs',
    title: 'Included as a patient',
    lead: 'Your program is a relationship, not a prescription. Financing options are available.',
    included: [
      'Comprehensive hormone lab panel',
      'In-depth provider consultation',
      'Individualized treatment plan',
      'Follow-up labs and monitoring',
      'Dose adjustments as needed',
      'Direct provider access between visits',
    ],
    note: 'Costs vary based on your labs and treatment plan. We discuss all costs openly at your consultation - no surprises, no pressure.',
    cta: { label: 'View financing options', href: '/financing-options' },
  },

  providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
  related: ['hormone-therapy-men', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
      question: 'How do I know if my symptoms are hormone-related?',
      answer:
        'Many symptoms of hormone imbalance overlap with other conditions, which is why evaluation begins with comprehensive lab testing alongside a full review of your symptoms and health history. Labs alone do not tell the whole story, and symptoms alone are not enough - your provider looks at both together.',
    },
    {
      question: 'Is BHRT safe for women?',
      answer:
        'Bioidentical hormone therapy has an established safety profile when it is properly prescribed and monitored. Candidacy depends on your personal and family medical history, and your provider will review any factors that affect whether treatment is appropriate for you before starting.',
    },
    {
      question: 'How long does hormone therapy take to work?',
      answer:
        'Timelines vary. Some women notice changes in energy and sleep within the first few weeks; changes in body composition and mood often take longer. Your provider will set expectations based on your specific plan.',
    },
    {
      question: 'Will BHRT affect fertility?',
      answer:
        'Hormone therapy can affect fertility, and the effect depends on which hormones are used and at what dose. If you are planning a pregnancy or want to preserve fertility, tell your provider at your consultation so your plan accounts for it.',
    },
    {
      question: 'Do I need ongoing monitoring during BHRT?',
      answer:
        'Yes. Ongoing lab work and follow-up visits are a core part of treatment, not an optional add-on. Monitoring is how your dose gets adjusted correctly and how your provider confirms the plan is still right for you.',
    },
  ],

  closingCta: {
    title: 'Ready to feel balanced, energized, and supported again?',
    body: 'Start with a consultation. We will look at your symptoms and your labs, and build a plan from there.',
    cta: { label: 'Book a consultation', href: '/book' },
  },

  seo: {
    title: 'BHRT for Women in Savannah, GA | Hormone Therapy',
    description:
      'Bioidentical hormone replacement therapy for women in Savannah and Statesboro, GA. Individualized plans built from your labs, symptoms, and health history.',
    canonical: '/bioidentical-hormone-replacement-therapy/female',
  },
}

