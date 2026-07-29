'use client'

import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Newspaper,
  Pencil,
  Trash2,
  X,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'

import { ImageUploader } from '@/components/admin/ImageUploader'
import { newsFormSchema, type NewsFormValues } from '@/lib/validation/news'

interface NewsRow {
  id: string
  title: string
  thumbnailUrl: string
  newsLink: string
  source: string | null
  publishedLabel: string | null
  description: string | null
  type: string
  order: number
  published: boolean
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

function EditNewsModal({
  item,
  onClose,
  onSaved,
}: {
  item: NewsRow
  onClose: () => void
  onSaved: (n: NewsRow) => void
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: item.title,
      thumbnailUrl: item.thumbnailUrl,
      newsLink: item.newsLink,
      source: item.source ?? '',
      publishedLabel: item.publishedLabel ?? '',
      description: item.description ?? '',
      type: (item.type as 'article' | 'video') ?? 'article',
      order: item.order,
      published: item.published,
    },
  })

  const [submitError, setSubmitError] = useState('')

  const onValid = async (data: NewsFormValues) => {
    setSubmitError('')
    try {
      const res = await fetch(`/api/admin/news/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save news item')

      toast.success('News item updated.')
      onSaved(json.news)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save news item'
      setSubmitError(message)
      toast.error(message)
    }
  }

  const onInvalid = () => toast.error('Please fix the highlighted fields before saving.')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(6,11,33,0.5)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between border-b border-canvas-200 px-6 py-4">
          <h2 className="text-base font-semibold text-ink-950">Edit news item</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-canvas-100 hover:text-ink-950">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-4 px-6 py-5">
          <div>
            <label className="block text-xs font-medium text-gray-500">Title</label>
            <input {...register('title')} className={inputClass} />
            <FieldError message={errors.title?.message} />
          </div>
          <div>
            <Controller
              name="thumbnailUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  label="Thumbnail"
                  hint="Upload a thumbnail or paste a URL"
                  value={field.value || ''}
                  onChange={field.onChange}
                  folder="news"
                />
              )}
            />
            <FieldError message={errors.thumbnailUrl?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">News link</label>
            <input {...register('newsLink')} placeholder="https://..." className={inputClass} />
            <FieldError message={errors.newsLink?.message} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-500">Source / publication</label>
              <input {...register('source')} placeholder="Savannah Business Journal" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Published date</label>
              <input {...register('publishedLabel')} placeholder="February 19, 2026" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Description (optional)</label>
            <textarea {...register('description')} rows={2} className={inputClass} />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500">Type</label>
              <select {...register('type')} className={`${inputClass} w-auto`}>
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500">Display order</label>
              <input type="number" {...register('order', { valueAsNumber: true })} className={`${inputClass} w-24`} />
            </div>
            <label className="mt-5 flex items-center gap-2">
              <input type="checkbox" {...register('published')} className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600" />
              <span className="text-xs text-gray-600">Published</span>
            </label>
          </div>

          {submitError ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {submitError}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 border-t border-canvas-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-canvas-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function NewsManager({ initial }: { initial: NewsRow[] }) {
  const [items, setItems] = useState(initial)
  const [editing, setEditing] = useState<NewsRow | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const flash = (type: 'success' | 'error', message: string) => {
    setBanner({ type, message })
    setTimeout(() => setBanner(null), 3000)
  }

  const handleToggle = async (item: NewsRow) => {
    setTogglingId(item.id)
    try {
      const res = await fetch(`/api/admin/news/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !item.published }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update')
      setItems((prev) => prev.map((x) => (x.id === item.id ? json.news : x)))
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news item? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete')
      setItems((prev) => prev.filter((x) => x.id !== id))
      flash('success', 'News item deleted.')
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {banner ? (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            banner.type === 'success' ? 'bg-sage-50 text-sage-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {banner.type === 'success' ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
          {banner.message}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <Newspaper className="mx-auto h-10 w-10 text-dash-border" />
          <h3 className="mt-4 text-base font-semibold text-dash-text">No news items yet</h3>
          <p className="mt-1 text-sm text-dash-text-muted">Add press coverage to feature it on the public site.</p>
        </div>
      ) : (
        <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <table className="min-w-full divide-y divide-dash-border">
            <thead className="sticky top-0 z-10 bg-dash-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border">
              {items.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-dash-bg">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.thumbnailUrl} alt="" className="size-10 rounded-lg object-cover ring-1 ring-dash-border" />
                      <div>
                        <p className="text-sm font-medium text-dash-text">{item.title}</p>
                        <p className="text-xs text-dash-text-muted">
                          {[item.source, item.publishedLabel].filter(Boolean).join(' · ') || item.newsLink}
                        </p>
                        <a
                          href={item.newsLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-dash-text-muted hover:text-dash-text"
                        >
                          {item.newsLink}
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggle(item)}
                      disabled={togglingId === item.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        item.published ? 'bg-sage-50 text-sage-700 hover:bg-sage-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      {togglingId === item.id ? <Loader2 className="size-3 animate-spin" /> : null}
                      {item.published ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setEditing(item)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-dash-bg hover:text-dash-text"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <EditNewsModal
          item={editing}
          onClose={() => setEditing(null)}
          onSaved={(saved) => {
            setItems((prev) => prev.map((x) => (x.id === saved.id ? saved : x)))
            setEditing(null)
            flash('success', 'News item updated.')
          }}
        />
      ) : null}
    </div>
  )
}
