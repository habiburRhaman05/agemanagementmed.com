import { z } from 'zod'

// Mirrors the `Person` Prisma model (prisma/schema.prisma), which mirrors
// the `Person` content type (src/types/content.ts).
export const personFormSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  name: z.string().min(1, 'Name is required'),
  credentials: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  portraitSrc: z.string().min(1, 'Portrait image is required'),
  portraitAlt: z.string().min(1, 'Portrait alt text is required'),
  summary: z.string().min(1, 'Summary is required'),
  bio: z.string().min(1, 'At least one bio paragraph is required'), // textarea, one paragraph per line
  specialties: z.string().optional(), // comma-separated
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  order: z.number().int(),
})

export type PersonFormValues = z.infer<typeof personFormSchema>
