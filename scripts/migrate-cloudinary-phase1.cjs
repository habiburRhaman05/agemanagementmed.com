#!/usr/bin/env node
/**
 * Phase 1 — migrate ONLY the 65 identified Cloudinary images to local storage.
 * Scope, enforced in code, not just by convention:
 *   - Only URLs in scripts/_cloudinary-urls.txt (the 65) are ever touched.
 *   - The GIF (video-11-img_f8wfjb.gif) is downloaded but never replaced in code.
 *   - Legacy /themes/ Hostinger URLs and existing local /images/ paths are
 *     never read, matched, or written by this script at all.
 *
 * Modes:
 *   node scripts/migrate-cloudinary-phase1.cjs analyze
 *     Downloads all 65, checksums + sharp-analyzes each, writes
 *     scripts/_cloudinary-phase1-report.json. No source file is touched.
 *
 *   node scripts/migrate-cloudinary-phase1.cjs apply
 *     Requires analyze to have run first. Does an exact-string replace of
 *     each non-GIF URL -> /themes/default/assets/images/<filename> across
 *     src/, prisma/, seo.json. Skips the GIF's own occurrence entirely.
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const https = require('node:https')
const sharp = require('sharp')

const ROOT = path.resolve(__dirname, '..')
const URL_LIST_PATH = path.join(__dirname, '_cloudinary-urls.txt')
const REPORT_PATH = path.join(__dirname, '_cloudinary-phase1-report.json')
const DEST_DIR = path.join(ROOT, 'public', 'themes', 'default', 'assets', 'images')

const GIF_MARKER = 'video-11-img_f8wfjb.gif'

// Directories to scan for occurrences — deliberately NOT scanning public/,
// download/, node_modules/, .next/, so no legacy/local asset can ever match.
const SCAN_TARGETS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'prisma'),
  path.join(ROOT, 'seo.json'),
]

function loadUrls() {
  return fs.readFileSync(URL_LIST_PATH, 'utf8').trim().split('\n').filter(Boolean)
}

function filenameFor(url) {
  return new URL(url).pathname.split('/').pop()
}

function fetchBuffer(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 20000 }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
          res.resume()
          resolve(fetchBuffer(new URL(res.headers.location, url).toString(), redirectsLeft - 1))
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve({ statusCode: res.statusCode, body: Buffer.concat(chunks) }))
      })
      .on('error', reject)
      .on('timeout', function () {
        this.destroy()
        reject(new Error('timeout'))
      })
  })
}

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

// ------------------------------------------------------------------
// File scanning — collect every real occurrence of every target URL
// ------------------------------------------------------------------

function walk(dir, exts, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue
      walk(full, exts, out)
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      out.push(full)
    }
  }
}

function collectFiles() {
  const files = []
  for (const target of SCAN_TARGETS) {
    const stat = fs.statSync(target)
    if (stat.isDirectory()) {
      walk(target, ['.ts', '.tsx', '.js', '.jsx', '.json'], files)
    } else {
      files.push(target)
    }
  }
  return files
}

function findOccurrences(urls) {
  const files = collectFiles()
  const byUrl = Object.fromEntries(urls.map((u) => [u, []]))

  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/')
    const text = fs.readFileSync(file, 'utf8')
    const lines = text.split(/\r?\n/)
    for (const url of urls) {
      let idx = -1
      let fromIndex = 0
      while ((idx = text.indexOf(url, fromIndex)) !== -1) {
        const before = text.slice(0, idx)
        const lineNum = before.split(/\r?\n/).length
        byUrl[url].push({ file: rel, line: lineNum, lineText: (lines[lineNum - 1] || '').trim().slice(0, 200) })
        fromIndex = idx + url.length
      }
    }
  }
  return byUrl
}

// ------------------------------------------------------------------
// analyze
// ------------------------------------------------------------------

async function runAnalyze() {
  const urls = loadUrls()
  fs.mkdirSync(DEST_DIR, { recursive: true })

  console.log(`Phase 1 analyze: ${urls.length} Cloudinary URLs\n`)

  console.log('Scanning project for every occurrence...')
  const occurrences = findOccurrences(urls)
  const totalOccurrences = Object.values(occurrences).reduce((s, a) => s + a.length, 0)
  console.log(`  Found ${totalOccurrences} total occurrence(s) across the project.\n`)

  const report = { generated_at: new Date().toISOString(), images: [] }
  let totalBytes = 0
  let ok = 0
  let failed = 0

  for (const url of urls) {
    const filename = filenameFor(url)
    const isGif = filename === GIF_MARKER
    process.stdout.write(`  ${filename} ... `)
    try {
      const { statusCode, body } = await fetchBuffer(url)
      if (statusCode !== 200) {
        console.log(`FAIL (HTTP ${statusCode})`)
        failed++
        continue
      }
      const checksum = sha256(body)
      const destPath = path.join(DEST_DIR, filename)
      fs.writeFileSync(destPath, body)

      let meta = null
      try {
        const m = await sharp(body).metadata()
        meta = { width: m.width, height: m.height, format: m.format }
      } catch {
        meta = { width: null, height: null, format: 'unreadable (likely GIF/non-raster)' }
      }

      totalBytes += body.length
      ok++
      console.log(`OK  ${(body.length / 1024).toFixed(0)}KB  ${meta.width || '?'}x${meta.height || '?'} ${meta.format}`)

      report.images.push({
        url,
        filename,
        is_gif: isGif,
        local_path: `/themes/default/assets/images/${filename}`,
        dest_file: path.relative(ROOT, destPath).replace(/\\/g, '/'),
        byte_size: body.length,
        sha256: checksum,
        dimensions: meta,
        occurrences: occurrences[url] || [],
        occurrence_count: (occurrences[url] || []).length,
        // Oversized-for-usage is a judgement call left for the human report,
        // not auto-applied — this script never changes format/quality itself.
      })
    } catch (err) {
      console.log(`ERROR (${err.message})`)
      failed++
    }
  }

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2))
  console.log(`\nDownloaded: ${ok}, failed: ${failed}`)
  console.log(`Total size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Report written: ${REPORT_PATH}`)
}

// ------------------------------------------------------------------
// apply
// ------------------------------------------------------------------

function applyReplacements() {
  if (!fs.existsSync(REPORT_PATH)) {
    console.error('No analyze report found — run "analyze" first.')
    process.exitCode = 1
    return
  }
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'))

  let filesChanged = 0
  let occurrencesReplaced = 0
  let skippedGif = null

  // Group by file so each file is read/written once.
  const byFile = {}
  for (const img of report.images) {
    if (img.is_gif) {
      skippedGif = img
      continue // GIF reference stays on Cloudinary — explicitly not replaced
    }
    if (!fs.existsSync(path.join(ROOT, img.dest_file))) {
      console.log(`  SKIP ${img.filename} — local file missing on disk, not replacing its references.`)
      continue
    }
    for (const occ of img.occurrences) {
      ;(byFile[occ.file] = byFile[occ.file] || []).push(img.url)
    }
  }

  for (const [rel, urls] of Object.entries(byFile)) {
    const full = path.join(ROOT, rel)
    let text = fs.readFileSync(full, 'utf8')
    let fileChangedHere = 0
    for (const url of new Set(urls)) {
      const img = report.images.find((i) => i.url === url)
      const before = text.split(url).length - 1
      if (before === 0) continue
      text = text.split(url).join(img.local_path)
      fileChangedHere += before
      occurrencesReplaced += before
    }
    if (fileChangedHere > 0) {
      fs.writeFileSync(full, text)
      filesChanged++
      console.log(`  ${rel}: ${fileChangedHere} replacement(s)`)
    }
  }

  console.log(`\nFiles changed: ${filesChanged}`)
  console.log(`Total occurrences replaced: ${occurrencesReplaced}`)
  if (skippedGif) {
    console.log(`\nGIF explicitly skipped (still pointing at Cloudinary, pending your decision): ${skippedGif.url}`)
  }
}

// ------------------------------------------------------------------
// main
// ------------------------------------------------------------------

async function main() {
  const mode = process.argv[2]
  if (mode === 'analyze') await runAnalyze()
  else if (mode === 'apply') applyReplacements()
  else {
    console.log('Usage: node scripts/migrate-cloudinary-phase1.cjs analyze|apply')
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
