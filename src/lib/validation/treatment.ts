import { z } from 'zod'

// `Treatment.data` is a freeform `Json` column in prisma/schema.prisma — the
// Prisma model itself doesn't constrain which keys are required, so
// "required" here follows the admin form's own long-standing HTML
// `required` markers (name/summary/hero/closingCta) plus the task brief's
// explicit example (name, slug, summary). Shared by both TreatmentForm
// (edit) and NewTreatmentForm (create) so the two never drift apart.
export const treatmentCoreSchema = z.object({
  name: z.string().optional(),
  shortName: z.string().optional(),
  summary: z.string().optional(),
  cardImageSrc: z.string().optional(),
  cardImageAlt: z.string().optional(),
  cardBenefits: z.string().optional(),
  heroEyebrow: z.string().optional(),
  // Only *required* when creating a treatment (see `newTreatmentSchema`),
  // where it seeds the treatment's name. The edit form no longer exposes it
  // at all — the H1 override is the single editable heading — and keeping it
  // required here made pages with an empty stored hero title (e.g.
  // /prp-offer) impossible to save from the admin at all.
  heroTitle: z.string().optional(),
  // A single lead paragraph is entered here; when the admin switches to
  // "multiple paragraphs" mode the lead text instead comes from the form's
  // own `leadItems` array state (see TreatmentForm/NewTreatmentForm) — so
  // this can't stay a hard `min(1)` requirement. Each form enforces "at
  // least one non-empty paragraph across whichever mode is active" itself.
  heroLead: z.string().optional(),
  heroImageSrc: z.string().min(1, 'Hero image URL is required'),
  heroImageAlt: z.string().optional(),
  closingTitle: z.string().optional(),
  closingBody: z.string().optional(),
  closingCtaLabel: z.string().optional(),
  closingCtaHref: z.string().optional(),
  seoTitle: z.string().max(70, 'Meta title must be 70 characters or fewer').optional(),
  seoDescription: z.string().max(300, 'Meta description must be 300 characters or fewer').optional(),
  seoKeywords: z.string().max(255, 'Meta keywords must be 255 characters or fewer').optional(),
  seoOgImageSrc: z.string().optional(),
  // PageSeo has carried these since it was extended for source-site SEO
  // parity, but no admin form ever rendered inputs for them — the fields
  // existed in the schema and the DB, with no way to actually set them.
  seoH1: z.string().max(120, 'H1 must be 120 characters or fewer').optional(),
  seoOgTitle: z.string().max(70, 'OG title must be 70 characters or fewer').optional(),
  seoOgDescription: z.string().max(300, 'OG description must be 300 characters or fewer').optional(),
  seoOgType: z.string().max(50).optional(),
  seoTwitterTitle: z.string().max(70, 'Twitter title must be 70 characters or fewer').optional(),
  seoTwitterDescription: z
    .string()
    .max(300, 'Twitter description must be 300 characters or fewer')
    .optional(),
})

export type TreatmentCoreValues = z.infer<typeof treatmentCoreSchema>

export const editTreatmentSchema = treatmentCoreSchema.extend({
  seoCanonical: z.string().optional(),
})

export type EditTreatmentValues = z.infer<typeof editTreatmentSchema>

export const newTreatmentSchema = treatmentCoreSchema.extend({
  // Required only here — the create form uses it to seed the new treatment's
  // name, shortName, hero title and SEO title.
  heroTitle: z.string().min(1, 'Hero title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  href: z.string().min(1, 'Route is required').regex(/^\//, 'Route must start with /'),
})

export type NewTreatmentValues = z.infer<typeof newTreatmentSchema>
