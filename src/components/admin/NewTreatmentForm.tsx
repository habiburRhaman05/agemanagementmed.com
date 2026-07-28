'use client'

import { AlertCircle, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { SectionBuilder } from '@/components/admin/SectionBuilder'

interface Cta {
  label: string
  href: string
}

const PILLARS = ['hormone-therapy', 'weight-loss', 'sexual-wellness', 'hair-restoration', 'aesthetics']
const AUDIENCES = ['all', 'men', 'women']
const KINDS = ['hub', 'variant', 'modality']

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'
const cardClass =
  'space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]'

export function NewTreatmentForm() {
  const router = useRouter()

  const [slug, setSlug] = useState('')
  const [href, setHref] = useState('')
  const [pillar, setPillar] = useState(PILLARS[0])
  const [audience, setAudience] = useState('all')
  const [kind, setKind] = useState(KINDS[0])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [order, setOrder] = useState(0)

  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')
  const [summary, setSummary] = useState('')
  const [cardImageSrc, setCardImageSrc] = useState('')
  const [cardImageAlt, setCardImageAlt] = useState('')
  const [cardBenefits, setCardBenefits] = useState('')

  const [heroEyebrow, setHeroEyebrow] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroLead, setHeroLead] = useState('')
  const [heroImageSrc, setHeroImageSrc] = useState('')
  const [heroImageAlt, setHeroImageAlt] = useState('')
  const [heroCtas, setHeroCtas] = useState<Cta[]>([{ label: 'Book a Consultation', href: '/book' }])

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])

  const [closingTitle, setClosingTitle] = useState('')
  const [closingBody, setClosingBody] = useState('')
  const [closingCtaLabel, setClosingCtaLabel] = useState('Book a Consultation')
  const [closingCtaHref, setClosingCtaHref] = useState('/book')

  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')

  const [advancedJson, setAdvancedJson] = useState('{}')
  const advancedTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSectionInsert = (json: string) => {
    const current = advancedJson.trim()
    if (!current || current === '{}') {
      setAdvancedJson(`{\n  "sections": [\n${json}\n]\n}`)
    } else {
      try {
        const parsed = JSON.parse(current)
        if (!parsed.sections) parsed.sections = []
        parsed.sections.push(JSON.parse(json))
        setAdvancedJson(JSON.stringify(parsed, null, 2))
      } catch {
        setAdvancedJson(current + '\n\n// Paste this section into your sections array:\n' + json)
      }
    }
  }

  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slug) setSlug(slugify(value))
    if (!href) setHref(`/${slugify(value)}`)
    if (!heroTitle) setHeroTitle(value)
  }

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
      const res = await fetch('/api/admin/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          href,
          pillar,
          audience,
          kind,
          status,
          order,
          name,
          shortName: shortName || name,
          summary,
          cardImage: { src: cardImageSrc, alt: cardImageAlt || name },
          cardBenefits: cardBenefits.split(',').map((s) => s.trim()).filter(Boolean),
          hero: {
            eyebrow: heroEyebrow || undefined,
            title: heroTitle,
            lead: heroLead,
            image: { src: heroImageSrc, alt: heroImageAlt || name },
            ctas: heroCtas.filter((c) => c.label && c.href),
          },
          faqs: faqs.filter((f) => f.question && f.answer),
          closingCta: {
            title: closingTitle || `Ready to explore ${name}?`,
            body: closingBody,
            cta: { label: closingCtaLabel, href: closingCtaHref },
          },
          seo: {
            title: seoTitle || name,
            description: seoDescription || summary,
            canonical: href,
          },
          ...advanced,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create treatment')

      router.push(`/admin/treatments/${json.treatment.id}`)
      router.refresh()
    } catch (err) {
      setSaveStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to create treatment')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Routing */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Routing</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              required
              placeholder="testosterone-therapy"
              className={`${inputClass} font-mono`}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Route (href)</label>
            <input
              value={href}
              onChange={(e) => setHref(e.target.value)}
              required
              placeholder="/testosterone-therapy"
              className={`${inputClass} font-mono`}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-gray-500">Pillar</label>
            <select value={pillar} onChange={(e) => setPillar(e.target.value)} className={inputClass}>
              {PILLARS.map((p) => (
                <option key={p} value={p}>
                  {p.replace(/-/g, ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Audience</label>
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className={inputClass}>
              {AUDIENCES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Kind</label>
            <select value={kind} onChange={(e) => setKind(e.target.value)} className={inputClass}>
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className={`${inputClass} w-auto`}
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
              className={`${inputClass} w-24`}
            />
          </div>
        </div>
      </div>

      {/* Card / summary */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Card &amp; summary</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Name</label>
            <input value={name} onChange={(e) => handleNameChange(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Short name</label>
            <input value={shortName} onChange={(e) => setShortName(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required rows={2} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image URL</label>
            <input value={cardImageSrc} onChange={(e) => setCardImageSrc(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image alt</label>
            <input value={cardImageAlt} onChange={(e) => setCardImageAlt(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Card benefits (comma-separated)</label>
          <input value={cardBenefits} onChange={(e) => setCardBenefits(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Hero */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Hero</h2>
        <div>
          <label className="block text-xs font-medium text-gray-500">Eyebrow</label>
          <input value={heroEyebrow} onChange={(e) => setHeroEyebrow(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Title</label>
          <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Lead</label>
          <textarea value={heroLead} onChange={(e) => setHeroLead(e.target.value)} required rows={3} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image URL</label>
            <input value={heroImageSrc} onChange={(e) => setHeroImageSrc(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image alt</label>
            <input value={heroImageAlt} onChange={(e) => setHeroImageAlt(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-gray-500">Buttons</label>
            <button
              type="button"
              onClick={() => setHeroCtas([...heroCtas, { label: '', href: '' }])}
              className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-800"
            >
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
                  className={`${inputClass} w-1/2`}
                />
                <input
                  value={cta.href}
                  onChange={(e) => setHeroCtas(heroCtas.map((c, j) => (j === i ? { ...c, href: e.target.value } : c)))}
                  placeholder="/book"
                  className={`${inputClass} w-1/2`}
                />
                <button
                  type="button"
                  onClick={() => setHeroCtas(heroCtas.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className={cardClass}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-950">FAQs (optional)</h2>
          <button
            type="button"
            onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
            className="inline-flex items-center gap-1 text-xs font-medium text-sage-700 hover:text-sage-800"
          >
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
                    className={`${inputClass} font-medium`}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => setFaqs(faqs.map((f, j) => (j === i ? { ...f, answer: e.target.value } : f)))}
                    placeholder="Answer"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}
                  className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Closing CTA</h2>
        <input value={closingTitle} onChange={(e) => setClosingTitle(e.target.value)} placeholder="Title" className={inputClass} />
        <textarea value={closingBody} onChange={(e) => setClosingBody(e.target.value)} placeholder="Body" required rows={2} className={inputClass} />
        <div className="flex gap-2">
          <input value={closingCtaLabel} onChange={(e) => setClosingCtaLabel(e.target.value)} placeholder="Button label" required className={`${inputClass} w-1/2`} />
          <input value={closingCtaHref} onChange={(e) => setClosingCtaHref(e.target.value)} placeholder="/book" required className={`${inputClass} w-1/2`} />
        </div>
      </div>

      {/* SEO */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">SEO</h2>
        <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Meta title (defaults to name)" maxLength={70} className={inputClass} />
        <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Meta description (defaults to summary)" maxLength={300} rows={2} className={inputClass} />
      </div>

      {/* Section Builder — visual section JSON generator */}
      <SectionBuilder onInsert={handleSectionInsert} />

      {/* Advanced JSON */}
      <div className={cardClass.replace('space-y-4', 'space-y-2')}>
        <h2 className="text-sm font-semibold text-ink-950">
          Advanced content (optional JSON)
        </h2>
        <p className="text-xs text-gray-500">
          Add <code>symptoms</code>, <code>sections</code>, <code>process</code>, <code>candidacy</code>,{' '}
          <code>pricing</code>, <code>providers</code>, or <code>related</code> as raw JSON — the page renderer
          already knows these shapes. Use the <strong>Section Builder</strong> above to visually create
          sections with design overrides and icons.
          Leave as <code>{'{}'}</code> to skip and add later from the edit screen.
        </p>
        <textarea
          ref={advancedTextareaRef}
          value={advancedJson}
          onChange={(e) => setAdvancedJson(e.target.value)}
          rows={10}
          className={`${inputClass} font-mono text-xs`}
        />
      </div>

      {saveStatus === 'error' ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      ) : null}

      <div className="flex justify-end border-t border-canvas-200 pt-6">
        <button
          type="submit"
          disabled={saveStatus === 'loading'}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saveStatus === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saveStatus === 'loading' ? 'Creating...' : 'Create treatment'}
        </button>
      </div>
    </form>
  )
}
