import { JsonLd } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import { buildOrganizationSchema, getSchemaOverride } from '@/lib/seo'
import { getSiteSettings } from '@/lib/settings'

/**
 * Renders this exact path's `PageSeo.jsonLd` — the admin's manual schema
 * override — when one is set, else the generic sitewide organization
 * schema. Every caller passes its own real, literal path directly (no
 * middleware/`headers()` involved, so there's no ambiguity about which page
 * is asking) — the same direct-fetch mechanism already proven to work on
 * treatment pages.
 */
export async function PageSchema({ path }: { path: string }) {
  const [override, settings] = await Promise.all([getSchemaOverride(path), getSiteSettings()])

  const data =
    override ??
    buildOrganizationSchema({
      siteName: settings.siteName,
      phone: settings.phone,
      email: settings.email,
      images: settings.logoUrl ? [new URL(settings.logoUrl, site.url).toString()] : undefined,
    })

  return <JsonLd data={data} />
}
