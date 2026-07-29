'use client'

import { AlertCircle, Loader2, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { ImageUploader } from '@/components/admin/ImageUploader'
import { personFormSchema, type PersonFormValues } from '@/lib/validation/person'
import { createPerson, updatePerson } from '@/actions/people'

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'
const cardClass =
  'space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

interface PersonRecord {
  id: string
  slug: string
  name: string
  credentials: string | null
  role: string
  portraitSrc: string
  portraitAlt: string
  summary: string
  bio: string[]
  specialties: string[] | null
  featured: boolean
  status: string
  order: number
}

interface Props {
  mode: 'create' | 'edit'
  person?: PersonRecord
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export function PersonForm({ mode, person }: Props) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')
  const [autoSlug, setAutoSlug] = useState(!person?.slug)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      slug: person?.slug ?? '',
      name: person?.name ?? '',
      credentials: person?.credentials ?? '',
      role: person?.role ?? '',
      portraitSrc: person?.portraitSrc ?? '',
      portraitAlt: person?.portraitAlt ?? '',
      summary: person?.summary ?? '',
      bio: person?.bio?.join('\n\n') ?? '',
      specialties: person?.specialties?.join(', ') ?? '',
      featured: person?.featured ?? false,
      status: (person?.status as 'draft' | 'published') ?? 'published',
      order: person?.order ?? 0,
    },
  })

  const name = watch('name')
  const slug = watch('slug')

  const handleNameChange = (value: string) => {
    setValue('name', value)
    if (autoSlug) setValue('slug', slugify(value), { shouldValidate: true })
  }

  const onValid = async (data: PersonFormValues) => {
    setSubmitError('')

    const payload = {
      ...(mode === 'create' ? { slug: data.slug } : {}),
      name: data.name,
      credentials: data.credentials || undefined,
      role: data.role,
      portraitSrc: data.portraitSrc,
      portraitAlt: data.portraitAlt,
      summary: data.summary,
      bio: data.bio
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      specialties: (data.specialties ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      featured: data.featured,
      status: data.status,
      order: data.order,
    }

    const fd = new FormData()
    fd.append('data', JSON.stringify(payload))

    try {
      const result =
        mode === 'create' ? await createPerson(null, fd) : await updatePerson(person!.id, null, fd)

      if (!result.success) throw new Error(result.error)

      toast.success(mode === 'create' ? 'Team member added.' : 'Team member updated.')
      router.push('/admin/people')
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save team member'
      setSubmitError(message)
      toast.error(message)
    }
  }

  const onInvalid = () => toast.error('Please fix the highlighted fields before saving.')

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-6">
      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-500">Name</label>
            <input value={name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Credentials (optional)</label>
            <input {...register('credentials')} placeholder="DO, FACOG" className={inputClass} />
          </div>
        </div>

        {mode === 'create' ? (
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-gray-500">Slug</label>
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                  className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
                />
                Auto-generate
              </label>
            </div>
            <input
              value={slug}
              onChange={(e) => {
                setValue('slug', slugify(e.target.value), { shouldValidate: true })
                setAutoSlug(false)
              }}
              className={`${inputClass} font-mono`}
            />
            <FieldError message={errors.slug?.message} />
          </div>
        ) : (
          <div>
            <p className="text-xs font-medium text-gray-500">Slug (fixed)</p>
            <p className="mt-1 font-mono text-sm text-ink-950">{person?.slug}</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-500">Role / title</label>
          <input {...register('role')} placeholder="Medical Director · Age Management Medicine Specialist" className={inputClass} />
          <FieldError message={errors.role?.message} />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500">Summary</label>
          <textarea {...register('summary')} rows={2} className={inputClass} />
          <FieldError message={errors.summary?.message} />
        </div>
      </div>

      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Portrait</h2>
        <Controller
          name="portraitSrc"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Photo"
              hint="Upload a portrait or paste a URL"
              value={field.value || ''}
              onChange={field.onChange}
              folder="people"
            />
          )}
        />
        <FieldError message={errors.portraitSrc?.message} />
        <div>
          <label className="block text-xs font-medium text-gray-500">Alt text</label>
          <input {...register('portraitAlt')} className={inputClass} />
          <FieldError message={errors.portraitAlt?.message} />
        </div>
      </div>

      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Bio</h2>
        <p className="text-xs text-gray-500">One paragraph per line — rendered as separate paragraphs on the profile.</p>
        <textarea {...register('bio')} rows={10} className={inputClass} />
        <FieldError message={errors.bio?.message} />
      </div>

      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Specialties (optional)</h2>
        <p className="text-xs text-gray-500">Comma-separated.</p>
        <input {...register('specialties')} placeholder="Bioidentical hormone optimization, Age management medicine" className={inputClass} />
      </div>

      <div className={cardClass}>
        <h2 className="text-sm font-semibold text-ink-950">Visibility</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500">Status</label>
            <select {...register('status')} className={`${inputClass} w-auto`}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Display order</label>
            <input type="number" {...register('order', { valueAsNumber: true })} className={`${inputClass} w-24`} />
          </div>
          <label className="mt-5 flex items-center gap-2">
            <input type="checkbox" {...register('featured')} className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600" />
            <span className="text-xs text-gray-600">Feature on homepage team teaser</span>
          </label>
        </div>
      </div>

      {submitError ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {submitError}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Link
          href="/admin/people"
          className="rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-canvas-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Add team member' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
