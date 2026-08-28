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
// Re-syncs PageSeo.jsonLd ONLY, from seo.json — every other PageSeo
// column is left untouched. Modeled on seed-seo.ts's own conventions
// (dry-run default, --write, --only=/a,/b, toPath/toPrismaJsonValue).
//
// FAQPage is stripped out of the merged JSON-LD before writing — FAQ
// schema is always rendered live from `Treatment.data.faqs` (see
// buildFaqSchema()'s call site in src/app/(marketing)/[...slug]/page.tsx),
// never from this stored override, so a frozen FAQPage copy here would
// only ever produce a duplicate/stale block on top of the live one.
// ============================================================

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

const SITE_ORIGIN = 'https://www.agemanagementmed.com'

// ============================================================
// TYPES
// ============================================================

interface ExtractedPage {
  url: string
  jsonLd: Array<Record<string, unknown>>
}

// ============================================================
// JSON HELPERS
// (same shape as seed-seo.ts — kept in sync deliberately rather than
// imported, since seed-seo.ts has no exports of its own to import from)
// ============================================================

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

function toPrismaJsonValue(
  value: unknown,
): Prisma.InputJsonValue | null {
  if (!isJsonValue(value)) {
    return null
  }

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
 * https://www.agemanagementmed.com/foo/ -> /foo
 * https://www.agemanagementmed.com/     -> /
 *
 * Matches seed-seo.ts's toPath() exactly — the two scripts must agree on
 * a path or this one will never find the row seed-seo.ts created.
 */
function toPath(url: string): string {
  const { pathname } = new URL(url)

  if (pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '')
}

// ============================================================
// FAQPage STRIPPING
// ============================================================

/** `entry['@type']` matches (or includes, if array-valued) `type`. */
function hasType(entry: unknown, type: string): boolean {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false
  const t = (entry as Record<string, unknown>)['@type']
  return Array.isArray(t) ? t.includes(type) : t === type
}

/**
 * Removes FAQPage blocks from a raw seo.json jsonLd array before it's
 * merged into a single schema object. A block that's itself FAQPage is
 * dropped; nothing else changes.
 */
function stripFaqPageBlocks(
  blocks: Array<Record<string, unknown>>,
): Array<Record<string, unknown>> {
  return blocks.filter((block) => !hasType(block, 'FAQPage'))
}

// ============================================================
// JSON-LD MERGE
// (mirrors seed-seo.ts's buildSchemaJsonLd exactly, applied to the
// FAQPage-filtered block list)
// ============================================================

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

  if (usable.length === 1) {
    return toPrismaJsonValue(usable[0])
  }

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
// CLI
// ============================================================

/**
 * --only=/a,/b — process only these routes. Same parsing as seed-seo.ts.
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
// MAIN
// ============================================================

async function main(): Promise<void> {
  const write = process.argv.includes('--write')

  const only = parseOnlyFilter()

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

  if (only) {
    entries = entries.filter((page) => {
      const routePath = toPath(page.url)

      return only.has(routePath)
    })
  }

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
    }\n`,
  )

  let updatedCount = 0
  let skippedNoRowCount = 0
  let skippedNoJsonLdCount = 0
  let faqStrippedCount = 0

  const seenPaths = new Set<string>()

  for (const page of entries) {
    const routePath = toPath(page.url)

    // Blog posts store their override on PostSeo.schemaJsonLd, not
    // PageSeo.jsonLd — out of scope for this script (it's PageSeo-only by
    // design, matching seed-seo.ts's split between the two models).
    if (/^\/blog\/[^/]+$/.test(routePath)) {
      continue
    }

    if (seenPaths.has(routePath)) {
      console.warn(`SKIP (duplicate path): ${page.url} -> ${routePath}`)
      continue
    }
    seenPaths.add(routePath)

    const rawBlocks = Array.isArray(page.jsonLd) ? page.jsonLd : []
    const hadFaq = rawBlocks.some((b) => hasType(b, 'FAQPage'))
    const filteredBlocks = stripFaqPageBlocks(rawBlocks)

    const jsonLd = buildSchemaJsonLd(filteredBlocks)

    if (jsonLd === null) {
      console.log(`SKIP (no usable JSON-LD): ${routePath}`)
      skippedNoJsonLdCount++
      continue
    }

    const existing = await prisma.pageSeo.findUnique({
      where: { path: routePath },
      select: { id: true },
    })

    if (!existing) {
      console.log(`SKIP (no matching PageSeo row): ${routePath}`)
      skippedNoRowCount++
      continue
    }

    if (hadFaq) faqStrippedCount++

    console.log(
      `PageSeo.jsonLd  ${routePath}${hadFaq ? '  (FAQPage stripped)' : ''}`,
    )

    if (write) {
      await prisma.pageSeo.update({
        where: { path: routePath },
        data: { jsonLd },
      })
    }

    updatedCount++
  }

  console.log(
    `\nDone. Updated: ${updatedCount}, skipped (no PageSeo row): ${skippedNoRowCount}, ` +
    `skipped (no usable JSON-LD): ${skippedNoJsonLdCount}, FAQPage stripped from: ${faqStrippedCount}.` +
    (write ? '' : ' Nothing was written — pass --write to apply.'),
  )
}

main()
  .catch((error: unknown) => {
    console.error(error)

    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
