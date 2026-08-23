#!/usr/bin/env node
/**
 * Builds the ground-truth alt-text map from download/*.html — the live-site
 * copy. For every <img> tag, pairs its src (or data-src, the lazy-load
 * pattern this site uses) with its alt, keyed by filename basename.
 *
 * The same filename can appear with different alt text on different pages
 * (or even the same page) — this records EVERY occurrence, not just one, so
 * a later comparison can see when the live site itself isn't consistent.
 */
'use strict'
const fs = require('fs')
const path = require('path')

const DOWNLOAD_DIR = path.resolve(__dirname, '../../download')
const OUT_PATH = path.resolve(__dirname, '_download-alt-map.json')

function decodeEntities(str) {
  if (!str) return str
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

/** Extracts one attribute's value from a tag string, quote-aware (handles an apostrophe inside a double-quoted value). */
function getAttr(tag, name) {
  const re = new RegExp(`\\b${name}=("|')((?:(?!\\1).)*)\\1`, 'i')
  const m = tag.match(re)
  return m ? decodeEntities(m[2]) : null
}

function basename(src) {
  if (!src) return null
  return src.split('/').pop().split('?')[0]
}

const files = fs.readdirSync(DOWNLOAD_DIR).filter((f) => f.endsWith('.html'))
console.log(`Scanning ${files.length} download/ HTML files...\n`)

// filename -> [{ src, alt, file, tag }]
const altMap = {}

for (const file of files) {
  const html = fs.readFileSync(path.join(DOWNLOAD_DIR, file), 'utf8')
  const imgTags = html.match(/<img\b[^>]*>/gi) || []
  for (const tag of imgTags) {
    const src = getAttr(tag, 'src') || getAttr(tag, 'data-src')
    const alt = getAttr(tag, 'alt')
    const fname = basename(src)
    if (!fname) continue
    ;(altMap[fname] = altMap[fname] || []).push({ src, alt, file, tag: tag.slice(0, 200) })
  }
}

const totalTags = Object.values(altMap).reduce((s, a) => s + a.length, 0)
console.log(`Found ${totalTags} <img> tags across ${Object.keys(altMap).length} distinct filenames.`)

// Report filenames with inconsistent alt text across occurrences (worth knowing before treating any one as "the" ground truth).
let inconsistent = 0
for (const [fname, occs] of Object.entries(altMap)) {
  const distinctAlts = new Set(occs.map((o) => o.alt))
  if (distinctAlts.size > 1) inconsistent++
}
console.log(`Filenames with inconsistent alt text across the live site itself: ${inconsistent}`)

fs.writeFileSync(OUT_PATH, JSON.stringify(altMap, null, 2))
console.log(`\nWritten: ${OUT_PATH}`)
