'use client'

import { AlertCircle, CheckCircle2, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Cta {
  label: string
  href: string
}

interface TreatmentData {
  name?: string
  shortName?: string
  summary?: string
  cardImage?: { src: string; alt: string }
  cardBenefits?: string[]
  hero?: {
    eyebrow?: string
    title?: string
    lead?: string
    image?: { src: string; alt: string }
    ctas?: Cta[]
  }
  faqs?: { question: string; answer: string }[]
  pricing?: { eyebrow?: string; title?: string; lead?: string; included?: string[]; note?: string; cta?: Cta }
  closingCta?: { title?: string; body?: string; cta?: Cta }
  // Everything else (symptoms, sections, process, candidacy, providers,
  // related, customsSection) is edited as raw JSON below rather than built
  // out as a bespoke form per nested shape.
  [key: string]: unknown
}

interface TreatmentRow {
  id: string
  slug: string
  href: string
  pillar: string
  audience: string | null
  kind: string
  status: string
  order: number
  data: TreatmentData
}

interface SeoData {
  title: string | null
  description: string | null
  canonical: string | null
  ogImageUrl: string | null
  noindex: boolean
}

const ADVANCED_KEYS = ['symptoms', 'sections', 'process', 'candidacy', 'providers', 'related', 'customsSection']

function pickAdvanced(data: TreatmentData) {
  const advanced: Record<string, unknown> = {}
  for (const key of ADVANCED_KEYS) {
    if (key in data) advanced[key] = data[key]
  }
  return advanced
}

export function TreatmentForm({ treatment, seo }: { treatment: TreatmentRow; seo: SeoData | null }) {
  const [status, setStatus] = useState(treatment.status)
  const [order, setOrder] = useState(treatment.order)

  const [name, setName] = useState(treatment.data.name ?? '')
  const [shortName, setShortName] = useState(treatment.data.shortName ?? '')
  const [summary, setSummary] = useState(treatment.data.summary ?? '')
  const [cardImageSrc, setCardImageSrc] = useState(treatment.data.cardImage?.src ?? '')
  const [cardImageAlt, setCardImageAlt] = useState(treatment.data.cardImage?.alt ?? '')
  const [cardBenefits, setCardBenefits] = useState((treatment.data.cardBenefits ?? []).join(', '))

  const [heroEyebrow, setHeroEyebrow] = useState(treatment.data.hero?.eyebrow ?? '')
  const [heroTitle, setHeroTitle] = useState(treatment.data.hero?.title ?? '')
  const [heroLead, setHeroLead] = useState(treatment.data.hero?.lead ?? '')
  const [heroImageSrc, setHeroImageSrc] = useState(treatment.data.hero?.image?.src ?? '')
  const [heroImageAlt, setHeroImageAlt] = useState(treatment.data.hero?.image?.alt ?? '')
  const [heroCtas, setHeroCtas] = useState<Cta[]>(treatment.data.hero?.ctas ?? [])

  const [faqs, setFaqs] = useState(treatment.data.faqs ?? [])

  const [pricingTitle, setPricingTitle] = useState(treatment.data.pricing?.title ?? '')
  const [pricingLead, setPricingLead] = useState(treatment.data.pricing?.lead ?? '')
  const [pricingIncluded, setPricingIncluded] = useState((treatment.data.pricing?.included ?? []).join('\n'))
  const [pricingNote, setPricingNote] = useState(treatment.data.pricing?.note ?? '')

  const [closingTitle, setClosingTitle] = useState(treatment.data.closingCta?.title ?? '')
  const [closingBody, setClosingBody] = useState(treatment.data.closingCta?.body ?? '')
  const [closingCtaLabel, setClosingCtaLabel] = useState(treatment.data.closingCta?.cta?.label ?? '')
  const [closingCtaHref, setClosingCtaHref] = useState(treatment.data.closingCta?.cta?.href ?? '')

  const [advancedJson, setAdvancedJson] = useState(JSON.stringify(pickAdvanced(treatment.data), null, 2))

  const [seoTitle, setSeoTitle] = useState(seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(seo?.description ?? '')
  const [seoCanonical, setSeoCanonical] = useState(seo?.canonical ?? treatment.href)
  const [seoNoindex, setSeoNoindex] = useState(seo?.noindex ?? false)

  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveStatus('loading')
    setError('')

    let advanced: Record<string, unknown>
    try {
      advanced = advancedJson.trim() ? JSON.parse(advancedJson) : {}
    } catch {
      setSaveStatus('error')
      setError('Advanced JSON is not valid — check for a missing comma or bracket.')
      return
    }

    try {
      const res = await fetch(`/api/admin/treatments/${treatment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          order,
          data: {
            name,
            shortName,
            summary,
            cardImage: { src: cardImageSrc, alt: cardImageAlt },
            cardBenefits: cardBenefits.split(',').map((s) => s.trim()).filter(Boolean),
            hero: {
              eyebrow: heroEyebrow || undefined,
              title: heroTitle,
              lead: heroLead,
              image: { src: heroImageSrc, alt: heroImageAlt },
              ctas: heroCtas,
            },
            faqs,
            pricing: treatment.data.pricing
              ? {
                  ...treatment.data.pricing,
                  title: pricingTitle,
                  lead: pricingLead || undefined,
                  included: pricingIncluded.split('\n').map((s) => s.trim()).filter(Boolean),
                  note: pricingNote || undefined,
                }
              : undefined,
            closingCta: {
              title: closingTitle,
              body: closingBody,
              cta: { label: closingCtaLabel, href: closingCtaHref },
            },
            ...advanced,
          },
          seo: {
            title: seoTitle,
            description: seoDescription,
            canonical: seoCanonical,
            noindex: seoNoindex,
          },
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save')

      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (err) {
      setSaveStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status + order */}
      <div className="flex flex-wrap items-end gap-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <div>
          <p className="text-xs font-medium text-gray-500">Slug (fixed)</p>
          <p className="mt-1 font-mono text-sm text-ink-950">{treatment.slug}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Route (fixed)</p>
          <p className="mt-1 font-mono text-sm text-ink-950">{treatment.href}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="mt-1 w-24 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </div>
        {status === 'draft' ? (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Draft — not visible on the live site
          </span>
        ) : null}
      </div>

      {/* Card / summary */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <h2 className="text-sm font-semibold text-ink-950">Card &amp; summary</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Short name</label>
            <input value={shortName} onChange={(e) => setShortName(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image URL</label>
            <input value={cardImageSrc} onChange={(e) => setCardImageSrc(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image alt</label>
            <input value={cardImageAlt} onChange={(e) => setCardImageAlt(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Card benefits (comma-separated)</label>
          <input value={cardBenefits} onChange={(e) => setCardBenefits(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
      </div>

      {/* Hero */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <h2 className="text-sm font-semibold text-ink-950">Hero</h2>
        <div>
          <label className="block text-xs font-medium text-gray-500">Eyebrow</label>
          <input value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Title</label>
          <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} required className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Lead</label>
          <textarea value={heroLead} onChange={(e) => setHeroLead(e.target.value)} required rows={3} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image URL</label>
            <input value={heroImageSrc} onChange={(e) => setHeroImageSrc(e.target.value)} required className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image alt</label>
            <input value={heroImageAlt} onChange={(e) => setHeroImageAlt(e.target.value)} required className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Buttons</label>
            <button type="button" onClick={() => setHeroCtas([...heroCtas, { label: '', href: '' }])} className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-700">
              <Plus className="size-3.5" /> Add button
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {heroCtas.map((cta, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={cta.label}
                  onChange={(e) => setHeroCtas(heroCtas.map((c, j) => (j === i ? { ...c, label: e.target.value } : c)))}
                  placeholder="Label"
                  className="block w-1/2 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                />
                <input
                  value={cta.href}
                  onChange={(e) => setHeroCtas(heroCtas.map((c, j) => (j === i ? { ...c, href: e.target.value } : c)))}
                  placeholder="/book"
                  className="block w-1/2 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                />
                <button type="button" onClick={() => setHeroCtas(heroCtas.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-950">FAQs</h2>
          <button type="button" onClick={() => setFaqs([...faqs, { question: '', answer: '' }])} className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-700">
            <Plus className="size-3.5" /> Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-canvas-200 p-3">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <input
                    value={faq.question}
                    onChange={(e) => setFaqs(faqs.map((f, j) => (j === i ? { ...f, question: e.target.value } : f)))}
                    placeholder="Question"
                    className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm font-medium focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setFaqs(faqs.map((f, j) => (j === i ? { ...f, answer: e.target.value } : f)))}
                    placeholder="Answer"
                    rows={2}
                    className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                </div>
                <button type="button" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      {treatment.data.pricing ? (
        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <h2 className="text-sm font-semibold text-ink-950">Pricing</h2>
          <input value={pricingTitle} onChange={(e) => setPricingTitle(e.target.value)} placeholder="Title" className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          <input value={pricingLead} onChange={(e) => setPricingLead(e.target.value)} placeholder="Lead" className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          <div>
            <label className="block text-xs font-medium text-gray-500">Included (one per line)</label>
            <textarea value={pricingIncluded} onChange={(e) => setPricingIncluded(e.target.value)} rows={4} className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          </div>
          <input value={pricingNote} onChange={(e) => setPricingNote(e.target.value)} placeholder="Note" className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
      ) : null}

      {/* Closing CTA */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <h2 className="text-sm font-semibold text-ink-950">Closing CTA</h2>
        <input value={closingTitle} onChange={(e) => setClosingTitle(e.target.value)} placeholder="Title" required className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        <textarea value={closingBody} onChange={(e) => setClosingBody(e.target.value)} placeholder="Body" required rows={2} className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        <div className="flex gap-2">
          <input value={closingCtaLabel} onChange={(e) => setClosingCtaLabel(e.target.value)} placeholder="Button label" required className="block w-1/2 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
          <input value={closingCtaHref} onChange={(e) => setClosingCtaHref(e.target.value)} placeholder="/book" required className="block w-1/2 rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        </div>
      </div>

      {/* SEO */}
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <h2 className="text-sm font-semibold text-ink-950">SEO</h2>
        <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Meta title" maxLength={70} className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Meta description" maxLength={300} rows={2} className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        <input value={seoCanonical} onChange={(e) => setSeoCanonical(e.target.value)} placeholder="Canonical" className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={seoNoindex} onChange={(e) => setSeoNoindex(e.target.checked)} className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600" />
          <span className="text-xs text-gray-600">No index</span>
        </label>
      </div>

      {/* Advanced JSON */}
      <div className="space-y-2 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <h2 className="text-sm font-semibold text-ink-950">Advanced (symptoms, sections, process, candidacy, providers, related)</h2>
        <p className="text-xs text-gray-500">
          Raw JSON for the section types the generic renderer already knows how to draw — validated before save.
          Leave keys out entirely to skip that section on the page.
        </p>
        <textarea
          value={advancedJson}
          onChange={(e) => setAdvancedJson(e.target.value)}
          rows={16}
          className="block w-full rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      </div>

      {saveStatus === 'error' ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      ) : null}
      {saveStatus === 'success' ? (
        <div className="flex items-center gap-2 rounded-lg bg-sage-50 px-4 py-3 text-sm text-sage-700">
          <CheckCircle2 className="size-4 shrink-0" />
          Saved — the live page updates now (or on next visit if cached).
        </div>
      ) : null}

      <div className="flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={saveStatus === 'loading'}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saveStatus === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saveStatus === 'loading' ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
