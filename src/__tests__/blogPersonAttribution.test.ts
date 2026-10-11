import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * The blog editor now credits a post to a provider (`Post.personId`), and the
 * provider's `/our-experts/[slug]` page lists those posts from the DB. Because
 * that page is cached (s-maxage=3600 in production), every write that can
 * change the *set* of posts on a provider page must explicitly revalidate it —
 * that's the behaviour these tests lock down:
 *
 *   - `revalidateProviderPages` batches the old + new provider into one lookup
 *     (so a reassignment refreshes both), de-dupes, and no-ops on no provider.
 *   - Every mutation that changes the list (create / update / delete /
 *     status toggle) calls it; assignment is not the only trigger — archiving
 *     or unpublishing drops a post from the list too.
 *   - None of it runs when the caller isn't authenticated, and a validation
 *     failure never reaches the DB or the revalidation.
 */
const { prismaMock, revalidatePathMock, revalidateTagMock, getCurrentAdminMock } = vi.hoisted(() => ({
  prismaMock: {
    post: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
    },
    person: { findMany: vi.fn() },
    blogTag: { deleteMany: vi.fn() },
    postSeo: { deleteMany: vi.fn() },
  },
  revalidatePathMock: vi.fn(),
  revalidateTagMock: vi.fn(),
  getCurrentAdminMock: vi.fn(),
}))

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
vi.mock('@/lib/auth', () => ({ getCurrentAdmin: getCurrentAdminMock }))
vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
  revalidateTag: revalidateTagMock,
}))
vi.mock('@/lib/generated/prisma', () => ({ Prisma: { JsonNull: 'PRISMA_JSON_NULL' } }))

import {
  createPost,
  deletePost,
  getPostsByPerson,
  togglePostStatus,
  updatePost,
} from '@/actions/blog'

const ADMIN = { adminId: 'admin_1', email: 'admin@example.com', name: 'Admin', role: 'admin' }

/** Builds the `FormData` the blog form posts — one JSON string under `data`. */
function formData(payload: Record<string, unknown>): FormData {
  const fd = new FormData()
  fd.append('data', JSON.stringify(payload))
  return fd
}

function validPostPayload(overrides: Record<string, unknown> = {}) {
  return {
    title: 'A Post',
    slug: 'a-post',
    content: '{}',
    status: 'published',
    tagIds: [],
    seo: { noindex: false },
    ...overrides,
  }
}

beforeEach(() => {
  vi.clearAllMocks()
  getCurrentAdminMock.mockResolvedValue(ADMIN)
})

