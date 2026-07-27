import type { Location } from '@/types/content'

/**
 * Single source of truth for business facts. Extracted verbatim from the
 * source site — see docs/00-AUDIT.md §2.1. Nothing here is duplicated in a
 * component or page.
 */
export const site = {
  name: 'Savannah Age Management Medicine',
  shortName: 'SAMM',
  founded: 2010,
  url: 'https://www.agemanagementmed.com',
  phone: '(912) 925-6911',
  phoneHref: 'tel:+19129256911',
  email: 'info@agemanagementmed.com',
  emailHref: 'mailto:info@agemanagementmed.com',
  tagline: 'Optimize your health. Optimize your life.',
  bookingHref: '/contact',
  legal: {
    copyright: `Copyright © ${new Date().getFullYear()} Savannah Age Management Medicine. All Rights Reserved.`,
    /**
     * TCPA / SMS consent. Reproduced verbatim from the source form — this is
     * legal text and must not be edited, shortened, or paraphrased.
     */
    smsConsent:
      'By submitting, I consent to receive calls and text messages from SAMM regarding my inquiry and related services. I agree to the Privacy Policy and Terms. Reply STOP to opt out. Msg/data rates may apply.',
  },
} as const

export const locations: Location[] = [
  {
    slug: 'savannah-pooler',
    name: 'Savannah / Pooler',
    addressLine: '200 Blue Moon Xing, Suite 102',
    city: 'Pooler',
    state: 'GA',
    zip: '31322',
    hours: [
      { days: 'Mon – Thu', time: '9:00 AM – 5:00 PM' },
      { days: 'Friday', time: '9:00 AM – 3:00 PM' },
    ],
    mapEmbedUrl:
      'https://www.google.com/maps?q=200+Blue+Moon+Xing+Suite+102+Pooler+GA+31322&output=embed',
  },
  {
    slug: 'statesboro',
    name: 'Statesboro',
    addressLine: '5 Oak Street',
    city: 'Statesboro',
    state: 'GA',
    zip: '30458',
    hours: [
      { days: 'Mon – Thu', time: '8:00 AM – 4:00 PM' },
      { days: 'Friday', time: '8:00 AM – 2:00 PM' },
    ],
    mapEmbedUrl: 'https://www.google.com/maps?q=5+Oak+Street+Statesboro+GA+30458&output=embed',
  },
]
