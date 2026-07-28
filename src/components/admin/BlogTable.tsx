'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Edit, Trash2, ExternalLink, MoreHorizontal } from 'lucide-react'
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
}

export function BlogTable({ posts }: Props) {
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

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y">
        <thead>
          <tr className="bg-canvas-50">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
              Status
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
              Category
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-canvas-50/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink-950">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
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
                        : 'bg-canvas-50 text-gray-600 hover:bg-canvas-100'
                  }`}
                  title="Click to toggle"
                >
                  {post.status}
                </button>
              </td>
              <td className="hidden px-6 py-4 text-sm text-gray-500 lg:table-cell">
                {post.category?.name || '—'}
              </td>
              <td className="hidden px-6 py-4 text-sm text-gray-500 lg:table-cell">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                  : format(new Date(post.createdAt), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-canvas-100 hover:text-gray-600"
                    title="View on site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-canvas-100 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    disabled={deleting === post.id}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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
