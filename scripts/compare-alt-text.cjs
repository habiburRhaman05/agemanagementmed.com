#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')

const downloadMap = require('./_download-alt-map.json')
const codeMap = require('./_code-alt-map.json')

function norm(s) {
  if (s === null || s === undefined) return null
  return s.replace(/\s+/g, ' ').trim()
}

// Filter out non-content noise: tracking pixels, and purely numeric "filenames"
// from placeholder-service URLs (picsum.photos/seed/x/W/H etc.) — nothing in
// download/ could ever correspond to those.
const IGNORE = new Set(['tr'])
function isRealFilename(f) {
  if (IGNORE.has(f)) return false
  if (/^\d+$/.test(f)) return false
  return true
}

let matches = 0
let mismatches = []
let noDownloadEquivalent = []
let ambiguousInDownload = []
let codeMissingAlt = []

for (const [fname, codeOccs] of Object.entries(codeMap)) {
  if (!isRealFilename(fname)) continue
  const downloadOccs = downloadMap[fname]

  if (!downloadOccs) {
    noDownloadEquivalent.push({ filename: fname, codeOccs })
    continue
  }

  const distinctDownloadAlts = [...new Set(downloadOccs.map((o) => norm(o.alt)))].filter((a) => a !== null)

  for (const codeOcc of codeOccs) {
    const codeAlt = norm(codeOcc.alt)
    if (!codeAlt) {
      codeMissingAlt.push({ filename: fname, ...codeOcc })
      continue
    }

    if (distinctDownloadAlts.length === 0) continue // download has no alt text either, nothing to align to

    if (distinctDownloadAlts.length > 1) {
      ambiguousInDownload.push({ filename: fname, codeOcc, distinctDownloadAlts, downloadOccs })
      continue
    }

    const groundTruth = distinctDownloadAlts[0]
    if (codeAlt === groundTruth) {
      matches++
    } else {
      mismatches.push({ filename: fname, codeOcc, current: codeAlt, groundTruth })
    }
  }
}

console.log('='.repeat(90))
console.log('SUMMARY')
console.log('='.repeat(90))
console.log('Exact matches (already correct):', matches)
console.log('Mismatches (need correction):', mismatches.length)
console.log('No download/ equivalent (nothing to align to):', noDownloadEquivalent.length, 'filenames')
console.log('Ambiguous in download/ itself (multiple different alts for same file):', ambiguousInDownload.length)
console.log('Code has no alt text at all:', codeMissingAlt.length)

console.log('\n' + '='.repeat(90))
console.log('MISMATCHES — need correction')
console.log('='.repeat(90))
for (const m of mismatches) {
  console.log(`\n${m.filename}`)
  console.log(`  ${m.codeOcc.file}:${m.codeOcc.line}`)
  console.log(`  current:      ${JSON.stringify(m.current)}`)
  console.log(`  ground truth: ${JSON.stringify(m.groundTruth)}`)
}

console.log('\n' + '='.repeat(90))
console.log('AMBIGUOUS — same filename, different alt text on different live pages (needs manual page-context judgement)')
console.log('='.repeat(90))
for (const a of ambiguousInDownload) {
  console.log(`\n${a.filename}  (code: ${a.codeOcc.file}:${a.codeOcc.line}, current alt: ${JSON.stringify(norm(a.codeOcc.alt))})`)
  a.downloadOccs.forEach((o) => console.log(`   live page ${o.file}: ${JSON.stringify(o.alt)}`))
}

console.log('\n' + '='.repeat(90))
console.log('CODE HAS NO ALT TEXT AT ALL (real accessibility gaps, independent of alignment)')
console.log('='.repeat(90))
for (const c of codeMissingAlt) {
  const dl = downloadMap[c.filename]
  console.log(`${c.filename}  ${c.file}:${c.line}  ${dl ? '(download/ has: ' + JSON.stringify([...new Set(dl.map(o=>o.alt))]) + ')' : '(no download/ equivalent)'}`)
}

fs.writeFileSync(
  path.resolve(__dirname, '_alt-comparison-report.json'),
  JSON.stringify({ matches, mismatches, noDownloadEquivalent, ambiguousInDownload, codeMissingAlt }, null, 2),
)
console.log('\nFull report written to scripts/_alt-comparison-report.json')
