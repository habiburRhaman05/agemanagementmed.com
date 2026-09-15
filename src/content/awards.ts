import type { Award } from '@/types/content'

export type AwardPlacement = 'Winner' | 'Runner-up'

export interface AwardHonor {
  placement: AwardPlacement
  category: string
}

export interface AwardHonoree {
  /** Lowercase substring of the provider's `Person.name` — used to pull their portrait from the DB. */
  match: string
  /** Fallback display name/credentials if no matching `Person` record is found. */
  name: string
  credentials: string
  honors: AwardHonor[]
}

/**
 * Best of Savannah 2026 (Savannah Magazine, "Best of Doctors") results — the
 * single source for the homepage award section and the per-provider badges on
 * /our-experts, so the two can never disagree.
 */
export interface AwardSpotlight {
  year: string
  seal: Award
  articleHref: string
  honorees: AwardHonoree[]
}

export const bestOfSavannah2026: AwardSpotlight = {
  year: '2026',
  seal: {
    src: '/images/award-best-of-savannah-2026.png',
    alt: 'Best of Savannah 2026, Savannah Magazine',
  },
  articleHref: 'https://savannahmagazine.com/best-of-doctors/the-best-of-savannah-doctors-2026/',
  honorees: [
    {
      match: 'collins',
      name: 'Harry S. Collins',
      credentials: 'DO, FACOG',
      honors: [
        { placement: 'Winner', category: 'Functional Medicine Specialist' },
        { placement: 'Winner', category: 'Hormone Specialist' },
      ],
    },
    {
      match: 'johnsen',
      name: 'Evelia Johnsen',
      credentials: 'MSN, FNP-C',
      honors: [
        { placement: 'Runner-up', category: 'Functional Medicine Specialist' },
        { placement: 'Runner-up', category: 'Hormone Specialist' },
      ],
    },
    {
      match: 'sellars',
      name: 'Emily Sellars',
      credentials: 'RN, BSN',
      honors: [{ placement: 'Runner-up', category: 'Weight-Loss Specialist' }],
    },
  ],
}

/** The honoree entry for a provider, matched by name — `undefined` if they weren't honored. */
export function findAwardHonoree(personName: string): AwardHonoree | undefined {
  const lower = personName.toLowerCase()
  return bestOfSavannah2026.honorees.find((honoree) => lower.includes(honoree.match))
}
