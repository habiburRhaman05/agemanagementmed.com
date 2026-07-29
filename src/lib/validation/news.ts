import { z } from 'zod'

// Mirrors the `NewsItem` Prisma model (prisma/schema.prisma).
export const newsFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  thumbnailUrl: z.string().min(1, 'Thumbnail image is required').url('Thumbnail must be a valid URL'),
  newsLink: z.string().min(1, 'News link is required').url('News link must be a valid URL'),
  order: z.number().int(),
  published: z.boolean(),
})

export type NewsFormValues = z.infer<typeof newsFormSchema>
