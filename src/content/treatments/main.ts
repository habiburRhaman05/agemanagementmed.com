import type { Treatment } from '@/types/content'

export const treatments: Treatment[] = [
  {
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
      actions:{
     videoModal:true,
     formModal:true,
     videoSource:`<iframe title="vimeo-player" src="https://player.vimeo.com/video/1081534475?h=2deee69275" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>`,
     formSource:"booking"
      }
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
          body: 'Based on your results and goals, we design a tailored protocol - precise dosing, administration training, and optional supportive therapies - with ongoing access to our clinical team.',
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
    related: ['hormone-therapy-women', 'weight-loss-men', 'sexual-wellness-men'],

    faqs: [
      {
        question: 'What is BHRT?',
        answer:
          'Bioidentical Hormone Replacement Therapy (BHRT) uses hormones that are chemically identical to the ones your body naturally produces. It is designed to restore balance and relieve symptoms of hormone deficiencies or imbalances, particularly during aging or andropause.',
      },
      {
        question: 'What is the difference between BHRT, HRT, and TRT?',
        answer:
          'BHRT is the most comprehensive way to treat dysregulated hormone levels in both men and women. See our BHRT vs HRT vs TRT guide for a full comparison.',
      },
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
          "BHRT hormones match your body's natural hormones exactly. Our program tailors dosing precisely to your levels, symptoms, and needs. For more even and sustained results, we use injections rather than pellets.",
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
  },

  {
    slug: 'hormone-therapy-women',
    href: '/bioidentical-hormone-replacement-therapy/female',
    pillar: 'hormone-therapy',
    audience: 'women',
    kind: 'variant',

    name: 'Bioidentical Hormone Replacement Therapy for Women',
    shortName: 'BHRT for Women',
    summary: 'Restore hormonal balance with protocols built from your labs, symptoms, and health history.',
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
       actions:{
     videoModal:true,
     formModal:true,
     videoSource:`<iframe title="vimeo-player" src="https://player.vimeo.com/video/1081534475?h=2deee69275" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>`,
     formSource:"booking"
      }
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
      {
        type: 'feature-list',
        id: 'treatment-support',
        heading: 'Treatment may support:',
        cards: [
          { title: 'Energy and sleep quality' },
          { title: 'Sexual wellness and vaginal health' },
          { title: 'Mood stability and mental clarity' },
          { title: 'Menopause and perimenopause symptom relief' },
          { title: 'Metabolic balance and body composition' },
        ],
      },
      {
        type: 'notice',
        id: 'billing-note',
        content: [
          'Some medications, specialty testing, or compounded prescriptions may be billed separately. Insurance coverage varies, and many patients use flexible payment or financing options when available.',
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
    related: ['hormone-therapy-men', 'weight-loss-women', 'sexual-wellness-women'],

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
  },

  {
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
          "These markers help explain why weight loss has stalled, why energy is low, or why certain diets haven't worked. From there, we build a plan based on your results and adjust it over time.",
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
    related: ['hormone-therapy-men', 'sexual-wellness-men', 'hair-restoration-men'],

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
  },

  {
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
    related: ['hormone-therapy-women', 'weight-loss-men', 'sexual-wellness-women'],

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
  },

  {
    slug: 'aesthetics',
    href: '/aesthetics',
    pillar: 'aesthetics',
    audience: 'all',
    kind: 'hub',

    name: 'Medical Aesthetics',
    shortName: 'Medical Aesthetics',
    summary: 'Medical-grade aesthetic services personalized to your skin care goals.',
    cardImage: {
      src: '/images/services/image-1.png',
      alt: 'A couple embracing and smiling outdoors',
    },
    cardBenefits: ['Clinician-delivered', 'Natural results', 'Personalized plans'],

    hero: {
      eyebrow: 'Medical Aesthetics',
      title: 'Redefining beauty with precision and care',
      lead: 'Experience the transformative power of science-backed beauty treatments designed to rejuvenate your skin and enhance your confidence.',
      image: {
        src: '/images/treatments/aesthetics/hero.jpg',
        alt: 'A clinical team performing a precise medical aesthetics treatment',
      },
      ctas: [
        { label: 'Book appointment', href: '/book' },
        { label: 'Meet our experts', href: '/our-experts' },
      ],
    },

    statement: 'Medical-grade aesthetics, tailored to you.',

    symptoms: {
      eyebrow: 'Our services',
      title: 'Medical-grade aesthetics, tailored to you',
      lead: 'A personalized aesthetic plan may include:',
      columns: 2,
      items: [
        { title: 'Medical-grade facials' },
        { title: 'Laser hair removal' },
        { title: 'Injectables & wrinkle prevention' },
        { title: 'Laser skin rejuvenation' },
        { title: 'IV infusion therapy & vitamin injections' },
        { title: 'Vaginal rejuvenation' },
      ],
    },

    sections: [
      {
        eyebrow: 'Who we are',
        title: 'Experts in aesthetic excellence',
        body: [
          'Committed to enhancing your beauty and confidence through advanced aesthetic treatments.',
          'Our licensed team uses years of clinical experience to develop a customized skin care plan tailored to your skin goals and comfort levels - experience personalized skincare like never before.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
          alt: 'A SAMM provider reviewing a treatment plan with a patient',
        },
        cta: { label: 'Meet our experts', href: '/our-experts' },
      },
    ],

    providers: ['evelia-johnsen'],
    related: ['hair-restoration-men', 'hormone-therapy-women', 'weight-loss-men'],

    faqs: [],

    closingCta: {
      title: 'Elevate and enhance',
      body: 'Start your journey toward a more radiant, youthful appearance.',
      cta: { label: 'Book appointment', href: '/book' },
    },

    seo: {
      title: 'Medical Aesthetic Solutions in Pooler, GA | SAMM',
      description:
        'Medical-grade aesthetic services in Pooler, GA - facials, laser treatments, injectables, and skin rejuvenation, personalized to your goals.',
      canonical: '/aesthetics',
    },
  },

  {
    slug: 'bhrt-hrt-trt',
    href: '/bhrt-hrt-trt',
    pillar: 'hormone-therapy',
    audience: 'all',
    kind: 'variant',

    name: 'BHRT vs HRT vs TRT',
    shortName: 'BHRT vs HRT vs TRT',
    summary:
      'Compare BHRT, HRT, and TRT, including how each works, who may benefit, and why SAMM takes a broader hormone optimization approach.',
    cardImage: {
      src: '/images/treatments/bhrt-hrt-trt/hero.jpg',
      alt: 'A provider reviewing a hormone therapy plan with a patient',
    },
    cardBenefits: [
      'Understand hormone optimization',
      'Compare TRT and BHRT',
      'Learn about comprehensive care',
    ],

    hero: {
      eyebrow: 'Hormone Therapy',
      title: 'Difference between BHRT, HRT & TRT and why it matters',
      lead: "Are you struggling with low energy, stubborn weight, or feeling like you're not quite yourself? You might be a great candidate for hormone or testosterone replacement therapy.",
      image: {
        src: '/images/treatments/bhrt-hrt-trt/hero.jpg',
        alt: 'A provider reviewing a hormone therapy plan with a patient',
      },
      ctas: [{ label: 'Learn more', href: '#what-is-hrt' }],
    },

    sections: [
      {
        title: 'What is Hormone Replacement Therapy?',
        body: [
          "Hormone Replacement Therapy (HRT) is more than just a medical treatment - it's a pathway to renewed health and energy. Whether you're seeking Testosterone Replacement Therapy (TRT) or experiencing disruptive hormonal imbalances, our comprehensive approach ensures you receive the most advanced, personalized care possible. Below, we'll review the differences between HRT, TRT, and BHRT, and why our team uses BHRT to treat our patients.",
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-73-img.jpg',
          alt: 'A clinician holding a blood sample for hormone lab testing',
        },
      },
      {
        eyebrow: 'The Three Key Hormone Therapies Explained',
        title: 'Hormone Replacement Therapy (HRT)',
        body: [
          'An umbrella term referring to the broader approach to hormonal balance that addresses various hormonal needs across different life stages. This approach may or may not be bioidentical.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
          alt: 'A SAMM provider greeting a patient',
        },
        imageSide: 'left',
      },
      {
        title: 'Testosterone Replacement Therapy (TRT)',
        body: [
          'Testosterone replacement therapy (TRT) is designed for individuals experiencing low testosterone and can significantly improve quality of life. However, for men, a protocol that includes only testosterone is often incomplete, as proper hormone balance typically requires addressing other key hormones as well. Similarly, for women, a hormone optimization plan that excludes testosterone may not fully support overall well-being. A truly effective approach considers the broader hormonal picture to ensure optimal health and symptom relief.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
          alt: 'A SAMM provider reviewing a treatment plan with a patient',
        },
      },
      {
        title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
        body: [
          'The most advanced and synchronous approach to hormone optimization. Unlike synthetic hormone treatments, bioidentical hormones are molecularly identical to the hormones naturally produced by your body. These are the hormones that we leverage at Savannah Age Management Medicine to get the best results for our patients.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/steps-img.png',
          alt: 'The BHRT evaluation and treatment process',
        },
        imageSide: 'left',
      },
      {
        title: 'Signs You Might Need Hormone Replacement Therapy',
        body: ['Our patients often come to us experiencing:'],
        bullets: [
          'Persistent fatigue and low energy',
          'Difficulty maintaining muscle mass',
          'Unexplained weight gain',
          'Reduced mental clarity',
          'Decreased libido and performance',
          'Disrupted sleep patterns',
          'Mood fluctuations',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
          alt: 'A woman resting outdoors, representing restored energy and balance',
        },
      },
      {
        title: 'Our Comprehensive Approach in Pooler, GA',
        body: [
          "At Savannah Age Management, we don't just treat symptoms - we provide a holistic path to hormonal wellness:",
        ],
        bullets: [
          'Personalized Treatment Plans',
          'Advanced Hormone Testing',
          'Cutting-Edge Diagnostic Technologies',
          'Experienced Medical Professionals',
          'Holistic Health Optimization',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/steps-2-img.png',
          alt: 'A SAMM provider explaining a personalized treatment plan',
        },
        imageSide: 'left',
      },
      {
        title: 'Our Unique Consultation Process',
        body: [
          'Your journey to hormonal balance begins with a comprehensive, three-hour personalized appointment:',
        ],
        bullets: [
          'Full blood panel and lab draw',
          'Detailed medical history review',
          'Comprehensive physical examination',
          'Nutrition and exercise consultation',
          'Precise medication dosing',
          'Hands-on testosterone injection training',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/steps-3-img.png',
          alt: 'A comprehensive consultation appointment',
        },
      },
      {
        title: 'Potential Benefits of Hormone Replacement Therapy',
        body: ['Patients who undergo our BHRT treatments in place of just TRT often experience:'],
        bullets: [
          'Increased energy and vitality',
          'Enhanced mental clarity and focus',
          'Improved body composition',
          'Supported weight loss',
          'Muscle building support',
          'Restored libido and sexual function',
          'Better sleep quality',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Monitoring.jpg',
          alt: "A SAMM clinician reviewing a patient's lab and treatment notes",
        },
        imageSide: 'left',
      },
    ],

    faqs: [],

    closingCta: {
      title: 'Ready to Optimize Your Hormonal Health?',
      body: "Don't let hormonal imbalances hold you back. Discover the Savannah Age Management difference right here in Pooler, GA.",
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: "BHRT vs HRT vs TRT: What's the Difference? | SAMM",
      description:
        'Compare BHRT, HRT, and TRT, including how each works, who may benefit, and why SAMM takes a broader hormone optimization approach.',
      canonical: '/bhrt-hrt-trt',
    },
  },

  {
    slug: 'glp1-microdosing-men',
    href: '/glp-1-microdosing/male',
    pillar: 'weight-loss',
    audience: 'men',
    kind: 'variant',

    name: 'GLP-1 Microdosing for Men',
    shortName: 'GLP-1 Microdosing',
    summary: 'Precision, low-dose GLP-1 therapy - the metabolic benefit without the side effects.',
    cardImage: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
      alt: 'A clinician holding a blood sample for lab testing',
    },
    cardBenefits: ['Muted food noise', 'Preserves lean muscle', 'Minimal side effects'],

    hero: {
      eyebrow: 'Weight Loss',
      title: 'GLP-1 microdosing: precision metabolic optimization',
      lead: 'A low-dose therapy to mute food noise, reduce inflammation, and enhance metabolic flexibility while minimizing GLP-1 side effects. We use precision lab testing to find your minimum effective dose - the sweet spot where you feel optimal, not overwhelmed.',
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
        alt: 'A clinician holding a blood sample for lab testing',
      },
      ctas: [
        { label: 'Schedule a consultation', href: '/book' },
        { label: 'View financing options', href: '/financing-options' },
      ],
    },

    statement: "At a micro-level, every milligram counts - we don't believe in one-size-fits-all.",

    symptoms: {
      eyebrow: 'A sophisticated approach',
      title: 'A sophisticated approach to sustainable metabolic health',
      lead: 'Leveraging the inflammation-fighting power of GLP-1 medicines for sustainable, systemic health with minimized side effects.',
      columns: 2,
      items: [
        {
          title: 'Muting "food noise"',
          body: 'Regaining cognitive control over cravings.',
        },
        {
          title: 'Metabolic flexibility',
          body: 'Helping your body switch efficiently between fuel sources.',
        },
        {
          title: 'Reducing systemic inflammation',
          body: 'Leveraging the under-utilized longevity benefits of GLP-1s.',
        },
        {
          title: 'Protecting lean muscle',
          body: 'Maintaining strength and vitality throughout the program.',
        },
      ],
    },

    sections: [
      {
        eyebrow: 'Data-driven microdosing',
        title: 'Advanced diagnostics, precisely tailored',
        body: [
          'We use advanced diagnostics to ensure your protocol is working with your biology, not against it. Body composition analysis tracks your progress beyond the scale - monitoring muscle mass and visceral fat to ensure your microdose is promoting a healthy, toned physique rather than just "weight" loss.',
          'GLP-1s are hormones. We review your insulin, thyroid, and sex hormone levels to ensure your microdosing protocol supports your overall hormonal balance.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
          alt: 'A SAMM provider consulting with a male patient',
        },
      },
      {
        eyebrow: 'The baseline',
        title: 'Bloodwork is the foundation',
        body: [
          "Labwork is the foundation of the microdosing program. By understanding your baseline metabolic health, we can tailor a titration schedule that targets your specific needs - whether that's blood sugar stability, inflammation reduction, or appetite regulation.",
        ],
        bullets: [
          'Insulin sensitivity & glucose control',
          'Systemic inflammation',
          'Hormone balance',
          'Cardiovascular & lipid health',
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
      lead: 'Our microdosing journey is a concierge experience, with the medical oversight needed to manage a precision peptide protocol safely.',
      included: [
        'Initial clinical consultation',
        'Comprehensive lab review',
        'Precision titration plan',
        'Ongoing monitoring',
        'Body composition scans',
      ],
      note: 'May be additional: compounded GLP-1 or GLP-1/GIP medications, BHRT integration, and advanced longevity testing.',
      cta: { label: 'View financing options', href: '/financing-options' },
    },

    candidacy: {
      eyebrow: 'Is this for you',
      title: 'Is microdosing the right fit for you?',
      lead: 'This program is a unique fit if:',
      columns: 2,
      items: [
        { title: 'You want to eliminate "food noise" and compulsive cravings' },
        {
          title: 'You are already near your goal weight but struggle with metabolic "stubbornness"',
        },
        { title: "You've tried standard GLP-1 doses and found the side effects intolerable" },
        { title: 'You are on BHRT and want to improve insulin sensitivity for better results' },
      ],
    },

    providers: ['emily-sellars', 'harry-collins'],
    related: ['weight-loss-men', 'hormone-therapy-men', 'sexual-wellness-men'],

    faqs: [
      {
        question: 'What is the difference between standard dosing and microdosing?',
        answer:
          'Standard dosing follows a manufacturer\'s "escalation" schedule aimed at maximum weight loss. Microdosing uses significantly smaller amounts to achieve metabolic "quiet" and health benefits without the food aversion or GI distress.',
      },
      {
        question: 'Will I still lose weight?',
        answer:
          'Yes, but the focus is on quality weight loss. By losing weight more gradually at a lower dose, you are much more likely to preserve muscle mass and maintain your metabolic rate.',
      },
      {
        question: "Can I do this if I'm already on hormone replacement therapy (BHRT)?",
        answer:
          'Absolutely. Many patients find that microdosing GLP-1s is the "missing piece" that helps their BHRT work more effectively by addressing underlying insulin resistance.',
      },
      {
        question: 'How do I know what my "microdose" is?',
        answer:
          'That is where our expertise comes in. We start low and use your feedback - and your lab data - to find the exact level where your cravings vanish and your energy peaks.',
      },
    ],

    closingCta: {
      title: 'Ready to feel like yourself again?',
      body: 'Take the next step toward personalized hormone optimization and long-term wellness.',
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: 'GLP-1 Microdosing for Men in Savannah, GA | SAMM',
      description:
        'Precision, low-dose GLP-1 microdosing for men in Savannah and Statesboro, GA - metabolic benefit with minimized side effects.',
      canonical: '/glp-1-microdosing/male',
    },
  },

  {
    slug: 'glp1-microdosing-women',
    href: '/glp-1-microdosing/female',
    pillar: 'weight-loss',
    audience: 'women',
    kind: 'variant',

    name: 'GLP-1 Microdosing for Women',
    shortName: 'GLP-1 Microdosing',
    summary:
      'Low-dose, lab-guided GLP-1 therapy for women in Savannah to quiet food noise, support metabolic health and insulin sensitivity, and help preserve lean muscle.',
    cardImage: {
      src: '/images/treatments/glp1-microdosing-women/hero.jpg',
      alt: 'An active woman staying hydrated outdoors',
      focalPoint: '65% 25%',
    },
    cardBenefits: ['Muted food noise', 'Preserves lean muscle', 'Minimal side effects'],

    hero: {
      eyebrow: 'Weight Loss',
      title: 'GLP-1 microdosing: precision metabolic optimization',
      lead: 'A low-dose therapy to mute food noise, reduce inflammation, and enhance metabolic flexibility while minimizing GLP-1 side effects. We use precision lab testing to find your minimum effective dose - the sweet spot where you feel optimal, not overwhelmed.',
      image: {
        src: '/images/treatments/glp1-microdosing-women/hero.jpg',
        alt: 'An active woman staying hydrated outdoors',
        focalPoint: '65% 25%',
      },
      ctas: [
        { label: 'Schedule a consultation', href: '/book' },
        { label: 'View financing options', href: '/financing-options' },
      ],
    },

    statement: "At a micro-level, every milligram counts - we don't believe in one-size-fits-all.",

    symptoms: {
      eyebrow: 'A sophisticated approach',
      title: 'A sophisticated approach to sustainable metabolic health',
      lead: 'Leveraging the inflammation-fighting power of GLP-1 medicines for sustainable, systemic health with minimized side effects.',
      columns: 2,
      items: [
        {
          title: 'Muting "food noise"',
          body: 'Regaining cognitive control over cravings.',
        },
        {
          title: 'Metabolic flexibility',
          body: 'Helping your body switch efficiently between fuel sources.',
        },
        {
          title: 'Reducing systemic inflammation',
          body: 'Leveraging the under-utilized longevity benefits of GLP-1s.',
        },
        {
          title: 'Protecting lean muscle',
          body: 'Maintaining strength and vitality throughout the program.',
        },
      ],
    },

    sections: [
      {
        eyebrow: 'Data-driven microdosing',
        title: 'Advanced diagnostics, precisely tailored',
        body: [
          'We use advanced diagnostics to ensure your protocol is working with your biology, not against it. Body composition analysis tracks your progress beyond the scale - monitoring muscle mass and visceral fat to ensure your microdose is promoting a healthy, toned physique rather than just "weight" loss.',
          'GLP-1s are hormones. We review your insulin, thyroid, and sex hormone levels to ensure your microdosing protocol supports your overall hormonal balance.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
          alt: 'A SAMM provider reviewing a treatment plan with a patient',
        },
      },
      {
        eyebrow: 'The baseline',
        title: 'Bloodwork is the foundation',
        body: [
          "Labwork is the foundation of the microdosing program. By understanding your baseline metabolic health, we can tailor a titration schedule that targets your specific needs - whether that's blood sugar stability, inflammation reduction, or appetite regulation.",
        ],
        bullets: [
          'Insulin sensitivity & glucose control',
          'Systemic inflammation',
          'Hormone balance',
          'Cardiovascular & lipid health',
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
          'After completing his residency in obstetrics and gynecology at Walter Reed Army Medical Center, Dr. Collins served as Command Physician during Operation Urgent Fury in Grenada, retiring from the U.S. Army Medical Corps as a Lt. Colonel. He trained under Dr. David Matlock at The Laser Vaginal Rejuvenation Institute of Los Angeles and has dedicated his career to hormone optimization and age management medicine.',
          'Today, Dr. Collins brings his extensive expertise in bio-identical hormone optimization to the Southeast, combining his military medical experience with advanced training in age management medicine to provide comprehensive care for his patients.',
        ],
        images: [{ src: '/images/teams/team-1-img.png', alt: 'Dr. Harry S. Collins, DO, FACOG' }],
      },
    ],

    pricing: {
      eyebrow: 'What it costs',
      title: "What's included in the program",
      lead: 'Our microdosing journey is a concierge experience, with the medical oversight needed to manage a precision peptide protocol safely.',
      included: [
        'Initial clinical consultation',
        'Comprehensive lab review',
        'Precision titration plan',
        'Ongoing monitoring',
        'Body composition scans',
      ],
      note: 'May be additional: compounded GLP-1 or GLP-1/GIP medications, BHRT integration, and advanced longevity testing.',
      cta: { label: 'View financing options', href: '/financing-options' },
    },

    candidacy: {
      eyebrow: 'Is this for you',
      title: 'Is microdosing the right fit for you?',
      lead: 'This program is a unique fit if:',
      columns: 2,
      items: [
        { title: 'You want to eliminate "food noise" and compulsive cravings' },
        {
          title: 'You are already near your goal weight but struggle with metabolic "stubbornness"',
        },
        { title: "You've tried standard GLP-1 doses and found the side effects intolerable" },
        { title: 'You are on BHRT and want to improve insulin sensitivity for better results' },
      ],
    },

    providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
    related: ['hormone-therapy-women', 'weight-loss-women', 'sexual-wellness-women'],

    faqs: [
      {
        question: 'What is the difference between standard dosing and microdosing?',
        answer:
          'Standard dosing follows a manufacturer\'s "escalation" schedule aimed at maximum weight loss. Microdosing uses significantly smaller amounts to achieve metabolic "quiet" and health benefits without the food aversion or GI distress.',
      },
      {
        question: 'Will I still lose weight?',
        answer:
          'Yes, but the focus is on quality weight loss. By losing weight more gradually at a lower dose, you are much more likely to preserve muscle mass and maintain your metabolic rate.',
      },
      {
        question: "Can I do this if I'm already on hormone replacement therapy (BHRT)?",
        answer:
          'Absolutely. Many patients find that microdosing GLP-1s is the "missing piece" that helps their BHRT work more effectively by addressing underlying insulin resistance.',
      },
      {
        question: 'How do I know what my "microdose" is?',
        answer:
          'That is where our expertise comes in. We start low and use your feedback - and your lab data - to find the exact level where your cravings vanish and your energy peaks.',
      },
    ],

    closingCta: {
      title: 'Ready to feel like yourself again?',
      body: 'Take the next step toward personalized hormone optimization and long-term wellness.',
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: 'GLP-1 Microdosing for Women in Savannah, GA | SAMM',
      description:
        'Precision, low-dose GLP-1 microdosing for women in Savannah and Statesboro, GA - metabolic benefit with minimized side effects.',
      canonical: '/glp-1-microdosing/female',
    },
  },

  {
    slug: 'hair-restoration-men',
    href: '/platelet-rich-plasma-hair/male',
    pillar: 'hair-restoration',
    audience: 'men',
    kind: 'variant',

    name: 'Platelet-Rich Plasma Hair Restoration for Men',
    shortName: 'PRP Hair Restoration',
    summary: 'Concentrated platelets from your own blood, used to stimulate natural hair regrowth.',
    cardImage: {
      src: '/images/treatments/hair-restoration-men/hero.jpg',
      alt: 'A confident man with a full, healthy head of hair',
      focalPoint: 'center 30%',
    },
    cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],

    hero: {
      eyebrow: 'Hair Restoration',
      title: 'Restore your confidence with natural hair restoration',
      lead: "Our advanced PRP therapy harnesses your body's own healing mechanisms to combat hair loss and promote thicker, healthier hair.",
      image: {
        src: '/images/treatments/hair-restoration-men/hero.jpg',
        alt: 'A confident man with a full, healthy head of hair',
        focalPoint: 'center 30%',
      },
      ctas: [
        { label: 'Schedule a consultation', href: '/book' },
        { label: 'View financing options', href: '/financing-options' },
      ],
    },

    customsSection:{
treatmentsPorcess:
  {
  "title": "The PRP Hair Treatment Process",
  "steps": [
    {
      "step": 1,
      "title": "Consultation & Assessment",
      "description": "Our expert team evaluates your hair loss pattern, discusses your goals, and determines if PRP is right for you.",
      "image": {
        "src": "/images/prp/consultation.jpg",
        "alt": "Provider examining a patient's scalp during a consultation",
        "focalPoint": "center"
      }
    },
    {
      "step": 2,
      "title": "Blood Draw",
      "description": "A small amount of blood (similar to routine lab work) is drawn from your arm.",
      "image": {
        "src": "/images/prp/blood-draw.jpg",
        "alt": "Clinician drawing blood from a patient's arm",
        "focalPoint": "center"
      }
    },
    {
      "step": 3,
      "title": "Platelet Concentration",
      "description": "Your blood is processed in a specialized centrifuge to separate and concentrate the platelets.",
      "image": {
        "src": "/images/prp/centrifuge.jpg",
        "alt": "Vial of concentrated platelet-rich plasma held up to the light",
        "focalPoint": "center"
      }
    },
    {
      "step": 4,
      "title": "Scalp Preparation",
      "description": "The treatment area is cleansed and a topical numbing agent is applied for comfort.",
      "image": {
        "src": "/images/prp/scalp-prep.jpg",
        "alt": "Clinician applying numbing agent to a patient's scalp",
        "focalPoint": "center"
      }
    },
    {
      "step": 5,
      "title": "PRP Injection",
      "description": "The concentrated platelet-rich plasma is carefully injected into targeted areas of your scalp using fine needles.",
      "image": {
        "src": "/images/prp/injection.jpg",
        "alt": "Provider injecting PRP into a patient's scalp",
        "focalPoint": "center"
      }
    }
  ]
}

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
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
          alt: 'A SAMM provider consulting with a male patient',
        },
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

    providers: ['evelia-johnsen', 'harry-collins'],
    related: ['hormone-therapy-men', 'weight-loss-men', 'sexual-wellness-men'],

    faqs: [
      {
        question: 'Is PRP hair treatment painful?',
        answer:
          'Most patients experience minimal discomfort. We use topical numbing agents and fine needles to ensure your comfort throughout the procedure.',
      },
      {
        question: 'How many treatments will I need?',
        answer:
          'Typically, we recommend 3–4 initial treatments spaced 4–6 weeks apart, followed by maintenance treatments every 6–12 months.',
      },
      {
        question: 'When will I see results?',
        answer:
          'While individual results vary, most patients begin noticing improvements in hair quality around 2–3 months, with optimal results visible at 6–12 months.',
      },
      {
        question: 'Are there any side effects?',
        answer:
          'PRP is extremely safe since it uses your own blood. Some patients may experience mild scalp tenderness or slight swelling for 1–2 days post-treatment.',
      },
      {
        question: 'Can PRP be combined with other treatments?',
        answer:
          'Yes. PRP complements other hair loss treatments including topical medications and laser therapy, and can enhance hair transplant results.',
      },
    ],

    closingCta: {
      title: 'Restore your hair naturally',
      body: 'Take the first step toward thicker, healthier hair with PRP therapy.',
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: 'PRP Hair Restoration for Men in Savannah, GA | SAMM',
      description:
        'Platelet-rich plasma hair restoration for men in Savannah and Statesboro, GA - a natural, non-surgical treatment using your own blood.',
      canonical: '/platelet-rich-plasma-hair/male',
    },
  },

  {
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
    related: ['hormone-therapy-women', 'weight-loss-women', 'sexual-wellness-women'],

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
  },


  {
    slug: 'laser-vaginal-therapy',
    href: '/laser-vaginal-therapy',
    pillar: 'sexual-wellness',
    audience: 'women',
    kind: 'variant',

    name: 'Laser Vaginal Therapy',
    shortName: 'Laser Vaginal Therapy',
    summary:
      'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
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
      ctas: [{ label: 'Request a consultation', href: '/book' }],
    },

    statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

    sections: [
      {
        eyebrow: 'How it works',
        title: 'Gentle And Precise, Designed For Intimate Areas',
        body: [
          'Laser Vaginal Therapy is an in-clinic treatment using non-surgical CO2 laser technology to stimulate collagen remodeling, strengthen vaginal walls, and restore vaginal mucosa — delivering meaningful rejuvenation without invasive surgery.',
          'Patients enjoy improved tone, lubrication, and tissue integrity. Our Laser Vaginal Therapy treatments are performed by licensed clinicians trained in vaginal rejuvenation protocols. Most patients complete a series of three in-office treatments.',
        ],
        image: {
          src: '/images/treatments/laser-vaginal-therapy/gentle-precise.jpg',
          alt: 'Laser vaginal therapy in-office treatment',
        },
      },
      {
        eyebrow: 'Benefits',
        title: 'Benefits Of Laser Vaginal Therapy',
        body: ['With a full course of three treatments, patients experience lasting vaginal rejuvenation, including:'],
        bullets: [
          'Reduced vaginal dryness and improved lubrication',
          'Improved vaginal tone, tightness, and reduction of laxity',
          'Increased comfort and satisfaction during intercourse',
          'Decreased incontinence and urgency',
          'Enhanced sensitivity and satisfaction',
        ],
        image: {
          src: '/images/treatments/laser-vaginal-therapy/benefits.jpg',
          alt: 'Woman feeling confident and comfortable',
        },
        cta: { label: 'Request a consultation', href: '/book' },
      },
      {
        type: 'feature-list',
        id: 'symptoms-treated',
        eyebrow: 'Symptoms treated',
        heading: 'Symptoms Treated By Laser Vaginal Therapy',
        cards: [
          { title: 'Vaginal Dryness', description: 'Persistent dryness and irritation, often felt during intercourse.' },
          { title: 'Discomfort', description: 'Pain during intercourse, particularly during menopause or following cancer treatment.' },
          { title: 'Laxity Or Loss Of Tone', description: 'A feeling of looseness or reduced sensation after childbirth or with age.' },
          { title: 'Urinary Incontinence', description: 'Leakage while laughing, coughing, sneezing, or exercising.' },
        ],
      },
      //  {
      //   eyebrow: 'Symptoms treated',
      //   title: 'Symptoms Treated By Laser Vaginal Therapy',
      //   cards: [
      //     { title: 'Vaginal Dryness', description: 'Persistent dryness and irritation, often felt during intercourse.' },
      //     { title: 'Discomfort', description: 'Pain during intercourse, particularly during menopause or following cancer treatment.' },
      //     { title: 'Laxity Or Loss Of Tone', description: 'A feeling of looseness or reduced sensation after childbirth or with age.' },
      //     { title: 'Urinary Incontinence', description: 'Leakage while laughing, coughing, sneezing, or exercising.' },
      //   ],
      // },
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
        'Follow-up monitoring',
      ],
      note: 'Laser Vaginal Therapy is typically considered an elective aesthetic procedure and is not covered by most insurance plans.',
      cta: { label: 'View financing options', href: '/financing-options' },
    },

    providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
    related: ['hormone-therapy-women', 'weight-loss-women', 'sexual-wellness-women'],

    testimonials: [
      {
        name: 'S.R.',
        rating: 5,
        source: 'Google',
        text: 'All members of the staff are absolutely wonderful. They are polite and address any questions or concerns you have in a professional approach. They have literally changed my life for the better.',
      },
      {
        name: 'E.H.',
        rating: 5,
        source: 'Google',
        text: 'Dr. Collins has been an absolute delight and so informative and patient. He has a great personality and is very passionate about his profession to inform, teach, guide, and give his patients the most beneficial advice for good health and longevity. He has been very helpful for both my Husband and myself. The staff is very helpful and friendly as well.',
      },

      {
        name: 'J.F.',
        rating: 5,
        source: 'Google',
        text: "Every experience has been excellent. All questions and concerns were answered. I've recommended them to my family and friends.",
      },
      {
        name: 'C.G.',
        rating: 5,
        source: 'Google',
        text: 'Great employees to work with. The staff is very knowledgeable and explain all processes.',
      },
    ],

    faqs: [
      {
        question: 'Is Laser Vaginal Therapy painful?',
        answer:
          'Most patients experience warmth or a slight prickling during treatment. Patients are able to complete the course of the treatment without general anesthesia.',
      },
      {
        question: 'How many Laser Vaginal Therapy treatments will I need?',
        answer:
          'A standard vaginal rejuvenation protocol consists of three sessions, spaced four to six weeks apart. Some patients notice improvement after the first session; full results typically become apparent over two to three months as collagen continues to remodel. Annual maintenance treatments are recommended.',
      },
      {
        question: 'Is there any downtime?',
        answer:
          'There is minimal downtime. We recommend avoiding intercourse, strenuous exercise, and tampon use for five to seven days before and after each session. Normal, low-impact daily activities can be resumed the same day.',
      },
      {
        question: 'Who performs Laser Vaginal Therapy at SAMM?',
        answer:
          "Laser Vaginal Therapy is performed exclusively by our licensed physician, nurse practitioner, or physician assistant — the only providers legally authorized to perform ablative CO₂ laser procedures in Georgia. You'll receive a thorough consultation before any treatment is scheduled.",
      },
      {
        question: 'Is Laser Vaginal Therapy covered by insurance?',
        answer:
          "Laser Vaginal Therapy is typically considered an elective aesthetic procedure and is not covered by most insurance plans. We're happy to discuss pricing and available payment options during your consultation.",
      },
    ],

    disclaimer:
      'Individual results vary. Laser Vaginal Therapy is a cosmetic and wellness procedure and is not FDA approved to treat any specific medical condition. Statements on this page are for informational purposes only and do not constitute medical advice. Candidacy is determined on an individual basis following a thorough clinical consultation.',

    closingCta: {
      title: 'Ready to love the way you feel again?',
      body: 'Schedule a private consultation for a confidential conversation of your symptoms and goals.',
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: 'Laser Vaginal Therapy in Savannah, GA | Vaginal Rejuvenation',
      description:
        'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
      canonical: '/laser-vaginal-therapy',
    },
  },
  {
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
      ctas: [{ label: 'Book a consultation', href: '/book' }],
    },

    statement: 'Treatment plans designed around your symptoms, lifestyle, and goals.',

    sections: [
      {
        title: "Don't ignore your symptoms",
        body: [
          "You don't have to push through exhaustion, brain fog, mood swings, or stubborn weight gain alone. Our team can help you understand what's happening and build a treatment plan that supports your health now and long term.",
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
          alt: 'A woman resting outdoors, representing restored energy and balance',
        },
      },
      {
        eyebrow: 'Recognising the pattern',
        title: 'Common symptoms of perimenopause and menopause',
        body: [
          'Perimenopause happens as hormone levels begin fluctuating before menopause officially begins. Menopause occurs once menstrual cycles have stopped for 12 consecutive months. While both stages are completely natural, the symptoms can feel disruptive and frustrating.',
          'Every woman experiences hormonal changes differently. Some notice mild symptoms, while others deal with significant physical and emotional changes that impact work, relationships, sleep, and confidence.',
        ],
        bullets: [
          'Hot flashes and night sweats',
          'Brain fog and difficulty concentrating',
          'Chronic fatigue',
          'Mood swings or irritability',
          'Weight gain and slower metabolism',
          'Low libido',
          'Sleep disruptions',
          'Vaginal dryness or discomfort',
          'Anxiety or increased stress sensitivity',
          'Muscle loss and reduced strength',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Monitoring.jpg',
          alt: "A SAMM clinician reviewing a patient's lab and treatment notes",
        },
      },
      {
        title: "Why lifestyle changes aren't always enough",
        body: [
          'Healthy habits absolutely matter. Nutrition, exercise, hydration, and stress management can all support hormonal health. But when hormone levels begin fluctuating or declining significantly, lifestyle changes alone may not fully address the root cause of symptoms.',
          "Many women come to us after trying supplements, restrictive diets, or fitness programs without getting lasting relief. That's because symptoms like fatigue, stubborn weight gain, low libido, and brain fog are often tied to deeper hormonal and metabolic imbalances.",
          "Our approach focuses on identifying what's happening internally through advanced testing and personalized evaluations so treatment decisions are based on real data, not guesswork.",
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Safety.jpg',
          alt: 'A SAMM provider reviewing a treatment plan with a patient',
        },
      },
      {
        title: 'How we evaluate and treat menopausal hormonal imbalance',
        body: [
          'At SAMM, treatment starts with understanding your full health picture. We evaluate symptoms alongside detailed labwork to identify hormone shifts and other factors that may be contributing to your perimenopause or menopause symptoms.',
          'From there, we create a customized plan that may include hormone therapy, lifestyle recommendations, weight management support, or sexual wellness treatments depending on your needs. We also believe ongoing monitoring matters - hormones can shift over time, which is why follow-up evaluations and treatment adjustments are an important part of long-term success.',
        ],
        bullets: [
          'Estrogen and progesterone levels',
          'Thyroid function',
          'Testosterone levels',
          'Cortisol and stress response',
          'Metabolic health markers',
          'Inflammation indicators',
        ],
        image: {
          src: '/images/treatments/perimenopause-menopause/hero.jpg',
          alt: 'An active mature woman, strength training',
        },
      },
      {
        type: 'feature-list',
        id: 'what-causes-symptoms',
        heading: 'What causes menopausal symptoms?',
        cards: [
          {
            title: 'Hot flashes and night sweats',
            description:
              "Hormonal fluctuations can affect the body's temperature regulation system, leading to sudden heat, sweating, flushing, and disrupted sleep patterns.",
          },
          {
            title: 'Brain fog and fatigue',
            description:
              'Changes in estrogen and progesterone levels can impact sleep quality, mental clarity, focus, and energy production.',
          },
          {
            title: 'Weight gain and metabolic changes',
            description:
              'Hormonal changes can influence insulin sensitivity, muscle mass, and fat distribution, even in women maintaining healthy habits.',
          },
          {
            title: 'Low libido and sexual health changes',
            description:
              'Reduced hormone levels can affect sexual desire, comfort, arousal, and intimacy. Vaginal dryness may also become more noticeable.',
          },
        ],
      },
      {
        title: 'Why women choose SAMM',
        body: [],
        bullets: [
          'Personalized treatment plans',
          'Comprehensive hormone testing',
          'Ongoing monitoring and support',
          'Data-driven recommendations',
          'Focus on long-term wellness',
          'Experienced medical guidance',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
          alt: 'A woman resting outdoors, representing restored energy and balance',
        },
      },
      {
        title: 'What patients often notice after treatment',
        body: ['Every patient responds differently, but many women report improvements such as:'],
        bullets: [
          'Better energy levels',
          'Improved mental clarity',
          'More restful sleep',
          'Better mood stability',
          'Increased libido',
          'Easier weight management',
          'Greater confidence and overall well-being',
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

    providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
    related: ['hormone-therapy-women', 'weight-loss-women', 'sexual-wellness-women'],

    faqs: [
      {
        question: "What's the difference between perimenopause and menopause?",
        answer:
          'Perimenopause is the transition phase leading up to menopause when hormone levels begin fluctuating. Menopause officially begins after 12 consecutive months without a menstrual cycle.',
      },
      {
        question: 'What are the early signs of perimenopause?',
        answer:
          'Early symptoms may include irregular periods, mood changes, fatigue, sleep issues, brain fog, low libido, and hot flashes.',
      },
      {
        question: 'When should I consider hormone therapy?',
        answer:
          'If symptoms are affecting your quality of life, daily routine, sleep, relationships, or energy levels, it may be time to consider a medical evaluation and discuss hormone therapy options.',
      },
      {
        question: 'Can perimenopause cause weight gain?',
        answer:
          'Yes. Hormonal changes can affect metabolism, muscle mass, insulin sensitivity, and fat storage, making weight management more difficult.',
      },
      {
        question: 'Is hormone therapy safe?',
        answer:
          'Hormone therapy may be safe and effective for many women when carefully monitored by a qualified medical provider. Treatment plans should always be personalized based on medical history, symptoms, and labwork.',
      },
      {
        question: 'Do I need lab testing before treatment?',
        answer:
          'Yes. Comprehensive lab testing helps us understand hormone levels, thyroid function, metabolic health, and other important markers before creating a treatment plan.',
      },
      {
        question: 'How long does treatment take to work?',
        answer:
          'Some women notice improvements within weeks, while others may need more time and ongoing adjustments depending on their symptoms and treatment plan.',
      },
    ],

    closingCta: {
      title: 'Ready to take the next step?',
      body: 'Start with a consultation.',
      cta: { label: 'Book a consultation', href: '/book' },
    },

    seo: {
      title: 'Perimenopause & Menopause Treatment in Savannah, GA | SAMM',
      description:
        'Struggling with hot flashes, fatigue, or brain fog? SAMM offers personalized menopause treatment in Savannah with hormone testing.',
      canonical: '/perimenopause-menopause',
    },
  },

  {
    slug: 'sexual-wellness-men',
    href: '/rejuvenation-enhancement/male',
    pillar: 'sexual-wellness',
    audience: 'men',
    kind: 'variant',

    name: "Men's Sexual Wellness",
    shortName: 'Sexual Wellness for Men',
    summary: 'Medical treatment for ED, low libido, and declining performance - discreet, non-surgical.',
    cardImage: {
      src: '/images/services/sexualwilens.png',
      alt: 'A couple embracing, representing renewed intimacy and confidence',
    },
    cardBenefits: ['Non-invasive', 'Personalized programs', 'Boosts confidence'],

    hero: {
      eyebrow: 'Sexual Wellness',
      title: 'Reclaim your confidence with advanced sexual health treatments',
      lead: "If you're experiencing erectile dysfunction, low libido, or declining sexual performance, you're not alone. Our medical therapies help restore circulation, hormone balance, and sexual confidence without surgery or downtime.",
      image: {
        src: '/images/treatments/sexual-wellness-men/hero.jpg',
        alt: 'A confident, distinguished middle-aged man',
        focalPoint: 'center 25%',
      },
      ctas: [
        { label: 'Schedule a consultation', href: '/book' },
        { label: 'View financing options', href: '/financing-options' },
      ],
    },

    statement: "We work with your body's natural healing mechanisms, not just to mask symptoms.",

    symptoms: {
      eyebrow: 'Recognising the pattern',
      title: 'Common signs of declining sexual function in men',
      lead: 'Hormonal shifts, reduced circulation, and lifestyle factors can all impact erectile strength, stamina, and libido. We provide a private, judgment-free environment to address these concerns.',
      columns: 2,
      items: [
        { title: 'Difficulty achieving or maintaining erections' },
        { title: 'Reduced libido or sexual desire' },
        { title: 'Decreased stamina during intimacy' },
        { title: 'Weaker erections than in the past' },
        { title: 'Loss of confidence in sexual performance' },
        { title: 'Reduced sensitivity or pleasure' },
      ],
    },

    sections: [
      {
        eyebrow: 'Treatment options',
        title: 'Shockwave therapy for erectile dysfunction',
        body: [
          'Shockwave therapy uses acoustic wave technology to stimulate blood vessel growth and improve circulation within penile tissue. Many men experience gradual improvements in erectile quality over several weeks as circulation improves.',
        ],
        bullets: [
          'Improved blood flow to the penis',
          'Stronger and more sustainable erections',
          'Increased responsiveness during intimacy',
          'A non-drug solution for erectile dysfunction',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
          alt: 'A SAMM provider consulting with a male patient',
        },
      },
      {
        eyebrow: 'Treatment options',
        title: 'Bioidentical hormone replacement therapy (BHRT)',
        body: [
          'Low testosterone can significantly impact libido, energy, mood, and erectile function. BHRT helps restore hormonal balance and optimize testosterone levels.',
        ],
        bullets: [
          'Increase libido and sexual desire',
          'Improve energy and stamina',
          'Support stronger erections',
          'Enhance overall vitality and mood',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
          alt: 'A clinician holding a blood sample for lab testing',
        },
      },
    ],

    candidacy: {
      eyebrow: 'More treatment options',
      title: 'PRP therapy and supplementation support',
      columns: 2,
      items: [
        {
          title: "PRP therapy for men's sexual performance",
          body: 'Uses growth factors from your own blood to promote tissue regeneration and improve erectile function.',
          items: [
            'Enhanced erection strength and firmness',
            'Improved sensitivity and sexual pleasure',
            'Increased sexual stamina',
          ],
        },
        {
          title: 'Supplementation & pharmaceutical support',
          body: 'Depending on your needs, treatment plans may include:',
          items: [
            'Prescription medications that improve blood flow',
            'Physician-guided supplement protocols',
            'Combination therapy alongside PRP or shockwave treatments',
          ],
        },
      ],
    },

    providers: ['harry-collins', 'evelia-johnsen'],
    related: ['hormone-therapy-men', 'weight-loss-men', 'hair-restoration-men'],

    faqs: [
      {
        question: 'What causes erectile dysfunction?',
        answer:
          'Erectile dysfunction can be caused by reduced blood flow, hormonal imbalance, nerve issues, stress, or underlying health conditions such as diabetes or cardiovascular disease.',
      },
      {
        question: 'Is erectile dysfunction treatable without medication?',
        answer:
          'Yes. Treatments such as shockwave therapy, hormone optimization, and PRP therapy can address the root causes of erectile dysfunction without relying solely on medication.',
      },
      {
        question: 'How quickly will I see results?',
        answer:
          'Some patients notice improvements within weeks, while others experience gradual progress over several months as tissue regeneration and circulation improve.',
      },
      {
        question: 'Are these treatments safe?',
        answer:
          'All therapies offered at our clinic are performed by trained medical professionals and use established medical protocols.',
      },
    ],

    closingCta: {
      title: 'Ready to take control of your sexual health?',
      body: 'Our treatments are discreet, effective, and personalized to meet your needs.',
      cta: { label: 'Schedule a consultation', href: '/book' },
    },

    seo: {
      title: "ED & Low Libido Treatment in Savannah, GA | Men's Sexual Wellness",
      description:
        'Medical treatment for erectile dysfunction, low libido, and declining performance in Savannah and Statesboro, GA - discreet and non-surgical.',
      canonical: '/rejuvenation-enhancement/male',
    },
  },

  {
    slug: 'sexual-wellness-women',
    href: '/rejuvenation-enhancement/female',
    pillar: 'sexual-wellness',
    audience: 'women',
    kind: 'variant',

    name: 'Rejuvenation & Enhancement for Women',
    shortName: 'Sexual Wellness for Women',
    summary:
      "Explore women's sexual wellness treatments in Savannah for vaginal dryness, painful intercourse, low libido, sensitivity concerns, and confidence.",
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
      ctas: [{ label: 'Book a consultation', href: '/book' }],
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
        'Follow-up monitoring',
      ],
      note: 'Costs vary based on your treatment plan.',
      cta: { label: 'View financing options', href: '/financing-options' },
    },

    providers: ['sarah-malone', 'evelia-johnsen', 'harry-collins'],
    related: ['hormone-therapy-women', 'weight-loss-women', 'hair-restoration-women'],

    faqs: [
      {
        question: 'What causes changes in sexual health for women?',
        answer:
          'Changes in female sexual wellness are often related to hormonal shifts, aging, childbirth, or menopause. These changes can affect vaginal tissue, lubrication, sensitivity, and overall comfort during intimacy. Treatments such as hormone therapy, laser vaginal rejuvenation, and PRP can help restore tissue health and sexual responsiveness.',
      },
      {
        question: 'Can vaginal rejuvenation help with dryness or discomfort?',
        answer:
          'Yes. Treatments like CO2 laser therapy help stimulate collagen production in vaginal tissue, which can improve lubrication, elasticity, and overall tissue health. Many women notice reduced dryness and increased comfort during intimacy after treatment.',
      },
      {
        question: 'What is the Plasma Shot (PRP therapy) for women?',
        answer:
          'PRP therapy, often referred to as the O-Shot, uses platelet-rich plasma from your own blood to stimulate tissue regeneration and improve circulation in areas involved in sexual response. This may help improve sensitivity, arousal, and orgasm quality for some women.',
      },
      {
        question: 'Can these treatments help after menopause?',
        answer:
          'Yes. Many women seek treatment during or after menopause when hormonal changes lead to vaginal dryness, thinning tissue, and reduced libido. Treatments such as hormone therapy, PRP, and laser therapy can help restore comfort and sexual wellness.',
      },
      {
        question: 'Is there downtime after treatment?',
        answer:
          'Most treatments require little to no downtime. PRP treatments typically allow patients to resume normal activities immediately, while laser treatments may involve mild sensitivity or discharge for a short period.',
      },
      {
        question: 'How many treatments are usually needed?',
        answer:
          "The number of treatments depends on the therapy used and the patient's individual goals. Some PRP treatments may show results after one session, while laser therapy is often performed as a series of treatments followed by occasional maintenance.",
      },
      {
        question: 'Is vaginal rejuvenation safe?',
        answer:
          'Vaginal rejuvenation treatments performed by trained medical professionals are generally safe and minimally invasive. At Savannah Age Management Medicine, all therapies are performed under medical supervision using established treatment protocols.',
      },
    ],

    closingCta: {
      title: 'Ready to take the next step?',
      body: 'Start with a consultation.',
      cta: { label: 'Book a consultation', href: '/book' },
    },

    seo: {
      title: "Women's Sexual Wellness in Savannah, GA | SAMM",
      description:
        "Explore women's sexual wellness treatments in Savannah for vaginal dryness, painful intercourse, low libido, sensitivity concerns, and confidence.",
      canonical: '/rejuvenation-enhancement/female',
    },
  },

  {
    slug: 'shockwave-therapy',
    href: '/shockwave-therapy',
    pillar: 'sexual-wellness',
    audience: 'men',
    kind: 'variant',

    name: "Shockwave Therapy for Men's Sexual Function",
    shortName: 'Shockwave Therapy',
    summary:
      'A non-invasive acoustic wave treatment that supports improved blood flow, encourages new vessel growth, and helps restore natural erectile function - without injections or surgery.',
    cardImage: {
      src: '/images/treatments/shockwave-therapy/hero.jpg',
      alt: 'An athletic man in a gym, representing restored strength and vitality',
      focalPoint: 'center 30%',
    },
    cardBenefits: ['Supports blood flow', 'Encourages new vessel growth', 'Non-invasive, no surgery'],

    hero: {
      eyebrow: 'Sexual Wellness',
      title: "Shockwave Therapy for Men's Sexual Function",
      lead: 'A non-invasive acoustic wave treatment that supports improved blood flow, encourages new vessel growth, and helps restore natural erectile function - without injections or surgery.',
      image: {
        src: '/images/treatments/shockwave-therapy/hero.jpg',
        alt: 'An athletic man in a gym, representing restored strength and vitality',
        focalPoint: 'center 30%',
      },
      ctas: [{ label: 'Book a consultation', href: '/book' }],
    },

    sections: [
      {
        title: 'Low-Intensity Shockwave Therapy',
        body: [
          'Shockwave therapy may be used for patients with erectile dysfunction. It is often called acoustic wave therapy and uses targeted sound waves to support circulation, encourage repair of blood vessel tissue, and stimulate the growth of new vessels in penile tissue.',
          'Unlike medications, shockwave therapy is designed to work at the vascular level - making it a meaningful option for men seeking a drug-free, non-surgical approach to sexual health.',
          'Treatments are performed in-clinic by a licensed provider, using a medical acoustic sound wave device.',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/steps-img.png',
          alt: 'A SAMM provider preparing an in-clinic treatment',
        },
        imageSide: 'right',
      },
      {
        title: 'Treatment Benefits',
        body: [],
        bullets: [
          'May support stronger, more reliable erections without daily medication',
          'May improve blood flow and penile tissue health',
          'May enhance sensitivity and sexual sensation',
          'May increase spontaneity - reducing reliance on pre-planned dosing',
          'Non-invasive - no needles, no surgery',
          'Minimal disruption - most men resume normal activity the same day',
          'May support improved response for men who have experienced reduced effectiveness with PDE5 inhibitors',
        ],
        image: {
          src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
          alt: 'A SAMM provider greeting a male patient',
        },
        imageSide: 'left',
      },
    ],

    candidacy: {
      title: 'Symptoms and Outcomes of Shockwave Therapy',
      lead: 'Shockwave therapy may be most applicable for men with erectile dysfunction associated with reduced blood flow. It is also explored as a supportive option for sexual performance and overall penile health. Candidacy is always determined on an individual basis during consultation.',
      items: [
        {
          title: 'Vascular health',
          body: 'Difficulty achieving or maintaining an erection - particularly when associated with vascular health or reduced circulation - may be addressed with shockwave therapy.',
        },
        {
          title: 'Medication alternative',
          body: 'Men who prefer to avoid ongoing medication - due to side effects, interactions, or personal preference - may benefit from exploring shockwave therapy as an alternative.',
        },
        {
          title: "Peyronie's disease",
          body: "Acoustic wave therapy may help address scar tissue associated with Peyronie's disease, potentially supporting improved tissue flexibility and reduced discomfort.",
        },
        {
          title: 'Post-surgical recovery',
          body: 'Men recovering from prostate surgery or other pelvic procedures may explore shockwave therapy as part of a broader plan to support the return of erectile function.',
        },
        {
          title: 'Sexual performance',
          body: 'Men seeking support for stronger erections, greater ease, and improved sexual confidence.',
        },
      ],
    },

    faqs: [
      {
        question: 'Is shockwave therapy for ED painful?',
        answer:
          'Most men describe the sensation as mild tapping or tingling. The device is applied externally and only topical anesthesia is required. Treatment sessions typically last 20 to 30 minutes, and most men resume normal activity the same day.',
      },
      {
        question: 'How many shockwave therapy sessions will I need?',
        answer:
          'A standard protocol consists of six sessions, typically spaced one week apart. Some men notice changes during the course of treatment; any improvements often continue to develop over six to twelve weeks as tissue responds. Periodic maintenance sessions may be recommended based on individual results.',
      },
      {
        question: 'What is the difference between shockwave therapy and acoustic wave therapy?',
        answer:
          'The terms are often used interchangeably and refer to the same general category of low-intensity sound wave treatment. At SAMM, we use a professional-grade acoustic wave device to deliver targeted therapy - the same mechanism studied in clinical research on low-intensity extracorporeal shockwave therapy (LI-ESWT) for ED.',
      },
      {
        question: 'Is shockwave therapy for ED FDA approved?',
        answer:
          'Shockwave therapy for erectile dysfunction is currently considered an emerging treatment option in the United States. While low-intensity shockwave therapy has FDA-cleared devices and is supported by leading European urology guidelines, it is classified as investigational by the American Urological Association, meaning clinical evidence continues to evolve. We discuss the current research and realistic expectations with every patient during consultation.',
      },
      {
        question: 'Can shockwave therapy help if pills are less effective?',
        answer:
          'Some men who have experienced reduced effectiveness with PDE5 inhibitors have reported improvement following a course of shockwave treatment, potentially due to enhanced vascular function. Results vary by individual, and this is discussed in detail at your consultation.',
      },
      {
        question: 'Who performs shockwave therapy at SAMM?',
        answer:
          'All shockwave therapy treatments at Savannah Age Management Medicine are performed by our licensed physician, nurse practitioner, or physician assistant in a private, clinical setting. You will receive a thorough consultation and health history review before any treatment is scheduled.',
      },
      {
        question: 'Is shockwave therapy for ED covered by insurance?',
        answer:
          'Shockwave therapy for erectile dysfunction is typically not covered by insurance and is considered an elective procedure. Pricing and payment options are reviewed in full during your consultation with our team.',
      },
    ],

    closingCta: {
      title: 'Get Started',
      body: 'Schedule Your Shockwave Therapy Consultation in Savannah. Private, discreet appointments with licensed providers at Savannah Age Management Medicine. Serving Savannah, Bluffton, Hilton Head, and Coastal Georgia.',
      cta: { label: 'Book a consultation', href: '/book' },
    },

    seo: {
      title: 'Shockwave Therapy for ED in Savannah, GA | SAMM',
      description:
        "Shockwave therapy for ED in Savannah uses acoustic wave treatment to support blood flow, erectile function, and men's sexual wellness without surgery.",
      canonical: '/shockwave-therapy',
    },
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
