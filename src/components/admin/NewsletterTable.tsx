'use client'

import { format } from 'date-fns'
import { Mail, MailPlus } from 'lucide-react'

interface Subscriber {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

interface Props {
  subscribers: Subscriber[]
  currentPage: number
  totalPages: number
  total: number
  search?: string
}

function Avatar({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()

  const colors = [
    'bg-amber-100 text-amber-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-rose-100 text-rose-700',
    'bg-purple-100 text-purple-700',
    'bg-indigo-100 text-indigo-700',
  ]
  const seed = `${firstName}${lastName}`
  const colorIndex = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length

  return (
    <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${colors[colorIndex]}`}>
      {initials}
    </div>
  )
}

export function NewsletterTable({ subscribers, currentPage, totalPages, total, search }: Props) {
  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    params.set('page', String(page))
    return `/admin/newsletter?${params.toString()}`
  }

  if (subscribers.length === 0) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-gray-200">
        <MailPlus className="mx-auto size-10 text-gray-300" />
        <h3 className="mt-4 text-base font-semibold text-gray-900">No subscribers yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          {search ? 'Try a different search term.' : 'No one has joined the newsletter yet.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {total} subscriber{total === 1 ? '' : 's'}
      </p>

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Subscribed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="group transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar firstName={subscriber.firstName} lastName={subscriber.lastName} />
                      <span className="text-sm font-medium text-gray-900">
                        {subscriber.firstName} {subscriber.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      <Mail className="mr-2 size-4 text-gray-400" />
                      {subscriber.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(subscriber.createdAt), 'MMM d, yyyy h:mm a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages} ({total} total)
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <a href={buildPaginationUrl(currentPage - 1)} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                Previous
              </a>
            ) : null}
            {currentPage < totalPages ? (
              <a href={buildPaginationUrl(currentPage + 1)} className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                Next
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
