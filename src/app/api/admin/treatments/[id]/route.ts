import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * `data` is a *shallow merge* into the existing JSON blob — submitting
 * `{ data: { hero: {...} } }` updates only `hero`, leaving `sections`,
 * `faqs`, etc. untouched. This is what lets the admin UI's "Layer 1"
 * structured forms (hero, pricing, faqs, closingCta...) and "Layer 2" raw
 * JSON editor (`sections`) coexist without one overwriting the other's
 * unrelated fields. Loosely typed on purpose — see route.ts's comment on
 * why `data` isn't a strict Zod schema.
 */
const UpdateTreatmentSchema = z.object({
  pillar: z
    .enum(['hormone-therapy', 'weight-loss', 'sexual-wellness', 'hair-restoration', 'aesthetics'])
    .optional(),
  audience: z.enum(['men', 'women', 'all']).optional().nullable(),
  kind: z.enum(['hub', 'variant', 'modality']).optional(),
  status: z.enum(['draft', 'published']).optional(),
  order: z.number().int().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      canonical: z.string().optional(),
      keywords: z.string().optional().nullable(),
      ogImageUrl: z.string().optional().nullable(),
      noindex: z.boolean().optional(),
      schemaJsonLd: z.string().optional().nullable(),
    })
    .optional(),
})

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const row = await prisma.treatment.findUnique({ where: { id } })
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const seo = await prisma.pageSeo.findUnique({ where: { path: row.href } })
  return NextResponse.json({ treatment: row, seo })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.treatment.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = UpdateTreatmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const { data, seo, ...columns } = parsed.data
  // Normalize `existing.data` to a plain object before merging — a legacy row
  // can hold a JSON *string* (or a string-spread object), which would corrupt
  // the stored blob if spread raw here.
  let existingData: object = {}
  if (existing.data && typeof existing.data === 'object' && !Array.isArray(existing.data)) {
    existingData = existing.data as object
  } else if (typeof existing.data === 'string') {
    try {
      existingData = JSON.parse(existing.data) as object
    } catch {
      existingData = {}
    }
  }
  const mergedData = data ? JSON.parse(JSON.stringify({ ...existingData, ...data })) : undefined

  const row = await prisma.treatment.update({
    where: { id },
    data: {
      ...columns,
      ...(mergedData ? { data: mergedData } : {}),
    },
  })

  if (seo) {
    await prisma.pageSeo.upsert({
      where: { path: row.href },
      update: seo,
      create: {
        path: row.href,
        title: seo.title ?? row.href,
        description: seo.description ?? '',
        canonical: seo.canonical ?? row.href,
        keywords: seo.keywords,
        ogImageUrl: seo.ogImageUrl,
        noindex: seo.noindex ?? false,
        schemaJsonLd: seo.schemaJsonLd,
      },
    })
  }

  // Both the list-level tag and this row's specific tags, since related/hub
  // grids elsewhere on the site also read this treatment.
  revalidateTag('treatments', 'max')
  revalidateTag(`treatment:${row.slug}`, 'max')
  revalidateTag(`treatment-href:${row.href}`, 'max')
  revalidatePath(row.href)

  return NextResponse.json({ treatment: row })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { id } = await params
  const existing = await prisma.treatment.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Soft delete via status, matching the Post model's pattern - never a hard
  // delete from the admin UI, so nothing is silently destroyed.
  const row = await prisma.treatment.update({ where: { id }, data: { status: 'draft' } })

  revalidateTag('treatments', 'max')
  revalidateTag(`treatment:${row.slug}`, 'max')
  revalidatePath(row.href)

  return NextResponse.json({ treatment: row })
}
