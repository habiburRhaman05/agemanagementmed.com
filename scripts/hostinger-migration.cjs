#!/usr/bin/env node
/**
 * Hostinger legacy-image migration — snapshot + verify.
 *
 * Two modes, matching the two moments this actually needs to happen:
 *
 *   node scripts/hostinger-migration.cjs snapshot [--only=IMG-001,IMG-002] [--chunk=N]
 *     Downloads each legacy_themes image from its CURRENT live URL (these already
 *     resolve today — they're hotlinked from the live site) and records its SHA-256
 *     checksum + byte size to hostinger-migration/manifest.json. Safe to run right
 *     now: no Hostinger credentials needed, makes no code/DB changes, only writes
 *     into hostinger-migration/ (downloaded files + manifest).
 *
 *   node scripts/hostinger-migration.cjs verify [--only=IMG-001,IMG-002] [--chunk=N]
 *                                                [--override-host=<ip-or-hostname>] [--insecure]
 *     Re-fetches each image's target_url_rule (the intended Hostinger URL) and
 *     compares its checksum against the snapshot manifest. Only on an EXACT
 *     checksum match does it write new_hostinger_url + migration_status into
 *     image-inventory.json (and the matching chunk file, if --chunk was used).
 *     Any mismatch, error, or missing snapshot is reported and left untouched —
 *     this script never guesses; it only ever confirms.
 *
 *     --override-host lets you verify against Hostinger BEFORE DNS cutover: point
 *     the actual TCP connection at Hostinger's IP/temp hostname while still
 *     sending `Host: www.agemanagementmed.com` and validating the URL path — the
 *     standard way to test a target server before it's the one the domain
 *     actually resolves to. --insecure skips TLS hostname verification, which
 *     you'll likely need when hitting a raw IP under a cert that doesn't cover it.
 *
 * This script never uploads anything — it has no FTP/SFTP/API code at all. The
 * actual upload (however you choose to do it: File Manager, FTP client, a
 * separate script once you tell me the access method) happens between these two
 * commands. This script only proves, with a checksum rather than a guess,
 * whether that upload actually produced the exact same file at the exact URL.
 */
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const https = require('node:https')
const http = require('node:http')

const ROOT = path.resolve(__dirname, '..')
const INVENTORY_PATH = path.join(ROOT, 'image-inventory.json')
const MIGRATION_DIR = path.join(ROOT, 'hostinger-migration')
const MANIFEST_PATH = path.join(MIGRATION_DIR, 'manifest.json')
const FILES_DIR = path.join(MIGRATION_DIR, 'files')

// ------------------------------------------------------------------
// CLI parsing
// ------------------------------------------------------------------

function parseArgs(argv) {
  const mode = argv[2]
  const flags = {}
  for (const arg of argv.slice(3)) {
    const m = arg.match(/^--([^=]+)=(.*)$/)
    if (m) flags[m[1]] = m[2]
    else if (arg.startsWith('--')) flags[arg.slice(2)] = true
  }
  return { mode, flags }
}

function loadTargetImages(flags) {
  let images
  let chunkFile = null

  if (flags.chunk) {
    chunkFile = path.join(ROOT, `image-inventory-chunk-${flags.chunk}.json`)
    if (!fs.existsSync(chunkFile)) {
      throw new Error(`Chunk file not found: ${chunkFile}`)
    }
    images = JSON.parse(fs.readFileSync(chunkFile, 'utf8')).images
  } else {
    if (!fs.existsSync(INVENTORY_PATH)) {
      throw new Error(`image-inventory.json not found at ${INVENTORY_PATH}`)
    }
    images = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8')).images.filter(
      (i) => i.image_category === 'legacy_themes',
    )
  }

  if (flags.only) {
    const only = new Set(String(flags.only).split(',').map((s) => s.trim()))
    images = images.filter((i) => only.has(i.image_id))
  }

  return { images, chunkFile }
}

// ------------------------------------------------------------------
// HTTP helpers
// ------------------------------------------------------------------

/**
 * Fetches a URL to a Buffer, following redirects. When `overrideHost` is set,
 * the TCP connection targets that host/IP instead of the URL's own host, while
 * the request still sends the URL's real hostname in the Host header and SNI —
 * the standard technique for testing a server before DNS points at it.
 */
function fetchBuffer(url, { overrideHost, insecure } = {}, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const isHttps = parsed.protocol === 'https:'
    const client = isHttps ? https : http

    const options = {
      hostname: overrideHost || parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: { Host: parsed.hostname, 'User-Agent': 'hostinger-migration-verify/1.0' },
    }
    if (isHttps) {
      options.servername = parsed.hostname // SNI — send the real hostname even when connecting to overrideHost's IP
      if (insecure) options.rejectUnauthorized = false
    }

    const req = client.request(options, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
        res.resume()
        const nextUrl = new URL(res.headers.location, url).toString()
        resolve(fetchBuffer(nextUrl, { overrideHost, insecure }, redirectsLeft - 1))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve({ statusCode: res.statusCode, body: Buffer.concat(chunks) }))
    })
    req.on('error', reject)
    req.setTimeout(20000, () => req.destroy(new Error('timeout')))
    req.end()
  })
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

function safeFileName(imageId, url) {
  const ext = path.extname(new URL(url).pathname) || ''
  return `${imageId}${ext}`
}

// ------------------------------------------------------------------
// snapshot
// ------------------------------------------------------------------

