'use client'

import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Loader2, Save, Search } from 'lucide-react'
import { Fragment, useState } from 'react'

interface SeoRow {
  title: string | null
  description: string | null
  canonical: string | null
  ogImageUrl: string | null
  noindex: boolean
  schemaJsonLd: string | null
  keywords: string | null
  h1: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogType: string | null
  twitterTitle: string | null
  twitterDescription: string | null
}

interface PageEntry {
  path: string
  label: string
  seo: SeoRow | null
}

function EditRow({ page }: { page: PageEntry }) {
  const [title, setTitle] = useState(page.seo?.title ?? '')
  const [description, setDescription] = useState(page.seo?.description ?? '')
  const [canonical, setCanonical] = useState(page.seo?.canonical ?? page.path)
  const [ogImageUrl, setOgImageUrl] = useState(page.seo?.ogImageUrl ?? '')
  const [noindex, setNoindex] = useState(page.seo?.noindex ?? false)
  const [schemaJsonLd, setSchemaJsonLd] = useState(page.seo?.schemaJsonLd ?? '')
  const [keywords, setKeywords] = useState(page.seo?.keywords ?? '')
  const [h1, setH1] = useState(page.seo?.h1 ?? '')
  const [ogTitle, setOgTitle] = useState(page.seo?.ogTitle ?? '')
  const [ogDescription, setOgDescription] = useState(page.seo?.ogDescription ?? '')
  const [ogType, setOgType] = useState(page.seo?.ogType ?? '')
  const [twitterTitle, setTwitterTitle] = useState(page.seo?.twitterTitle ?? '')
  const [twitterDescription, setTwitterDescription] = useState(page.seo?.twitterDescription ?? '')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSave = async () => {
    setStatus('loading')
    setError('')

    if (schemaJsonLd.trim()) {
      try {
        JSON.parse(schemaJsonLd)
      } catch {
        setStatus('error')
        setError('Schema JSON-LD is not valid JSON')
        return
      }
    }

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: page.path,
          title: title || null,
          description: description || null,
          canonical: canonical || null,
          ogImageUrl: ogImageUrl || null,
          noindex,
          schemaJsonLd: schemaJsonLd || null,
          keywords: keywords || null,
          h1: h1 || null,
          ogTitle: ogTitle || null,
          ogDescription: ogDescription || null,
          ogType: ogType || null,
          twitterTitle: twitterTitle || null,
          twitterDescription: twitterDescription || null,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save')

      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  return (
    <div className="space-y-4 border-t border-dash-border bg-dash-bg/60 px-6 py-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-dash-text-muted">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
          <p className="mt-0.5 text-xs text-dash-text-muted">{title.length}/70</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-dash-text-muted">Canonical</label>
          <input
            type="text"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-dash-text-muted">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
          rows={2}
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
        <p className="mt-0.5 text-xs text-dash-text-muted">{description.length}/300</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-dash-text-muted">OG image URL</label>
          <input
            type="text"
            value={ogImageUrl}
            onChange={(e) => setOgImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-dash-text-muted">Meta keywords (comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-dash-text-muted">
          H1 override <span className="font-normal">— replaces the hero heading on the page itself, not just &lt;title&gt;</span>
        </label>
        <input
          type="text"
          value={h1}
          onChange={(e) => setH1(e.target.value)}
          maxLength={120}
          placeholder="Defaults to the page's current heading"
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      </div>

      <div className="border-t border-canvas-200 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-dash-text-muted">
          Open Graph <span className="font-normal normal-case">— falls back to Title/Description above when left blank</span>
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder="OG title"
            maxLength={70}
            className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
          <input
            type="text"
            value={ogType}
            onChange={(e) => setOgType(e.target.value)}
            placeholder="OG type (defaults to “website”)"
            className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
        <textarea
          value={ogDescription}
          onChange={(e) => setOgDescription(e.target.value)}
          placeholder="OG description"
          maxLength={300}
          rows={2}
          className="mt-3 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      </div>

      <div className="border-t border-canvas-200 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-dash-text-muted">
          Twitter Card <span className="font-normal normal-case">— falls back to Open Graph above when left blank</span>
        </h3>
        <div className="mt-3 space-y-3">
          <input
            type="text"
            value={twitterTitle}
            onChange={(e) => setTwitterTitle(e.target.value)}
            placeholder="Twitter title"
            maxLength={70}
            className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
          <textarea
            value={twitterDescription}
            onChange={(e) => setTwitterDescription(e.target.value)}
            placeholder="Twitter description"
            maxLength={300}
            rows={2}
            className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={noindex}
          onChange={(e) => setNoindex(e.target.checked)}
          className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
        />
        <span className="text-xs text-dash-text-muted">No index (hide from search engines)</span>
      </label>

      <div>
        <label className="block text-xs font-medium text-dash-text-muted">
          Structured data override (JSON-LD, optional)
        </label>
        <textarea
          value={schemaJsonLd}
          onChange={(e) => setSchemaJsonLd(e.target.value)}
          rows={4}
          placeholder='{"@context":"https://schema.org","@type":"MedicalWebPage",...}'
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
        <p className="mt-0.5 text-xs text-dash-text-muted">
          Leave blank to use the automatic schema (MedicalBusiness / FAQPage) already generated for this page.
        </p>
      </div>

      {status === 'error' ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      ) : null}
      {status === 'success' ? (
        <div className="flex items-center gap-2 rounded-lg bg-sage-50 px-4 py-2 text-sm text-sage-700">
          <CheckCircle2 className="size-4 shrink-0" />
          Saved.
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save
        </button>
      </div>
    </div>
  )
}

export function SeoTable({ pages }: { pages: PageEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (pages.length === 0) {
    return (
      <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <Search className="mx-auto h-10 w-10 text-dash-border" />
        <h3 className="mt-4 text-base font-semibold text-dash-text">No pages found</h3>
        <p className="mt-1 text-sm text-dash-text-muted">Pages will appear here once they&apos;re available.</p>
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y divide-dash-border">
        <thead className="sticky top-0 z-10 bg-dash-bg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
              Page
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
              Status
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-border">
          {pages.map((page) => (
            <Fragment key={page.path}>
              <tr className="transition-colors hover:bg-dash-bg">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-dash-text">{page.label}</p>
                  <p className="text-xs text-dash-text-muted">{page.path}</p>
                </td>
                <td className="hidden px-6 py-4 text-sm text-dash-text-muted md:table-cell">
                  {page.seo?.title || <span className="text-dash-text-muted">Not set</span>}
                </td>
                <td className="px-6 py-4">
                  {page.seo ? (
                    <span className="inline-flex items-center rounded-full bg-sage-50 px-2.5 py-0.5 text-xs font-medium text-sage-700">
                      Configured
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-dash-bg px-2.5 py-0.5 text-xs font-medium text-dash-text-muted">
                      Using defaults
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === page.path ? null : page.path)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-dash-text hover:bg-dash-bg"
                  >
                    {expanded === page.path ? 'Close' : 'Edit'}
                    {expanded === page.path ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>
                </td>
              </tr>
              {expanded === page.path ? (
                <tr>
                  <td colSpan={4} className="p-0">
                    <EditRow page={page} />
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
