import type { Treatment } from '@/types/content'

export const laserVaginalTherapy: Treatment = {
  slug: 'laser-vaginal-therapy',
  href: '/laser-vaginal-therapy',
  pillar: 'sexual-wellness',
  audience: 'women',
  kind: 'variant',

  name: 'Laser Vaginal Therapy',
  shortName: 'Laser Vaginal Therapy',
  summary: 'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
  cardImage: {
    src: '/images/treatments/laser-vaginal-therapy/hero.jpg',
    alt: 'A couple embracing warmly outdoors',
    focalPoint: 'center 35%',
  },
  cardBenefits: ['Non-surgical, in-office', 'Minimal downtime', 'CO2 laser technology'],

  hero: {
    eyebrow: 'sexual wellness',
    title: 'Laser Vaginal Therapy',
    lead: 'Restore sensation, strength, comfort, and intimacy with this non-surgical, in-office therapy.',
    image: {
      src: '/images/treatments/laser-vaginal-therapy/hero.jpg',
      alt: 'A couple embracing warmly outdoors',
      focalPoint: 'center 35%',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' }
    ]
  },

  statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

  sections: [
    {
      eyebrow: 'How it works',
      title: 'A non-surgical, in-office CO2 laser treatment',
      body: [
        'Laser Vaginal Therapy uses non-surgical CO2 laser technology to stimulate collagen and support vaginal tissue health. Most patients describe the sensation as warmth or slight prickling, and the treatment is completed without general anesthesia.',
        'A standard protocol consists of three sessions, spaced four to six weeks apart. Some patients notice improvement after the first session; full results typically become apparent over two to three months as collagen continues to remodel.',
      ],
      bullets: [
        'Minimal downtime - most normal activities can resume the same day',
        'Performed exclusively by a licensed physician, nurse practitioner, or physician assistant',
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

