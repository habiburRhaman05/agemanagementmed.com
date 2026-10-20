#!/usr/bin/env node
/**
 * Strips `nofollow` from internal links in blog post HTML (Post.contentHtml
 * and legacy Post.content). Imported WordPress markup carries
 * rel="nofollow" on same-site links, which tells Google not to count them.
 *
 * Dry-run by default — prints every change it *would* make without writing
 * anything. Pass --write to actually persist.
 *
 *   node scripts/remove-nofollow-internal-links.cjs           # dry run
 *   node scripts/remove-nofollow-internal-links.cjs --write   # applies
 *
 * Internal = href that starts with "/" or "#", or resolves to this site's
 * hosts (agemanagementmed.com / www.agemanagementmed.com). External links
 * and anchors without a rel attribute are left untouched. On internal
 * links, the `nofollow` token is removed from rel while any other tokens
 * (noopener, noreferrer, …) are kept; if rel is left empty, the attribute
 * is dropped entirely.
 */

require('dotenv').config()
const { PrismaClient } = require('../src/lib/generated/prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const WRITE = process.argv.includes('--write')

const SITE_HOSTS = new Set(['agemanagementmed.com', 'www.agemanagementmed.com'])

function isInternalHref(href) {
  if (!href) return false
  const h = href.trim().toLowerCase()
  if (h.startsWith('/') || h.startsWith('#') || /^\.\.?\//.test(h)) return true
  try {
    return SITE_HOSTS.has(new URL(h).hostname.toLowerCase())
  } catch {
    return false
  }
}

/** Returns [before, after] for every <a> tag whose rel lost a nofollow token. */
function stripNofollowFromHtml(html) {
  if (!html) return html
  const changes = []
  const fixed = html.replace(/<a\b[^>]*>/gi, (tag) => {
    const relMatch = tag.match(/(\s*)rel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
    if (!relMatch) return tag
    const relValue = relMatch[2] ?? relMatch[3] ?? relMatch[4]
    const tokens = relValue.split(/\s+/).filter(Boolean)
    if (!tokens.some((t) => t.toLowerCase() === 'nofollow')) return tag

    const hrefMatch = tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
    const href = hrefMatch ? hrefMatch[1] ?? hrefMatch[2] ?? hrefMatch[3] : ''
    if (!isInternalHref(href)) return tag

    const kept = tokens.filter((t) => t.toLowerCase() !== 'nofollow')
    const replaced = kept.length === 0 ? '' : `${relMatch[1]}rel="${kept.join(' ')}"`
    const newTag = tag.replace(relMatch[0], replaced)
    changes.push([tag, newTag])
    return newTag
  })
  return { fixed, changes }
}

async function processPostField(prisma, field) {
  const rows = await prisma.post.findMany({ select: { id: true, slug: true, [field]: true } })
  let changedPosts = 0
  let changedLinks = 0
  for (const row of rows) {
    const original = row[field]
    if (!original) continue
    const { fixed, changes } = stripNofollowFromHtml(original)
    if (changes.length > 0) {
      changedPosts++
      changedLinks += changes.length
      console.log(`\n[post.${field}] slug=${row.slug}`)
      for (const [before, after] of changes) {
        console.log(`  - ${before}`)
        console.log(`  + ${after}`)
      }
      if (WRITE) {
        await prisma.post.update({ where: { id: row.id }, data: { [field]: fixed } })
      }
    }
  }
  return { changedPosts, changedLinks }
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  console.log(
    WRITE
      ? 'WRITE MODE — changes will be saved\n'
      : 'DRY RUN — no changes will be saved (pass --write to apply)\n',
  )

  let totalPosts = 0
  let totalLinks = 0
  for (const field of ['contentHtml', 'content']) {
    const { changedPosts, changedLinks } = await processPostField(prisma, field)
    totalPosts += changedPosts
    totalLinks += changedLinks
  }

  console.log(`\n${'─'.repeat(60)}`)
  console.log(
    totalLinks === 0
      ? 'No nofollow internal links found.'
      : `${totalLinks} nofollow internal link(s) across ${totalPosts} post(s) ${WRITE ? 'updated' : 'would be updated'}.${WRITE ? '' : ' Re-run with --write to apply.'}`,
  )

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
