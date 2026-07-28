'use client'

import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Loader2, Save } from 'lucide-react'
import { useState } from 'react'

interface SeoRow {
  title: string | null
  description: string | null
  canonical: string | null
  ogImageUrl: string | null
  noindex: boolean
  schemaJsonLd: string | null
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
    <div className="space-y-4 border-t bg-canvas-50/50 px-6 py-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
          <p className="mt-0.5 text-xs text-gray-400">{title.length}/70</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Canonical</label>
          <input
            type="text"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={300}
          rows={2}
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
        <p className="mt-0.5 text-xs text-gray-400">{description.length}/300</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-gray-500">OG image URL</label>
          <input
            type="text"
            value={ogImageUrl}
            onChange={(e) => setOgImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
        <label className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={noindex}
            onChange={(e) => setNoindex(e.target.checked)}
            className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
          />
          <span className="text-xs text-gray-600">No index (hide from search engines)</span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500">
          Structured data override (JSON-LD, optional)
        </label>
        <textarea
          value={schemaJsonLd}
          onChange={(e) => setSchemaJsonLd(e.target.value)}
          rows={4}
          placeholder='{"@context":"https://schema.org","@type":"MedicalWebPage",...}'
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
        <p className="mt-0.5 text-xs text-gray-400">
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
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
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

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y">
        <thead>
          <tr className="bg-canvas-50">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Page
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y">
          {pages.map((page) => (
            <>
              <tr key={page.path} className="hover:bg-canvas-50">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-ink-950">{page.label}</p>
                  <p className="text-xs text-gray-400">{page.path}</p>
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-600 md:table-cell">
                  {page.seo?.title || <span className="text-gray-400">Not set</span>}
                </td>
                <td className="px-6 py-4">
                  {page.seo ? (
                    <span className="inline-flex items-center rounded-full bg-sage-50 px-2.5 py-0.5 text-xs font-medium text-sage-700">
                      Configured
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-canvas-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      Using defaults
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === page.path ? null : page.path)}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-sage-700 hover:bg-sage-50"
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
                <tr key={`${page.path}-edit`}>
                  <td colSpan={4} className="p-0">
                    <EditRow page={page} />
                  </td>
                </tr>
              ) : null}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
