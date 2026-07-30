'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createPost, updatePost, generateSlugFromTitle } from '@/actions/blog'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { TipTapEditor } from '@/components/admin/TipTapEditor'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { blogFormSchema, type BlogFormValues } from '@/lib/validation/blog'

interface CategoryType {
  id: string
  name: string
}

interface TagType {
  id: string
  name: string
}

interface Props {
  mode: 'create' | 'edit'
  post?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string | null
    contentHtml: string | null
    featuredImage: string | null
    status: string
    categoryId: string | null
    tags: { tag: { id: string; name: string; slug: string } }[]
    seo: {
      metaTitle: string | null
      metaDesc: string | null
      ogImage: string | null
      canonical: string | null
      noindex: boolean
    } | null
  }
  categories: CategoryType[]
  tags: TagType[]
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

export function BlogForm({ mode, post, categories, tags }: Props) {
  const router = useRouter()
  const [autoSlug, setAutoSlug] = useState(!post?.slug)
  const [contentHtml, setContentHtml] = useState(post?.contentHtml || '')

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      contentHtml: post?.contentHtml || '',
      excerpt: post?.excerpt || '',
      featuredImage: post?.featuredImage || '',
      status: (post?.status as BlogFormValues['status']) || 'draft',
      categoryId: post?.categoryId || '',
      tagIds: post?.tags.map((t) => t.tag.id) || [],
      seo: {
        metaTitle: post?.seo?.metaTitle || '',
        metaDesc: post?.seo?.metaDesc || '',
        ogImage: post?.seo?.ogImage || '',
        canonical: post?.seo?.canonical || '',
        noindex: post?.seo?.noindex || false,
      },
    },
  })

  const title = watch('title')
  const slug = watch('slug')
  const selectedTags = watch('tagIds')
  const excerpt = watch('excerpt') ?? ''
  const metaTitle = watch('seo.metaTitle') ?? ''
  const metaDesc = watch('seo.metaDesc') ?? ''
  const status = watch('status')

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setValue('title', newTitle, { shouldValidate: true })
    if (autoSlug && mode === 'create') {
      const generated = await generateSlugFromTitle(newTitle)
      setValue('slug', generated, { shouldValidate: true })
    }
  }

  const toggleTag = (tagId: string) => {
    const next = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId]
    setValue('tagIds', next)
  }

  const onValid = async (data: BlogFormValues) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content || null,
      contentHtml: contentHtml || null,
      featuredImage: data.featuredImage || null,
      status: data.status,
      categoryId: data.categoryId || null,
      tagIds: data.tagIds,
      seo: {
        metaTitle: data.seo.metaTitle || null,
        metaDesc: data.seo.metaDesc || null,
        ogImage: data.seo.ogImage || null,
        canonical: data.seo.canonical || null,
        noindex: data.seo.noindex,
      },
    }

    const newFormData = new FormData()
    newFormData.append('data', JSON.stringify(payload))

    try {
      const result =
        mode === 'create'
          ? await createPost(null, newFormData)
          : await updatePost(post!.id, null, newFormData)

      if (result.success) {
        toast.success(mode === 'create' ? 'Post created.' : 'Post updated.')
        router.push('/admin/blog')
        router.refresh()
      } else {
        toast.error(result.error || 'Something went wrong — please try again.')
      }
    } catch {
      toast.error('Something went wrong — please try again.')
    }
  }

  const onInvalid = () => {
    toast.error('Please fix the highlighted fields before saving.')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-canvas-100 hover:text-gray-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink-950">
              {mode === 'create' ? 'New Post' : 'Edit Post'}
            </h1>
            <p className="text-sm text-gray-500">
              {mode === 'create'
                ? 'Create a new blog post'
                : `Editing: ${post?.title}`}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full rounded-lg border border-canvas-300 px-4 py-2.5 text-lg font-semibold text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                placeholder="Post title..."
              />
              <FieldError message={errors.title?.message} />
            </div>

            {/* Slug */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700"
                >
                  Slug
                </label>
                {mode === 'create' && (
                  <label className="flex items-center gap-2 text-xs text-gray-500">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(e) => setAutoSlug(e.target.checked)}
                      className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
                    />
                    Auto-generate
                  </label>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-400">/blog/</span>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => {
                    setValue('slug', e.target.value, { shouldValidate: true })
                    setAutoSlug(false)
                  }}
                  className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                />
              </div>
              <FieldError message={errors.slug?.message} />
            </div>

            {/* Content / Rich text with TipTap */}
            <div className="rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <div className="border-b bg-canvas-50/50 px-6 py-3">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
              </div>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TipTapEditor
                    content={contentHtml}
                    onChange={(html, json) => {
                      setContentHtml(html)
                      if (json) field.onChange(JSON.stringify(json))
                    }}
                    placeholder="Start writing your blog post..."
                  />
                )}
              />
              {errors.content?.message ? (
                <div className="px-6 pb-4">
                  <FieldError message={errors.content?.message} />
                </div>
              ) : null}
            </div>

            {/* Excerpt */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                {...register('excerpt')}
                rows={3}
                maxLength={500}
                className="mt-1 block w-full rounded-lg border border-canvas-300 px-4 py-2.5 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                placeholder="Brief summary for preview cards..."
              />
              <p className="mt-1 text-xs text-gray-400">
                {excerpt.length}/500 characters
              </p>
              <FieldError message={errors.excerpt?.message} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-2 space-y-2">
                {(['draft', 'published', 'archived'] as const).map((s) => (
                  <label key={s} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={s}
                      checked={status === s}
                      onChange={() => setValue('status', s)}
                      className="border-canvas-300 text-sage-600 focus:ring-sage-600"
                    />
                    <span className="text-sm capitalize text-gray-700">
                      {s}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <Controller
                name="featuredImage"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    label="Featured Image"
                    hint="Upload a featured image or paste a URL"
                    value={field.value || ''}
                    onChange={field.onChange}
                    folder="blog"
                  />
                )}
              />
            </div>

            {/* Category */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                {...register('categoryId')}
                className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedTags.includes(tag.id)
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-canvas-100 text-gray-600 hover:bg-canvas-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <h3 className="text-sm font-medium text-gray-700">
                SEO Settings
              </h3>
              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    {...register('seo.metaTitle')}
                    maxLength={70}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    {metaTitle.length}/70
                  </p>
                  <FieldError message={errors.seo?.metaTitle?.message} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Meta Description
                  </label>
                  <textarea
                    {...register('seo.metaDesc')}
                    maxLength={160}
                    rows={2}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    {metaDesc.length}/160
                  </p>
                  <FieldError message={errors.seo?.metaDesc?.message} />
                </div>
                <div>
                  <Controller
                    name="seo.ogImage"
                    control={control}
                    render={({ field }) => (
                      <ImageUploader
                        label="OG Image"
                        hint="Social sharing image (open graph)"
                        value={field.value || ''}
                        onChange={field.onChange}
                        folder="blog/og"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    placeholder={`/blog/${post?.slug ?? ''}`}
                    {...register('seo.canonical')}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('seo.noindex')}
                    className="rounded border-canvas-300 text-sage-600 focus:ring-sage-600"
                  />
                  <span className="text-xs text-gray-600">
                    No index (hide from search engines)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 border-t pt-6">
          <Link
            href="/admin/blog"
            className="rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-canvas-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover focus:outline-none focus:ring-2 focus:ring-dash-action focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {mode === 'create' ? 'Create Post' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
