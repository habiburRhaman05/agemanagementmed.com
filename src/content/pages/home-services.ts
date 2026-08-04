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
  benefits: string[]
  /** The source constrains the two shorter titles to 300px. */
  narrowTitle?: boolean
}

export const homeServices: HomeServiceCard[] = [
  {
    title: 'Bioidentical Hormone Replacement Therapy (BHRT) for men & women',
    href: '/bioidentical-hormone-replacement-therapy',
    image:
      'https://res.cloudinary.com/khs2rcsr/image/upload/v1785475166/hormone-replacement_zvjw8a.avif',
    imageAlt: 'Happy People',
    benefits: ['Boost energy', 'Stabilize mood', 'Build muscle', 'Enhance libido'],
  },
  {
    title: 'Platelet-Rich Plasma (PRP) therapy',
    href: '/platelet-rich-plasma-hair',
    image:
      'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338054/photo-content-92-img_nitez0.jpg',
    imageAlt: 'Muscle Pain',
    benefits: ['Targeted relief', 'Stimulates healing', 'Versatile treatment', 'Non-surgical'],
    narrowTitle: true,
  },
  {
    title: 'Sexual Performance Enhancement & Rejuvenation',
    href: '/rejuvenation-enhancement',
    image:
      'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469249/photo-content-24-img_t5dmp1.jpg',
    imageAlt: 'Happy Couple',
    benefits: [
      'Non-invasive',
      'Couples support available',
      'Boosts confidence',
      'Personalized programs',
    ],
  },
  {
    title: 'Concierge medical weight loss',
    href: '/concierge-medical-weight-loss',
    image:
      'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407018/photo-content-54-img_uz9klt.jpg',
    imageAlt: 'Weight Loss',
    benefits: [
      'Safe & sustainable',
      'Minimize side effects',
      'Expert-guided',
      'Comprehensive program',
    ],
    narrowTitle: true,
  },
]
