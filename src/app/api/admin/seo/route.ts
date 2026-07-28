import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getAllTreatments } from '@/content/treatments/main'
import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * Generic per-page SEO, keyed by route `path` — covers every page on the
 * site (treatments + static pages), not just treatments. One admin screen,
 * one `buildMetadata()` call site already reads this via
 * `content/treatments/main.ts`'s `resolveSeo`.
 */

const STATIC_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/contact-us', label: 'Contact Us' },
  { path: '/our-experts', label: 'Our Experts' },
  { path: '/blog', label: 'Blog' },
  { path: '/news', label: 'News' },
  { path: '/book', label: 'Book' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms-and-conditions', label: 'Terms and Conditions' },
  { path: '/thank-you', label: 'Thank You' },
]

const SeoSchema = z.object({
  path: z.string().min(1),
  title: z.string().max(70).optional().nullable(),
  description: z.string().max(300).optional().nullable(),
  canonical: z.string().max(500).optional().nullable(),
  ogImageUrl: z.string().max(500).optional().nullable(),
  noindex: z.boolean().optional(),
  schemaJsonLd: z.string().max(20000).optional().nullable(),
})

/** Every known path on the site, joined with its PageSeo row if one exists. */
export async function GET() {
  const [treatments, seoRows] = await Promise.all([
    getAllTreatments(),
    prisma.pageSeo.findMany({ orderBy: { path: 'asc' } }),
  ])

  const seoByPath = new Map(seoRows.map((row) => [row.path, row]))

  const knownPages = [
    ...STATIC_PAGES,
    ...treatments.map((t) => ({ path: t.href, label: t.name })),
  ]

  const pages = knownPages.map(({ path, label }) => ({
    path,
    label,
    seo: seoByPath.get(path) ?? null,
  }))

  return NextResponse.json({ pages })
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = SeoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(', ') },
      { status: 400 },
    )
  }

  const { path, ...data } = parsed.data

  const row = await prisma.pageSeo.upsert({
    where: { path },
    update: data,
    create: { path, ...data },
  })

  revalidateTag('treatments', 'max')
  revalidatePath(path)

  return NextResponse.json({ seo: row })
}
