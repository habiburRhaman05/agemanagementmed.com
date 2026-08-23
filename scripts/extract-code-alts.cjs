#!/usr/bin/env node
/**
 * Scans the actual codebase for every src+alt pair currently in use — both
 * JSX (<img>/<Image> tags) and object-literal shapes ({ src: '...', alt: '...' }),
 * the two patterns this codebase actually uses for images.
 */
'use strict'
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const OUT_PATH = path.resolve(__dirname, '_code-alt-map.json')

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full)
  }
}

const files = []
walk(path.join(ROOT, 'src'), files)
walk(path.join(ROOT, 'prisma'), files)

function basename(src) {
  if (!src) return null
  try {
    return new URL(src).pathname.split('/').pop()
  } catch {
    return src.split('/').pop()
  }
}

// filename -> [{ src, alt, file, line }]
const codeMap = {}
let totalPairs = 0

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const rel = path.relative(ROOT, file).replace(/\\/g, '/')

  // Pattern 1: object literal { src: '...', alt: '...' } — either key order,
  // within a reasonably small window (same object, not a different one).
  const objRe = /\bsrc\s*:\s*(["'`])((?:(?!\1).)*)\1[\s\S]{0,200}?\balt\s*:\s*(["'`])((?:(?!\3).)*)\3|\balt\s*:\s*(["'`])((?:(?!\5).)*)\5[\s\S]{0,200}?\bsrc\s*:\s*(["'`])((?:(?!\7).)*)\7/g
  let m
  while ((m = objRe.exec(text))) {
    const src = m[2] ?? m[8]
    const alt = m[4] ?? m[6]
    const idx = m.index
    const line = text.slice(0, idx).split(/\r?\n/).length
    const fname = basename(src)
    if (!fname) continue
    ;(codeMap[fname] = codeMap[fname] || []).push({ src, alt, file: rel, line, pattern: 'object-literal' })
    totalPairs++
  }

  // Pattern 2: JSX <img .../> or <Image .../> tags, src/alt in either order.
  const jsxRe = /<(?:img|Image)\b[^>]*?\/?>/gs
  let jm
  while ((jm = jsxRe.exec(text))) {
    const tag = jm[0]
    // Skip tags whose src/alt are dynamic expressions we can't statically resolve to a literal filename (e.g. src={item.image.src}) — nothing to compare there.
    const srcMatch = tag.match(/\bsrc\s*=\s*(["'])((?:(?!\1).)*)\1/)
    if (!srcMatch) continue
    const altMatch = tag.match(/\balt\s*=\s*(["'])((?:(?!\1).)*)\1/)
    const src = srcMatch[2]
    const alt = altMatch ? altMatch[2] : null
    const idx = jm.index
    const line = text.slice(0, idx).split(/\r?\n/).length
    const fname = basename(src)
    if (!fname) continue
    ;(codeMap[fname] = codeMap[fname] || []).push({ src, alt, file: rel, line, pattern: 'jsx' })
    totalPairs++
  }
}

console.log(`Scanned ${files.length} .ts/.tsx files.`)
console.log(`Found ${totalPairs} src+alt pair(s) across ${Object.keys(codeMap).length} distinct filenames (statically-resolvable literals only).`)

fs.writeFileSync(OUT_PATH, JSON.stringify(codeMap, null, 2))
console.log(`Written: ${OUT_PATH}`)
