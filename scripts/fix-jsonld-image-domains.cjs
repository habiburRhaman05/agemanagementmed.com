#!/usr/bin/env node
/**
 * Puts the domain back specifically inside seo.json's jsonLd[].image fields —
 * and ONLY there. openGraph.image / twitter.image and everything else stay
 * exactly as they are (relative, correctly auto-resolved by metadataBase).
 *
 * This has to be a structured JSON walk, not a text replace: the same
 * relative-path string legitimately appears in both openGraph.image (leave
 * alone) and jsonLd[].image (needs the domain) — a blind string replace can't
 * tell those two locations apart.
 */
'use strict'
const fs = require('fs')
const path = require('path')

const SEO_JSON_PATH = path.resolve(__dirname, '..', 'seo.json')
const DOMAIN = 'https://www.agemanagementmed.com'

const data = JSON.parse(fs.readFileSync(SEO_JSON_PATH, 'utf8'))

let changed = 0
const touchedPaths = new Set()

function fixImageValue(v) {
  if (typeof v !== 'string') return v
  if (v.startsWith('/')) {
    changed++
    touchedPaths.add(v)
    return DOMAIN + v
  }
  return v
}

/** Walks a jsonLd block looking specifically for keys literally named "image" (schema.org's field name), fixing only those — not every string in the block. */
function walkJsonLdBlock(node) {
  if (Array.isArray(node)) {
    node.forEach(walkJsonLdBlock)
    return
  }
  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      if (key === 'image') {
        if (Array.isArray(node[key])) {
          node[key] = node[key].map(fixImageValue)
        } else {
          node[key] = fixImageValue(node[key])
        }
      } else {
        walkJsonLdBlock(node[key])
      }
    }
  }
}

for (const page of Object.values(data)) {
  for (const block of page.jsonLd || []) {
    walkJsonLdBlock(block)
  }
}

fs.writeFileSync(SEO_JSON_PATH, JSON.stringify(data, null, 2))
console.log(`Fixed ${changed} jsonLd[].image occurrence(s).`)
console.log('Distinct relative paths that got the domain added:')
;[...touchedPaths].forEach((p) => console.log('  ' + p))
