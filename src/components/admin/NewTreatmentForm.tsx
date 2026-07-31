'use client'

import { AlertCircle, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { newTreatmentSchema, type NewTreatmentValues } from '@/lib/validation/treatment'

interface Cta {
  label: string
  href: string
}

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

/** Best-effort pillar guess from the slug/title so breadcrumbs still land in a sensible category without asking the admin to pick one. */
function inferPillar(text: string): string {
  const t = text.toLowerCase()
  if (/weight|glp|lipostat|obesity/.test(t)) return 'weight-loss'
  if (/sexual|rejuvenation|libido|intimacy|shockwave/.test(t)) return 'sexual-wellness'
  if (/hair/.test(t)) return 'hair-restoration'
  if (/aesthetic|facial|skin|laser|peel|botox|filler|iv-|microneedling/.test(t)) return 'aesthetics'
  return 'hormone-therapy'
}

export function NewTreatmentForm() {
  const router = useRouter()

  const [audience, setAudience] = useState('all')
  const [kind, setKind] = useState(KINDS[0])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

  const [heroCtas, setHeroCtas] = useState<Cta[]>([{ label: 'Book a Consultation', href: '/book-appointment' }])
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])

  const [seoNoindex, setSeoNoindex] = useState(false)
  const [seoSchemaJsonLd, setSeoSchemaJsonLd] = useState('')
  const [seoSchemaError, setSeoSchemaError] = useState('')

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
      heroEyebrow: '',
      heroTitle: '',
      heroLead: '',
      heroImageSrc: '',
      heroImageAlt: '',
      seoTitle: '',
      seoDescription: '',
    },
  })

  const [submitError, setSubmitError] = useState('')

  const slug = watch('slug')
  const href = watch('href')
  const heroTitle = watch('heroTitle')

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const handleHeroTitleChange = (value: string) => {
    setValue('heroTitle', value, { shouldValidate: true })
    if (!slug) setValue('slug', slugify(value), { shouldValidate: true })
    if (!href) setValue('href', `/${slugify(value)}`, { shouldValidate: true })
  }

  const onValid = async (values: NewTreatmentValues) => {
    setSubmitError('')
    setSeoSchemaError('')

    if (seoSchemaJsonLd.trim()) {
      try {
        JSON.parse(seoSchemaJsonLd)
      } catch {
        const message = 'Schema JSON-LD is not valid JSON — check for a missing comma or bracket.'
        setSeoSchemaError(message)
        toast.error(message)
        return
      }
    }

    const pillar = inferPillar(`${values.slug} ${values.heroTitle}`)

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
          order: 0,
          name: values.heroTitle,
          shortName: values.heroTitle,
          summary: values.heroLead,
          cardImage: { src: values.heroImageSrc, alt: values.heroImageAlt || values.heroTitle },
          cardBenefits: [],
          hero: {
            eyebrow: values.heroEyebrow || undefined,
            title: values.heroTitle,
            lead: values.heroLead,
            image: { src: values.heroImageSrc, alt: values.heroImageAlt || values.heroTitle },
            ctas: heroCtas.filter((c) => c.label && c.href),
          },
          faqs: faqs.filter((f) => f.question && f.answer),
          closingCta: {
            title: `Ready to explore ${values.heroTitle}?`,
            body: 'Schedule a consultation to learn more and get started.',
            cta: { label: 'Book a Consultation', href: '/book-appointment' },
          },
          seo: {
            title: values.seoTitle || values.heroTitle,
            description: values.seoDescription || values.heroLead,
            canonical: values.href,
            keywords: values.seoKeywords || null,
            ogImageUrl: values.seoOgImageSrc || values.heroImageSrc || null,
            noindex: seoNoindex,
            schemaJsonLd: seoSchemaJsonLd.trim() || null,
          },
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
        <div className="grid gap-4 sm:grid-cols-2">
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
          <input value={heroTitle} onChange={(e) => handleHeroTitleChange(e.target.value)} className={inputClass} />
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

      {/* SEO */}
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">SEO</h2>
        <input {...register('seoTitle')} placeholder="Meta title (defaults to hero title)" maxLength={70} className={inputClass} />
        <FieldError message={errors.seoTitle?.message} />
        <textarea {...register('seoDescription')} placeholder="Meta description (defaults to hero lead)" maxLength={300} rows={2} className={inputClass} />
        <FieldError message={errors.seoDescription?.message} />
        <div>
          <label className="block text-xs font-medium text-gray-500">Meta keywords (comma-separated)</label>
          <input {...register('seoKeywords')} placeholder="hormone therapy, weight loss, Savannah GA" className={inputClass} />
          <FieldError message={errors.seoKeywords?.message} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Open Graph image URL</label>
          <input {...register('seoOgImageSrc')} placeholder="defaults to hero image" className={inputClass} />
          <FieldError message={errors.seoOgImageSrc?.message} />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={seoNoindex}
            onChange={(e) => setSeoNoindex(e.target.checked)}
            className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
          />
          <span className="text-xs text-gray-600">No index</span>
        </label>
        <div>
          <label className="block text-xs font-medium text-gray-500">
            Schema (JSON-LD) override <span className="font-normal text-gray-400">— optional, replaces the auto-generated schema</span>
          </label>
          <textarea
            value={seoSchemaJsonLd}
            onChange={(e) => setSeoSchemaJsonLd(e.target.value)}
            rows={6}
            placeholder='{"@context": "https://schema.org", "@type": "MedicalWebPage", ...}'
            className={`${inputClass} font-mono text-xs`}
          />
          <FieldError message={seoSchemaError} />
        </div>
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
