import { beforeEach, describe, expect, it, vi } from 'vitest'

import { site } from '@/content/site'

/**
 * Provider pages (`/our-experts/[slug]`) were added to the sitemap as part of
 * this feature. Two failure modes matter for a live site:
 *
 *   1. A published provider who is `noindex`d (or excluded from the sitemap)
 *      must NOT be listed — a sitemap and a robots meta tag that disagree is
 *      a Search Console error.
 *   2. The new entries must not disturb the existing static / treatment /
 *      post entries.
 */
const prismaMock = vi.hoisted(() => ({
  post: { findMany: vi.fn() },
  person: { findMany: vi.fn() },
  pageSeo: { findMany: vi.fn() },
}))

const getAllTreatmentsMock = vi.hoisted(() => vi.fn())

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/content/treatments/main', () => ({ getAllTreatments: getAllTreatmentsMock }))

import sitemap from '@/app/sitemap'

const now = new Date('2026-05-01T12:00:00.000Z')

beforeEach(() => {
  vi.clearAllMocks()
  getAllTreatmentsMock.mockResolvedValue([])
  prismaMock.post.findMany.mockResolvedValue([])
  prismaMock.person.findMany.mockResolvedValue([])
  prismaMock.pageSeo.findMany.mockResolvedValue([])
})

describe('sitemap provider entries', () => {
  it('lists published providers with their own metadata', async () => {
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])

    const entries = await sitemap()

    expect(entries).toContainEqual({
      url: `${site.url}/our-experts/jane-doe`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  it('queries only published providers and only the fields it needs', async () => {
    await sitemap()

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    })
  })

  it('includes one entry per published provider', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      { slug: 'jane-doe', updatedAt: now },
      { slug: 'richard-roe', updatedAt: now },
    ])

    const urls = (await sitemap()).map((entry) => entry.url)

    expect(urls).toContain(`${site.url}/our-experts/jane-doe`)
    expect(urls).toContain(`${site.url}/our-experts/richard-roe`)
  })

  it('excludes a provider whose PageSeo row is noindex', async () => {
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])
    prismaMock.pageSeo.findMany.mockResolvedValue([
      { path: '/our-experts/jane-doe', robotsMeta: 'noindex, follow', sitemapInclude: true },
    ])

    const urls = (await sitemap()).map((entry) => entry.url)

    expect(urls).not.toContain(`${site.url}/our-experts/jane-doe`)
  })

  it('matches the noindex robots meta case-insensitively', async () => {
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])
    prismaMock.pageSeo.findMany.mockResolvedValue([
      { path: '/our-experts/jane-doe', robotsMeta: 'NoIndex', sitemapInclude: true },
    ])

    expect((await sitemap()).map((e) => e.url)).not.toContain(`${site.url}/our-experts/jane-doe`)
  })

  it('excludes a provider explicitly removed from the sitemap', async () => {
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])
    prismaMock.pageSeo.findMany.mockResolvedValue([
      { path: '/our-experts/jane-doe', robotsMeta: 'index, follow', sitemapInclude: false },
    ])

    expect((await sitemap()).map((e) => e.url)).not.toContain(`${site.url}/our-experts/jane-doe`)
  })

  it('does not exclude an unrelated provider when one path is noindexed', async () => {
    prismaMock.person.findMany.mockResolvedValue([
      { slug: 'jane-doe', updatedAt: now },
      { slug: 'richard-roe', updatedAt: now },
    ])
    prismaMock.pageSeo.findMany.mockResolvedValue([
      { path: '/our-experts/jane-doe', robotsMeta: 'noindex', sitemapInclude: true },
    ])

    const urls = (await sitemap()).map((e) => e.url)

    expect(urls).not.toContain(`${site.url}/our-experts/jane-doe`)
    expect(urls).toContain(`${site.url}/our-experts/richard-roe`)
  })

  it('appends provider entries after the existing entry types', async () => {
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])

    const entries = await sitemap()

    expect(entries[entries.length - 1]?.url).toBe(`${site.url}/our-experts/jane-doe`)
  })
})

describe('sitemap regression — existing entry types still emitted', () => {
  it('still emits the static routes', async () => {
    const urls = (await sitemap()).map((e) => e.url)

    expect(urls).toContain(`${site.url}/our-experts`)
    expect(urls).toContain(`${site.url}/blog`)
    expect(urls).toContain(`${site.url}/book-appointment`)
  })

  it('still emits treatment and post entries alongside providers', async () => {
    getAllTreatmentsMock.mockResolvedValue([
      { href: '/bioidentical-hormone-replacement-therapy', name: 'BHRT' },
    ])
    prismaMock.post.findMany.mockResolvedValue([{ slug: 'a-post', updatedAt: now }])
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe', updatedAt: now }])

    const urls = (await sitemap()).map((e) => e.url)

    expect(urls).toContain(`${site.url}/bioidentical-hormone-replacement-therapy`)
    expect(urls).toContain(`${site.url}/blog/a-post`)
    expect(urls).toContain(`${site.url}/our-experts/jane-doe`)
  })

  it('still honours post/static exclusions from PageSeo', async () => {
    prismaMock.post.findMany.mockResolvedValue([{ slug: 'a-post', updatedAt: now }])
    prismaMock.pageSeo.findMany.mockResolvedValue([
      { path: '/', robotsMeta: 'noindex', sitemapInclude: true },
    ])

    const urls = (await sitemap()).map((e) => e.url)

    expect(urls).not.toContain(site.url)
    expect(urls).toContain(`${site.url}/blog/a-post`)
  })
})
