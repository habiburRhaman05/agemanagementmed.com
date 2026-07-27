import type { Treatment } from '@/types/content'

/**
 * Medical Aesthetics. Copy extracted verbatim from source. The six services
 * listed on the source page (medical-grade facials, laser hair removal, etc.)
 * each 404 as standalone pages on the live site - see docs/00-AUDIT.md §1.2 -
 * so they're presented here as a plain list, not linked, to avoid creating
 * new dead links. Building those out is real scope, pending client copy.
 */
export const aesthetics: Treatment = {
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
}