async function runSnapshot(flags) {
  const { images } = loadTargetImages(flags)
  fs.mkdirSync(FILES_DIR, { recursive: true })

  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  console.log(`Snapshotting ${images.length} image(s) from their current live URL...\n`)

  let ok = 0
  let failed = 0

  for (const img of images) {
    // The current live source is whatever's already resolving today — the
    // first usage's current_reference (they're identical across usages for a
    // given image_id by construction) rather than target_url_rule, so this
    // works even before target_url_rule and the live URL happen to match.
    const sourceUrl = img.usages[0]?.current_reference?.startsWith('http')
      ? img.usages[0].current_reference
      : img.target_url_rule
    try {
      const { statusCode, body } = await fetchBuffer(sourceUrl)
      if (statusCode !== 200) {
        console.log(`  FAIL  ${img.image_id}  ${sourceUrl}  -> HTTP ${statusCode}`)
        failed++
        continue
      }
      const checksum = sha256(body)
      const fileName = safeFileName(img.image_id, sourceUrl)
      fs.writeFileSync(path.join(FILES_DIR, fileName), body)
      manifest[img.image_id] = {
        source_url: sourceUrl,
        target_url: img.target_url_rule,
        file_name: fileName,
        sha256: checksum,
        byte_size: body.length,
        snapshotted_at: new Date().toISOString(),
      }
      console.log(`  OK    ${img.image_id}  ${body.length} bytes  sha256:${checksum.slice(0, 12)}...`)
      ok++
    } catch (err) {
      console.log(`  ERROR ${img.image_id}  ${sourceUrl}  -> ${err.message}`)
      failed++
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nSnapshot done. OK: ${ok}, failed: ${failed}. Manifest: ${MANIFEST_PATH}`)
}

// ------------------------------------------------------------------
// verify
// ------------------------------------------------------------------

async function runVerify(flags) {
  const { images, chunkFile } = loadTargetImages(flags)

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`No manifest at ${MANIFEST_PATH} — run "snapshot" first.`)
    process.exitCode = 1
    return
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))

  const overrideHost = flags['override-host'] || null
  const insecure = Boolean(flags.insecure)

  console.log(`Verifying ${images.length} image(s) against their target Hostinger URL...`)
  if (overrideHost) console.log(`(connecting via override host: ${overrideHost})`)
  console.log('')

  let verified = 0
  let mismatched = 0
  let errored = 0
  let noSnapshot = 0

  // Track which image_ids get confirmed, to write back into the JSON files.
  const confirmations = {}

  for (const img of images) {
    const snap = manifest[img.image_id]
    if (!snap) {
      console.log(`  NO SNAPSHOT  ${img.image_id}  -> run snapshot first, skipping`)
      noSnapshot++
      continue
    }

    try {
      const { statusCode, body } = await fetchBuffer(img.target_url_rule, { overrideHost, insecure })
      if (statusCode !== 200) {
        console.log(`  FAIL  ${img.image_id}  ${img.target_url_rule}  -> HTTP ${statusCode}`)
        mismatched++
        continue
      }
      const checksum = sha256(body)
      if (checksum === snap.sha256 && body.length === snap.byte_size) {
        console.log(`  MATCH  ${img.image_id}  ${img.target_url_rule}`)
        confirmations[img.image_id] = img.target_url_rule
        verified++
      } else {
        console.log(
          `  MISMATCH  ${img.image_id}  ${img.target_url_rule}\n` +
            `    expected sha256:${snap.sha256.slice(0, 12)}... (${snap.byte_size}B)\n` +
            `    got      sha256:${checksum.slice(0, 12)}... (${body.length}B)`,
        )
        mismatched++
      }
    } catch (err) {
      console.log(`  ERROR ${img.image_id}  ${img.target_url_rule}  -> ${err.message}`)
      errored++
    }
  }

  console.log(
    `\nVerify done. Matched: ${verified}, mismatched: ${mismatched}, errored: ${errored}, no snapshot: ${noSnapshot}.`,
  )

  if (verified === 0) {
    console.log('Nothing confirmed — image-inventory.json left untouched.')
    return
  }

  if (!flags.write) {
    console.log(`\n${verified} image(s) verified — pass --write to record them into image-inventory.json${chunkFile ? ' and the chunk file' : ''}.`)
    return
  }

  // Write confirmations into the master inventory.
  const inventory = JSON.parse(fs.readFileSync(INVENTORY_PATH, 'utf8'))
  let updatedInMaster = 0
  for (const img of inventory.images) {
    if (confirmations[img.image_id]) {
      img.new_hostinger_url = confirmations[img.image_id]
      img.migration_status = 'verified'
      updatedInMaster++
    }
  }
  fs.writeFileSync(INVENTORY_PATH, JSON.stringify(inventory, null, 2))
  console.log(`Updated ${updatedInMaster} record(s) in image-inventory.json.`)

  // Mirror into the chunk file too, if this run was scoped to one.
  if (chunkFile) {
    const chunk = JSON.parse(fs.readFileSync(chunkFile, 'utf8'))
    let updatedInChunk = 0
    for (const img of chunk.images) {
      if (confirmations[img.image_id]) {
        img.new_hostinger_url = confirmations[img.image_id]
        img.migration_status = 'verified'
        updatedInChunk++
      }
    }
    fs.writeFileSync(chunkFile, JSON.stringify(chunk, null, 2))
    console.log(`Updated ${updatedInChunk} record(s) in ${path.basename(chunkFile)}.`)
  }
}

// ------------------------------------------------------------------
// main
// ------------------------------------------------------------------

async function main() {
  const { mode, flags } = parseArgs(process.argv)

  if (mode === 'snapshot') {
    await runSnapshot(flags)
  } else if (mode === 'verify') {
    await runVerify(flags)
  } else {
    console.log(`Usage:
  node scripts/hostinger-migration.cjs snapshot [--only=IMG-001,IMG-002] [--chunk=N]
  node scripts/hostinger-migration.cjs verify   [--only=IMG-001,IMG-002] [--chunk=N] [--write]
                                                 [--override-host=<ip-or-hostname>] [--insecure]`)
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
