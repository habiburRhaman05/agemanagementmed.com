/**
 * Homepage service cards — STATIC.
 *
 * Deliberately not driven by the CMS: this block mirrors the live site's
 * `#column-box-o` grid exactly (four fixed cards, fixed order, fixed copy).
 * Images are placeholders — replace the `image` values with the final assets.
 */
export interface HomeServiceCard {
  title: string
  href: string
  image: string
  imageAlt: string
  /** Short one-line pitch shown under the title, above the checklist. Not every card has one. */
  summary?: string
  benefits: string[]
  /** The source constrains the two shorter titles to 300px. */
  narrowTitle?: boolean
}

export const homeServices: HomeServiceCard[] = [
  {
    title: 'Bioidentical Hormone Replacement Therapy (BHRT) for men & women',
    href: '/bioidentical-hormone-replacement-therapy/male/',
    image:
      'https://www.agemanagementmed.com/themes/default/assets/images/column-box-img.png',
    imageAlt: 'Happy People',
    benefits: ['Boost energy', 'Stabilize mood', 'Build muscle', 'Enhance libido'],
  },
  {
    title: 'Platelet-Rich Plasma (PRP) therapy',
    href: '/platelet-rich-plasma-hair',
    image:
      'https://www.agemanagementmed.com/themes/default/assets/images/column-box-5-img.png',
    imageAlt: 'Muscle Pain',
    summary: 'Supports muscle healing and tissue repair.',
    benefits: ['Targeted relief', 'Stimulates healing', 'Versatile treatment', 'Non-surgical'],
    narrowTitle: true,
  },
  {
    title: 'Sexual Performance Enhancement & Rejuvenation',
    href: '/rejuvenation-enhancement/female',
    image:
      'https://www.agemanagementmed.com/themes/default/assets/images/column-box-3-img.png',
    imageAlt: 'Happy Couple',
    summary: 'Boost libido, support response, enhance intimacy.',
    benefits: [
      'Non-invasive',
      'Couples support available',
      'Boosts confidence',
      'Personalized programs',
    ],
  },
  {
    title: 'Concierge medical weight loss',
    href: '/concierge-medical-weight-loss/female',
    image:
      'https://www.agemanagementmed.com/themes/default/assets/images/column-box-6-img.png',
    imageAlt: 'Weight Loss',
    summary: 'Expert, personalized weight management.',
    benefits: [
      'Safe & sustainable',
      'Minimize side effects',
      'Expert-guided',
      'Comprehensive program',
    ],
    narrowTitle: true,
  },
]
