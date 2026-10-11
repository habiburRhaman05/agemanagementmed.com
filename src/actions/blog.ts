'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@/lib/generated/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

/* ── Validation schemas ───────────────────────────────────────────── */

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().optional().nullable(), // TipTap JSON
  contentHtml: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  categoryId: z.string().optional().nullable(),
  personId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional().default([]),
  seo: z
    .object({
      metaTitle: z.string().max(70).optional().nullable(),
      metaDesc: z.string().max(160).optional().nullable(),
      ogImage: z.string().optional().nullable(),
      canonical: z.string().optional().nullable(),
      noindex: z.boolean().default(false),
      keywords: z.string().max(255).optional().nullable(),
      h1: z.string().max(120).optional().nullable(),
      ogTitle: z.string().max(70).optional().nullable(),
      ogDescription: z.string().max(300).optional().nullable(),
      ogType: z.string().max(50).optional().nullable(),
      twitterTitle: z.string().max(70).optional().nullable(),
      twitterDescription: z.string().max(300).optional().nullable(),
      // Already a parsed object/array by the time it gets here — BlogForm
      // parses the admin's JSON-LD textarea before sending, so this just
      // needs to be a valid `Json` value for Prisma, not the raw string.
      schemaJsonLd: z.union([z.record(z.string(), z.unknown()), z.array(z.unknown())]).optional().nullable(),
    })
    .optional()
    .nullable(),
})

export type PostFormData = z.infer<typeof PostSchema>

/* ── Helpers ──────────────────────────────────────────────────────── */

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Prisma's `Json?` columns reject a plain JS `null` — it has to be the
 * `Prisma.JsonNull` sentinel to mean "clear this field" (a bare `null`
 * is ambiguous between "SQL NULL" and "the JSON value null"). `seo` comes
 * back from `PostSchema` with `schemaJsonLd` as a real `null` whenever the
 * admin's JSON-LD textarea is empty, so it needs this conversion right
 * before it reaches `prisma.post.create`/`update` — same fix already
 * applied for `PageSeo.jsonLd` in `lib/pageSeoAdmin.ts`.
 */
function seoForWrite(
  seo: NonNullable<z.infer<typeof PostSchema>['seo']> | null | undefined,
): Prisma.PostSeoCreateWithoutPostInput | undefined {
  if (!seo) return undefined
  // The explicit `Prisma.PostSeoCreateWithoutPostInput` return type above is
  // load-bearing, not decoration — spreading `seo` and overriding
  // `schemaJsonLd` inline at the call site left TypeScript checking the
  // *original* zod-inferred type (which allows a plain `null`) instead of
  // this narrower one, so the `Prisma.JsonNull` conversion silently didn't
  // count for type-checking purposes.
  return {
    ...seo,
    schemaJsonLd:
      seo.schemaJsonLd === null ? Prisma.JsonNull : (seo.schemaJsonLd as Prisma.InputJsonValue | undefined),
  }
}

/**
 * A provider's `/our-experts/[slug]` article list is DB-driven (`getPostsByPerson`),
 * but the page is still subject to the normal page cache — in production that's
 * `s-maxage=3600` (verified on the live site), not instant. Assigning a post to
 * a provider in the blog editor should show up on their page right away, not
 * within the hour, so every write that can change `personId` explicitly
 * revalidates the affected provider page(s). Takes both the old and new
 * `personId` so a reassignment (not just a fresh assignment) updates both the
 * provider who gained the post and the one who lost it.
 */
async function revalidateProviderPages(personIds: Array<string | null | undefined>) {
  const ids = [...new Set(personIds.filter((id): id is string => Boolean(id)))]
  if (!ids.length) return
  const people = await prisma.person.findMany({ where: { id: { in: ids } }, select: { slug: true } })
  for (const person of people) revalidatePath(`/our-experts/${person.slug}`)
}

function calculateReadingTime(html?: string | null): number {
  if (!html) return 0
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function generateSlugFromTitle(title: string): Promise<string> {
  let slug = generateSlug(title)
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    const count = await prisma.post.count({ where: { slug: { startsWith: slug } } })
    slug = `${slug}-${count + 1}`
  }
  return slug
}

/* ── CRUD Actions ─────────────────────────────────────────────────── */

export type ActionResult =
  | { success: true; data?: { id: string } }
  | { success: false; error: string }

export async function getPosts(params?: {
  status?: string
  search?: string
  page?: number
  pageSize?: number
}) {
  const { status, search, page = 1, pageSize = 10 } = params || {}

  const where: Record<string, unknown> = { deletedAt: null }
  if (status) where.status = status
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: where as any,
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
        tags: { include: { tag: { select: { name: true, slug: true } } } },
        seo: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where: where as any }),
  ])

  return {
    posts,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  }
}

export async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id, deletedAt: null },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { name: true } },
      tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      seo: true,
    },
  })
}

