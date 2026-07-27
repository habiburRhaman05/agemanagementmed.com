import type { Treatment } from '@/types/content'

export const laserVaginalTherapy: Treatment = {
  slug: 'laser-vaginal-therapy',
  href: '/laser-vaginal-therapy', // simplified
  pillar: 'sexual-wellness',
  audience: 'women',
  kind: 'variant',

  name: 'Laser Vaginal Therapy',
  shortName: 'Laser Vaginal Therapy',
  summary: 'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
  cardImage: {
    src: '/themes/default/assets/images/banner-31-bg.jpg',
    alt: 'Laser Vaginal Therapy'
  },
  cardBenefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],

  hero: {
    eyebrow: 'sexual wellness',
    title: 'Laser Vaginal Therapy',
    lead: 'Restore sensation, strength, comfort, and intimacy with this non-surgical, in-office therapy.',
    image: {
      src: '/themes/default/assets/images/banner-31-bg.jpg',
      alt: 'Laser Vaginal Therapy'
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
        "question": "Is Laser Vaginal Therapy painful?",
        "answer": "Most patients experience warmth or a slight prickling during treatment. Patients are able to complete the course of the treatment without general anesthesia."
    },
    {
        "question": "How many Laser Vaginal Therapy treatments will I need?",
        "answer": "A standard vaginal rejuvenation protocol consists of three sessions, spaced four to six weeks apart. Some patients notice improvement after the first session; full results typically become apparent over two to three months as collagen continues to remodel. Annual maintenance treatments are recommended."
    },
    {
        "question": "Is there any downtime?",
        "answer": "There is minimal downtime. We recommend avoiding intercourse, strenuous exercise, and tampon use for five to seven days before and after each session. Normal, low-impact daily activities can be resumed the same day."
    },
    {
        "question": "Who performs Laser Vaginal Therapy at SAMM?",
        "answer": "Laser Vaginal Therapy is performed exclusively by our licensed physician, nurse practitioner, or physician assistant - the only providers legally authorized to perform ablative CO₂ laser procedures in Georgia. You'll receive a thorough consultation before any treatment is scheduled."
    },
    {
        "question": "Is Laser Vaginal Therapy covered by insurance?",
        "answer": "Laser Vaginal Therapy is typically considered an elective aesthetic procedure and is not covered by most insurance plans. We're happy to discuss pricing and available payment options during your consultation."
    }
],

  closingCta: {
    title: 'Ready to take the next step?',
    body: 'Start with a consultation.',
    cta: { label: 'Book a consultation', href: '/book' }
  },

  seo: {
    title: 'Laser Vaginal Therapy in Savannah, GA | Vaginal Rejuvenation',
    description: 'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
    canonical: '/laser-vaginal-therapy'
  }
}

