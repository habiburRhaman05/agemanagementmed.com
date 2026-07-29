'use client'

import { AlertCircle, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { SectionBuilder } from '@/components/admin/SectionBuilder'
import { newTreatmentSchema, type NewTreatmentValues } from '@/lib/validation/treatment'

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

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

export function NewTreatmentForm() {
  const router = useRouter()

  const [pillar, setPillar] = useState(PILLARS[0])
  const [audience, setAudience] = useState('all')
  const [kind, setKind] = useState(KINDS[0])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [order, setOrder] = useState(0)

  const [heroCtas, setHeroCtas] = useState<Cta[]>([{ label: 'Book a Consultation', href: '/book-appointment' }])
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewTreatmentValues>({
    resolver: zodResolver(newTreatmentSchema),
    defaultValues: {
      slug: '',
      href: '',
      name: '',
      shortName: '',
      summary: '',
      cardImageSrc: '',
      cardImageAlt: '',
      cardBenefits: '',
      heroEyebrow: '',
      heroTitle: '',
      heroLead: '',
      heroImageSrc: '',
      heroImageAlt: '',
      closingTitle: '',
      closingBody: '',
      closingCtaLabel: 'Book a Consultation',
      closingCtaHref: '/book-appointment',
      seoTitle: '',
      seoDescription: '',
    },
  })

  const [submitError, setSubmitError] = useState('')

  const name = watch('name')
  const slug = watch('slug')
  const href = watch('href')
  const heroTitle = watch('heroTitle')

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const handleNameChange = (value: string) => {
    setValue('name', value, { shouldValidate: true })
    if (!slug) setValue('slug', slugify(value), { shouldValidate: true })
    if (!href) setValue('href', `/${slugify(value)}`, { shouldValidate: true })
    if (!heroTitle) setValue('heroTitle', value, { shouldValidate: true })
  }

  const onValid = async (values: NewTreatmentValues) => {
    setSubmitError('')

    let advanced: Record<string, unknown>
    try {
      advanced = advancedJson.trim() ? JSON.parse(advancedJson) : {}
    } catch {
      const message = 'Advanced JSON is not valid — check for a missing comma or bracket.'
      setSubmitError(message)
      toast.error(message)
      return
    }

    try {
      const res = await fetch('/api/admin/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: values.slug,
          href: values.href,
          pillar,
          audience,
          kind,
          status,
          order,
          name: values.name,
          shortName: values.shortName || values.name,
          summary: values.summary,
          cardImage: { src: values.cardImageSrc, alt: values.cardImageAlt || values.name },
          cardBenefits: (values.cardBenefits ?? '').split(',').map((s) => s.trim()).filter(Boolean),
          hero: {
            eyebrow: values.heroEyebrow || undefined,
            title: values.heroTitle,
            lead: values.heroLead,
            image: { src: values.heroImageSrc, alt: values.heroImageAlt || values.name },
            ctas: heroCtas.filter((c) => c.label && c.href),
          },
          faqs: faqs.filter((f) => f.question && f.answer),
          closingCta: {
            title: values.closingTitle || `Ready to explore ${values.name}?`,
            body: values.closingBody,
            cta: { label: values.closingCtaLabel, href: values.closingCtaHref },
          },
          seo: {
            title: values.seoTitle || values.name,
            description: values.seoDescription || values.summary,
            canonical: values.href,
          },
          ...advanced,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create treatment')

      toast.success('Treatment created.')
      router.push(`/admin/treatments/${json.treatment.id}`)
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create treatment'
      setSubmitError(message)
      toast.error(message)
    }
  }

  const onInvalid = () => {
    toast.error('Please fix the highlighted fields before saving.')
  }

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-6">
      {/* Routing */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Routing</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Slug</label>
            <input
              value={slug}
              onChange={(e) => setValue('slug', slugify(e.target.value), { shouldValidate: true })}
              placeholder="testosterone-therapy"
              className={`${inputClass} font-mono`}
            />
            <FieldError message={errors.slug?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Route (href)</label>
            <input {...register('href')} placeholder="/testosterone-therapy" className={`${inputClass} font-mono`} />
            <FieldError message={errors.href?.message} />
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
            <input value={name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Short name</label>
            <input {...register('shortName')} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Summary</label>
          <textarea {...register('summary')} rows={2} className={inputClass} />
          <FieldError message={errors.summary?.message} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image URL</label>
            <input {...register('cardImageSrc')} className={inputClass} />
            <FieldError message={errors.cardImageSrc?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Card image alt</label>
            <input {...register('cardImageAlt')} className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Card benefits (comma-separated)</label>
          <input {...register('cardBenefits')} className={inputClass} />
        </div>
      </div>

      {/* Hero */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Hero</h2>
        <div>
          <label className="block text-xs font-medium text-gray-500">Eyebrow</label>
          <input {...register('heroEyebrow')} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Title</label>
          <input {...register('heroTitle')} className={inputClass} />
          <FieldError message={errors.heroTitle?.message} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Lead</label>
          <textarea {...register('heroLead')} rows={3} className={inputClass} />
          <FieldError message={errors.heroLead?.message} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image URL</label>
            <input {...register('heroImageSrc')} className={inputClass} />
            <FieldError message={errors.heroImageSrc?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Hero image alt</label>
            <input {...register('heroImageAlt')} className={inputClass} />
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
                  placeholder="/book-appointment"
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
        <input {...register('closingTitle')} placeholder="Title" className={inputClass} />
        <textarea {...register('closingBody')} placeholder="Body" rows={2} className={inputClass} />
        <FieldError message={errors.closingBody?.message} />
        <div className="flex gap-2">
          <div className="w-1/2">
            <input {...register('closingCtaLabel')} placeholder="Button label" className={inputClass} />
            <FieldError message={errors.closingCtaLabel?.message} />
          </div>
          <div className="w-1/2">
            <input {...register('closingCtaHref')} placeholder="/book-appointment" className={inputClass} />
            <FieldError message={errors.closingCtaHref?.message} />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">SEO</h2>
        <input {...register('seoTitle')} placeholder="Meta title (defaults to name)" maxLength={70} className={inputClass} />
        <FieldError message={errors.seoTitle?.message} />
        <textarea {...register('seoDescription')} placeholder="Meta description (defaults to summary)" maxLength={300} rows={2} className={inputClass} />
        <FieldError message={errors.seoDescription?.message} />
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

      {submitError ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {submitError}
        </div>
      ) : null}

      <div className="flex justify-end border-t border-canvas-200 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isSubmitting ? 'Creating...' : 'Create treatment'}
        </button>
      </div>
    </form>
  )
}
