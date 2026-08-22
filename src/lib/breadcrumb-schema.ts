import { site } from '@/content/site'

/**
 * BreadcrumbList schema builder — split out from lib/seo.ts specifically so
 * it has no `prisma` dependency. `lib/seo.ts` imports `@/lib/prisma` (for
 * `getSchemaOverride`), and bundlers include a file's full top-level import
 * graph for any client component that imports anything from it — pulling
 * Prisma's `pg` driver (which needs Node's `tls`/`util` modules) into the
 * browser bundle and breaking the build. This function needs to be callable
 * from `HeroEditorial` (a client component), so it lives here instead.
 * `lib/seo.ts` re-exports it for existing server-side callers.
 */
export function buildBreadcrumbSchema(crumbs: Array<{ label: string; href: string }>) {
  if (!crumbs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, site.url).toString(),
    })),
  }
}
