import { treatments as allTreatments } from '@/content/treatments/main'
import type { Pillar, TreatmentSummary } from '@/types/content'

/**
 * Pillar-level metadata (nav labels, hub hrefs, blurbs) - not treatment data,
 * so it stays here rather than in main.ts.
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

/**
 * Card-level summary for every treatment - derived from `main.ts`, the single
 * source of truth, rather than duplicated here. `Treatment` extends
 * `TreatmentSummary`, so this is a type view, not a copy.
 */
export const treatments: TreatmentSummary[] = allTreatments

export function getTreatments(slugs: string[]): TreatmentSummary[] {
  return slugs
    .map((s) => treatments.find((t) => t.slug === s))
    .filter((t): t is TreatmentSummary => Boolean(t))
}

