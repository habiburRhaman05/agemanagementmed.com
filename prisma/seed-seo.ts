import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PrismaPg } from '@prisma/adapter-pg'
import {
  Prisma,
  PrismaClient,
} from '../src/lib/generated/prisma/client'

// ============================================================
// DATABASE
// ============================================================

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined in the environment variables.',
  )
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

// ============================================================
// PATHS
// ============================================================

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SEO_JSON_PATH = path.resolve(
  __dirname,
  '../seo.json',
)

// ============================================================
// CONFIG
// ============================================================

/**
 * When true, extracted JSON-LD from seo.json is stored
 * in PageSeo.jsonLd / PostSeo.schemaJsonLd.
 *
 * JSON-LD is stored as Prisma Json, NOT as a JSON string.
 */
const INCLUDE_SCHEMA_JSON_LD = true

const SITE_ORIGIN = 'https://www.agemanagementmed.com'

// ============================================================
// TYPES
// ============================================================

interface OpenGraphData {
  title: string | null
  description: string | null
  image: string | null
  type: string | null
}

interface TwitterData {
  title: string | null
  description: string | null
}

interface TrackingData {
  metaPixel?: {
    present?: boolean
    pixelId?: string | null
  }

  googleTagManager?: {
    present?: boolean
    containerId?: string | null
    measurementId?: string | null
  }

  googleAnalytics?: {
    present?: boolean
    measurementId?: string | null
  }

  hotjar?: {
    present?: boolean
    siteId?: string | null
  }

  metricool?: {
    present?: boolean
  }

  plausible?: {
    present?: boolean
  }
}

interface ExtractedPage {
  url: string
  sourceFile: string
  pageTitle: string | null
  metaTitle: string | null
  metaDescription: string | null
  h1Hero: string | null
  canonical: string | null

  openGraph: OpenGraphData

  twitter: TwitterData

  robotsMeta: string | null

  jsonLd: Array<Record<string, unknown>>

  tracking: TrackingData | null
}

// ============================================================
// JSON HELPERS
// ============================================================

/**
 * Convert unknown JSON-compatible values into Prisma-compatible
 * JSON values.
 *
 * Prisma's InputJsonValue does not accept top-level null.
 * Null for nullable Prisma Json fields is represented separately
 * using Prisma.JsonNull.
 */
function isJsonPrimitive(
  value: unknown,
): value is string | number | boolean | null {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  )
}

function isJsonValue(value: unknown): boolean {
  if (isJsonPrimitive(value)) {
    return true
  }

  if (Array.isArray(value)) {
    return value.every((item) => isJsonValue(item))
  }

  if (
    typeof value === 'object' &&
    value !== null
  ) {
    return Object.values(
      value as Record<string, unknown>,
    ).every((item) => isJsonValue(item))
  }

  return false
}

/**
 * Convert an unknown object into Prisma InputJsonValue.
 *
 * Returns null when the value is not valid JSON.
 */
function toPrismaJsonValue(
  value: unknown,
): Prisma.InputJsonValue | null {
  if (!isJsonValue(value)) {
    return null
  }

  /**
   * At this point the value is known to be JSON-compatible.
   * JSON.parse/stringify gives us a clean JSON representation.
   */
  const normalized: unknown = JSON.parse(
    JSON.stringify(value),
  )

  if (normalized === null) {
    return null
  }

  return normalized as Prisma.InputJsonValue
}

// ============================================================
// URL HELPERS
// ============================================================

/**
 * Convert an absolute URL into a normalized route path.
 *
 * https://www.agemanagementmed.com/
 * -> /
 *
 * https://www.agemanagementmed.com/foo/
 * -> /foo
 */
function toPath(url: string): string {
  const { pathname } = new URL(url)

  if (pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '')
}

/**
 * Keep canonical as an absolute URL.
 *
 * Canonical is an SEO URL, so we do NOT convert it to /path.
 */
