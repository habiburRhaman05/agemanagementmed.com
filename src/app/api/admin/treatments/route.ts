import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const HeroSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  lead: z.string().min(1),
  image: z.object({ src: z.string(), alt: z.string() }).passthrough(),
  ctas: z.array(z.object({ label: z.string(), href: z.string() }).passthrough()).default([]),
})

/**
 * `data` covers everything beyond the queryable columns (hero, symptoms,
 * sections, process, pricing, candidacy, faqs, closingCta, related,
 * providers, customsSection, cardImage, cardBenefits, name, shortName,
 * summary). Deliberately loose here (the whole point of storing it as JSON,
 * per plan.md Phase 1) — `hero` is the one part validated strictly since
 * every page depends on it existing; the rest is checked as "is this at
 * least an object/array of the right shape" rather than a full schema.
 */
const CreateTreatmentSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, hyphen-separated'),
  href: z.string().min(1).regex(/^\//, 'href must start with /'),
  pillar: z.enum(['hormone-therapy', 'weight-loss', 'sexual-wellness', 'hair-restoration', 'aesthetics']),
  audience: z.enum(['men', 'women', 'all']).optional().nullable(),
  kind: z.enum(['hub', 'variant', 'modality']),
  status: z.enum(['draft', 'published']).default('draft'),
  order: z.number().int().default(0),
  name: z.string().min(1),
  shortName: z.string().min(1),
  summary: z.string().min(1),
  cardImage: z.object({ src: z.string(), alt: z.string() }).passthrough(),
  cardBenefits: z.array(z.string()).default([]),
  hero: HeroSchema,
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  closingCta: z
    .object({ title: z.string(), body: z.string(), cta: z.object({ label: z.string(), href: z.string() }) })
    .passthrough(),
  seo: z.object({ title: z.string(), description: z.string(), canonical: z.string() }).passthrough(),
})

export async function GET() {
  const rows = await prisma.treatment.findMany({ orderBy: { order: 'asc' } })
  const list = rows.map((row) => {
    const data = row.data as { name?: string; shortName?: string }
    return {
      id: row.id,
      slug: row.slug,
      href: row.href,
      pillar: row.pillar,
      audience: row.audience,
      kind: row.kind,
      status: row.status,
      order: row.order,
      name: data.name ?? row.slug,
      shortName: data.shortName ?? row.slug,
      updatedAt: row.updatedAt,
    }
  })
  return NextResponse.json({ treatments: list })
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = CreateTreatmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const { slug, href, pillar, audience, kind, status, order, seo, ...rest } = parsed.data

  const existing = await prisma.treatment.findFirst({ where: { OR: [{ slug }, { href }] } })
  if (existing) {
    return NextResponse.json({ error: 'A treatment with this slug or href already exists' }, { status: 409 })
  }

  const row = await prisma.treatment.create({
    data: { slug, href, pillar, audience, kind, status, order, data: JSON.parse(JSON.stringify(rest)) },
  })

  await prisma.pageSeo.upsert({
    where: { path: href },
    update: seo,
    create: { path: href, title: seo.title, description: seo.description, canonical: seo.canonical },
  })

  revalidateTag('treatments', 'max')

  return NextResponse.json({ treatment: row }, { status: 201 })
}
