'use client'

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { ImageUploader } from '@/components/admin/ImageUploader'
import { serviceFormSchema, type ServiceFormValues } from '@/lib/validation/service'

interface ServiceItem {
  id: string
  slug: string
  href: string
  shortName: string
  summary: string
  cardImageSrc: string
  cardImageAlt: string
  cardBenefits: string[]
  order: number
  status: string
  updatedAt: string
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

function ServiceModal({
  initial,
  onClose,
  onSaved,
}: {
  initial: ServiceItem | null
  onClose: () => void
  onSaved: (s: ServiceItem) => void
}) {
  const [benefits, setBenefits] = useState<string[]>(initial?.cardBenefits ?? [''])
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: initial
      ? {
          slug: initial.slug,
          href: initial.href,
          shortName: initial.shortName,
          summary: initial.summary,
          cardImageSrc: initial.cardImageSrc,
          cardImageAlt: initial.cardImageAlt,
          cardBenefits: initial.cardBenefits,
          order: initial.order,
          status: initial.status as 'draft' | 'published',
        }
      : {
          slug: '',
          href: '',
          shortName: '',
          summary: '',
          cardImageSrc: '',
          cardImageAlt: '',
          cardBenefits: [''],
          order: 0,
          status: 'published',
        },
  })

  useEffect(() => {
    setValue('cardBenefits', benefits.filter((b) => b.trim()))
  }, [benefits, setValue])

  const addBenefit = () => {
    setBenefits((prev) => [...prev, ''])
  }

  const removeBenefit = (index: number) => {
    setBenefits((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const updateBenefit = (index: number, value: string) => {
    setBenefits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const [submitError, setSubmitError] = useState('')

  const onValid = async (data: ServiceFormValues) => {
    setSubmitError('')

    try {
      const url = initial ? `/api/admin/services/${initial.id}` : '/api/admin/services'
      const method = initial ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          cardBenefits: benefits.filter((b) => b.trim()),
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save service')

      toast.success(initial ? 'Service updated.' : 'Service added.')
      onSaved(json.service)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save service'
      setSubmitError(message)
      toast.error(message)
    }
  }

  const onInvalid = () => {
    toast.error('Please fix the highlighted fields before saving.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(6,11,33,0.5)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between border-b border-canvas-200 px-6 py-4">
          <h2 className="text-base font-semibold text-ink-950">
            {initial ? 'Edit service' : 'Add service'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-canvas-100 hover:text-ink-950"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Slug</label>
              <input {...register('slug')} placeholder="hormone-therapy-men" className={inputClass} />
              <FieldError message={errors.slug?.message} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Href / link</label>
              <input {...register('href')} placeholder="/bioidentical-hormone-replacement-therapy/male" className={inputClass} />
              <FieldError message={errors.href?.message} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Short name</label>
              <input {...register('shortName')} placeholder="BHRT for Men" className={inputClass} />
              <FieldError message={errors.shortName?.message} />
            </div>
            <div />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500">Summary</label>
            <textarea
              {...register('summary')}
              rows={3}
              placeholder="Brief description of the service..."
              className={inputClass}
            />
            <FieldError message={errors.summary?.message} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Controller
                name="cardImageSrc"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    label="Card image"
                    hint="Upload an image or paste a URL"
                    value={field.value || ''}
                    onChange={field.onChange}
                    folder="services"
                  />
                )}
              />
              <FieldError message={errors.cardImageSrc?.message} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Image alt text</label>
              <input
                {...register('cardImageAlt')}
                placeholder="Describe the image"
                className={inputClass}
              />
              <FieldError message={errors.cardImageAlt?.message} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500">
              Benefits <span className="text-gray-400">(one per line)</span>
            </label>
            <div className="mt-1 space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    onBlur={() => setValue('cardBenefits', benefits.filter((b) => b.trim()))}
                    placeholder={`Benefit ${index + 1}`}
                    className={inputClass}
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <FieldError message={errors.cardBenefits?.message} />
            <button
              type="button"
              onClick={addBenefit}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sage-600 hover:text-sage-700"
            >
              <Plus className="size-3.5" />
              Add benefit
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500">Status</label>
              <select {...register('status')} className={`${inputClass} w-auto`}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Display order</label>
              <input
                type="number"
                {...register('order', { valueAsNumber: true })}
                className={`${inputClass} w-24`}
              />
            </div>
          </div>

          {submitError ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {submitError}
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
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              {initial ? 'Save changes' : 'Add service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ServicesManager({ initial }: { initial: ServiceItem[] }) {
  const [services, setServices] = useState(initial)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceItem | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const sorted = useMemo(
    () => [...services].sort((a, b) => a.order - b.order || (a.updatedAt < b.updatedAt ? 1 : -1)),
    [services],
  )

  const flash = (type: 'success' | 'error', message: string) => {
    setBanner({ type, message })
    setTimeout(() => setBanner(null), 3000)
  }

  const openCreate = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (s: ServiceItem) => {
    setEditing(s)
    setModalOpen(true)
  }

  const handleSaved = (saved: ServiceItem) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === saved.id)
      return exists ? prev.map((s) => (s.id === saved.id ? saved : s)) : [saved, ...prev]
    })
    setModalOpen(false)
    flash('success', editing ? 'Service updated.' : 'Service added.')
  }

  const handleToggleStatus = async (s: ServiceItem) => {
    setTogglingId(s.id)
    try {
      const res = await fetch(`/api/admin/services/${s.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: s.status === 'published' ? 'draft' : 'published' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update')
      setServices((prev) => prev.map((x) => (x.id === s.id ? json.service : x)))
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete')
      setServices((prev) => prev.filter((s) => s.id !== id))
      flash('success', 'Service deleted.')
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
          <h1 className="text-2xl font-bold text-ink-950">Services</h1>
          <p className="text-sm text-gray-500">
            {services.length} service{services.length === 1 ? '' : 's'} managed here.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover"
        >
          <Plus className="size-4" />
          Add service
        </button>
      </div>

      {banner ? (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            banner.type === 'success'
              ? 'bg-sage-50 text-sage-700'
              : 'bg-red-50 text-red-600'
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
          <p className="text-sm text-gray-500">No services yet.</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-3 text-sm font-medium text-sage-600 hover:text-sage-700 hover:underline"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-canvas-100">
                {s.cardImageSrc ? (
                  <img
                    src={s.cardImageSrc}
                    alt={s.cardImageAlt}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs text-gray-400">
                    No img
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink-950">{s.shortName}</p>
                <p className="truncate text-xs text-gray-400">{s.summary}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {(s.cardBenefits as string[]).map((b, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-sage-50 px-2 py-0.5 text-[10px] font-medium text-sage-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(s)}
                  disabled={togglingId === s.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    s.status === 'published'
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {togglingId === s.id ? <Loader2 className="size-3 animate-spin" /> : null}
                  {s.status === 'published' ? 'Published' : 'Draft'}
                </button>

                <button
                  type="button"
                  onClick={() => openEdit(s)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-canvas-100 hover:text-sage-700"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(s.id)}
                  disabled={deletingId === s.id}
                  className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  {deletingId === s.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen ? (
        <ServiceModal initial={editing} onClose={() => setModalOpen(false)} onSaved={handleSaved} />
      ) : null}
    </div>
  )
}