function normalizeCanonical(
  canonical: string | null,
  fallbackUrl: string,
): string {
  if (!canonical) {
    return fallbackUrl
  }

  try {
    return new URL(canonical).toString()
  } catch {
    return fallbackUrl
  }
}

// ============================================================
// JSON-LD
// ============================================================

/**
 * Convert multiple JSON-LD blocks into one schema object.
 *
 * 1 block:
 *   returns that object
 *
 * Multiple blocks:
 *   {
 *     "@context": "https://schema.org",
 *     "@graph": [...]
 *   }
 *
 * Invalid parser blocks containing _parseError are ignored.
 */
function buildSchemaJsonLd(
  blocks: Array<Record<string, unknown>>,
): Prisma.InputJsonValue | null {
  const usable = blocks.filter(
    (block) =>
      !Object.prototype.hasOwnProperty.call(
        block,
        '_parseError',
      ),
  )

  if (usable.length === 0) {
    return null
  }

  // ----------------------------------------------------------
  // SINGLE JSON-LD BLOCK
  // ----------------------------------------------------------

  if (usable.length === 1) {
    return toPrismaJsonValue(usable[0])
  }

  // ----------------------------------------------------------
  // MULTIPLE JSON-LD BLOCKS
  // ----------------------------------------------------------

  const graph: Prisma.InputJsonValue[] = []

  for (const block of usable) {
    const jsonValue = toPrismaJsonValue(block)

    if (jsonValue !== null) {
      graph.push(jsonValue)
    }
  }

  if (graph.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

// ============================================================
// BLOG HELPERS
// ============================================================

/**
 * /blog/my-post -> my-post
 *
 * Returns null for non-blog URLs.
 */
function blogSlugFromPath(
  pathname: string,
): string | null {
  const match = pathname.match(
    /^\/blog\/([^/]+)$/,
  )

  return match ? match[1] : null
}

// ============================================================
// CLI
// ============================================================

/**
 * Parse:
 *
 * --only=/a,/b
 *
 * Allows processing only selected routes.
 */
function parseOnlyFilter(): Set<string> | null {
  const arg = process.argv.find((value) =>
    value.startsWith('--only='),
  )

  if (!arg) {
    return null
  }

  const paths = arg
    .slice('--only='.length)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => {
      try {
        if (value === '/') {
          return '/'
        }

        return (
          new URL(
            value,
            SITE_ORIGIN,
          ).pathname.replace(/\/+$/, '') || '/'
        )
      } catch {
        return value
      }
    })

  return new Set(paths)
}

// ============================================================
// TRACKING
// ============================================================

function getTrackingValue(
  tracking: TrackingData | null,
): {
  metaPixelPresent: boolean
  metaPixelId: string | null

  googleTagManagerPresent: boolean
  googleTagManagerId: string | null

  googleAnalyticsPresent: boolean
  googleAnalyticsMeasurementId: string | null

  hotjarPresent: boolean
  hotjarSiteId: string | null

  metricoolPresent: boolean
  plausiblePresent: boolean
} {
  return {
    metaPixelPresent:
      tracking?.metaPixel?.present ?? false,

    metaPixelId:
      tracking?.metaPixel?.pixelId ?? null,

    googleTagManagerPresent:
      tracking?.googleTagManager?.present ?? false,

    googleTagManagerId:
      tracking?.googleTagManager?.containerId ?? null,

    googleAnalyticsPresent:
      tracking?.googleAnalytics?.present ?? false,

    googleAnalyticsMeasurementId:
      tracking?.googleAnalytics?.measurementId ?? null,

    hotjarPresent:
      tracking?.hotjar?.present ?? false,

    hotjarSiteId:
      tracking?.hotjar?.siteId ?? null,

    metricoolPresent:
      tracking?.metricool?.present ?? false,

    plausiblePresent:
      tracking?.plausible?.present ?? false,
  }
}

// ============================================================
// MAIN
// ============================================================

async function main(): Promise<void> {
  const write = process.argv.includes('--write')

  const only = parseOnlyFilter()

  // ==========================================================
  // LOAD SEO JSON
  // ==========================================================

  if (!fs.existsSync(SEO_JSON_PATH)) {
    console.error(
      `seo.json not found at ${SEO_JSON_PATH} — run scripts/extract-seo.cjs first.`,
    )

    process.exitCode = 1

    return
  }

  const raw = fs.readFileSync(
    SEO_JSON_PATH,
    'utf8',
  )

  const parsed: unknown = JSON.parse(raw)

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    Array.isArray(parsed)
  ) {
    throw new Error(
      'seo.json must contain an object keyed by page.',
    )
  }

  const pages =
    parsed as Record<string, ExtractedPage>

  let entries = Object.values(pages)

  // ==========================================================
  // FILTER
  // ==========================================================

  if (only) {
    entries = entries.filter((page) => {
      const routePath = toPath(page.url)

      return only.has(routePath)
    })
  }

  // ==========================================================
  // LOG
  // ==========================================================

  console.log(
    `Loaded ${Object.keys(pages).length} page(s) from seo.json`,
  )

  if (only) {
    console.log(
      `--only filter active: processing ${entries.length} of ${Object.keys(pages).length
      } page(s) — [${[...only].join(', ')}]`,
    )
  }

  console.log(
    `Mode: ${write
      ? 'WRITE'
      : 'DRY RUN (pass --write to apply)'
    }`,
  )

  console.log(
    `JSON-LD: ${INCLUDE_SCHEMA_JSON_LD
      ? 'INCLUDED'
      : 'SKIPPED'
    }\n`,
  )

  let pageSeoCount = 0
  let postSeoCount = 0
  let skippedCount = 0

  const seenPaths = new Set<string>()

  // ==========================================================
  // PROCESS PAGES
  // ==========================================================

  for (const page of entries) {
    const routePath = toPath(page.url)

    const canonicalUrl = normalizeCanonical(
      page.canonical,
      page.url,
    )

    const schemaJsonLd =
      INCLUDE_SCHEMA_JSON_LD
        ? buildSchemaJsonLd(page.jsonLd)
        : null

    const tracking = getTrackingValue(
      page.tracking,
    )

    const slug = blogSlugFromPath(routePath)

    // ========================================================
    // BLOG POST
    // ========================================================

    if (slug) {
      const post =
        await prisma.post.findUnique({
          where: {
            slug,
          },
          select: {
            id: true,
            title: true,
          },
        })

      if (!post) {
        console.warn(
          `SKIP (no matching Post for slug "${slug}"): ${page.url}`,
        )

        skippedCount++

        continue
      }

      // ------------------------------------------------------
      // POST SEO DATA
      // ------------------------------------------------------

      const postSeoData = {
        metaTitle:
          page.metaTitle ??
          page.pageTitle,

        metaDesc:
          page.metaDescription,

        canonical:
          canonicalUrl,

        noindex:
          page.robotsMeta
            ? /noindex/i.test(
              page.robotsMeta,
            )
            : false,

        keywords:
          null as string | null,

        h1:
          page.h1Hero,

        ogImage:
          page.openGraph.image,

        ogTitle:
          page.openGraph.title,

        ogDescription:
          page.openGraph.description,

        ogType:
          page.openGraph.type,

        twitterTitle:
          page.twitter.title,

        twitterDescription:
          page.twitter.description,
      }

      console.log(
        `PostSeo  ${page.url}  (post: ${post.title})`,
      )

      if (write) {
        await prisma.postSeo.upsert({
          where: {
            postId: post.id,
          },

          create: {
            postId: post.id,

            metaTitle:
              postSeoData.metaTitle,

            metaDesc:
              postSeoData.metaDesc,

            ogImage:
              postSeoData.ogImage,

            canonical:
              postSeoData.canonical,

            noindex:
              postSeoData.noindex,

            keywords:
              postSeoData.keywords,

            h1:
              postSeoData.h1,
              
            

            ogTitle:
              postSeoData.ogTitle,

            ogDescription:
              postSeoData.ogDescription,

            ogType:
              postSeoData.ogType,

            twitterTitle:
              postSeoData.twitterTitle,

            twitterDescription:
              postSeoData.twitterDescription,

            schemaJsonLd:
              schemaJsonLd === null
                ? Prisma.JsonNull
                : schemaJsonLd,
          },

          update: {
            metaTitle:
              postSeoData.metaTitle,

            metaDesc:
              postSeoData.metaDesc,

            ogImage:
              postSeoData.ogImage,

            canonical:
              postSeoData.canonical,

            noindex:
              postSeoData.noindex,

            keywords:
              postSeoData.keywords,

            h1:
              postSeoData.h1,

            ogTitle:
              postSeoData.ogTitle,
            

            ogDescription:
              postSeoData.ogDescription,

            ogType:
              postSeoData.ogType,

            twitterTitle:
              postSeoData.twitterTitle,

            twitterDescription:
              postSeoData.twitterDescription,

            schemaJsonLd:
              schemaJsonLd === null
                ? Prisma.JsonNull
                : schemaJsonLd,
          },
        })
      }

      postSeoCount++

      continue
    }

    // ========================================================
    // NORMAL PAGE
    // ========================================================

    if (seenPaths.has(routePath)) {
      console.warn(
        `SKIP (duplicate path): ${page.url} -> ${routePath}`,
      )

      skippedCount++

      continue
    }

    seenPaths.add(routePath)

    // --------------------------------------------------------
    // PAGE SEO DATA
    // --------------------------------------------------------

    const pageSeoData = {
      // ------------------------------------------------------
      // Identity
      // ------------------------------------------------------

      url:
        page.url,

      sourceFile:
        page.sourceFile,

      // ------------------------------------------------------
      // SEO
      // ------------------------------------------------------

      pageTitle:
        page.pageTitle,

      metaTitle:
        page.metaTitle,

      metaDescription:
        page.metaDescription,

      keywords:
        null as string | null,

      h1Hero:
        page.h1Hero,

      // ------------------------------------------------------
      // Search engine
      // ------------------------------------------------------

      canonical:
        canonicalUrl,

      robotsMeta:
        page.robotsMeta,

      // ------------------------------------------------------
      // Social
      // ------------------------------------------------------

      openGraph:
        page.openGraph,

      twitter:
        page.twitter,

      // ------------------------------------------------------
      // Tracking
      // ------------------------------------------------------

      metaPixelPresent:
        tracking.metaPixelPresent,

      metaPixelId:
        tracking.metaPixelId,

      googleTagManagerPresent:
        tracking.googleTagManagerPresent,

      googleTagManagerId:
        tracking.googleTagManagerId,

      googleAnalyticsPresent:
        tracking.googleAnalyticsPresent,

      googleAnalyticsMeasurementId:
        tracking.googleAnalyticsMeasurementId,

      hotjarPresent:
        tracking.hotjarPresent,

      hotjarSiteId:
        tracking.hotjarSiteId,

      metricoolPresent:
        tracking.metricoolPresent,

      plausiblePresent:
        tracking.plausiblePresent,

      // ------------------------------------------------------
      // Sitemap defaults
      // ------------------------------------------------------

      sitemapInclude:
        true,

      sitemapPriority:
        null as number | null,

      sitemapChangefreq:
        null as string | null,
    }

    console.log(
      `PageSeo  ${page.url} -> path "${routePath}"`,
    )

    // ========================================================
    // WRITE PAGE SEO
    // ========================================================

    if (write) {
      await prisma.pageSeo.upsert({
        where: {
          path: routePath,
        },

        create: {
          path: routePath,

          url:
            pageSeoData.url,

          sourceFile:
            pageSeoData.sourceFile,

          pageTitle:
            pageSeoData.pageTitle,

          metaTitle:
            pageSeoData.metaTitle,

          metaDescription:
            pageSeoData.metaDescription,

          keywords:
            pageSeoData.keywords,

          h1Hero:
            pageSeoData.h1Hero,

          canonical:
            pageSeoData.canonical,

          robotsMeta:
            pageSeoData.robotsMeta,

          openGraph: pageSeoData.openGraph as any,
          twitter: pageSeoData.twitter as any,

          jsonLd:
            schemaJsonLd === null
              ? Prisma.JsonNull
              : schemaJsonLd,

          metaPixelPresent:
            pageSeoData.metaPixelPresent,

          metaPixelId:
            pageSeoData.metaPixelId,

          googleTagManagerPresent:
            pageSeoData.googleTagManagerPresent,

          googleTagManagerId:
            pageSeoData.googleTagManagerId,

          googleAnalyticsPresent:
            pageSeoData.googleAnalyticsPresent,

          googleAnalyticsMeasurementId:
            pageSeoData.googleAnalyticsMeasurementId,

          hotjarPresent:
            pageSeoData.hotjarPresent,

          hotjarSiteId:
            pageSeoData.hotjarSiteId,

          metricoolPresent:
            pageSeoData.metricoolPresent,

          plausiblePresent:
            pageSeoData.plausiblePresent,

          sitemapInclude:
            pageSeoData.sitemapInclude,

          sitemapPriority:
            pageSeoData.sitemapPriority,

          sitemapChangefreq:
            pageSeoData.sitemapChangefreq,
        },

        update: {
          url:
            pageSeoData.url,

          sourceFile:
            pageSeoData.sourceFile,

          pageTitle:
            pageSeoData.pageTitle,

          metaTitle:
            pageSeoData.metaTitle,

          metaDescription:
            pageSeoData.metaDescription,

          keywords:
            pageSeoData.keywords,

          h1Hero:
            pageSeoData.h1Hero,

          canonical:
            pageSeoData.canonical,

          robotsMeta:
            pageSeoData.robotsMeta,

          openGraph: pageSeoData.openGraph as any,
          twitter: pageSeoData.twitter as any,

          jsonLd:
            schemaJsonLd === null
              ? Prisma.JsonNull
              : schemaJsonLd,

          metaPixelPresent:
            pageSeoData.metaPixelPresent,

          metaPixelId:
            pageSeoData.metaPixelId,

          googleTagManagerPresent:
            pageSeoData.googleTagManagerPresent,

          googleTagManagerId:
            pageSeoData.googleTagManagerId,

          googleAnalyticsPresent:
            pageSeoData.googleAnalyticsPresent,

          googleAnalyticsMeasurementId:
            pageSeoData.googleAnalyticsMeasurementId,

          hotjarPresent:
            pageSeoData.hotjarPresent,

          hotjarSiteId:
            pageSeoData.hotjarSiteId,

          metricoolPresent:
            pageSeoData.metricoolPresent,

          plausiblePresent:
            pageSeoData.plausiblePresent,

          sitemapInclude:
            pageSeoData.sitemapInclude,

          sitemapPriority:
            pageSeoData.sitemapPriority,

          sitemapChangefreq:
            pageSeoData.sitemapChangefreq,
        },
      })
    }

    pageSeoCount++
  }

  // ==========================================================
  // SUMMARY
  // ==========================================================

  console.log(
    `\nDone. PageSeo: ${pageSeoCount}, PostSeo: ${postSeoCount}, skipped: ${skippedCount}.` +
    (write
      ? ''
      : ' Nothing was written — pass --write to apply.'),
  )
}

// ============================================================
// RUN
// ============================================================

main()
  .catch((error: unknown) => {
    console.error(error)

    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })