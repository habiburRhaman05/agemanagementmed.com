import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { ContentSummary, Person } from '@/types/content'

/**
 * `/our-experts/[slug]` is the new page this feature adds. It has two data
 * sources that must be merged into one article list (DB blog posts + manually
 * maintained guest editorials) and must 404 on an unknown/unpublished slug
 * rather than render an empty shell. Heavy child components are stubbed so the
 * assertions are about the page's own data flow, not their markup.
 */
const { getPersonBySlugMock, getAllPeopleMock, getPostsByPersonMock, notFoundMock } = vi.hoisted(
  () => ({
    getPersonBySlugMock: vi.fn(),
    getAllPeopleMock: vi.fn(),
    getPostsByPersonMock: vi.fn(),
    notFoundMock: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
  }),
)

vi.mock('@/lib/prisma', () => ({ prisma: {} }))
vi.mock('next/navigation', () => ({ notFound: notFoundMock }))
vi.mock('@/content/people', () => ({
  getPersonBySlug: getPersonBySlugMock,
  getAllPeople: getAllPeopleMock,
}))
vi.mock('@/actions/blog', () => ({ getPostsByPerson: getPostsByPersonMock }))
vi.mock('@/components/seo/PageSchema', () => ({ PageSchema: () => null }))
vi.mock('@/components/layout/Header', () => ({ Header: () => null }))
vi.mock('@/components/sections/ClosingCTA', () => ({ ClosingCTA: () => null }))
vi.mock('@/components/sections/HeroCompact', () => ({
  HeroCompact: ({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) => (
    <div data-testid="hero">{`${eyebrow ?? ''}|${title}|${lead ?? ''}`}</div>
  ),
}))
vi.mock('@/components/features/ContentCard', () => ({
  ContentCard: ({ item }: { item: ContentSummary }) => (
    <a
      href={item.href}
      data-external={String(Boolean(item.external))}
    >{`${item.eyebrow ?? ''}|${item.title}|${item.date ?? ''}|${item.excerpt ?? ''}|${item.image?.src ?? ''}`}</a>
  ),
}))

import ProviderPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/(marketing)/our-experts/[slug]/page'

const PERSON: Person = {
  id: 'person_1',
  slug: 'jane-doe',
  name: 'Jane Doe',
  credentials: 'MD',
  role: 'Medical Director',
  portrait: { src: 'https://res.cloudinary.com/demo/jane.jpg', alt: 'Jane Doe portrait' },
  summary: 'Hormone optimization specialist.',
  bio: ['First paragraph.', 'Second paragraph.'],
  specialties: ['Hormones', 'Weight loss'],
  socialLinks: [{ platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jane-doe' }],
}

const params = (slug: string) => Promise.resolve({ slug })

async function render(slug = PERSON.slug) {
  return renderToStaticMarkup(await ProviderPage({ params: params(slug) }))
}

beforeEach(() => {
  vi.clearAllMocks()
  getPersonBySlugMock.mockResolvedValue(PERSON)
  getAllPeopleMock.mockResolvedValue([{ slug: PERSON.slug }])
  getPostsByPersonMock.mockResolvedValue([])
})

describe('ProviderPage — profile content', () => {
  it('renders the name, credentials, role, bio paragraphs and specialties', async () => {
    const html = await render()

    expect(html).toContain('Jane Doe, MD')
    expect(html).toContain('Medical Director')
    expect(html).toContain('First paragraph.')
    expect(html).toContain('Second paragraph.')
    expect(html).toContain('Hormones')
    expect(html).toContain('Weight loss')
  })

  it('renders social links as external, non-referrer links', async () => {
    const html = await render()

    expect(html).toContain('https://www.linkedin.com/in/jane-doe')
    expect(html).toContain('rel="noopener noreferrer"')
    expect(html).toContain('target="_blank"')
  })

  it('omits credentials from the heading when the person has none', async () => {
    getPersonBySlugMock.mockResolvedValue({ ...PERSON, credentials: undefined })

    const html = await render()

    expect(html).toContain('Jane Doe')
    expect(html).not.toContain('Jane Doe,undefined')
  })
})

describe('ProviderPage — article list', () => {
  it('merges assigned blog posts and guest editorials for that person', async () => {
    getPersonBySlugMock.mockResolvedValue({
      ...PERSON,
      externalArticles: [
        { title: 'Guest Piece', url: 'https://magazine.example/piece', publication: 'Savannah Magazine' },
      ],
    })
    getPostsByPersonMock.mockResolvedValue([
      {
        title: 'Blog One',
        slug: 'blog-one',
        excerpt: 'An excerpt.',
        featuredImage: 'https://res.cloudinary.com/demo/one.jpg',
        publishedAt: new Date('2026-03-05T12:00:00.000Z'),
      },
    ])

    const html = await render()

    expect(getPostsByPersonMock).toHaveBeenCalledWith('person_1')
    expect(html).toContain('/blog/blog-one')
    expect(html).toContain('Blog One')
    expect(html).toContain('SAMM Blog')
    expect(html).toContain('An excerpt.')
    expect(html).toContain('March')
    expect(html).toContain('2026')
    expect(html).toContain('https://res.cloudinary.com/demo/one.jpg')

    expect(html).toContain('https://magazine.example/piece')
    expect(html).toContain('Guest Piece')
    expect(html).toContain('Savannah Magazine')
  })

  it('labels a guest editorial with no publication as "Guest editorial"', async () => {
    getPersonBySlugMock.mockResolvedValue({
      ...PERSON,
      externalArticles: [{ title: 'Bare Piece', url: 'https://example.com/bare' }],
    })

    const html = await render()

    expect(html).toContain('Guest editorial')
  })

  it('marks guest editorials as external and blog posts as internal', async () => {
    getPersonBySlugMock.mockResolvedValue({
      ...PERSON,
      externalArticles: [{ title: 'Guest Piece', url: 'https://magazine.example/piece' }],
    })
    getPostsByPersonMock.mockResolvedValue([
      {
        title: 'Blog One',
        slug: 'blog-one',
        excerpt: null,
        featuredImage: null,
        publishedAt: new Date('2026-03-05T12:00:00.000Z'),
      },
    ])

    const html = await render()

    expect(html).toMatch(/href="\/blog\/blog-one"[^>]*data-external="false"/)
    expect(html).toMatch(/href="https:\/\/magazine\.example\/piece"[^>]*data-external="true"/)
  })

  it('shows an empty state (not a hidden section) when there is nothing to list', async () => {
    const html = await render()

    // The section and its heading always render, so the feature reads as
    // present-but-empty rather than missing — no cards, but a real message.
    expect(html).toContain('From Jane')
    expect(html).toContain('assign Jane as the author on a blog post')
    expect(html).not.toContain('SAMM Blog')
    expect(html).not.toContain('Guest editorial')
    // The rest of the page still renders.
    expect(html).toContain('First paragraph.')
  })
})

describe('ProviderPage — unknown slug', () => {
  it('calls notFound and never queries posts', async () => {
    getPersonBySlugMock.mockResolvedValue(undefined)

    await expect(ProviderPage({ params: params('nope') })).rejects.toThrow('NEXT_NOT_FOUND')
    expect(getPostsByPersonMock).not.toHaveBeenCalled()
  })
})

describe('generateStaticParams', () => {
  it('pre-renders one entry per published provider slug', async () => {
    getAllPeopleMock.mockResolvedValue([{ slug: 'jane-doe' }, { slug: 'richard-roe' }])

    await expect(generateStaticParams()).resolves.toEqual([
      { slug: 'jane-doe' },
      { slug: 'richard-roe' },
    ])
  })
})

describe('generateMetadata', () => {
  it('builds title/canonical/og image from the person', async () => {
    const metadata = await generateMetadata({ params: params(PERSON.slug) })
    const title = (metadata.title as { absolute?: string }).absolute ?? ''

    expect(title).toContain('Jane Doe')
    expect(title).toContain('MD')
    expect(metadata.description).toBe(PERSON.summary)
    expect(JSON.stringify(metadata.alternates)).toContain('/our-experts/jane-doe')
    expect(JSON.stringify(metadata.openGraph)).toContain(PERSON.portrait.src)
  })

  it('falls back to a Not Found metadata for an unknown slug', async () => {
    getPersonBySlugMock.mockResolvedValue(undefined)

    const metadata = await generateMetadata({ params: params('nope') })

    expect((metadata.title as { absolute?: string }).absolute).toBe('Not Found')
  })
})
