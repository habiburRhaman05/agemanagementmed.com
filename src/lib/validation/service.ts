import { z } from 'zod'

export const serviceFormSchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  href: z.string().min(1, 'Href is required'),
  shortName: z.string().min(1, 'Short name is required'),
  summary: z.string().min(1, 'Summary is required'),
  cardImageSrc: z.string().min(1, 'Image URL is required'),
  cardImageAlt: z.string().min(1, 'Image alt text is required'),
  cardBenefits: z.array(z.string().min(1)).min(1, 'At least one benefit is required'),
  order: z.number().int(),
  status: z.enum(['draft', 'published']),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
