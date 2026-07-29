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
  }),
})

export type BlogFormValues = z.infer<typeof blogFormSchema>
