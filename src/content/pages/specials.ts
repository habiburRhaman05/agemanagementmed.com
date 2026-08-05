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
    title: 'Wellness Specials',
    lead: 'Explore our current health & wellness specials, available for a limited time at our Statesboro and Pooler locations.',
    image: {
      src: '/images/banner-27-bg.jpg',
      alt: 'A couple laughing together outdoors',
    },
  },

  specials: [
    {
      id: 'sharing-caring',
      window: 'APRIL-JUNE:',
      title: 'Sharing Is Caring!',
      description:
        'DOUBLE The Referral Rewards! All Patients Who Refer Other Patients Will Receive $100 Instead Of $50 To Their Account, Through The End Of June.',
      image: {
        src: 'https://picsum.photos/seed/samm-referral-special/800/900',
        alt: 'Refer a friend — double rewards',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'CLAIM \u2192',
    },
  ] satisfies Special[],
}
