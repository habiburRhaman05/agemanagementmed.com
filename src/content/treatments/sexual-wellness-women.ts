import type { Treatment } from '@/types/content'

export const sexualWellnessWomen: Treatment = {
  slug: 'sexual-wellness-women',
  href: '/rejuvenation-enhancement/female',
  pillar: 'sexual-wellness',
  audience: 'women',
  kind: 'variant',

  name: 'Rejuvenation & Enhancement for Women',
  shortName: 'Sexual Wellness for Women',
  summary: 'Explore women\'s sexual wellness treatments in Savannah for vaginal dryness, painful intercourse, low libido, sensitivity concerns, and confidence.',
  cardImage: {
    src: '/images/treatments/sexual-wellness-women/hero.jpg',
    alt: 'A close, tender moment between a couple',
  },
  cardBenefits: ['Non-invasive options', 'Minimal downtime', 'Personalized care'],

  hero: {
    eyebrow: 'sexual wellness',
    title: 'Restore Comfort, Confidence, And Sexual Wellness For Women',
    lead: 'Hormonal changes, childbirth, and aging can affect vaginal health, sexual pleasure, and confidence. Our advanced treatments help restore tissue health, sensitivity, and overall feminine wellness.',
    image: {
      src: '/images/treatments/sexual-wellness-women/hero.jpg',
      alt: 'A close, tender moment between a couple',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' }
    ]
  },

  statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

  sections: [
    {
      eyebrow: 'Treatment options',
      title: 'CO2 laser vaginal rejuvenation',
      body: [
        'Changes in female sexual wellness are often related to hormonal shifts, aging, childbirth, or menopause - affecting vaginal tissue, lubrication, sensitivity, and overall comfort during intimacy.',
        'CO2 laser therapy helps stimulate collagen production in vaginal tissue, which can improve lubrication, elasticity, and overall tissue health. Many women notice reduced dryness and increased comfort during intimacy after treatment.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a patient',
      },
    },
    {
      eyebrow: 'Treatment options',
      title: 'PRP therapy (the O-Shot)',
      body: [
        'PRP therapy, often referred to as the O-Shot, uses platelet-rich plasma from your own blood to stimulate tissue regeneration and improve circulation in areas involved in sexual response. This may help improve sensitivity, arousal, and orgasm quality for some women.',
        'Most treatments require little to no downtime, and patients typically resume normal activities immediately.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Monitoring.jpg',
        alt: "A SAMM clinician reviewing a patient's lab and treatment notes",
      },
      imageSide: 'left',
    },
    {
      type: 'reviewer-bio',
      id: 'reviewed-by',
      subheading: 'Dr. Harry S. Collins, DO, FACOG, Medical Director',
      content: [
        'Age Management Medicine Specialist',
        'Dr. Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists and is certified in Age Management Medicine through the Cenegenics Medical Institute. He trained under Dr. David Matlock at The Laser Vaginal Rejuvenation Institute of Los Angeles, and has dedicated his career to hormone optimization and age management medicine.',
        'Today, Dr. Collins brings his extensive expertise in laser vaginal rejuvenation and bio-identical hormone optimization to the Southeast, combining his military medical experience with advanced training in age management medicine to provide comprehensive care for his patients.',
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
        "question": "What causes changes in sexual health for women?",
        "answer": "Changes in female sexual wellness are often related to hormonal shifts, aging, childbirth, or menopause. These changes can affect vaginal tissue, lubrication, sensitivity, and overall comfort during intimacy. Treatments such as hormone therapy, laser vaginal rejuvenation, and PRP can help restore tissue health and sexual responsiveness."
    },
    {
        "question": "Can vaginal rejuvenation help with dryness or discomfort?",
        "answer": "Yes. Treatments like CO2 laser therapy help stimulate collagen production in vaginal tissue, which can improve lubrication, elasticity, and overall tissue health. Many women notice reduced dryness and increased comfort during intimacy after treatment."
    },
    {
        "question": "What is the Plasma Shot (PRP therapy) for women?",
        "answer": "PRP therapy, often referred to as the O-Shot, uses platelet-rich plasma from your own blood to stimulate tissue regeneration and improve circulation in areas involved in sexual response. This may help improve sensitivity, arousal, and orgasm quality for some women."
    },
    {
        "question": "Can these treatments help after menopause?",
        "answer": "Yes. Many women seek treatment during or after menopause when hormonal changes lead to vaginal dryness, thinning tissue, and reduced libido. Treatments such as hormone therapy, PRP, and laser therapy can help restore comfort and sexual wellness."
    },
    {
        "question": "Is there downtime after treatment?",
        "answer": "Most treatments require little to no downtime. PRP treatments typically allow patients to resume normal activities immediately, while laser treatments may involve mild sensitivity or discharge for a short period."
    },
    {
        "question": "How many treatments are usually needed?",
        "answer": "The number of treatments depends on the therapy used and the patient's individual goals. Some PRP treatments may show results after one session, while laser therapy is often performed as a series of treatments followed by occasional maintenance."
    },
    {
        "question": "Is vaginal rejuvenation safe?",
        "answer": "Vaginal rejuvenation treatments performed by trained medical professionals are generally safe and minimally invasive. At Savannah Age Management Medicine, all therapies are performed under medical supervision using established treatment protocols."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'Women\'s Sexual Wellness in Savannah, GA | SAMM',
    description: 'Explore women\'s sexual wellness treatments in Savannah for vaginal dryness, painful intercourse, low libido, sensitivity concerns, and confidence.',
    canonical: '/rejuvenation-enhancement/female'
  }
}

