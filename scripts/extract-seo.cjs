const fs = require('fs')
const path = require('path')

const DOWNLOAD_DIR = path.resolve(__dirname, '../../download')
const OUT_FILE = path.resolve(__dirname, '../seo.json')

// Batch 1 (already in seo.json)
const PAGES_BATCH_1 = [
  { url: 'https://www.agemanagementmed.com/platelet-rich-plasma-hair/', file: '_platelet-rich-plasma-hair_.html' },
  { url: 'https://www.agemanagementmed.com/concierge-medical-weight-loss/female/', file: '_concierge-medical-weight-loss_female_.html' },
  { url: 'https://www.agemanagementmed.com/concierge-medical-weight-loss/male/', file: '_concierge-medical-weight-loss_male_.html' },
  { url: 'https://www.agemanagementmed.com/perimenopause-menopause/', file: '_perimenopause-menopause_.html' },
  { url: 'https://www.agemanagementmed.com/rejuvenation-enhancement/female/', file: '_rejuvenation-enhancement_female_.html' },
  { url: 'https://www.agemanagementmed.com/rejuvenation-enhancement/male/', file: '_rejuvenation-enhancement_male_.html' },
  { url: 'https://www.agemanagementmed.com/glp-1-microdosing/female/', file: '_glp-1-microdosing_female_.html' },
  { url: 'https://www.agemanagementmed.com/glp-1-microdosing/male/', file: '_glp-1-microdosing_male_.html' },
]

// Batch 2 — new this run
const PAGES_BATCH_2 = [
  { url: 'https://www.agemanagementmed.com/platelet-rich-plasma-hair/male/', file: '_platelet-rich-plasma-hair_male_.html' },
  { url: 'https://www.agemanagementmed.com/bioidentical-hormone-replacement-therapy/', file: '_bioidentical-hormone-replacement-therapy_.html' },
  { url: 'https://www.agemanagementmed.com/rejuvenation-enhancement/', file: '_rejuvenation-enhancement_.html' },
  { url: 'https://www.agemanagementmed.com/concierge-medical-weight-loss/', file: '_concierge-medical-weight-loss_.html' },
  { url: 'https://www.agemanagementmed.com/laser-vaginal-therapy/', file: '_laser-vaginal-therapy_.html' },
  { url: 'https://www.agemanagementmed.com/shockwave-therapy/', file: '_shockwave-therapy_.html' },
  { url: 'https://www.agemanagementmed.com/our-experts/', file: '_our-experts_.html' },
  { url: 'https://www.agemanagementmed.com/office-policies/', file: '_office-policies_.html' },
  { url: 'https://www.agemanagementmed.com/newsletter/', file: '_newsletter_.html' },
]

// Batch 3 — new this run
const PAGES_BATCH_3 = [
  { url: 'https://www.agemanagementmed.com/in-the-news/', file: '_in-the-news_.html' },
  { url: 'https://www.agemanagementmed.com/statesboro/', file: '_statesboro_.html' },
  // Non-www variant of the homepage — same source file as the canonical `/`.
  { url: 'https://agemanagementmed.com/', file: '_index_.html' },
  { url: 'https://www.agemanagementmed.com/financing-options/', file: '_financing-options_.html' },
  { url: 'https://www.agemanagementmed.com/contact-us/', file: '_contact-us_.html' },
  { url: 'https://www.agemanagementmed.com/blog/', file: '_blog_.html' },
  { url: 'https://www.agemanagementmed.com/blog/hormone-health-explained/', file: '_blog_hormone-health-explained_.html' },
  { url: 'https://www.agemanagementmed.com/blog/semaglutide-vs-tirzepatide-for-weight-loss-how-clinicians-decide/', file: '_blog_semaglutide-vs-tirzepatide-for-weight-loss-how-clinicians-decide_.html' },
  { url: 'https://www.agemanagementmed.com/blog/low-testosterone-and-erectile-dysfunction/', file: '_blog_low-testosterone-and-erectile-dysfunction_.html' },
  { url: 'https://www.agemanagementmed.com/blog/low-testosterone-symptoms-for-men-in-their-40s/', file: '_blog_low-testosterone-symptoms-for-men-in-their-40s_.html' },
]

const PAGES = [...PAGES_BATCH_1, ...PAGES_BATCH_2, ...PAGES_BATCH_3]

function matchOne(html, re) {
  const m = html.match(re)
  return m ? m[1].trim() : null
}

function matchAll(html, re) {
  return [...html.matchAll(re)].map((m) => m[1])
}

