import { z } from 'zod'

// Mirrors the `Post` / `PostSeo` Prisma models (prisma/schema.prisma).
// Required: title, slug, content — everything else on Post is nullable in
// the schema, so it stays optional here too.
export const blogFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or fewer'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  content: z.string().min(1, 'Content is required'),
  contentHtml: z.string().optional(),
  excerpt: z.string().max(500, 'Excerpt must be 500 characters or fewer').optional(),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()),
  seo: z.object({
    metaTitle: z.string().max(70, 'Meta title must be 70 characters or fewer').optional(),
    metaDesc: z.string().max(160, 'Meta description must be 160 characters or fewer').optional(),
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean(),
    keywords: z.string().max(255, 'Meta keywords must be 255 characters or fewer').optional(),
    h1: z.string().max(120, 'H1 must be 120 characters or fewer').optional(),
    ogTitle: z.string().max(70, 'OG title must be 70 characters or fewer').optional(),
    ogDescription: z.string().max(300, 'OG description must be 300 characters or fewer').optional(),
    ogType: z.string().max(50).optional(),
    twitterTitle: z.string().max(70, 'Twitter title must be 70 characters or fewer').optional(),
    twitterDescription: z
      .string()
      .max(300, 'Twitter description must be 300 characters or fewer')
      .optional(),
  }),
})

export type BlogFormValues = z.infer<typeof blogFormSchema>
