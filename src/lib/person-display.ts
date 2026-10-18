import type { Person } from '@/types/content'

/** Use descriptive headshot text for the two profiles flagged in the content review. */
export function getPersonPortraitAlt(person: Person): string {
  const normalizedName = person.name.toLowerCase()
  const isFlaggedProfile =
    person.slug === 'sarah-mankin' ||
    normalizedName === 'sarah mankin' ||
    person.slug === 'brittany-moore' ||
    normalizedName === 'brittany moore'

  if (!isFlaggedProfile) return person.portrait.alt || person.name

  const title = [person.credentials, person.role].filter(Boolean).join(', ')
  return title ? `${person.name}, ${title}` : person.name
}