function decodeEntities(str) {
  if (!str) return str
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function extractMetaContent(html, attr, value) {
  const re = new RegExp(`<meta[^>]*${attr}=["']${value}["'][^>]*>`, 'i')
  const tag = html.match(re)?.[0]
  if (!tag) return null
  // `content` is matched against whichever quote character actually opens it
  // (a backreference), not a shared [^"'] class — a real apostrophe inside a
  // double-quoted value (e.g. "your body's growth factors") would otherwise
  // be misread as the closing quote and silently truncate the string.
  const content = tag.match(/content=("|')((?:(?!\1).)*)\1/i)
  return content ? decodeEntities(content[2]) : null
}

/**
 * Some source pages hand-wrap a long string value (typically `description`)
 * across multiple lines without escaping the newline — raw control characters
 * inside a JSON string are invalid per spec, so `JSON.parse` rejects the
 * whole block even though every other field is fine. Since the wrapping is
 * purely a source-authoring artifact (not meaningful `\n` content), collapse
 * any run of raw whitespace *inside* a quoted string to a single space before
 * parsing — this repairs that one bug class without touching well-formed JSON.
 */
function repairEmbeddedNewlines(raw) {
  let out = ''
  let inString = false
  let escaped = false
  for (const ch of raw) {
    if (inString) {
      if (escaped) {
        out += ch
        escaped = false
      } else if (ch === '\\') {
        out += ch
        escaped = true
      } else if (ch === '"') {
        out += ch
        inString = false
      } else if (ch === '\n' || ch === '\r' || ch === '\t') {
        // Collapse to a single space, but don't stack spaces if the source
        // already had one before the line break.
        if (!out.endsWith(' ')) out += ' '
      } else {
        out += ch
      }
    } else {
      if (ch === '"') inString = true
      out += ch
    }
  }
  return out
}

function extractJsonLd(html) {
  const blocks = matchAll(html, /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  return blocks
    .map((b) => {
      const trimmed = b.trim()
      try {
        return JSON.parse(trimmed)
      } catch {
        try {
          return JSON.parse(repairEmbeddedNewlines(trimmed))
        } catch {
          return { _parseError: true, raw: trimmed.slice(0, 500) }
        }
      }
    })
}

function detectTracking(html) {
  const tracking = {}

  // Meta Pixel (Facebook)
  const fbPixelId = html.match(/fbq\(\s*['"]init['"]\s*,\s*['"](\d+)['"]/)?.[1]
  tracking.metaPixel = fbPixelId
    ? { present: true, pixelId: fbPixelId }
    : { present: /connect\.facebook\.net|fbevents\.js/.test(html) }

  // Google Tag Manager
  const gtmId = html.match(/GTM-[A-Z0-9]+/)?.[0]
  tracking.googleTagManager = gtmId ? { present: true, containerId: gtmId } : { present: false }

  // Google Analytics (gtag.js / GA4)
  const gaId = html.match(/G-[A-Z0-9]+/)?.[0] || html.match(/UA-\d+-\d+/)?.[0]
  tracking.googleAnalytics = gaId ? { present: true, measurementId: gaId } : { present: false }

  // Other trackers seen in this codebase (Hotjar, Metricool, Plausible)
  tracking.hotjar = { present: /hotjar/i.test(html) }
  tracking.metricool = { present: /metricool/i.test(html) }
  tracking.plausible = { present: /plausible\.io|outbound-links/i.test(html) }

  return tracking
}

function extractPage(filePath, url) {
  const html = fs.readFileSync(filePath, 'utf8')

  const title = decodeEntities(matchOne(html, /<title[^>]*>([\s\S]*?)<\/title>/i))
  const metaDescription = extractMetaContent(html, 'name', 'description')
  const canonical = matchOne(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || matchOne(html, /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)

  const ogTitle = extractMetaContent(html, 'property', 'og:title')
  const ogDescription = extractMetaContent(html, 'property', 'og:description')
  const ogImage = extractMetaContent(html, 'property', 'og:image')
  const ogType = extractMetaContent(html, 'property', 'og:type')
  const twitterTitle = extractMetaContent(html, 'name', 'twitter:title')
  const twitterDescription = extractMetaContent(html, 'name', 'twitter:description')
  const robotsMeta = extractMetaContent(html, 'name', 'robots')

  // H1 — the hero heading. Take the first <h1>, strip nested tags, collapse whitespace.
  const h1Raw = matchOne(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const h1 = h1Raw ? decodeEntities(h1Raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : null

  const jsonLd = extractJsonLd(html)
  const tracking = detectTracking(html)

  return {
    url,
    sourceFile: path.basename(filePath),
    pageTitle: title,
    metaTitle: title, // this site has no separate og:title-as-metaTitle distinction; <title> IS the meta title
    metaDescription,
    h1Hero: h1,
    canonical,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      type: ogType,
    },
    twitter: {
      title: twitterTitle,
      description: twitterDescription,
    },
    robotsMeta,
    jsonLd,
    tracking,
  }
}

const result = {}
for (const page of PAGES) {
  const filePath = path.join(DOWNLOAD_DIR, page.file)
  if (!fs.existsSync(filePath)) {
    result[page.url] = { error: `File not found: ${page.file}` }
    continue
  }
  result[page.url] = extractPage(filePath, page.url)
}

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2), 'utf8')
console.log(`Wrote ${Object.keys(result).length} pages to ${OUT_FILE}`)
for (const [url, data] of Object.entries(result)) {
  console.log(`\n${url}`)
  console.log(`  title: ${data.pageTitle}`)
  console.log(`  h1: ${data.h1Hero}`)
  console.log(`  canonical: ${data.canonical}`)
  console.log(`  jsonLd blocks: ${data.jsonLd?.length ?? 0}`)
  console.log(`  metaPixel: ${JSON.stringify(data.tracking?.metaPixel)}`)
  console.log(`  gtm: ${JSON.stringify(data.tracking?.googleTagManager)}`)
}