/** Neon's pooled connection can drop mid-request after sitting idle; one retry recovers most of these transient failures on the public post page. */
async function withRetry<T>(fn: () => Promise<T>, attempts = 2): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) await new Promise((resolve) => setTimeout(resolve, 150))
    }
  }
  throw lastError
}

export async function getPostBySlug(slug: string) {
  return withRetry(() =>
    prisma.post.findUnique({
      where: { slug, status: 'published', deletedAt: null },
      include: {
        category: { select: { name: true, slug: true } },
        author: { select: { name: true } },
        person: { select: { slug: true, name: true, credentials: true, role: true, portraitSrc: true, portraitAlt: true } },
        tags: { include: { tag: { select: { name: true, slug: true } } } },
        seo: true,
      },
    }),
  )
}

/**
 * Published posts credited to a provider, newest first — powers the
 * auto-updating article list on their `/our-experts/[slug]` page. No manual
 * upkeep: a post shows up here the moment it's assigned to this provider
 * (and published) in the blog editor, and drops off if unassigned.
 */
export async function getPostsByPerson(personId: string) {
  return withRetry(() =>
    prisma.post.findMany({
      where: { personId, status: 'published', deletedAt: null },
      select: { title: true, slug: true, excerpt: true, featuredImage: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    }),
  )
}

export async function createPost(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    // Parse the JSON stringified content
    let parsedData: Record<string, unknown>
    try {
      const dataStr = formData.get('data') as string
      parsedData = JSON.parse(dataStr)
    } catch {
      return { success: false, error: 'Invalid form data format' }
    }

    const parsed = PostSchema.safeParse(parsedData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      }
    }

    const { tagIds, seo, ...postData } = parsed.data

    const post = await prisma.post.create({
      data: {
        ...postData,
        readingTime: calculateReadingTime(postData.contentHtml),
        publishedAt: postData.status === 'published' ? new Date() : null,
        authorId: admin.adminId,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
        seo: seo
          ? {
              create: seoForWrite(seo),
            }
          : undefined,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    await revalidateProviderPages([postData.personId])

    return { success: true, data: { id: post.id } }
  } catch (error) {
    console.error('Create post error:', error)
    return { success: false, error: 'Failed to create post' }
  }
}

export async function updatePost(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    let parsedData: Record<string, unknown>
    try {
      const dataStr = formData.get('data') as string
      parsedData = JSON.parse(dataStr)
    } catch {
      return { success: false, error: 'Invalid form data format' }
    }

    const parsed = PostSchema.safeParse(parsedData)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      }
    }

    const { tagIds, seo, ...postData } = parsed.data

    // Needed only to know which provider page(s) to revalidate below — the
    // post may be moving from one provider to another, not just gaining one.
    const previous = await prisma.post.findUnique({ where: { id }, select: { personId: true } })

    // Delete existing tags and SEO then recreate
    await prisma.blogTag.deleteMany({ where: { postId: id } })
    if (seo) {
      await prisma.postSeo.deleteMany({ where: { postId: id } })
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...postData,
        readingTime: calculateReadingTime(postData.contentHtml),
        publishedAt:
          postData.status === 'published'
            ? new Date()
            : postData.status === 'draft'
              ? null
              : undefined,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
        seo: seo
          ? {
              create: seoForWrite(seo),
            }
          : undefined,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/blog')
    await revalidateProviderPages([previous?.personId, postData.personId])

    return { success: true, data: { id: post.id } }
  } catch (error) {
    console.error('Update post error:', error)
    return { success: false, error: 'Failed to update post' }
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    // Soft delete
    const post = await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'archived' },
      select: { personId: true },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    // Archiving drops the post off the provider's article list without
    // touching personId, so it needs the same revalidation as a reassignment.
    await revalidateProviderPages([post.personId])

    return { success: true }
  } catch (error) {
    console.error('Delete post error:', error)
    return { success: false, error: 'Failed to delete post' }
  }
}

export async function togglePostStatus(
  id: string,
  status: 'draft' | 'published' | 'archived'
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    const post = await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt: status === 'published' ? new Date() : null,
      },
      select: { personId: true },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    // A status change (e.g. published -> draft) adds or drops the post from
    // the provider's article list without touching personId.
    await revalidateProviderPages([post.personId])

    return { success: true }
  } catch (error) {
    console.error('Toggle post status error:', error)
    return { success: false, error: 'Failed to update post status' }
  }
}

/* ── Categories & Tags ────────────────────────────────────────────── */

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export async function getTags() {
  return prisma.tag.findMany({ orderBy: { name: 'asc' } })
}

export async function createCategory(name: string) {
  const slug = generateSlug(name)
  return prisma.category.create({ data: { name, slug } })
}

export async function createTag(name: string) {
  const slug = generateSlug(name)
  return prisma.tag.create({ data: { name, slug } })
}
