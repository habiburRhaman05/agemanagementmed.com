const fs = require('fs')
const path = require('path')
const https = require('https')

const seoJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seo.json'), 'utf8'))

function norm(s) {
  return s === null || s === undefined ? null : s.replace(/\s+/g, ' ').trim()
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 15000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(fetchHtml(new URL(res.headers.location, url).toString()))
          return
        }
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve({ status: res.statusCode, html: data }))
      })
      .on('error', reject)
      .on('timeout', function () {
        this.destroy()
        reject(new Error('timeout'))
      })
  })
}

function decodeEntities(str) {
  if (!str) return str
  return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return m ? decodeEntities(m[1].trim()) : null
}

function extractDescription(html) {
  const m = html.match(/<meta[^>]*name=["']description["'][^>]*>/i)
  if (!m) return null
  const c = m[0].match(/content=("|')((?:(?!\1).)*)\1/i)
  return c ? decodeEntities(c[2]) : null
}

async function main() {
  const entries = Object.values(seoJson)
  let matchCount = 0
  let mismatchCount = 0
  let errorCount = 0

  for (const page of entries) {
    const liveUrl = page.url
    try {
      const { status, html } = await fetchHtml(liveUrl)
      if (status !== 200) {
        console.log(`  ERROR ${liveUrl} -> live status ${status}`)
        errorCount++
        continue
      }
      const liveTitle = extractTitle(html)
      const liveDesc = extractDescription(html)

      const titleMatch = norm(liveTitle) === norm(page.pageTitle)
      const descMatch = norm(liveDesc) === norm(page.metaDescription)

      if (titleMatch && descMatch) {
        matchCount++
      } else {
        mismatchCount++
        console.log(`\nMISMATCH: ${liveUrl}`)
        if (!titleMatch) {
          console.log(`  title (live):     ${JSON.stringify(liveTitle)}`)
          console.log(`  title (seo.json): ${JSON.stringify(page.pageTitle)}`)
        }
        if (!descMatch) {
          console.log(`  desc  (live):     ${JSON.stringify(liveDesc)}`)
          console.log(`  desc  (seo.json): ${JSON.stringify(page.metaDescription)}`)
        }
      }
    } catch (err) {
      console.log(`  ERROR ${liveUrl} -> ${err.message}`)
      errorCount++
    }
  }

  console.log(`\n${'='.repeat(80)}`)
  console.log(`Checked ${entries.length} pages against the LIVE site.`)
  console.log(`  Exact match:  ${matchCount}`)
  console.log(`  Mismatch:     ${mismatchCount}`)
  console.log(`  Fetch error:  ${errorCount}`)
}

main()
