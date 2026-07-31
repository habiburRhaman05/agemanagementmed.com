#!/usr/bin/env node
/**
 * Scans editorial content in Postgres (via Prisma) for malformed dashes and
 * replaces them with a proper em dash (—), no surrounding spaces.
 *
 * Dry-run by default — prints every change it *would* make without writing
 * anything. Pass --write to actually persist.
 *
 *   node scripts/fix-dashes.cjs           # dry run (safe, read-only)
 *   node scripts/fix-dashes.cjs --write   # applies the changes
 *
 * What it fixes:
 *   "word -- word"   -> "word—word"
 *   "word---word"    -> "word—word"
 *   "word - word"    -> "word—word"   (a single hyphen with a space on
 *                                       BOTH sides — real hyphenated
 *                                       compounds like "sugar-free" never
 *                                       have surrounding spaces, so this
 *                                       pattern is safe to treat as a dash)
 *
 * What it deliberately does NOT touch:
 *   - Existing en dashes (–). This codebase legitimately uses them for
 *     ranges, e.g. locations hours: "Mon – Thu". An en dash used correctly
 *     for a range is typographically indistinguishable, by regex, from one
 *     misused as a sentence break — converting both would silently corrupt
 *     real content. Left alone by design; fix by hand if you find a bad one.
 *   - Anything inside HTML tags/attributes/comments in `contentHtml` fields
 *     (blog post bodies) — only text nodes are touched, so markup can never
 *     be corrupted.
 *   - `SiteSettings.headerScripts` / `footerScripts` (raw injected HTML/JS —
 *     a stray "--" there could be inside real code, e.g. a JS comment).
 *   - Names, slugs, URLs, image paths, and any non-editorial/system data
 *     (Lead, Appointment, NewsletterSubscriber, Admin, Media, etc.).
 */

require('dotenv').config()
const { PrismaClient } = require('../src/lib/generated/prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const WRITE = process.argv.includes('--write')

/* ── Dash-fixing core ─────────────────────────────────────────────── */

function fixDashesInPlainText(text) {
  if (!text) return text
  return text
    .replace(/\s*-{3,}\s*/g, '—') // "---" or more, any spacing
    .replace(/\s*--\s*/g, '—') // "--", any spacing
    .replace(/(\S)\s-\s(\S)/g, '$1—$2') // " - " between two words
}

/** Only rewrites text nodes — tags, attributes, and HTML comments pass through untouched. */
function fixDashesInHtml(html) {
  if (!html) return html
  const parts = html.split(/(<!--[\s\S]*?-->|<[^>]+>)/g)
  return parts.map((part) => (part.startsWith('<') ? part : fixDashesInPlainText(part))).join('')
}

/** Recursively fixes every string leaf in a JSON value (objects/arrays/primitives). */
function fixDashesInJson(value) {
  if (typeof value === 'string') return fixDashesInPlainText(value)
  if (Array.isArray(value)) return value.map(fixDashesInJson)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [key, v] of Object.entries(value)) out[key] = fixDashesInJson(v)
    return out
  }
  return value
}

/* ── Generic field processors ─────────────────────────────────────── */

async function processTextField(prisma, model, idField, textField, { html = false } = {}) {
  const rows = await prisma[model].findMany({ select: { [idField]: true, [textField]: true } })
  let changed = 0
  for (const row of rows) {
    const original = row[textField]
    if (!original) continue
    const fixed = html ? fixDashesInHtml(original) : fixDashesInPlainText(original)
    if (fixed !== original) {
      changed++
      console.log(`\n[${model}.${textField}] id=${row[idField]}`)
      console.log(`  - ${JSON.stringify(original)}`)
      console.log(`  + ${JSON.stringify(fixed)}`)
      if (WRITE) {
        await prisma[model].update({ where: { [idField]: row[idField] }, data: { [textField]: fixed } })
      }
    }
  }
  return changed
}

async function processJsonField(prisma, model, idField, jsonField) {
  const rows = await prisma[model].findMany({ select: { [idField]: true, [jsonField]: true } })
  let changed = 0
  for (const row of rows) {
    const original = row[jsonField]
    if (original == null) continue
    const fixed = fixDashesInJson(original)
    if (JSON.stringify(fixed) !== JSON.stringify(original)) {
      changed++
      console.log(`\n[${model}.${jsonField}] id=${row[idField]}`)
      console.log(`  - ${JSON.stringify(original)}`)
      console.log(`  + ${JSON.stringify(fixed)}`)
      if (WRITE) {
        await prisma[model].update({ where: { [idField]: row[idField] }, data: { [jsonField]: fixed } })
      }
    }
  }
  return changed
}

/* ── Targets — editorial content fields only ──────────────────────── */

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  console.log(WRITE ? '✍️  WRITE MODE — changes will be saved\n' : '🔍 DRY RUN — no changes will be saved (pass --write to apply)\n')

  let total = 0

  total += await processTextField(prisma, 'post', 'id', 'title')
  total += await processTextField(prisma, 'post', 'id', 'excerpt')
  total += await processTextField(prisma, 'post', 'id', 'contentHtml', { html: true })

  total += await processTextField(prisma, 'postSeo', 'id', 'metaTitle')
  total += await processTextField(prisma, 'postSeo', 'id', 'metaDesc')

  total += await processJsonField(prisma, 'treatment', 'id', 'data')

  total += await processTextField(prisma, 'pageSeo', 'id', 'title')
  total += await processTextField(prisma, 'pageSeo', 'id', 'description')

  total += await processTextField(prisma, 'testimonial', 'id', 'quote')

  total += await processTextField(prisma, 'person', 'id', 'summary')
  total += await processJsonField(prisma, 'person', 'id', 'bio')

  total += await processTextField(prisma, 'service', 'id', 'summary')
  total += await processJsonField(prisma, 'service', 'id', 'cardBenefits')

  total += await processTextField(prisma, 'siteSettings', 'id', 'tagline')
  total += await processTextField(prisma, 'siteSettings', 'id', 'defaultSeoTitle')
  total += await processTextField(prisma, 'siteSettings', 'id', 'defaultSeoDescription')

  total += await processTextField(prisma, 'newsItem', 'id', 'title')
  total += await processTextField(prisma, 'newsItem', 'id', 'description')

  console.log(`\n${'─'.repeat(60)}`)
  console.log(
    total === 0
      ? 'No malformed dashes found.'
      : `${total} field(s) ${WRITE ? 'updated' : 'would be updated'}.${WRITE ? '' : ' Re-run with --write to apply.'}`,
  )

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
