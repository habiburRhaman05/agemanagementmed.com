'use client'

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  Quote,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { ImageUploader } from '@/components/admin/ImageUploader'

interface Testimonial {
  id: string
  name: string
  roleLabel: string | null
  treatment: string | null
  quote: string
  rating: number
  photoUrl: string | null
  featured: boolean
  status: string
  order: number
  updatedAt: string
}

interface FormState {
  name: string
  roleLabel: string
  treatment: string
  quote: string
  rating: number
  photoUrl: string
  featured: boolean
  status: 'draft' | 'published'
  order: number
}

const EMPTY_FORM: FormState = {
  name: '',
  roleLabel: '',
  treatment: '',
  quote: '',
  rating: 5,
  photoUrl: '',
  featured: false,
  status: 'published',
  order: 0,
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className="p-0.5"
        >
          <Star
            className={`size-5 transition-colors ${
              n <= value ? 'fill-amber-400 text-amber-400' : 'text-canvas-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function TestimonialModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: Testimonial | null
  onClose: () => void
  onSaved: (t: Testimonial) => void
}) {
  const [form, setForm] = useState<FormState>(
    initial
      ? {
          name: initial.name,
          roleLabel: initial.roleLabel ?? '',
          treatment: initial.treatment ?? '',
          quote: initial.quote,
          rating: initial.rating,
          photoUrl: initial.photoUrl ?? '',
          featured: initial.featured,
          status: initial.status as 'draft' | 'published',
          order: initial.order,
        }
      : EMPTY_FORM,
  )
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const url = initial ? `/api/admin/testimonials/${initial.id}` : '/api/admin/testimonials'
      const method = initial ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          roleLabel: form.roleLabel || null,
          treatment: form.treatment || null,
          quote: form.quote,
          rating: form.rating,
          photoUrl: form.photoUrl || null,
          featured: form.featured,
          status: form.status,
          order: form.order,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save testimonial')

      onSaved(json.testimonial)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to save testimonial')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(6,11,33,0.5)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between border-b border-canvas-200 px-6 py-4">
          <h2 className="text-base font-semibold text-ink-950">
            {initial ? 'Edit testimonial' : 'Add testimonial'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-canvas-100 hover:text-ink-950"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Patient name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Jane D."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Role / label</label>
              <input
                value={form.roleLabel}
                onChange={(e) => setForm({ ...form, roleLabel: e.target.value })}
                placeholder="Verified Patient"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500">Treatment (optional)</label>
            <input
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              placeholder="Hormone Replacement Therapy"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500">Quote</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
              rows={4}
              placeholder="Share what the patient said…"
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Rating</label>
              <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            </div>
            <div>
              <ImageUploader
                label="Photo"
                hint="Upload a patient photo or paste a URL"
                value={form.photoUrl}
                onChange={(url) => setForm({ ...form, photoUrl: url })}
                folder="testimonials"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
                className={`${inputClass} w-auto`}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Display order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className={`${inputClass} w-24`}
              />
            </div>
            <label className="mt-5 flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
              />
              <span className="text-xs text-gray-600">Feature this testimonial</span>
            </label>
          </div>

          {status === 'error' ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 border-t border-canvas-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-canvas-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : null}
              {initial ? 'Save changes' : 'Add testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState(initial)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const sorted = useMemo(
    () => [...testimonials].sort((a, b) => a.order - b.order || (a.updatedAt < b.updatedAt ? 1 : -1)),
    [testimonials],
  )

  const flash = (type: 'success' | 'error', message: string) => {
    setBanner({ type, message })
    setTimeout(() => setBanner(null), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setModalOpen(true)
  }

  const handleSaved = (saved: Testimonial) => {
    setTestimonials((prev) => {
      const exists = prev.some((t) => t.id === saved.id)
      return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [saved, ...prev]
    })
    setModalOpen(false)
    flash('success', editing ? 'Testimonial updated.' : 'Testimonial added.')
  }

  const handleToggleStatus = async (t: Testimonial) => {
    setTogglingId(t.id)
    try {
      const res = await fetch(`/api/admin/testimonials/${t.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: t.status === 'published' ? 'draft' : 'published' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update')
      setTestimonials((prev) => prev.map((x) => (x.id === t.id ? json.testimonial : x)))
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  const handleToggleFeatured = async (t: Testimonial) => {
    setTogglingId(t.id)
    try {
      const res = await fetch(`/api/admin/testimonials/${t.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !t.featured }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update')
      setTestimonials((prev) => prev.map((x) => (x.id === t.id ? json.testimonial : x)))
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete')
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
      flash('success', 'Testimonial deleted.')
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-950">Testimonials</h1>
          <p className="text-sm text-gray-500">
            {testimonials.length} testimonial{testimonials.length === 1 ? '' : 's'} managed here.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700"
        >
          <Plus className="size-4" />
          Add testimonial
        </button>
      </div>

      {banner ? (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            banner.type === 'success' ? 'bg-sage-50 text-sage-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {banner.type === 'success' ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {banner.message}
        </div>
      ) : null}

      {sorted.length === 0 ? (
        <div className="rounded-2xl bg-white py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <Quote className="mx-auto size-8 text-canvas-300" />
          <p className="mt-3 text-sm text-gray-500">No testimonials yet.</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-3 text-sm font-medium text-sage-600 hover:text-sage-700 hover:underline"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {t.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photoUrl}
                      alt={t.name}
                      className="size-10 rounded-full object-cover ring-1 ring-canvas-200"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-sage-50 text-sm font-semibold text-sage-700">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink-950">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.roleLabel || t.treatment || '—'}</p>
                  </div>
                </div>
                {t.featured ? (
                  <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    Featured
                  </span>
                ) : null}
              </div>

              <div className="mt-3 flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-3.5 ${i < t.rating ? 'fill-current' : 'text-canvas-200'}`} />
                ))}
              </div>

              <p className="mt-3 line-clamp-4 flex-1 text-sm text-gray-600">&ldquo;{t.quote}&rdquo;</p>

              <div className="mt-4 flex items-center justify-between border-t border-canvas-100 pt-3">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(t)}
                  disabled={togglingId === t.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    t.status === 'published'
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {togglingId === t.id ? <Loader2 className="size-3 animate-spin" /> : null}
                  {t.status === 'published' ? 'Published' : 'Draft'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(t)}
                    disabled={togglingId === t.id}
                    title={t.featured ? 'Unfeature' : 'Feature'}
                    className={`rounded-lg p-2 transition-colors ${
                      t.featured
                        ? 'text-amber-500 hover:bg-amber-50'
                        : 'text-gray-400 hover:bg-canvas-100 hover:text-amber-500'
                    }`}
                  >
                    <Star className={`size-4 ${t.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(t)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-canvas-100 hover:text-sage-700"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    disabled={deletingId === t.id}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {deletingId === t.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen ? (
        <TestimonialModal initial={editing} onClose={() => setModalOpen(false)} onSaved={handleSaved} />
      ) : null}
    </div>
  )
}
