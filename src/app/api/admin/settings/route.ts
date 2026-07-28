import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * Site-wide settings (logo, favicon, socials, header/footer scripts). One
 * singleton row (`id: "singleton"`). `/api/*` is already gated by
 * `src/middleware.ts` (session cookie required) — `getCurrentAdmin()` here
 * is the belt-and-suspenders identity check, not the primary gate.
 */

const SettingsSchema = z.object({
  siteName: z.string().min(1).max(200).optional().nullable(),
  tagline: z.string().max(200).optional().nullable(),
  logoUrl: z.string().max(500).optional().nullable(),
  logoDarkUrl: z.string().max(500).optional().nullable(),
  faviconUrl: z.string().max(500).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().email().max(200).optional().nullable().or(z.literal('')),
  socialLinks: z
    .object({
      facebook: z.string().max(500).optional().nullable(),
      instagram: z.string().max(500).optional().nullable(),
      youtube: z.string().max(500).optional().nullable(),
      linkedin: z.string().max(500).optional().nullable(),
      tiktok: z.string().max(500).optional().nullable(),
    })
    .optional(),
  defaultSeoTitle: z.string().max(70).optional().nullable(),
  defaultSeoDescription: z.string().max(160).optional().nullable(),
  defaultOgImageUrl: z.string().max(500).optional().nullable(),
  headerScripts: z.string().max(20000).optional().nullable(),
  footerScripts: z.string().max(20000).optional().nullable(),
})

export async function GET() {
  const row = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } })
  return NextResponse.json({ settings: row })
}

export async function PATCH(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = SettingsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(', ') },
      { status: 400 },
    )
  }

  const row = await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: parsed.data,
    create: { id: 'singleton', ...parsed.data },
  })

  revalidateTag('site-settings', 'max')

  return NextResponse.json({ settings: row })
}
