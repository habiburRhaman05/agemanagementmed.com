'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { Inbox, Loader2, Phone, Mail, Copy, Check, MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { updateLeadStatus } from '@/actions/lead'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  sourcePath: string | null
  status: string
  createdAt: string
  updatedAt?: string
}

interface Props {
  leads: Lead[]
  currentPage: number
  totalPages: number
  total: number
  status?: string
  search?: string
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  contacted: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  converted: 'bg-sage-50 text-sage-700 ring-1 ring-sage-600/20',
  archived: 'bg-gray-50 text-gray-600 ring-1 ring-gray-500/20',
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const colors = [
    'bg-amber-100 text-amber-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-rose-100 text-rose-700',
    'bg-purple-100 text-purple-700',
    'bg-indigo-100 text-indigo-700',
  ]
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  const color = colors[colorIndex]

  return (
    <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${color}`}>
      {initials}
    </div>
  )
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 inline-flex items-center justify-center rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sage-600"
      title="Copy email"
    >
      {copied ? <Check className="size-3 text-sage-600" /> : <Copy className="size-3" />}
    </button>
  )
}

export function LeadsTable({ leads, currentPage, totalPages, total, status, search }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const buildPaginationUrl = (page: number) => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (search) params.set('search', search)
    params.set('page', String(page))
    return `/admin/leads?${params.toString()}`
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    await updateLeadStatus(id, newStatus)
    setUpdatingId(null)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-gray-200">
        <Inbox className="mx-auto size-10 text-gray-300" />
        <h3 className="mt-4 text-base font-semibold text-gray-900">No leads found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {search ? 'Try a different search term.' : 'No inquiries have been submitted yet.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-sage-600 focus:ring-sage-600"
                    checked={selectedIds.size === leads.length && leads.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Contact name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Phone
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Created (+06)
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                  Last activity (+06)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="group transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300 text-sage-600 focus:ring-sage-600"
                      checked={selectedIds.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.name} />
                      <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.phone ? (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="size-4 text-gray-400" />
                        {lead.phone}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      <Mail className="mr-2 size-4 text-gray-400" />
                      {lead.email}
                      <CopyEmail email={lead.email} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={updatingId === lead.id}
                        className={`rounded-full border-0 px-3 py-1 text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-600/30 ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="archived">Archived</option>
                      </select>
                      {updatingId === lead.id ? <Loader2 className="size-3 animate-spin text-gray-400" /> : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                    <MessageSquare className="size-4 text-gray-400" />
                    {lead.updatedAt ? formatDistanceToNow(new Date(lead.updatedAt), { addSuffix: true }) : formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
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
    </>
  )
}
