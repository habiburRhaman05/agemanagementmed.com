import { getPosts } from '@/actions/blog'
import Link from 'next/link'
import { Plus, Search, FileText } from 'lucide-react'
import { BlogTable } from '@/components/admin/BlogTable'

interface Props {
  searchParams: Promise<{
    status?: string
    search?: string
    page?: string
  }>
}

export default async function BlogListPage({ searchParams }: Props) {
  const params = await searchParams
  const status = params.status || undefined
  const search = params.search || undefined
  const page = Number(params.page) || 1

  const result = await getPosts({ status, search, page })

  // Convert Date objects to strings for serialization
  const serializedPosts = result.posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : null,
    createdAt: post.createdAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-950">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/create"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-sage-700"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {['all', 'published', 'draft', 'archived'].map((s) => (
            <Link
              key={s}
              href={
                s === 'all'
                  ? '/admin/blog'
                  : `/admin/blog?status=${s}`
              }
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                (s === 'all' && !status) || s === status
                  ? 'bg-sage-50 text-sage-700'
                  : 'text-gray-500 hover:bg-canvas-50 hover:text-gray-700'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
        </div>

        <form className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            name="search"
            defaultValue={search || ''}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-canvas-300 py-2 pl-10 pr-4 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
        </form>
      </div>

      {/* Table */}
      {result.posts.length > 0 ? (
        <BlogTable posts={serializedPosts} />
      ) : (
        <div className="rounded-2xl bg-white py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <FileText className="mx-auto h-12 w-12 text-canvas-300" />
          <h3 className="mt-4 text-base font-semibold text-ink-950">
            No posts found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {search
              ? 'Try a different search term.'
              : 'Get started by creating your first blog post.'}
          </p>
          {!search && (
            <Link
              href="/admin/blog/create"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sage-600 hover:text-sage-700"
            >
              <Plus className="h-4 w-4" />
              Create post
            </Link>
          )}
        </div>
      )}

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            Page {result.currentPage} of {result.totalPages} ({result.total}{' '}
            total)
          </p>
          <div className="flex gap-2">
            {result.currentPage > 1 && (
              <Link
                href={`/admin/blog?page=${result.currentPage - 1}${status ? `&status=${status}` : ''}${search ? `&search=${search}` : ''}`}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-canvas-50"
              >
                Previous
              </Link>
            )}
            {result.currentPage < result.totalPages && (
              <Link
                href={`/admin/blog?page=${result.currentPage + 1}${status ? `&status=${status}` : ''}${search ? `&search=${search}` : ''}`}
                className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-canvas-50"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
