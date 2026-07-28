import type { Treatment } from '@/types/content'

export const bhrtHrtTrt: Treatment = {
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
    // No dedicated bhrt-hrt-trt card photo exists locally (the original export
    // pointed at a banner-21-bg.jpg that was never downloaded). Reusing the
    // page's own real hero photo rather than a broken path.
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
        "Hormone Replacement Therapy (HRT) is more than just a medical treatment - it's a pathway to renewed health and energy. Whether you're seeking Testosterone Replacement Therapy (TRT) or experiencing disruptive hormonal imbalances, our comprehensive approach ensures you receive the most advanced, personalized care possible. Below, we'll review the differences between HRT, TRT, and BHRT, and why our team uses BHRT to treat our patients."
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
        'An umbrella term referring to the broader approach to hormonal balance that addresses various hormonal needs across different life stages. This approach may or may not be bioidentical.'
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
        'Testosterone replacement therapy (TRT) is designed for individuals experiencing low testosterone and can significantly improve quality of life. However, for men, a protocol that includes only testosterone is often incomplete, as proper hormone balance typically requires addressing other key hormones as well. Similarly, for women, a hormone optimization plan that excludes testosterone may not fully support overall well-being. A truly effective approach considers the broader hormonal picture to ensure optimal health and symptom relief.'
      ],
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider reviewing a treatment plan with a patient',
      },
    },
    {
      title: 'Bioidentical Hormone Replacement Therapy (BHRT)',
      body: [
        'The most advanced and synchronous approach to hormone optimization. Unlike synthetic hormone treatments, bioidentical hormones are molecularly identical to the hormones naturally produced by your body. These are the hormones that we leverage at Savannah Age Management Medicine to get the best results for our patients.'
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
        "At Savannah Age Management, we don't just treat symptoms - we provide a holistic path to hormonal wellness:"
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
        'Your journey to hormonal balance begins with a comprehensive, three-hour personalized appointment:'
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
      body: [
        'Patients who undergo our BHRT treatments in place of just TRT often experience:'
      ],
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
}
