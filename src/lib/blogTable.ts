/**
 * Detects tables inside blog post HTML and converts them into structured
 * data so they can be rendered as real <table> components instead of plain
 * text.
 *
 * Blog posts store tables in three different shapes, all of which this
 * module normalizes into `ParsedTable`:
 *
 * 1. Real `<table>` markup (editors that support tables).
 * 2. Escaped tags split across paragraphs — pasting a table into TipTap
 *    (which has no table support) saves it as paragraphs of literal
 *    `&lt;table&gt;`, `&lt;tr&gt;`, `&lt;td&gt;…&lt;/td&gt;` text.
 * 3. A plain "grid" of consecutive paragraphs — three centered, bold
 *    header paragraphs followed by groups of short cell paragraphs
 *    (the shape this site's posts currently use in production).
 *
 * `splitContentIntoSegments` splits post HTML into segments: ordinary HTML
 * is returned verbatim (rendered with dangerouslySetInnerHTML as before),
 * while detected tables come back as structured data for a table component.
 */

export interface ParsedTable {
  headers: string[]
  rows: string[][]
}

export type ContentSegment =
  | { type: 'html'; html: string }
  | { type: 'table'; table: ParsedTable }

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  copy: '©',
  reg: '®',
  trade: '™',
  deg: '°',
  plusmn: '±',
  times: '×',
  divide: '÷',
  micro: 'µ',
  middot: '·',
  bull: '•',
  euro: '€',
  pound: '£',
  yen: '¥',
}

function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (match, body: string) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X'
          ? Number.parseInt(body.slice(2), 16)
          : Number.parseInt(body.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }
    return NAMED_ENTITIES[body] ?? match
  })
}

function stripTags(text: string): string {
  return decodeEntities(text.replace(/<[^>]*>/g, ''))
    .replace(/\u00a0/g, ' ')
    .trim()
}

/* ── Real <table> parsing ─────────────────────────────────────────── */

const TR_RE = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi
const CELL_RE = /<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi

function parseTableMarkup(tableHtml: string): ParsedTable {
  const innerMatch = tableHtml.match(/<table\b[^>]*>([\s\S]*)<\/table>/i)
  const inner = innerMatch ? innerMatch[1] : tableHtml
  const rows = [...inner.matchAll(TR_RE)]
    .map((m) => [...m[1].matchAll(CELL_RE)].map((c) => stripTags(c[2])))
    .filter((row) => row.length > 0)
  if (rows.length === 0) return { headers: [], rows: [] }
  return { headers: rows[0], rows: rows.slice(1) }
}

/* ── Paragraph-based detection (escaped tags + plain grid) ────────── */

const TABLE_TAG_RE = /<\/?(?:table|thead|tbody|tr|th|td)\b[^>]*>/gi
const INLINE_TAG_RE = /<\/?(?:strong|b|em|i|u|s|span|sub|sup)\b[^>]*>/gi

/** True when the text consists solely of table markup (cell text allowed). */
function isOnlyTableMarkup(unescaped: string): boolean {
  const tokens = unescaped.split(/(<\/?[a-zA-Z][^>]*>)/g)
  let inCell = false
  let sawTag = false
  for (const tok of tokens) {
    if (!tok) continue
    if (tok.startsWith('<')) {
      const tag = tok.toLowerCase()
      if (/^<\/?(?:table|thead|tbody|tr)\b/.test(tag)) {
        inCell = false
        sawTag = true
        continue
      }
      if (/^<t[hd]\b/.test(tag)) {
        inCell = true
        sawTag = true
        continue
      }
      if (/^<\/t[hd]>/.test(tag)) {
        inCell = false
        sawTag = true
        continue
      }
      return false
    }
    if (!inCell && tok.trim()) return false
  }
  return sawTag
}

type ParaKind = 'table' | 'header' | 'cell' | 'other'

function innerOf(para: string): string {
  return para.slice(para.indexOf('>') + 1, para.lastIndexOf('</p>'))
}

function classifyPara(para: string): ParaKind {
  const attrs = para.slice(0, para.indexOf('>'))
  const inner = innerOf(para)

  // Escaped-table paragraph: only literal table tags (cell text allowed).
  const unescaped = inner.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  if (unescaped !== unescaped.replace(TABLE_TAG_RE, '') && isOnlyTableMarkup(unescaped)) {
    return 'table'
  }

  if (/<a\b|<img\b|<br\b|<h[1-6]\b|<ul\b|<ol\b|<div\b/i.test(inner)) return 'other'

  const centered = /text-align\s*:\s*center|class\s*=\s*["'][^"']*\b(?:text-center|center)\b/i.test(attrs)
  const boldOnly = /^\s*<(strong|b)(?:\s[^>]*)?>([\s\S]*?)<\/\1>\s*$/.test(inner)
  const text = stripTags(inner)
  if (!text) return 'other'

  if (centered && boldOnly && text.length <= 80) return 'header'
  if (centered) return 'other'
  if (/</.test(inner.replace(INLINE_TAG_RE, ''))) return 'other'
  if (text.length > 100) return 'other'
  return 'cell'
}

interface Tok {
  para: string | null
  gap: string
}

function tokenizeParagraphs(html: string): Tok[] {
  const toks: Tok[] = []
  let last = 0
  for (const m of html.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)) {
    const idx = m.index ?? 0
    toks.push({ para: null, gap: html.slice(last, idx) })
    toks.push({ para: m[0], gap: '' })
    last = idx + m[0].length
  }
  toks.push({ para: null, gap: html.slice(last) })
  return toks.filter((t) => t.para !== null || t.gap.length > 0)
}

