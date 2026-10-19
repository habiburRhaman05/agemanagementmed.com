import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ArticleBody } from '@/components/blog/ArticleBody'
import { splitContentIntoSegments } from '@/lib/blogTable'

afterEach(cleanup)

/** The exact table block currently served in production for
 * /blog/semaglutide-vs-tirzepatide-for-weight-loss-how-clinicians-decide —
 * a plain paragraph grid: three centered bold headers + six rows of three
 * short paragraphs, followed by a normal prose paragraph. */
const LIVE_GRID_FIXTURE =
  '<p style="text-align: center;"><strong>Feature</strong></p>' +
  '<p style="text-align: center;"><strong>Semaglutide</strong></p>' +
  '<p style="text-align: center;"><strong>Tirzepatide</strong></p>' +
  '<p>Medication class</p>' +
  '<p>GLP-1 receptor agonist</p>' +
  '<p>Dual GIP + GLP-1 receptor agonist</p>' +
  '<p>Primary metabolic effects</p>' +
  '<p>Appetite regulation and glucose stabilization</p>' +
  '<p>Appetite regulation plus enhanced insulin signaling pathways</p>' +
  '<p>Weight loss mechanism</p>' +
  '<p>Reduced caloric intake and delayed gastric emptying</p>' +
  '<p>Reduced caloric intake with broader metabolic hormone activity</p>' +
  '<p>Treatment approach</p>' +
  '<p>Individualized dosing and monitoring</p>' +
  '<p>Individualized dosing and monitoring</p>' +
  '<p>Clinical selection factors</p>' +
  '<p>Metabolic profile, tolerance, history</p>' +
  '<p>Metabolic profile, tolerance, insulin resistance pattern</p>' +
  '<p>Intended use</p>' +
  '<p>Prescription therapy under medical supervision</p>' +
  '<p>Prescription therapy under medical supervision</p>' +
  '<p>This comparison table highlights differences in mechanisms, though one therapy is not universally superior.</p>'

/** The older WordPress-import shape: literal table tags broken across
 * paragraphs (what a pasted table looks like when the editor has no table
 * support). */
const ESCAPED_TABLE_FIXTURE =
  '<p style="text-align: center;">&lt;table&gt;</p>' +
  '<p>  &lt;thead&gt;</p>' +
  '<p>    &lt;tr&gt;&lt;th&gt;Feature&lt;/th&gt;&lt;th&gt;Semaglutide&lt;/th&gt;&lt;th&gt;Tirzepatide&lt;/th&gt;&lt;/tr&gt;</p>' +
  '<p>  &lt;/thead&gt;</p>' +
  '<p>  &lt;tbody&gt;</p>' +
  '<p>    &lt;tr&gt;&lt;td&gt;Medication class&lt;/td&gt;&lt;td&gt;GLP-1 receptor agonist&lt;/td&gt;&lt;td&gt;Dual GIP + GLP-1 receptor agonist&lt;/td&gt;&lt;/tr&gt;</p>' +
  '<p>    &lt;tr&gt;&lt;td&gt;Primary metabolic effects&lt;/td&gt;&lt;td&gt;Appetite regulation and glucose stabilization&lt;/td&gt;&lt;td&gt;Appetite regulation plus enhanced insulin signaling pathways&lt;/td&gt;&lt;/tr&gt;</p>' +
  '<p>  &lt;/tbody&gt;</p>' +
  '<p>&lt;/table&gt;</p>'

const REAL_TABLE_FIXTURE =
  '<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr></tbody></table>'

function tables(html: string) {
  return splitContentIntoSegments(html).filter((s) => s.type === 'table')
}

