/**
 * Seeds SEO data extracted from the live/source site (see frontend/seo.json,
 * built by scripts/extract-seo.cjs) into PageSeo / PostSeo.
 *
 * NOT RUN AS PART OF ANY OTHER FLOW. Created on request, deliberately not
 * wired into `npm run db:seed` or executed here — run it manually only when
 * ready:
 *
 *   npx tsx prisma/seed-seo.ts            # dry run — prints the plan, writes nothing
 *   npx tsx prisma/seed-seo.ts --write     # actually upserts every page in seo.json
 *   npx tsx prisma/seed-seo.ts --write --only=/a,/b   # upsert ONLY these normalized paths, leave every other page untouched
 *
 * Routing:
 *   - `/blog/<slug>` (an actual post, not the index) -> PostSeo, matched by
 *     Post.slug. Skipped with a warning if no matching Post exists.
 *   - Every other URL -> PageSeo, matched by path (host/protocol stripped,
 *     trailing slash stripped except for `/`, matching the convention already
 *     established for Treatment.href in this codebase).
 *   - seo.json currently holds exactly one homepage entry (keyed by the
 *     non-www URL), whose `canonical` field already correctly points at the
 *     www version — nothing to dedupe there today. If a second homepage
 *     entry is ever added, the `seenPaths` guard below still catches it and
 *     skips the duplicate rather than upserting the same PageSeo row twice.
 *
 * Fields:
 *   - title, description, canonical, keywords, ogImageUrl, h1, ogTitle,
 *     ogDescription, ogType, twitterTitle, twitterDescription — straight
 *     1:1 copies from seo.json. `canonical` is stored as a site-relative path
 *     (matches `new URL(seo.canonical, site.url)` in lib/seo.ts, and every
 *     existing PageSeo row already uses this convention).
 *   - noindex — derived from the raw `robotsMeta` string (true only if it
 *     contains "noindex"); every page audited so far was "index, follow", so
 *     this seeds `false` throughout, not a placeholder.
 *   - schemaJsonLd — OFF BY DEFAULT. See the flag below before turning it on.
 *
 * schemaJsonLd is a real behavior change, not just data storage: setting it
 * makes `[...slug]/page.tsx` and the blog detail page render this JSON-LD
 * INSTEAD OF the auto-generated Treatment/Organization schema, and it also
 * suppresses the auto-generated FAQ schema (see `getSchemaOverride` +
 * `!schemaOverride && faqSchema` in [...slug]/page.tsx). Multiple JSON-LD
 * blocks from the source (MedicalClinic + BreadcrumbList + FAQPage + …) are
 * combined into one object via a standard @graph wrapper, since the DB field
 * only holds one JSON value. Confirm this is actually wanted before flipping
 * INCLUDE_SCHEMA_JSON_LD to true — it was intentionally left pending in the
 * prior conversation, not decided yet.
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/lib/generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

// package.json has "type": "module", so this file runs as ESM — `__dirname`
// doesn't exist there; derive it from `import.meta.url` instead.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SEO_JSON_PATH = path.resolve(__dirname, '../seo.json')

// Flip to true only once you've confirmed you want seeded pages to render
// this JSON-LD *instead of* the app's auto-generated schema. See file header.
const INCLUDE_SCHEMA_JSON_LD = false

interface ExtractedPage {
  url: string
  sourceFile: string
  pageTitle: string | null
  metaTitle: string | null
  metaDescription: string | null
  h1Hero: string | null
  canonical: string | null
  openGraph: {
    title: string | null
    description: string | null
    image: string | null
    type: string | null
  }
  twitter: {
    title: string | null
    description: string | null
  }
  robotsMeta: string | null
  jsonLd: Array<Record<string, unknown>>
  tracking: unknown
}

/** Strips protocol + host, strips a trailing slash except on the bare root. */
function toPath(url: string): string {
  const { pathname } = new URL(url)
  if (pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

function toCanonicalPath(canonical: string | null, fallback: string): string {
  if (!canonical) return fallback
  try {
    return toPath(canonical)
  } catch {
    return fallback
  }
}

function deriveNoindex(robotsMeta: string | null): boolean {
  return robotsMeta ? /noindex/i.test(robotsMeta) : false
}

/** Multiple ld+json blocks -> one @graph object, or null if there's nothing usable. */
function buildSchemaJsonLd(blocks: Array<Record<string, unknown>>): string | null {
  const usable = blocks.filter((b) => !b._parseError)
  if (usable.length === 0) return null
  if (usable.length === 1) return JSON.stringify(usable[0])
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': usable })
}

/** `/blog/<slug>/` -> `<slug>`, or null for anything that isn't a single-post blog URL. */
function blogSlugFromPath(p: string): string | null {
  const match = p.match(/^\/blog\/([^/]+)$/)
  return match ? match[1] : null
}

/** `--only=/a,/b` restricts processing to just those normalized paths — every other page in seo.json is left completely alone. */
function parseOnlyFilter(): Set<string> | null {
  const arg = process.argv.find((a) => a.startsWith('--only='))
  if (!arg) return null
  const paths = arg
    .slice('--only='.length)
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  return new Set(paths)
}

async function main() {
  const write = process.argv.includes('--write')
  const only = parseOnlyFilter()

  if (!fs.existsSync(SEO_JSON_PATH)) {
    console.error(`seo.json not found at ${SEO_JSON_PATH} — run scripts/extract-seo.cjs first.`)
    process.exitCode = 1
    return
  }

  const raw = fs.readFileSync(SEO_JSON_PATH, 'utf8')
  const pages: Record<string, ExtractedPage> = JSON.parse(raw)
  let entries = Object.values(pages)

  if (only) {
    entries = entries.filter((page) => only.has(toPath(page.url)))
  }

  console.log(`Loaded ${Object.keys(pages).length} page(s) from seo.json`)
  if (only) {
    console.log(`--only filter active: processing ${entries.length} of ${Object.keys(pages).length} page(s) — [${[...only].join(', ')}]`)
  }
  console.log(`Mode: ${write ? 'WRITE' : 'DRY RUN (pass --write to apply)'}`)
  console.log(`schemaJsonLd: ${INCLUDE_SCHEMA_JSON_LD ? 'INCLUDED' : 'skipped (flag is false)'}\n`)

  let pageSeoCount = 0
  let postSeoCount = 0
  let skippedCount = 0
  const seenPaths = new Set<string>()

  for (const page of entries) {
    const routePath = toPath(page.url)
    const canonicalPath = toCanonicalPath(page.canonical, routePath)
    const noindex = deriveNoindex(page.robotsMeta)
    const schemaJsonLd = INCLUDE_SCHEMA_JSON_LD ? buildSchemaJsonLd(page.jsonLd) : null

    const slug = blogSlugFromPath(routePath)

    if (slug) {
      // --- Blog post -> PostSeo ---
      const post = await prisma.post.findUnique({ where: { slug }, select: { id: true, title: true } })
      if (!post) {
        console.warn(`  SKIP (no matching Post for slug "${slug}"): ${page.url}`)
        skippedCount++
        continue
      }

      const data = {
        metaTitle: page.pageTitle,
        metaDesc: page.metaDescription,
        ogImage: page.openGraph.image,
        canonical: canonicalPath,
        noindex,
        keywords: null as string | null, // not yet extracted; field exists but source pages had it empty everywhere audited
        h1: page.h1Hero,
        ogTitle: page.openGraph.title,
        ogDescription: page.openGraph.description,
        ogType: page.openGraph.type,
        twitterTitle: page.twitter.title,
        twitterDescription: page.twitter.description,
        schemaJsonLd,
      }

      console.log(`  PostSeo  ${page.url}  (post: ${post.title})`)
      if (write) {
        await prisma.postSeo.upsert({
          where: { postId: post.id },
          create: { postId: post.id, ...data },
          update: data,
        })
      }
      postSeoCount++
      continue
    }

    // --- Everything else -> PageSeo ---
    if (seenPaths.has(routePath)) {
      console.warn(`  SKIP (duplicate path, already queued): ${page.url} -> ${routePath}`)
      skippedCount++
      continue
    }
    seenPaths.add(routePath)

    const data = {
      title: page.pageTitle,
      description: page.metaDescription,
      canonical: canonicalPath,
      ogImageUrl: page.openGraph.image,
      noindex,
      keywords: null as string | null,
      h1: page.h1Hero,
      ogTitle: page.openGraph.title,
      ogDescription: page.openGraph.description,
      ogType: page.openGraph.type,
      twitterTitle: page.twitter.title,
      twitterDescription: page.twitter.description,
      ...(INCLUDE_SCHEMA_JSON_LD ? { schemaJsonLd } : {}),
    }

    console.log(`  PageSeo  ${page.url}  -> path "${routePath}"`)
    if (write) {
      await prisma.pageSeo.upsert({
        where: { path: routePath },
        create: { path: routePath, ...data },
        update: data,
      })
    }
    pageSeoCount++
  }

  console.log(
    `\nDone. PageSeo: ${pageSeoCount}, PostSeo: ${postSeoCount}, skipped: ${skippedCount}.` +
      (write ? '' : ' Nothing was written — pass --write to apply.'),
  )
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
