'use client'

import { useActionState, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createPost, updatePost, generateSlugFromTitle } from '@/actions/blog'
import type { ActionResult } from '@/actions/blog'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { TipTapEditor } from '@/components/admin/TipTapEditor'
import { ImageUploader } from '@/components/admin/ImageUploader'

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

export function BlogForm({ mode, post, categories, tags }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [autoSlug, setAutoSlug] = useState(!post?.slug)
  const [contentHtml, setContentHtml] = useState(post?.contentHtml || '')
  const [contentJson, setContentJson] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '')
  const [status, setStatus] = useState(post?.status || 'draft')
  const [categoryId, setCategoryId] = useState(post?.categoryId || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post?.tags.map((t) => t.tag.id) || []
  )
  const [metaTitle, setMetaTitle] = useState(post?.seo?.metaTitle || '')
  const [metaDesc, setMetaDesc] = useState(post?.seo?.metaDesc || '')
  const [ogImage, setOgImage] = useState(post?.seo?.ogImage || '')
  const [canonical, setCanonical] = useState(post?.seo?.canonical || '')
  const [noindex, setNoindex] = useState(post?.seo?.noindex || false)

  const handleTitleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value
      setTitle(newTitle)
      if (autoSlug && mode === 'create') {
        const generated = await generateSlugFromTitle(newTitle)
        setSlug(generated)
      }
    },
    [autoSlug, mode]
  )

  const wrapAction = async (
    prevState: ActionResult | null,
    formData: FormData
  ): Promise<ActionResult | null> => {
    const data = {
      title,
      slug,
      excerpt: excerpt || null,
      content: contentJson || null,
      contentHtml: contentHtml || null,
      featuredImage: featuredImage || null,
      status,
      categoryId: categoryId || null,
      tagIds: selectedTags,
      seo: {
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        ogImage: ogImage || null,
        canonical: canonical || null,
        noindex,
      },
    }

    const newFormData = new FormData()
    newFormData.append('data', JSON.stringify(data))

    if (mode === 'create') {
      return createPost(prevState, newFormData)
    }
    return updatePost(post!.id, prevState, newFormData)
  }

  const [state, formAction, pending] = useActionState(wrapAction, null)

  useEffect(() => {
    if (state?.success) {
      router.push('/admin/blog')
      router.refresh()
    }
  }, [state, router])

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
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

      <form action={formAction} className="space-y-6">
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
                required
                className="mt-1 block w-full rounded-lg border border-canvas-300 px-4 py-2.5 text-lg font-semibold text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                placeholder="Post title..."
              />
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
                    setSlug(e.target.value)
                    setAutoSlug(false)
                  }}
                  required
                  className="block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                />
              </div>
            </div>

            {/* Content / Rich text with TipTap */}
            <div className="rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
              <div className="border-b bg-canvas-50/50 px-6 py-3">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
              </div>
              <TipTapEditor
                content={contentHtml}
                onChange={(html, json) => {
                  setContentHtml(html)
                  if (json) setContentJson(JSON.stringify(json))
                }}
                placeholder="Start writing your blog post..."
              />
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
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                maxLength={500}
                className="mt-1 block w-full rounded-lg border border-canvas-300 px-4 py-2.5 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                placeholder="Brief summary for preview cards..."
              />
              <p className="mt-1 text-xs text-gray-400">
                {excerpt.length}/500 characters
              </p>
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
                {['draft', 'published', 'archived'].map((s) => (
                  <label key={s} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={(e) => setStatus(e.target.value)}
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
              <ImageUploader
                label="Featured Image"
                hint="Upload a featured image or paste a URL"
                value={featuredImage}
                onChange={setFeaturedImage}
                folder="blog"
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
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
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
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    maxLength={70}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    {metaTitle.length}/70
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    maxLength={160}
                    rows={2}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    {metaDesc.length}/160
                  </p>
                </div>
                <div>
                  <ImageUploader
                    label="OG Image"
                    hint="Social sharing image (open graph)"
                    value={ogImage}
                    onChange={setOgImage}
                    folder="blog/og"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={canonical}
                    onChange={(e) => setCanonical(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={noindex}
                    onChange={(e) => setNoindex(e.target.checked)}
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

        {/* Error state */}
        {state && !state.success && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </div>
        )}

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
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
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
