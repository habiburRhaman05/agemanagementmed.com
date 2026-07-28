import type { Treatment } from '@/types/content'

/**
 * BHRT for Men. Structure mirrors hormone-therapy-women.ts - same template,
 * different content file, per docs/04-CONTENT-ARCHITECTURE.md. Copy adapted
 * from the source page's headings (docs/00-AUDIT.md); medical hedging
 * ("may help") preserved.
 */
export const hormoneTherapyMen: Treatment = {
  slug: 'hormone-therapy-men',
  href: '/bioidentical-hormone-replacement-therapy/male',
  pillar: 'hormone-therapy',
  audience: 'men',
  kind: 'variant',

  name: 'Bioidentical Hormone Replacement Therapy for Men',
  shortName: 'BHRT for Men',
  summary: 'Testosterone and hormone optimization for energy, strength, libido, and mental clarity.',
  cardImage: {
    src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
    alt: 'A SAMM provider greeting a male patient',
  },
  cardBenefits: ['Boost energy', 'Build muscle', 'Enhance libido'],

  hero: {
    eyebrow: 'Hormone Therapy',
    title: 'Bioidentical hormone therapy for men',
    lead: 'Low testosterone affects far more than the bedroom - energy, sleep, mood, focus, and physical performance all decline as hormone levels drop. Our BHRT program starts with a full evaluation of your labs and symptoms, not a standard dose.',
    image: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg',
      alt: 'A man in natural light, representing restored strength and vitality',
    },
    ctas: [
      { label: 'Book a consultation', href: '/book' },
      { label: 'How BHRT works', href: '/bhrt-hrt-trt' },
    ],
  },

  statement: 'Hormone optimization is a program, not a prescription.',

  symptoms: {
    eyebrow: 'Recognising the pattern',
    title: 'Signs of low testosterone in men',
    lead: 'Low testosterone shows up differently for every man. These are the patterns we evaluate when determining whether BHRT may help.',
    columns: 2,
    items: [
      {
        title: 'Sexual health & performance',
        items: [
          'Reduced libido',
          'Difficulty achieving or maintaining erections',
          'Lower sexual satisfaction',
        ],
      },
      {
        title: 'Energy, sleep & recovery',
        items: [
          'Persistent fatigue despite adequate sleep',
          'Slower recovery after exercise',
          'Disrupted or non-restorative sleep',
        ],
      },
      {
        title: 'Mood, focus & motivation',
        items: ['Irritability or low mood', 'Reduced motivation', 'Difficulty concentrating'],
      },
      {
        title: 'Body composition & physical performance',
        items: [
          'Increased body fat, especially abdominal',
          'Difficulty building or maintaining muscle',
          'Reduced strength and stamina',
        ],
      },
    ],
  },

  sections: [
    {
      eyebrow: 'The protocol',
      title: 'What BHRT is and how it works',
      body: [
        'Bioidentical hormones are structurally identical to the testosterone your body produces naturally. Treatment begins with a comprehensive evaluation - labs, symptoms, and health history - used to establish your baseline.',
        'From there, your provider builds a customized treatment plan. Our program may help restore energy, support muscle and strength, sharpen focus, and enhance libido.',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
        alt: 'A clinician holding a blood sample for hormone lab testing',
      },
    },
    {
      eyebrow: 'Ongoing care',
      title: 'Monitoring and adjustments',
      body: [
        'Hormone optimization is tracked, not assumed. Ongoing lab monitoring and structured symptom review are how your provider confirms your dose is right and adjusts it as your body responds.',
      ],
      bullets: [
        'Follow-up lab panels at defined intervals',
        'Symptom review at every check-in',
        'Dose adjustments based on results',
        'Direct access to your provider between visits',
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a male patient',
      },
    },
    {
      type: 'feature-list',
      id: 'program-benefits',
      heading: "Our men's hormone program may help you:",
      cards: [
        { title: 'Enhance sexual wellness', description: 'Support libido and overall sexual function' },
        { title: 'Support lean muscle & fat loss', description: 'Improve body composition and metabolism' },
        { title: 'Restore energy & mental clarity', description: 'Feel sharper, focused, and energized' },
        { title: 'Improve sleep quality', description: 'Experience deeper, more restorative sleep' },
        { title: 'Elevate mood & motivation', description: 'Restore drive, confidence, and resilience' },
        {
          title: 'Improve mobility & recovery',
          description: 'Reduce lingering pain and enhance movement with integrated support',
        },
      ],
    },
    {
      type: 'notice',
      id: 'insurance-note',
      content: [
        'Insurance commonly covers lab work but may not cover hormone medications. Flexible financing options are available through PatientFi to help make treatment more accessible.',
      ],
    },
    {
      eyebrow: 'As a SAMM patient',
      title: 'Patient benefits',
      body: [],
      bullets: [
        'Priority access to care',
        'Personalized treatment optimization',
        'Exclusive member pricing on additional services',
        'Integrated wellness support beyond hormones',
      ],
      image: {
        // No dedicated "patient benefits" photo exists locally (main.ts referenced
        // photo-content-40-img.jpg, which was never downloaded). Reusing this
        // clinical-lifestyle photo, already present in this treatment's own asset
        // folder, rather than sourcing something new for a supporting bullet block.
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/sympth.jpg',
        alt: 'A SAMM patient during an in-office visit',
      },
    },
    {
      type: 'before-after-slider',
      id: 'real-results',
      heading: 'Real results, real confidence',
      content: [
        'These before-and-after results reflect not only physical change, but renewed confidence and vitality.',
      ],
      cards: [
        {
          before: {
            src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/before-img-1.jpg',
            alt: 'Patient before BHRT treatment',
          },
          after: {
            src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/after-img-1.jpg',
            alt: 'Patient after BHRT treatment',
          },
        },
        {
          before: {
            src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/before-2-img.jpg',
            alt: 'Patient before BHRT treatment',
          },
          after: {
            src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/after-2-img.jpg',
            alt: 'Patient after BHRT treatment',
          },
        },
      ],
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

  process: {
    eyebrow: 'The program',
    title: 'How our BHRT program works',
    steps: [
      {
        title: 'Comprehensive evaluation',
        body: 'We begin with advanced lab testing to assess total and free testosterone and other key markers, alongside a review of your symptoms, lifestyle, and goals. Consultations are available in person or virtually.',
      },
      {
        title: 'Establishing your baseline',
        body: 'Your labs create a personalized hormone baseline - we optimize based on how you feel and function, not a generic "normal" range.',
      },
      {
        title: 'Customized treatment plan',
        body: "Based on your results and goals, we design a tailored protocol - precise dosing, administration training, and optional supportive therapies - with ongoing access to our clinical team.",
      },
    ],
  },

  pricing: {
    eyebrow: 'What it costs',
    title: "What's included as a patient",
    lead: 'Transparent pricing, no guesswork. We discuss cost openly before you start.',
    included: [
      'Comprehensive hormone lab panel',
      'In-depth provider consultation',
      'Individualized treatment plan',
      'Follow-up labs and monitoring',
      'Dose adjustments as needed',
      'Direct provider access between visits',
    ],
    note: 'Medication and supplement costs are typically separate and are reviewed with you at your consultation.',
    cta: { label: 'View financing options', href: '/financing-options' },
  },

  providers: ['harry-collins', 'evelia-johnsen'],
  related: ['hormone-therapy-women', 'weight-loss', 'sexual-wellness'],

  faqs: [
    {
      question: 'How do I know if low testosterone is holding me back?',
      answer:
        'Many of the symptoms above overlap with ordinary stress or aging, which is why we start with a comprehensive lab panel alongside a review of your symptoms and health history - not a guess based on age alone.',
    },
    {
      question: 'Is BHRT safe for men?',
      answer:
        'Bioidentical hormone therapy has an established safety profile when properly prescribed and monitored. Your provider will review your personal and family history to confirm candidacy before starting.',
    },
    {
      question: 'How long before I notice a difference?',
      answer:
        'Many men notice changes in energy and mood within the first few weeks. Changes in body composition and strength typically take longer and are tracked over successive lab reviews.',
    },
    {
      question: 'Will BHRT affect fertility?',
      answer:
        'Testosterone therapy can affect fertility. If you are planning to have children, tell your provider at your consultation so your plan accounts for it.',
    },
    {
      question: 'Do I need ongoing monitoring?',
      answer:
        'Yes. Ongoing lab work and follow-up visits are a core part of the program - they are how your dose gets adjusted correctly over time.',
    },
    {
      question: 'How is BHRT different from traditional hormone therapy?',
      answer:
        'BHRT hormones match your body\'s natural hormones exactly. Our program tailors dosing precisely to your levels, symptoms, and needs. For more even and sustained results, we use injections rather than pellets.',
    },
    {
      question: 'Do you offer pellets?',
      answer:
        'No. In our experience, pellets are invasive, difficult to manage, and do not evenly deliver hormones.',
    },
    {
      question: 'Can your office serve as my primary care physician?',
      answer:
        'We can offer quick care for things such as a sinus infection, COVID, or a urinary tract infection. However, we recommend you maintain a relationship with a primary care physician or specialist for any chronic conditions you may have.',
    },
    {
      question: 'Will you refill medications I am currently taking from other physicians?',
      answer:
        'No. Medications for chronic conditions such as blood pressure, cholesterol, or heart medication should be managed with your specialist or primary care physician.',
    },
    {
      question: 'Do I have to come into the office every week for my testosterone injections?',
      answer: 'No. We will teach you how to administer these medications on your own at home.',
    },
    {
      question: 'What if I need to see a provider during the year - is that an extra fee?',
      answer:
        'Within reason, our providers make themselves available during the year if you have questions about your progress or treatment protocol. Services outside the scope of BHRT can be administered for a fee.',
    },
    {
      question: 'Do I get a discount on other services as a BHRT patient?',
      answer: 'Yes. Active BHRT patients receive 10% off all other services offered in the clinic.',
    },
  ],

  closingCta: {
    title: 'Ready to feel stronger, sharper, and more like yourself?',
    body: 'Start with a consultation. We will look at your symptoms and your labs, and build a plan from there.',
    cta: { label: 'Book a consultation', href: '/book' },
  },

  seo: {
    title: 'BHRT for Men in Savannah, GA | Bioidentical Hormone Therapy',
    description:
      'Bioidentical hormone replacement therapy for men in Savannah and Statesboro, GA. Individualized plans built from your labs, symptoms, and health history.',
    canonical: '/bioidentical-hormone-replacement-therapy/male',
  },
}

