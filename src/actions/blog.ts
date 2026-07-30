'use server'

import { prisma } from '@/lib/prisma'
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
  tagIds: z.array(z.string()).optional().default([]),
  seo: z
    .object({
      metaTitle: z.string().max(70).optional().nullable(),
      metaDesc: z.string().max(160).optional().nullable(),
      ogImage: z.string().optional().nullable(),
      canonical: z.string().optional().nullable(),
      noindex: z.boolean().default(false),
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
        tags: { include: { tag: { select: { name: true, slug: true } } } },
      },
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
              create: seo,
            }
          : undefined,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

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
              create: seo,
            }
          : undefined,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/blog')

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
    await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'archived' },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

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

    await prisma.post.update({
      where: { id },
      data: {
        status,
        publishedAt: status === 'published' ? new Date() : null,
      },
    })

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

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
