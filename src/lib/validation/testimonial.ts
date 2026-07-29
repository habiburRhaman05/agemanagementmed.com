import { z } from 'zod'

// Mirrors the `Testimonial` Prisma model (prisma/schema.prisma). Required:
// name, quote. Everything else on the model is optional/has a DB default,
// so it stays optional here too.
export const testimonialFormSchema = z.object({
  name: z.string().min(1, 'Patient name is required'),
  roleLabel: z.string().optional(),
  treatment: z.string().optional(),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().int().min(1).max(5),
  photoUrl: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  order: z.number().int(),
})

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>
