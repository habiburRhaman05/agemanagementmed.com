import { SettingsForm } from '@/components/admin/SettingsForm'
import { prisma } from '@/lib/prisma'

export default async function SettingsPage() {
  const row = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } })

  const initial = {
    siteName: row?.siteName ?? null,
    tagline: row?.tagline ?? null,
    logoUrl: row?.logoUrl ?? null,
    logoDarkUrl: row?.logoDarkUrl ?? null,
    faviconUrl: row?.faviconUrl ?? null,
    phone: row?.phone ?? null,
    email: row?.email ?? null,
    socialLinks: (row?.socialLinks as Record<string, string | null>) ?? null,
    defaultSeoTitle: row?.defaultSeoTitle ?? null,
    defaultSeoDescription: row?.defaultSeoDescription ?? null,
    defaultOgImageUrl: row?.defaultOgImageUrl ?? null,
    headerScripts: row?.headerScripts ?? null,
    footerScripts: row?.footerScripts ?? null,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500">
          Logo, favicon, social links, default SEO, and tracking scripts — used across the whole site.
        </p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  )
}
