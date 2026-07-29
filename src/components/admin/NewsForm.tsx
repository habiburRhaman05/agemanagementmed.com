'use client'

import { AlertCircle, Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { ImageUploader } from '@/components/admin/ImageUploader'
import { newsFormSchema, type NewsFormValues } from '@/lib/validation/news'

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'
const cardClass =
  'space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

export function NewsForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      thumbnailUrl: '',
      newsLink: '',
      source: '',
      publishedLabel: '',
      description: '',
      type: 'article',
      order: 0,
      published: true,
    },
  })

  const onValid = async (data: NewsFormValues) => {
    setSubmitError('')
    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create news item')

      toast.success('News item created.')
      router.push('/admin/news')
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create news item'
      setSubmitError(message)
      toast.error(message)
    }
  }

  const onInvalid = () => toast.error('Please fix the highlighted fields before saving.')

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-6">
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Press item</h2>
        <div>
          <label className="block text-xs font-medium text-gray-500">Title</label>
          <input {...register('title')} placeholder="Q&A with women who are making a difference" className={inputClass} />
          <FieldError message={errors.title?.message} />
        </div>
        <div>
          <Controller
            name="thumbnailUrl"
            control={control}
            render={({ field }) => (
              <ImageUploader
                label="Thumbnail"
                hint="Upload a thumbnail image or paste a URL"
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
          <input {...register('newsLink')} placeholder="https://www.example.com/article" className={inputClass} />
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
          <textarea {...register('description')} rows={2} placeholder="Short excerpt shown on the public card" className={inputClass} />
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
      </div>

      {submitError ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {submitError}
        </div>
      ) : null}

      <div className="flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isSubmitting ? 'Creating...' : 'Create news item'}
        </button>
      </div>
    </form>
  )
}
