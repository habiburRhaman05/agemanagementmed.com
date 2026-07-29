'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Edit, Trash2, ExternalLink, FileText } from 'lucide-react'
import { deletePost, togglePostStatus } from '@/actions/blog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BlogPost {
  id: string
  title: string
  slug: string
  status: string
  publishedAt: string | null
  createdAt: string
  category: { name: string; slug: string } | null
  author: { name: string } | null
  tags: { tag: { name: string; slug: string } }[]
}

interface Props {
  posts: BlogPost[]
  search?: string
}

export function BlogTable({ posts, search }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    setDeleting(id)
    await deletePost(id)
    setDeleting(null)
    router.refresh()
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus =
      currentStatus === 'published' ? 'draft' : 'published'
    await togglePostStatus(id, newStatus as 'draft' | 'published')
    router.refresh()
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl bg-dash-surface py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <FileText className="mx-auto h-10 w-10 text-dash-border" />
        <h3 className="mt-4 text-base font-semibold text-dash-text">No posts found</h3>
        <p className="mt-1 text-sm text-dash-text-muted">
          {search ? 'Try a different search term.' : 'Get started by creating your first blog post.'}
        </p>
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-auto rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y divide-dash-border">
        <thead className="sticky top-0 z-10 bg-dash-bg">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted">
              Title
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted md:table-cell">
              Status
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted lg:table-cell">
              Category
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-dash-text-muted lg:table-cell">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-dash-text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-border">
          {posts.map((post) => (
            <tr key={post.id} className="transition-colors hover:bg-dash-bg">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-dash-text">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-dash-text-muted">
                      /blog/{post.slug}
                    </p>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-4 md:table-cell">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(post.id, post.status)}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                    post.status === 'published'
                      ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                      : post.status === 'draft'
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        : 'bg-dash-bg text-dash-text-muted hover:bg-dash-border'
                  }`}
                  title="Click to toggle"
                >
                  {post.status}
                </button>
              </td>
              <td className="hidden px-6 py-4 text-sm text-dash-text-muted lg:table-cell">
                {post.category?.name || '—'}
              </td>
              <td className="hidden px-6 py-4 text-sm text-dash-text-muted lg:table-cell">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                  : format(new Date(post.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="rounded-lg p-2 text-dash-text-muted transition-colors hover:bg-dash-bg hover:text-dash-text"
                    title="View on site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="rounded-lg p-2 text-dash-text-muted transition-colors hover:bg-dash-bg hover:text-dash-text"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="rounded-lg p-2 text-dash-text-muted transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
