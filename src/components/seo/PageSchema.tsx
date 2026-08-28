import { JsonLd } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import { buildOrganizationSchema, getSchemaOverride, sortSchemas, splitSchemaGraph } from '@/lib/seo'
import { getSiteSettings } from '@/lib/settings'

/**
 * Renders this exact path's `PageSeo.jsonLd` — the admin's manual schema
 * override — when one is set, else the generic sitewide organization
 * schema. Every caller passes its own real, literal path directly (no
 * middleware/`headers()` involved, so there's no ambiguity about which page
 * is asking) — the same direct-fetch mechanism already proven to work on
 * treatment pages.
 *
 * A stored override that wraps several schemas in one `@graph` is split
 * back into one `<script type="application/ld+json">` per schema, matching
 * how the production site emits them (separate tags for MedicalClinic,
 * BreadcrumbList, VideoObject, …) rather than a single combined block.
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

  const schemas = sortSchemas(splitSchemaGraph(data))

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd
          // Schema objects have no stable id of their own; `@type` + index is
          // stable for a given page's schema list, which is all React needs here.
          key={`${String(schema['@type'] ?? 'schema')}-${index}`}
          data={schema}
        />
      ))}
    </>
  )
}
