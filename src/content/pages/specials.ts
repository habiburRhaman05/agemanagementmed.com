import type { Media, Seo } from '@/types/content'

export type SpecialLocation = 'savannah-pooler' | 'statesboro'

export interface Special {
  id: string
  window: string
  title: string
  description: string
  image: Media
  locations: SpecialLocation[]
  ctaLabel?: string
}

/** Copy migrated from the live /specials/ page — real offers, not invented. */
export const specialsContent = {
  seo: {
    title: 'Wellness Specials | Savannah Age Management Medicine',
    description:
      'Explore current health and wellness specials, available for a limited time at our Statesboro and Pooler locations.',
    canonical: '/specials',
  } satisfies Seo,

  hero: {
    eyebrow: 'Limited time',
    title: 'Wellness specials',
    lead: 'Explore our current health & wellness specials, available for a limited time at our Statesboro and Pooler locations.',
    image: {
      src: 'https://picsum.photos/seed/samm-specials-hero/1600/900',
      alt: 'A couple laughing together outdoors',
    },
  },

  specials: [
    {
      id: 'sharing-caring',
      window: 'April – June',
      title: 'Sharing is caring!',
      description:
        'DOUBLE the referral reward! All patients who refer other patients will receive $100 instead of $50 to their account, through the end of June.',
      image: {
        src: 'https://picsum.photos/seed/samm-referral-special/800/900',
        alt: 'Refer a friend — double rewards',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'Claim',
    },
  ] satisfies Special[],
}
