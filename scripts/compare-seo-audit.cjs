const fs = require('fs')
const path = require('path')

const seoJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seo.json'), 'utf8'))
const audit = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../client-audit.json'), 'utf8'))

function toPath(url) {
  try {
    const { pathname } = new URL(url)
    return pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  } catch {
    return url
  }
}

function norm(str) {
  if (str === null || str === undefined) return null
  return str.replace(/\s+/g, ' ').trim()
}

// seo.json descriptions preserve source casing; the client audit's "Current
// Meta Description" column is exported all-lowercase — compare case-insensitively
// for description, case-sensitively for title/H1 (those ARE properly cased in
// the audit, so a real case mismatch there is worth surfacing).
function eq(a, b, { caseInsensitive = false } = {}) {
  const na = norm(a)
  const nb = norm(b)
  if (na === null || nb === null) return na === nb
  return caseInsensitive ? na.toLowerCase() === nb.toLowerCase() : na === nb
}

// Build a path-keyed lookup of our extracted data.
const ours = {}
for (const page of Object.values(seoJson)) {
  ours[toPath(page.url)] = page
}

console.log('='.repeat(100))
console.log('PART 1 — Raw Data (title + description), all entries with a real page title')
console.log('='.repeat(100))

let rawMismatches = 0
let rawChecked = 0
let rawNotInOurs = []

for (const row of audit['Raw Data']) {
  if (!row['Page Title']) continue // redirects/404s/txt files — nothing to compare
  const p = toPath(row['Page URL'])
  const mine = ours[p]
  if (!mine) {
    rawNotInOurs.push(row['Page URL'])
    continue
  }
  rawChecked++

  const titleMatch = eq(mine.pageTitle, row['Page Title'])
  const descMatch = eq(mine.metaDescription, row['Description'], { caseInsensitive: true })

  if (!titleMatch || !descMatch) {
    rawMismatches++
    console.log(`\n${p}`)
    if (!titleMatch) {
      console.log(`  TITLE MISMATCH`)
      console.log(`    seo.json: ${JSON.stringify(mine.pageTitle)}`)
      console.log(`    audit:    ${JSON.stringify(row['Page Title'])}`)
    }
    if (!descMatch) {
      console.log(`  DESCRIPTION MISMATCH`)
      console.log(`    seo.json: ${JSON.stringify(mine.metaDescription)}`)
      console.log(`    audit:    ${JSON.stringify(row['Description'])}`)
    }
  }
}

console.log(`\nChecked ${rawChecked} pages against Raw Data. Mismatches: ${rawMismatches}.`)
if (rawNotInOurs.length) {
  console.log(`\nIn audit's Raw Data but NOT in our seo.json (never extracted):`)
  rawNotInOurs.forEach((u) => console.log(`  ${u}`))
}

console.log('\n' + '='.repeat(100))
console.log('PART 2 — Meta Data Optimizations (title + description + H1) — "Current" columns only')
console.log('(Recommended columns are the audit team\'s proposed NEW copy, not a correctness check)')
console.log('='.repeat(100))

let optMismatches = 0
let optChecked = 0

for (const row of audit['Meta Data Optimizations']) {
  const p = toPath(row['Page URL'])
  const mine = ours[p]
  if (!mine) {
    console.log(`\nSKIP (not in seo.json): ${row['Page URL']}`)
    continue
  }
  optChecked++

  const titleMatch = eq(mine.pageTitle, row['Current Meta Title'])
  const descMatch = eq(mine.metaDescription, row['Current Meta Description'], { caseInsensitive: true })
  const h1Match = eq(mine.h1Hero, row['Current H1'])

  if (!titleMatch || !descMatch || !h1Match) {
    optMismatches++
    console.log(`\n${p}`)
    if (!titleMatch) {
      console.log(`  TITLE MISMATCH`)
      console.log(`    seo.json: ${JSON.stringify(mine.pageTitle)}`)
      console.log(`    audit:    ${JSON.stringify(row['Current Meta Title'])}`)
    }
    if (!descMatch) {
      console.log(`  DESCRIPTION MISMATCH`)
      console.log(`    seo.json: ${JSON.stringify(mine.metaDescription)}`)
      console.log(`    audit:    ${JSON.stringify(row['Current Meta Description'])}`)
    }
    if (!h1Match) {
      console.log(`  H1 MISMATCH`)
      console.log(`    seo.json: ${JSON.stringify(mine.h1Hero)}`)
      console.log(`    audit:    ${JSON.stringify(row['Current H1'])}`)
    }
  }
}

console.log(`\nChecked ${optChecked} pages against Meta Data Optimizations. Mismatches: ${optMismatches}.`)

console.log('\n' + '='.repeat(100))
console.log('PART 3 — Redirect / status-code cross-check (pages the audit flagged as 301/302/404)')
console.log('='.repeat(100))
for (const row of audit['Raw Data']) {
  const status = row['HTTP Status Code']
  if (status && status !== 200) {
    console.log(`  ${row['Page URL']}  ->  audit says ${status}`)
  }
}
