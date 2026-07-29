'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/* ── Validation schema ────────────────────────────────────────────── */

const PersonSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated')
    .optional(),
  name: z.string().min(1, 'Name is required'),
  credentials: z.string().optional().nullable(),
  role: z.string().min(1, 'Role is required'),
  portraitSrc: z.string().min(1, 'Portrait image is required'),
  portraitAlt: z.string().min(1, 'Portrait alt text is required'),
  summary: z.string().min(1, 'Summary is required'),
  bio: z.array(z.string()).min(1, 'At least one bio paragraph is required'),
  specialties: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(['draft', 'published']).default('published'),
  order: z.number().int().default(0),
})

export type PersonData = z.infer<typeof PersonSchema>

/* ── Helpers ──────────────────────────────────────────────────────── */

export type ActionResult =
  | { success: true; data?: { id: string } }
  | { success: false; error: string }

function revalidatePeople() {
  revalidateTag('people', 'max')
  revalidatePath('/admin/people')
  revalidatePath('/our-experts')
  revalidatePath('/')
}

/* ── Reads ────────────────────────────────────────────────────────── */

export async function getPeople() {
  return prisma.person.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  })
}

export async function getPersonById(id: string) {
  return prisma.person.findUnique({ where: { id } })
}

/* ── CRUD Actions ─────────────────────────────────────────────────── */

export async function createPerson(
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    let parsedData: Record<string, unknown>
    try {
      parsedData = JSON.parse(formData.get('data') as string)
    } catch {
      return { success: false, error: 'Invalid form data format' }
    }

    const parsed = PersonSchema.safeParse(parsedData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues.map((e) => e.message).join(', ') }
    }
    if (!parsed.data.slug) {
      return { success: false, error: 'Slug is required' }
    }

    const existing = await prisma.person.findUnique({ where: { slug: parsed.data.slug } })
    if (existing) {
      return { success: false, error: 'A team member with this slug already exists' }
    }

    const person = await prisma.person.create({
      data: { ...parsed.data, slug: parsed.data.slug },
    })

    revalidatePeople()

    return { success: true, data: { id: person.id } }
  } catch (error) {
    console.error('Create person error:', error)
    return { success: false, error: 'Failed to create team member' }
  }
}

export async function updatePerson(
  id: string,
  prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    let parsedData: Record<string, unknown>
    try {
      parsedData = JSON.parse(formData.get('data') as string)
    } catch {
      return { success: false, error: 'Invalid form data format' }
    }

    const parsed = PersonSchema.omit({ slug: true }).safeParse(parsedData)
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues.map((e) => e.message).join(', ') }
    }

    const person = await prisma.person.update({ where: { id }, data: parsed.data })

    revalidatePeople()

    return { success: true, data: { id: person.id } }
  } catch (error) {
    console.error('Update person error:', error)
    return { success: false, error: 'Failed to update team member' }
  }
}

export async function deletePerson(id: string): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    await prisma.person.delete({ where: { id } })

    revalidatePeople()

    return { success: true }
  } catch (error) {
    console.error('Delete person error:', error)
    return { success: false, error: 'Failed to delete team member' }
  }
}

export async function togglePersonStatus(
  id: string,
  status: 'draft' | 'published',
): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    await prisma.person.update({ where: { id }, data: { status } })

    revalidatePeople()

    return { success: true }
  } catch (error) {
    console.error('Toggle person status error:', error)
    return { success: false, error: 'Failed to update status' }
  }
}

export async function togglePersonFeatured(id: string, featured: boolean): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) return { success: false, error: 'Not authenticated' }

    await prisma.person.update({ where: { id }, data: { featured } })

    revalidatePeople()

    return { success: true }
  } catch (error) {
    console.error('Toggle person featured error:', error)
    return { success: false, error: 'Failed to update' }
  }
}
