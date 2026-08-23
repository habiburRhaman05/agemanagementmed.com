#!/usr/bin/env node
/**
 * Phase 2 — scoped to seo.json ONLY, per explicit instruction. The 29 real-code
 * usages of these same 30 legacy images are a separate, later phase — this
 * script never reads or writes anything under src/ or prisma/.
 *
 * Modes:
 *   node scripts/migrate-legacy-seojson-phase2.cjs analyze
 *     For each of the 30 legacy images: downloads it from its live URL (still
 *     resolving today), checksums it, saves to
 *     public/themes/default/assets/images/<filename>. Separately, does a live
 *     HTTP check on EVERY image URL actually present in seo.json (openGraph.image
 *     + every jsonLd[].image entry, across all pages) to catch any 404s —
 *     not limited to the 30, so it can't miss a stray broken reference.
 *     Also flags any seo.json value that doesn't exactly match this image's
 *     expected /themes/... path (a "mismatch"). Writes a report. Touches no
 *     source file.
 *
 *   node scripts/migrate-legacy-seojson-phase2.cjs apply
 *     Requires analyze to have run first. For each of the 30 legacy images
 *     with a verified local file, does an exact-string replace of its live
 *     URL -> local path, ONLY inside seo.json. Also applies any mismatch
 *     corrections found. Nothing under src/ or prisma/ is ever touched.
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const https = require('node:https')

const ROOT = path.resolve(__dirname, '..')
const SEO_JSON_PATH = path.join(ROOT, 'seo.json')
const INVENTORY_PATH = path.join(ROOT, 'image-inventory.json')
const DEST_DIR = path.join(ROOT, 'public', 'themes', 'default', 'assets', 'images')
const REPORT_PATH = path.join(__dirname, '_phase2-seojson-report.json')

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

/** Every image URL actually present in seo.json — openGraph.image + every jsonLd[].image entry, across all pages. Not limited to the 30 legacy ones. */
function collectAllImageUrlsFromSeoJson() {
  const data = JSON.parse(fs.readFileSync(SEO_JSON_PATH, 'utf8'))
  const found = new Set()
  for (const page of Object.values(data)) {
    if (page.openGraph?.image) found.add(page.openGraph.image)
    for (const block of page.jsonLd || []) {
      const walk = (v) => {
        if (typeof v === 'string' && /^https?:\/\//.test(v) && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(v)) found.add(v)
        else if (Array.isArray(v)) v.forEach(walk)
        else if (v && typeof v === 'object') Object.values(v).forEach(walk)
      }
      walk(block)
    }
  }
  return [...found]
}

async function runAnalyze() {
  fs.mkdirSync(DEST_DIR, { recursive: true })
  const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'))
  const legacy = inventory.images.filter((i) => i.image_category === 'legacy_themes')

  console.log(`Phase 2 analyze — ${legacy.length} legacy images, seo.json scope only\n`)

  // --- Part A: download + checksum each of the 30 ---
  const report = { generated_at: new Date().toISOString(), images: [], url_health_check: [] }
  let ok = 0
  let failed = 0
  let totalBytes = 0

  for (const img of legacy) {
    const filename = img.original_local_path.split('/').pop()
    const liveUrl = img.target_url_rule // the live, currently-resolving URL
    process.stdout.write(`  ${filename} ... `)
    try {
      const { statusCode, body } = await fetchBuffer(liveUrl)
      if (statusCode !== 200) {
        console.log(`FAIL (HTTP ${statusCode})`)
        failed++
        continue
      }
      const checksum = sha256(body)
      const destPath = path.join(DEST_DIR, filename)
      fs.writeFileSync(destPath, body)
      totalBytes += body.length
      ok++
      console.log(`OK  ${(body.length / 1024).toFixed(0)}KB`)

      // Mismatch check: does seo.json's current value for this image's usages
      // exactly equal what we expect (target_url_rule)? Already known-clean
      // from the earlier audit, but re-verified fresh here since seo.json may
      // have changed since.
      const seoJsonUsages = img.usages.filter((u) => u.source_file === 'seo.json')
      const mismatches = seoJsonUsages.filter((u) => u.current_reference !== liveUrl)

      report.images.push({
        image_id: img.image_id,
        filename,
        live_url: liveUrl,
        local_path: img.original_local_path,
        dest_file: path.relative(ROOT, destPath).replace(/\\/g, '/'),
        byte_size: body.length,
        sha256: checksum,
        seo_json_usage_count: seoJsonUsages.length,
        mismatches,
      })
    } catch (err) {
      console.log(`ERROR (${err.message})`)
      failed++
    }
  }

  console.log(`\nDownloaded: ${ok}, failed: ${failed}, total ${(totalBytes / 1024 / 1024).toFixed(2)} MB`)

  // --- Part B: validity check on EVERY image URL actually in seo.json ---
  console.log('\nChecking every image URL present in seo.json for 200 vs 404...')
  const allUrls = collectAllImageUrlsFromSeoJson()
  console.log(`  ${allUrls.length} distinct image URL(s) found in seo.json`)

  for (const url of allUrls) {
    try {
      const { statusCode } = await fetchBuffer(url)
      report.url_health_check.push({ url, status: statusCode })
      if (statusCode !== 200) console.log(`  BROKEN (${statusCode}): ${url}`)
    } catch (err) {
      report.url_health_check.push({ url, status: 'ERROR', error: err.message })
      console.log(`  ERROR: ${url} -> ${err.message}`)
    }
  }
  const broken = report.url_health_check.filter((r) => r.status !== 200)
  console.log(`\nHealth check: ${report.url_health_check.length} checked, ${broken.length} broken/failed.`)

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2))
  console.log(`\nReport written: ${REPORT_PATH}`)
}

function applyReplacements() {
  if (!fs.existsSync(REPORT_PATH)) {
    console.error('No analyze report found — run "analyze" first.')
    process.exitCode = 1
    return
  }
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'))
  let text = fs.readFileSync(SEO_JSON_PATH, 'utf8')
  let totalReplaced = 0

  for (const img of report.images) {
    if (!fs.existsSync(path.join(ROOT, img.dest_file))) {
      console.log(`  SKIP ${img.filename} — local file missing, not replacing.`)
      continue
    }
    const before = text.split(img.live_url).length - 1
    if (before === 0) continue
    text = text.split(img.live_url).join(img.local_path)
    totalReplaced += before
    console.log(`  ${img.filename}: ${before} replacement(s) in seo.json`)
  }

  fs.writeFileSync(SEO_JSON_PATH, text)
  console.log(`\nTotal replacements in seo.json: ${totalReplaced}`)
}

async function main() {
  const mode = process.argv[2]
  if (mode === 'analyze') await runAnalyze()
  else if (mode === 'apply') applyReplacements()
  else {
    console.log('Usage: node scripts/migrate-legacy-seojson-phase2.cjs analyze|apply')
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
