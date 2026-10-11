import { describe, expect, it, vi } from 'vitest'

import { site } from '@/content/site'
import { buildArticleSchema, buildPersonSchema } from '@/lib/seo'
import type { Person } from '@/types/content'

/**
 * `lib/seo.ts` pulls in Prisma at module scope (for the unrelated
 * `getSchemaOverride` helper), so it has to be stubbed here rather than
 * loading the generated client. Nothing in these functions touches the DB.
 */
vi.mock('@/lib/prisma', () => ({ prisma: {} }))

function makePerson(overrides: Partial<Person> = {}): Person {
  return {
    id: 'person_1',
    slug: 'jane-doe',
    name: 'Jane Doe',
    credentials: 'MD',
    role: 'Medical Director',
    portrait: { src: 'https://res.cloudinary.com/demo/jane.jpg', alt: 'Jane Doe' },
    summary: 'Hormone optimization specialist.',
    bio: ['Paragraph one.'],
    specialties: ['Bioidentical hormones', 'Weight loss'],
    ...overrides,
  }
}

describe('buildPersonSchema', () => {
  it('links to the provider\'s own /our-experts/[slug] page by default', () => {
    const schema = buildPersonSchema(makePerson())

    expect(schema['@type']).toBe('Person')
    expect(schema.name).toBe('Jane Doe')
    expect(schema.jobTitle).toBe('Medical Director')
    expect(schema.description).toBe('Hormone optimization specialist.')
    expect(schema.image).toBe('https://res.cloudinary.com/demo/jane.jpg')
    expect(schema.url).toBe(`${site.url}/our-experts/jane-doe`)
  })

  it('honours an explicit url override', () => {
    const schema = buildPersonSchema(makePerson(), 'https://example.com/override')

    expect(schema.url).toBe('https://example.com/override')
  })

  it('maps credentials and specialties onto the schema fields', () => {
    const schema = buildPersonSchema(makePerson())

    expect(schema.honorificSuffix).toBe('MD')
    expect(schema.knowsAbout).toEqual(['Bioidentical hormones', 'Weight loss'])
  })

  it('omits honorificSuffix when there are no credentials', () => {
    const schema = buildPersonSchema(makePerson({ credentials: undefined }))

    expect(schema.honorificSuffix).toBeUndefined()
  })

  it('omits knowsAbout when specialties are absent or empty', () => {
    expect(buildPersonSchema(makePerson({ specialties: undefined })).knowsAbout).toBeUndefined()
    expect(buildPersonSchema(makePerson({ specialties: [] })).knowsAbout).toBeUndefined()
  })

  it('lists social link URLs under sameAs so the profile can be disambiguated', () => {
    const schema = buildPersonSchema(
      makePerson({
        socialLinks: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' },
          { platform: 'Instagram', url: 'https://instagram.com/drjane' },
        ],
      }),
    )

    expect(schema.sameAs).toEqual([
      'https://www.linkedin.com/in/jane-doe',
      'https://instagram.com/drjane',
    ])
  })

  it('omits sameAs entirely when there are no social links', () => {
    // Undefined (never edited) and empty (edited, all rows removed) must both
    // produce no `sameAs` key rather than an empty array, which Google treats
    // as a malformed value.
    expect(buildPersonSchema(makePerson()).sameAs).toBeUndefined()
    expect(buildPersonSchema(makePerson({ socialLinks: [] })).sameAs).toBeUndefined()
  })

  it('always links the provider back to the practice via worksFor', () => {
    const schema = buildPersonSchema(makePerson())

    expect(schema.worksFor).toEqual({
      '@type': 'MedicalClinic',
      name: site.name,
      url: site.url,
    })
  })

  it('tolerates a missing full name gracefully (no throw, name passed through)', () => {
    expect(() => buildPersonSchema(makePerson({ name: '' }))).not.toThrow()
  })
})

describe('buildArticleSchema author resolution', () => {
  const base = { title: 'Article', href: '/blog/article' }

  it('credits a Person when an author name is supplied', () => {
    const schema = buildArticleSchema({ ...base, authorName: 'Jane Doe' })

    expect(schema.author).toEqual({ '@type': 'Person', name: 'Jane Doe' })
  })

  it('falls back to the Organization when there is no author name', () => {
    expect(buildArticleSchema(base).author).toEqual({ '@type': 'Organization', name: site.name })
    expect(buildArticleSchema({ ...base, authorName: null }).author).toEqual({
      '@type': 'Organization',
      name: site.name,
    })
    expect(buildArticleSchema({ ...base, authorName: '' }).author).toEqual({
      '@type': 'Organization',
      name: site.name,
    })
  })

  it('resolves the article url against the site root', () => {
    expect(buildArticleSchema(base).url).toBe(`${site.url}/blog/article`)
  })
})
