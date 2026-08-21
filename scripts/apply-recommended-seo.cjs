const fs = require('fs')
const path = require('path')

const SEO_JSON_PATH = path.resolve(__dirname, '../seo.json')
const AUDIT_PATH = path.resolve(__dirname, '../client-audit.json')

const seoJson = JSON.parse(fs.readFileSync(SEO_JSON_PATH, 'utf8'))
const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8'))

function toPath(url) {
  const { pathname } = new URL(url)
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
}

// Index seo.json entries by normalized path.
const byPath = {}
for (const [key, page] of Object.entries(seoJson)) {
  byPath[toPath(page.url)] = key
}

let updated = 0
let skipped = []

for (const row of audit['Meta Data Optimizations']) {
  const p = toPath(row['Page URL'])
  const key = byPath[p]
  if (!key) {
    skipped.push(row['Page URL'])
    continue
  }

  const page = seoJson[key]
  const before = {
    pageTitle: page.pageTitle,
    metaDescription: page.metaDescription,
    h1Hero: page.h1Hero,
  }

  // Only these three fields change. Everything else on the page (canonical,
  // openGraph, twitter, jsonLd, tracking, robotsMeta, metaTitle) is untouched
  // except metaTitle, which mirrors pageTitle by the original extraction's
  // own convention (this site has no separate <title> vs meta-title concept).
  page.pageTitle = row['Recommended Meta Title']
  page.metaTitle = row['Recommended Meta Title']
  page.metaDescription = row['Recommended Meta Description']
  page.h1Hero = row['Recommended H1']

  updated++
  console.log(`\n${p}`)
  if (before.pageTitle !== page.pageTitle) {
    console.log(`  title: "${before.pageTitle}" -> "${page.pageTitle}"`)
  }
  if (before.metaDescription !== page.metaDescription) {
    console.log(`  desc:  "${before.metaDescription}" -> "${page.metaDescription}"`)
  }
  if (before.h1Hero !== page.h1Hero) {
    console.log(`  h1:    "${before.h1Hero}" -> "${page.h1Hero}"`)
  }
}

fs.writeFileSync(SEO_JSON_PATH, JSON.stringify(seoJson, null, 2), 'utf8')

console.log(`\n${'='.repeat(80)}`)
console.log(`Updated ${updated} page(s) in seo.json with Recommended title/description/H1.`)
if (skipped.length) {
  console.log(`\nSkipped (in audit but not in seo.json):`)
  skipped.forEach((u) => console.log(`  ${u}`))
}
