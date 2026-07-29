import { z } from 'zod'

// `Treatment.data` is a freeform `Json` column in prisma/schema.prisma — the
// Prisma model itself doesn't constrain which keys are required, so
// "required" here follows the admin form's own long-standing HTML
// `required` markers (name/summary/hero/closingCta) plus the task brief's
// explicit example (name, slug, summary). Shared by both TreatmentForm
// (edit) and NewTreatmentForm (create) so the two never drift apart.
export const treatmentCoreSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortName: z.string().optional(),
  summary: z.string().min(1, 'Summary is required'),
  cardImageSrc: z.string().min(1, 'Card image URL is required'),
  cardImageAlt: z.string().optional(),
  cardBenefits: z.string().optional(),
  heroEyebrow: z.string().optional(),
  heroTitle: z.string().min(1, 'Hero title is required'),
  heroLead: z.string().min(1, 'Hero lead is required'),
  heroImageSrc: z.string().min(1, 'Hero image URL is required'),
  heroImageAlt: z.string().optional(),
  closingTitle: z.string().optional(),
  closingBody: z.string().min(1, 'Closing CTA body is required'),
  closingCtaLabel: z.string().min(1, 'Button label is required'),
  closingCtaHref: z.string().min(1, 'Button link is required'),
  seoTitle: z.string().max(70, 'Meta title must be 70 characters or fewer').optional(),
  seoDescription: z.string().max(300, 'Meta description must be 300 characters or fewer').optional(),
})

export type TreatmentCoreValues = z.infer<typeof treatmentCoreSchema>

export const editTreatmentSchema = treatmentCoreSchema.extend({
  seoCanonical: z.string().optional(),
})

export type EditTreatmentValues = z.infer<typeof editTreatmentSchema>

export const newTreatmentSchema = treatmentCoreSchema.extend({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  href: z.string().min(1, 'Route is required').regex(/^\//, 'Route must start with /'),
})

export type NewTreatmentValues = z.infer<typeof newTreatmentSchema>