function isWhitespaceGap(tok: Tok): boolean {
  return tok.para === null && /^\s*$/.test(tok.gap)
}

function segmentizeHtmlPart(part: string): ContentSegment[] {
  const toks = tokenizeParagraphs(part)
  const segments: ContentSegment[] = []
  let htmlBuf = ''
  const flushHtml = () => {
    if (htmlBuf) {
      segments.push({ type: 'html', html: htmlBuf })
      htmlBuf = ''
    }
  }

  let i = 0
  while (i < toks.length) {
    const tok = toks[i]

    if (tok.para === null) {
      htmlBuf += tok.gap
      i++
      continue
    }

    const kind = classifyPara(tok.para)

    if (kind === 'table') {
      // Collect the run of consecutive table-tag paragraphs (whitespace
      // gaps allowed) until a closing </table> shows up.
      let run = tok.para
      let j = i + 1
      let closed = /&lt;\/table&gt;/i.test(tok.para) || /<\/table>/i.test(tok.para)
      while (!closed && j < toks.length) {
        const nt = toks[j]
        if (nt.para !== null && classifyPara(nt.para) === 'table') {
          run += nt.para
          closed = /&lt;\/table&gt;/i.test(nt.para) || /<\/table>/i.test(nt.para)
          j++
        } else if (isWhitespaceGap(nt)) {
          run += nt.gap
          j++
        } else {
          break
        }
      }
      if (closed) {
        const merged = run
          .replace(/<p\b[^>]*>|<\/p>/g, '')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
        const table = parseTableMarkup(merged)
        if (table.headers.length > 0) {
          flushHtml()
          segments.push({ type: 'table', table })
          i = j
          continue
        }
      }
      htmlBuf += tok.para
      i++
      continue
    }

    if (kind === 'header') {
      // Plain grid: 2-4 centered bold header paragraphs followed by short
      // plain cell paragraphs forming at least two full data rows.
      const headers: string[] = []
      let j = i
      while (j < toks.length && headers.length < 4) {
        const t = toks[j]
        if (t.para !== null && classifyPara(t.para) === 'header') {
          headers.push(stripTags(innerOf(t.para)))
          j++
        } else {
          break
        }
      }
      if (headers.length >= 2) {
        const cells: string[] = []
        const cellIdx: number[] = []
        let k = j
        while (k < toks.length) {
          const t = toks[k]
          if (t.para !== null && classifyPara(t.para) === 'cell') {
            cellIdx.push(k)
            cells.push(stripTags(innerOf(t.para)))
            k++
          } else if (isWhitespaceGap(t)) {
            k++
          } else {
            break
          }
        }
        if (cells.length >= headers.length) {
          // Trailing prose can look like extra cells — trim to a full grid,
          // then require at least two data rows before converting.
          while (cells.length % headers.length !== 0 && cells.length > headers.length) {
            cells.pop()
            cellIdx.pop()
          }
          if (cells.length >= headers.length * 2) {
            flushHtml()
            const rows: string[][] = []
            for (let r = 0; r < cells.length; r += headers.length) {
              rows.push(cells.slice(r, r + headers.length))
            }
            segments.push({ type: 'table', table: { headers, rows } })
            i = cellIdx[cellIdx.length - 1] + 1
            continue
          }
        }
        // Not a grid after all — keep every consumed token as original HTML
        // (and move past them so they aren't re-scanned as a smaller grid).
        htmlBuf += toks
          .slice(i, k)
          .map((t) => t.para ?? t.gap)
          .join('')
        i = k
        continue
      }
    }

    htmlBuf += tok.para
    i++
  }

  flushHtml()
  return segments
}

/* ── Public API ───────────────────────────────────────────────────── */

export function splitContentIntoSegments(html: string): ContentSegment[] {
  if (!html) return []
  const segments: ContentSegment[] = []
  const parts = html.split(/(<table\b[^>]*>[\s\S]*?<\/table>)/gi)
  parts.forEach((part, idx) => {
    if (idx % 2 === 1) {
      const table = parseTableMarkup(part)
      segments.push(table.headers.length > 0 ? { type: 'table', table } : { type: 'html', html: part })
    } else {
      segments.push(...segmentizeHtmlPart(part))
    }
  })
  return segments
}
