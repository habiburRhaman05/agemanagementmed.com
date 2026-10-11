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
  /**
   * Where the card's CTA goes. Every special card is a plain link now, not a
   * button that opens the booking modal — an external URL (e.g. a direct
   * Optimantra scheduling link for one specific service) opens in a new tab;
   * anything else is treated as an internal path. Defaults to
   * `/book-appointment` when omitted, so every card always "redirects to the
   * CTA link" even for offers that don't have their own dedicated page.
   */
  ctaHref?: string
}

/** Shared booking link for all current specials — same Optimantra scheduling page for every card's CTA. */
const SPECIALS_BOOKING_LINK =
  'https://www.optimantra.com/optimus/patient/patientaccess/practsNslotsNEW?sid=Ky9kZjNveGZ1VmFOM3hWbXJma1U5UT09&unCryptedSid=1513432673&pid=Skc0Sko0WXBHZm9BZUNLL0VzbTNzdz09&lid=Q3lobDJJcVp0OXBteUpCQ1ovbUVLUT09&addOnSids=&clienttzoffset=240'

/** Copy migrated from the live /specials/ page — real offers, not invented. */
export const specialsContent = {
  seo: {
    title: 'Wellness Specials in Pooler & Statesboro, GA | SAMM',
    description:
      `Explore current wellness specials for hormone therapy, GLP-1, sexual wellness, aesthetics, and more at SAMM's Pooler and Statesboro locations.`,
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
      id: 'cuddle-season-support',
      window: 'Nov 1 – Dec 31:',
      title: 'Cuddle Season Support',
      description:
        'Book a Sexual Health Consultation and receive 15% off your choice of Laser Vaginal Rejuvenation or Plasma Shots — for men and women.',
      image: {
        src: '/themes/default/assets/images/specials/Cuddle Season Support.png',
        alt: 'A couple embracing warmly in bed',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'Book a Consultation',
      ctaHref: SPECIALS_BOOKING_LINK,
    },
    {
      id: 'refresh-and-restore',
      window: 'Nov 1 – Dec 31:',
      title: 'Refresh and Restore',
      description:
        'Microneedling, a syringe of filler, and 50 units of tox — $1,250 (originally $1,600).',
      image: {
        src: '/themes/default/assets/images/specials/Refresh and Restore.png',
        alt: 'Refresh and Restore holiday special',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'Claim',
    },
    {
      id: 'glow-and-smooth',
      window: 'Nov 1 – Dec 31:',
      title: 'Glow and Smooth',
      description:
        'Photofacial, DiamondGlow, and Laser Hair Removal — $629 (originally $740).',
      image: {
        src: '/themes/default/assets/images/specials/Glow and Smooth.png',
        alt: 'Glow and Smooth holiday special',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'Claim',
    },
    {
      id: 'full-hair-by-xtresse',
      window: 'Nov 1 – Dec 31:',
      title: 'Full Hair by Xtresse',
      description:
        'One in-office Xvie™ treatment, one bottle of FR Concentrate serum, and 3 months of Xtressé Hair Growth Gummies — $1,400 (originally $1,696).',
      image: {
        src: '/themes/default/assets/images/specials/Full Hair by Xtresse.png',
        alt: 'Full Hair by Xtresse holiday special',
      },
      locations: ['savannah-pooler', 'statesboro'],
      ctaLabel: 'Claim',
    },
  ] satisfies Special[],
}
