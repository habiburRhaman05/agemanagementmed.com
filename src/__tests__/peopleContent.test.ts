import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getAllPeople, getFeaturedPeople, getPeopleBySlugs, getPersonBySlug } from '@/content/people'

/**
 * `src/content/people/index.ts` sits between Prisma rows and the `Person`
 * content type. The new `id`, `socialLinks` and `externalArticles` fields are
 * all optional JSON columns, so the mapping's real job is normalising missing
 * / null data into `undefined` without dropping a field. Every consumer
 * (`PeopleGrid`, provider page, treatments) expects the same shape regardless
 * of how sparse the row is.
 *
 * `cache` (react) and `unstable_cache` (next/cache) are identity-mocked so the
 * mapping and the queries themselves are what's under test, not caching.
 */
const prismaMock = vi.hoisted(() => ({
  person: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('next/cache', () => ({
  unstable_cache: (fn: unknown) => fn,
  revalidateTag: vi.fn(),
}))
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return { ...actual, cache: (fn: unknown) => fn }
})

function row(overrides: Record<string, unknown> = {}) {
  return {
    id: 'person_1',
    slug: 'jane-doe',
    name: 'Jane Doe',
    credentials: 'MD',
    role: 'Medical Director',
    portraitSrc: 'https://res.cloudinary.com/demo/jane.jpg',
    portraitAlt: 'Jane Doe',
    summary: 'Summary text.',
    bio: ['First paragraph.', 'Second paragraph.'],
    specialties: ['Hormones'],
    socialLinks: null,
    externalArticles: null,
    ...overrides,
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getAllPeople', () => {
  it('queries only published people, ordered for display', async () => {
    prismaMock.person.findMany.mockResolvedValue([])

    await getAllPeople()

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    })
  })

  it('maps a fully-populated row including id, social links and guest editorials', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      row({
        socialLinks: [{ platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' }],
        externalArticles: [
          { title: 'Feature', url: 'https://magazine.example/feature', publication: 'Savannah Magazine' },
        ],
      }),
    ])

    const [person] = await getAllPeople()

    expect(person.id).toBe('person_1')
    expect(person.slug).toBe('jane-doe')
    expect(person.credentials).toBe('MD')
    expect(person.portrait).toEqual({
      src: 'https://res.cloudinary.com/demo/jane.jpg',
      alt: 'Jane Doe',
    })
    expect(person.bio).toEqual(['First paragraph.', 'Second paragraph.'])
    expect(person.specialties).toEqual(['Hormones'])
    expect(person.socialLinks).toEqual([
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' },
    ])
    expect(person.externalArticles).toEqual([
      { title: 'Feature', url: 'https://magazine.example/feature', publication: 'Savannah Magazine' },
    ])
  })

  it('normalises null columns to undefined, not null', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      row({ credentials: null, specialties: null, socialLinks: null, externalArticles: null }),
    ])

    const [person] = await getAllPeople()

    // The `Person` content type declares these as `?`, so a literal null would
    // leak into consumers that only check for undefined.
    expect(person.socialLinks).toBeUndefined()
    expect(person.externalArticles).toBeUndefined()
    expect(person.credentials).toBeUndefined()
    expect(person.specialties).toBeUndefined()
  })

  it('falls back to an empty bio array when the JSON column is null', async () => {
    prismaMock.person.findMany.mockResolvedValue([row({ bio: null })])

    const [person] = await getAllPeople()

    expect(person.bio).toEqual([])
  })

  it('preserves empty arrays that an admin deliberately cleared', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      row({ socialLinks: [], externalArticles: [], specialties: [] }),
    ])

    const [person] = await getAllPeople()

    expect(person.socialLinks).toEqual([])
    expect(person.externalArticles).toEqual([])
    expect(person.specialties).toEqual([])
  })

  it('returns an empty list when no one is published', async () => {
    prismaMock.person.findMany.mockResolvedValue([])

    await expect(getAllPeople()).resolves.toEqual([])
  })
})

describe('getFeaturedPeople', () => {
  it('queries only published + featured people', async () => {
    prismaMock.person.findMany.mockResolvedValue([])

    await getFeaturedPeople()

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { status: 'published', featured: true },
      orderBy: { order: 'asc' },
    })
  })
})

describe('getPersonBySlug', () => {
  it('scopes the lookup to published people', async () => {
    prismaMock.person.findUnique.mockResolvedValue(null)

    await getPersonBySlug('jane-doe')

    expect(prismaMock.person.findUnique).toHaveBeenCalledWith({
      where: { slug: 'jane-doe', status: 'published' },
    })
  })

  it('maps a found row and returns undefined for a miss', async () => {
    prismaMock.person.findUnique.mockResolvedValueOnce(row())
    const person = await getPersonBySlug('jane-doe')
    expect(person?.id).toBe('person_1')
    expect(person?.slug).toBe('jane-doe')

    prismaMock.person.findUnique.mockResolvedValueOnce(null)
    await expect(getPersonBySlug('does-not-exist')).resolves.toBeUndefined()
  })
})

describe('getPeopleBySlugs', () => {
  it('returns an empty list without touching the database for an empty input', async () => {
    await expect(getPeopleBySlugs([])).resolves.toEqual([])
    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
  })

  it('preserves the requested slug order, not the database order', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      row({ id: 'b', slug: 'second' }),
      row({ id: 'a', slug: 'first' }),
    ])

    const people = await getPeopleBySlugs(['first', 'second'])

    expect(people.map((p) => p.slug)).toEqual(['first', 'second'])
  })

  it('drops slugs that have no matching published person', async () => {
    prismaMock.person.findMany.mockResolvedValue([row({ slug: 'first' })])

    const people = await getPeopleBySlugs(['first', 'missing'])

    expect(people.map((p) => p.slug)).toEqual(['first'])
  })

  it('scopes the batch lookup to published people', async () => {
    prismaMock.person.findMany.mockResolvedValue([])

    await getPeopleBySlugs(['a', 'b'])

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { slug: { in: ['a', 'b'] }, status: 'published' },
    })
  })
})