describe('getPostsByPerson', () => {
  it('selects only published, non-deleted posts for the provider, newest first', async () => {
    prismaMock.post.findMany.mockResolvedValue([])

    await getPostsByPerson('person_1')

    expect(prismaMock.post.findMany).toHaveBeenCalledWith({
      where: { personId: 'person_1', status: 'published', deletedAt: null },
      select: { title: true, slug: true, excerpt: true, featuredImage: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    })
  })

  it('resolves the list it gets back', async () => {
    prismaMock.post.findMany.mockResolvedValue([
      { title: 'Live', slug: 'live', excerpt: null, featuredImage: null, publishedAt: new Date() },
    ])

    await expect(getPostsByPerson('person_1')).resolves.toHaveLength(1)
  })
})

describe('createPost provider revalidation', () => {
  it('revalidates the assigned provider page right away', async () => {
    prismaMock.post.create.mockResolvedValue({ id: 'post_1' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    const result = await createPost(null, formData(validPostPayload({ personId: 'person_1' })))

    expect(result).toEqual({ success: true, data: { id: 'post_1' } })
    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['person_1'] } },
      select: { slug: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/jane-doe')
  })

  it('does nothing provider-related when no provider is assigned', async () => {
    prismaMock.post.create.mockResolvedValue({ id: 'post_1' })

    await createPost(null, formData(validPostPayload()))

    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
    expect(revalidatePathMock).not.toHaveBeenCalledWith(expect.stringContaining('/our-experts/'))
    expect(revalidatePathMock).toHaveBeenCalledWith('/admin/blog')
    expect(revalidatePathMock).toHaveBeenCalledWith('/blog')
  })

  it('treats an explicit null provider the same as an omitted one', async () => {
    prismaMock.post.create.mockResolvedValue({ id: 'post_1' })

    await createPost(null, formData(validPostPayload({ personId: null })))

    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
  })
})

describe('updatePost provider revalidation', () => {
  it('revalidates both the old and the new provider when a post is reassigned', async () => {
    prismaMock.post.findUnique.mockResolvedValue({ personId: 'person_old' })
    prismaMock.post.update.mockResolvedValue({ id: 'post_1', slug: 'a-post' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'old-doc' }, { slug: 'new-doc' }])

    await updatePost('post_1', null, formData(validPostPayload({ personId: 'person_new' })))

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['person_old', 'person_new'] } },
      select: { slug: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/old-doc')
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/new-doc')
  })

  it('de-dupes when the provider did not change', async () => {
    prismaMock.post.findUnique.mockResolvedValue({ personId: 'person_1' })
    prismaMock.post.update.mockResolvedValue({ id: 'post_1', slug: 'a-post' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    await updatePost('post_1', null, formData(validPostPayload({ personId: 'person_1' })))

    expect(prismaMock.person.findMany).toHaveBeenCalledTimes(1)
    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['person_1'] } },
      select: { slug: true },
    })
  })

  it('revalidates the provider that loses the post when it is unassigned', async () => {
    prismaMock.post.findUnique.mockResolvedValue({ personId: 'person_old' })
    prismaMock.post.update.mockResolvedValue({ id: 'post_1', slug: 'a-post' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'old-doc' }])

    await updatePost('post_1', null, formData(validPostPayload({ personId: null })))

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['person_old'] } },
      select: { slug: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/old-doc')
  })

  it('revalidates the provider that gains the post when assigning for the first time', async () => {
    prismaMock.post.findUnique.mockResolvedValue({ personId: null })
    prismaMock.post.update.mockResolvedValue({ id: 'post_1', slug: 'a-post' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'new-doc' }])

    await updatePost('post_1', null, formData(validPostPayload({ personId: 'person_new' })))

    expect(prismaMock.person.findMany).toHaveBeenCalledWith({
      where: { id: { in: ['person_new'] } },
      select: { slug: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/new-doc')
  })

  it('revalidates the post\'s own URL alongside the provider page', async () => {
    prismaMock.post.findUnique.mockResolvedValue({ personId: 'person_1' })
    prismaMock.post.update.mockResolvedValue({ id: 'post_1', slug: 'a-post' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    await updatePost('post_1', null, formData(validPostPayload({ personId: 'person_1' })))

    expect(revalidatePathMock).toHaveBeenCalledWith('/blog/a-post')
  })
})

describe('deletePost provider revalidation', () => {
  it('revalidates the provider page because archiving drops the post from the list', async () => {
    prismaMock.post.update.mockResolvedValue({ personId: 'person_1' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    const result = await deletePost('post_1')

    expect(result).toEqual({ success: true })
    expect(prismaMock.post.update).toHaveBeenCalledWith({
      where: { id: 'post_1' },
      data: { deletedAt: expect.any(Date), status: 'archived' },
      select: { personId: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/jane-doe')
  })

  it('skips the provider lookup for a post with no provider', async () => {
    prismaMock.post.update.mockResolvedValue({ personId: null })

    await deletePost('post_1')

    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
  })
})

describe('togglePostStatus provider revalidation', () => {
  it('revalidates the provider page when a post is taken down', async () => {
    prismaMock.post.update.mockResolvedValue({ personId: 'person_1' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    await togglePostStatus('post_1', 'draft')

    expect(prismaMock.post.update).toHaveBeenCalledWith({
      where: { id: 'post_1' },
      data: { status: 'draft', publishedAt: null },
      select: { personId: true },
    })
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/jane-doe')
  })

  it('revalidates the provider page when a post goes live', async () => {
    prismaMock.post.update.mockResolvedValue({ personId: 'person_1' })
    prismaMock.person.findMany.mockResolvedValue([{ slug: 'jane-doe' }])

    await togglePostStatus('post_1', 'published')

    const data = prismaMock.post.update.mock.calls[0][0].data
    expect(data.status).toBe('published')
    expect(data.publishedAt).toBeInstanceOf(Date)
    expect(revalidatePathMock).toHaveBeenCalledWith('/our-experts/jane-doe')
  })

  it('does not touch provider pages for an unassigned post', async () => {
    prismaMock.post.update.mockResolvedValue({ personId: null })

    await togglePostStatus('post_1', 'archived')

    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
    expect(revalidatePathMock).not.toHaveBeenCalledWith(expect.stringContaining('/our-experts/'))
  })
})

describe('guards', () => {
  it('refuses every write when there is no session, without revalidating anything', async () => {
    getCurrentAdminMock.mockResolvedValue(null)

    await expect(createPost(null, formData(validPostPayload()))).resolves.toEqual({
      success: false,
      error: 'Not authenticated',
    })
    await expect(updatePost('post_1', null, formData(validPostPayload()))).resolves.toEqual({
      success: false,
      error: 'Not authenticated',
    })
    await expect(deletePost('post_1')).resolves.toEqual({
      success: false,
      error: 'Not authenticated',
    })
    await expect(togglePostStatus('post_1', 'published')).resolves.toEqual({
      success: false,
      error: 'Not authenticated',
    })

    expect(prismaMock.post.create).not.toHaveBeenCalled()
    expect(prismaMock.post.update).not.toHaveBeenCalled()
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })

  it('rejects malformed form data before touching the database', async () => {
    const fd = new FormData()
    fd.append('data', 'not-json')

    await expect(createPost(null, fd)).resolves.toEqual({
      success: false,
      error: 'Invalid form data format',
    })
    expect(prismaMock.person.findMany).not.toHaveBeenCalled()
    expect(revalidatePathMock).not.toHaveBeenCalled()
  })

  it('returns validation errors instead of writing an invalid post', async () => {
    const result = await createPost(
      null,
      formData({ title: '', slug: 'no-title', status: 'draft', tagIds: [] }),
    )

    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toContain('Title is required')
    expect(prismaMock.post.create).not.toHaveBeenCalled()
  })
})
