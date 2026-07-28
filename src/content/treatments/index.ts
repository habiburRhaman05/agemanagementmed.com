import type { Pillar, TreatmentSummary } from '@/types/content'

/**
 * Treatment registry - the single source the nav, footer service list,
 * pillar grids, related rails and sitemap all derive from. Adding a treatment
 * is one content file plus one entry here.
 *
 * Images marked `PLACEHOLDER` reference assets missing from the download
 * (218 of 247 - docs/00-AUDIT.md §5.1). They are tracked in
 * docs/ASSETS-MISSING.md and must be swapped before launch.
 */
export const pillars: Record<Pillar, { label: string; href: string; blurb: string }> = {
  'hormone-therapy': {
    label: 'Hormone Therapy',
    href: '/bioidentical-hormone-replacement-therapy',
    blurb:
      'Individualized bioidentical hormone protocols built from your labs, symptoms, and health history.',
  },
  'weight-loss': {
    label: 'Weight Loss',
    href: '/concierge-medical-weight-loss',
    blurb:
      'Physician-guided metabolic care - body composition, labwork, and medication used precisely.',
  },
  'sexual-wellness': {
    label: 'Sexual Wellness',
    href: '/rejuvenation-enhancement',
    blurb: 'Discreet, medical treatment for libido, function, and intimacy - for men and women.',
  },
  'hair-restoration': {
    label: 'Hair Restoration',
    href: '/platelet-rich-plasma-hair',
    blurb: 'PRP therapy using your own platelets to stimulate natural regrowth. Non-surgical.',
  },
  aesthetics: {
    label: 'Medical Aesthetics',
    href: '/aesthetics',
    blurb: 'Medical-grade aesthetic services tailored to your skin, delivered by clinicians.',
  },
}

export const treatments: TreatmentSummary[] = [
  {
    slug: 'hormone-therapy-women',
    href: '/bioidentical-hormone-replacement-therapy/female',
    pillar: 'hormone-therapy',
    audience: 'women',
    name: 'Bioidentical Hormone Replacement Therapy for Women',
    shortName: 'BHRT for Women',
    summary:
      'Restore hormonal balance with protocols built from your labs, symptoms, and health history.',
    cardImage: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
      alt: 'A woman resting outdoors, representing restored energy and balance',
    },
    cardBenefits: ['Stabilize mood and sleep', 'Restore energy', 'Support metabolism'],
  },
  {
    slug: 'hormone-therapy-men',
    href: '/bioidentical-hormone-replacement-therapy/male',
    pillar: 'hormone-therapy',
    audience: 'men',
    name: 'Bioidentical Hormone Replacement Therapy for Men',
    shortName: 'BHRT for Men',
    summary:
      'Testosterone and hormone optimization for energy, strength, libido, and mental clarity.',
    cardImage: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
      alt: 'A SAMM provider greeting a male patient',
    },
    cardBenefits: ['Boost energy', 'Build muscle', 'Enhance libido'],
  },
  {
    slug: 'weight-loss',
    href: '/concierge-medical-weight-loss/male',
    pillar: 'weight-loss',
    audience: 'all',
    name: 'Concierge Medical Weight Loss',
    shortName: 'Medical Weight Loss',
    summary:
      'Expert, personalized weight management guided by body composition scans and labwork.',
    cardImage: {
      src: '/images/services/loss-weight.png',
      alt: 'A patient measuring their waist during a body composition check',
    },
    cardBenefits: ['Safe & sustainable', 'Expert-guided', 'Comprehensive program'],
  },
  {
    slug: 'sexual-wellness',
    href: '/rejuvenation-enhancement/male',
    pillar: 'sexual-wellness',
    audience: 'all',
    name: 'Sexual Performance Enhancement & Rejuvenation',
    shortName: 'Sexual Wellness',
    summary: 'Boost libido, support response, and enhance intimacy - non-invasive and discreet.',
    cardImage: {
      src: '/images/services/image-3.png',
      alt: 'A couple embracing, representing renewed intimacy and confidence',
    },
    cardBenefits: ['Non-invasive', 'Couples support available', 'Personalized programs'],
  },
  {
    slug: 'hair-restoration',
    // TODO: point at a /platelet-rich-plasma-hair hub once built.
    href: '/platelet-rich-plasma-hair/male',
    pillar: 'hair-restoration',
    audience: 'all',
    name: 'Platelet-Rich Plasma Hair Restoration',
    shortName: 'PRP Hair Restoration',
    summary:
      'Concentrated platelets from your own blood, used to stimulate natural hair regrowth.',
    cardImage: {
      src: '/images/hero-11-bg.jpg',
      alt: 'A woman laughing outdoors, representing renewed confidence',
    },
    cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],
  },
  {
    slug: 'aesthetics',
    href: '/aesthetics',
    pillar: 'aesthetics',
    audience: 'all',
    name: 'Medical Aesthetics',
    shortName: 'Medical Aesthetics',
    summary: 'Medical-grade aesthetic services personalized to your skin care goals.',
    cardImage: {
      src: '/images/services/medical-image.png',
      alt: 'A couple embracing and smiling outdoors',
    },
    cardBenefits: ['Clinician-delivered', 'Natural results', 'Personalized plans'],
  },
]

export function getTreatments(slugs: string[]): TreatmentSummary[] {
  return slugs
    .map((s) => treatments.find((t) => t.slug === s))
    .filter((t): t is TreatmentSummary => Boolean(t))
}