describe('splitContentIntoSegments', () => {
  it('converts the live paragraph-grid table into structured data', () => {
    const segments = splitContentIntoSegments(
      '<h2>Semaglutide vs. Tirzepatide: Key Clinical Differences</h2>' +
        LIVE_GRID_FIXTURE,
    )
    const tableSegments = segments.filter((s) => s.type === 'table')
    expect(tableSegments).toHaveLength(1)
    const table = (tableSegments[0] as { type: 'table'; table: { headers: string[]; rows: string[][] } }).table
    expect(table.headers).toEqual(['Feature', 'Semaglutide', 'Tirzepatide'])
    expect(table.rows).toHaveLength(6)
    expect(table.rows[0]).toEqual(['Medication class', 'GLP-1 receptor agonist', 'Dual GIP + GLP-1 receptor agonist'])
    expect(table.rows[5]).toEqual([
      'Intended use',
      'Prescription therapy under medical supervision',
      'Prescription therapy under medical supervision',
    ])
    // The heading and the trailing prose paragraph stay ordinary HTML.
    const htmlSegments = segments.filter((s) => s.type === 'html')
    expect(htmlSegments.some((s) => s.type === 'html' && s.html.includes('Key Clinical Differences'))).toBe(true)
    expect(
      htmlSegments.some(
        (s) => s.type === 'html' && s.html.includes('This comparison table highlights differences'),
      ),
    ).toBe(true)
  })

  it('converts escaped table tags broken across paragraphs', () => {
    const segments = splitContentIntoSegments('<p>Intro text.</p>' + ESCAPED_TABLE_FIXTURE + '<p>Outro.</p>')
    expect(tables(ESCAPED_TABLE_FIXTURE)).toHaveLength(1)
    const table = tables('<p>Intro text.</p>' + ESCAPED_TABLE_FIXTURE)[0]
    if (table.type !== 'table') throw new Error('expected table segment')
    expect(table.table.headers).toEqual(['Feature', 'Semaglutide', 'Tirzepatide'])
    expect(table.table.rows).toHaveLength(2)
    expect(table.table.rows[1][2]).toBe('Appetite regulation plus enhanced insulin signaling pathways')
    // Surrounding prose stays intact as HTML.
    const html = segments.filter((s) => s.type === 'html').map((s) => (s.type === 'html' ? s.html : '')).join('')
    expect(html).toContain('Intro text.')
    expect(html).toContain('Outro.')
  })

  it('converts real <table> markup', () => {
    const segments = splitContentIntoSegments('<p>Before</p>' + REAL_TABLE_FIXTURE + '<p>After</p>')
    const table = segments.filter((s) => s.type === 'table')
    expect(table).toHaveLength(1)
    if (table[0].type !== 'table') throw new Error('expected table segment')
    expect(table[0].table.headers).toEqual(['A', 'B'])
    expect(table[0].table.rows).toEqual([
      ['1', '2'],
      ['3', '4'],
    ])
  })

  it('keeps prose that merely mentions table tags as plain HTML', () => {
    const html = '<p>You can paste a &lt;table&gt; into the editor if you like.</p>'
    expect(tables(html)).toHaveLength(0)
    expect(splitContentIntoSegments(html)).toEqual([{ type: 'html', html }])
  })

  it('does not convert a lone centered bold paragraph or incomplete grids', () => {
    const lone = '<p style="text-align: center;"><strong>Just a heading</strong></p><p>Regular prose follows here.</p>'
    expect(tables(lone)).toHaveLength(0)

    const incomplete =
      '<p style="text-align: center;"><strong>A</strong></p>' +
      '<p style="text-align: center;"><strong>B</strong></p>' +
      '<p style="text-align: center;"><strong>C</strong></p>' +
      '<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>' // 5 cells — no full grid
    expect(tables(incomplete)).toHaveLength(0)

    const linkCell =
      '<p style="text-align: center;"><strong>A</strong></p>' +
      '<p style="text-align: center;"><strong>B</strong></p>' +
      '<p>1</p><p>2</p>' +
      '<p><a href="/x">3</a></p><p>4</p>'
    expect(tables(linkCell)).toHaveLength(0)
  })

  it('handles multiple tables in one post', () => {
    const html = '<p>First.</p>' + REAL_TABLE_FIXTURE + '<p>Middle.</p>' + ESCAPED_TABLE_FIXTURE
    expect(tables(html)).toHaveLength(2)
  })
})

describe('ArticleBody', () => {
  it('renders the live grid as a styled table with surrounding HTML intact', () => {
    const { container } = render(
      <ArticleBody
        html={'<p>Lead paragraph with a <a href="/blog/other">link</a>.</p>' + LIVE_GRID_FIXTURE}
        className="prose"
      />,
    )

    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
    const headers = [...table.querySelectorAll('thead th')].map((th) => th.textContent)
    expect(headers).toEqual(['Feature', 'Semaglutide', 'Tirzepatide'])
    const bodyCells = [...table.querySelectorAll('tbody td')].map((td) => td.textContent)
    expect(bodyCells[1]).toBe('GLP-1 receptor agonist')
    expect(bodyCells).toHaveLength(18)

    expect(container.textContent).toContain('Lead paragraph with a')
    expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute('href', '/blog/other')
    expect(container.textContent).toContain('This comparison table highlights differences')
  })

  it('renders escaped-tag tables as a styled table too', () => {
    const { container } = render(<ArticleBody html={ESCAPED_TABLE_FIXTURE} />)
    const table = screen.getByRole('table')
    expect([...table.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual([
      'Feature',
      'Semaglutide',
      'Tirzepatide',
    ])
    expect(container.querySelector('tbody tr')).toBeTruthy()
  })
})
