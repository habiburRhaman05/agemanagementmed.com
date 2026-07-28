import { getDashboardStats } from '@/actions/appointment'
import Link from 'next/link'
import {
  FileText,
  CalendarCheck,
  Inbox,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  type LucideIcon,
} from 'lucide-react'

const statusIcons: Record<string, LucideIcon> = {
  pending: Clock,
  confirmed: CheckCircle2,
  completed: CheckCircle2,
  cancelled: XCircle,
}

const statusColors: Record<string, string> = {
  pending: 'text-amber-600 bg-amber-50',
  confirmed: 'text-emerald-600 bg-emerald-50',
  completed: 'text-blue-600 bg-blue-50',
  cancelled: 'text-red-600 bg-red-50',
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      accent: 'from-blue-500 to-indigo-600',
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Published',
      value: stats.publishedPosts,
      icon: CheckCircle2,
      accent: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments,
      icon: CalendarCheck,
      accent: 'from-purple-500 to-fuchsia-600',
      iconColor: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      sublabel: `${stats.totalLeads} total`,
      icon: Inbox,
      accent: 'from-amber-500 to-orange-600',
      iconColor: 'text-amber-600 bg-amber-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-emerald-900 px-6 py-8 shadow-lg sm:px-10 sm:py-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-sm font-medium text-emerald-300">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Practice overview</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            A snapshot of content, bookings, and inbound inquiries across the site.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/blog/create"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-400"
            >
              <FileText className="h-4 w-4" />
              New Blog Post
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              View Appointments
            </Link>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              View Leads
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${card.accent}`}
              aria-hidden
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                {card.sublabel ? (
                  <p className="mt-1 text-xs text-gray-400">{card.sublabel}</p>
                ) : null}
              </div>
              <div className={`rounded-xl p-3 ${card.iconColor}`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Data */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Latest Posts</h2>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y">
            {stats.recentPosts.length > 0 ? (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50/60"
                >
                  <p className="truncate text-sm font-medium text-gray-900">
                    {post.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : post.status === 'draft'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-center text-sm text-gray-400">
                No posts yet.
                <Link
                  href="/admin/blog/create"
                  className="ml-1 text-emerald-600 hover:underline"
                >
                  Create one
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Latest Appointments
            </h2>
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y">
            {stats.recentAppointments.length > 0 ? (
              stats.recentAppointments.map((apt) => {
                const StatusIcon = statusIcons[apt.status] || Clock
                const statusColor = statusColors[apt.status] || 'text-gray-600 bg-gray-50'
                const statusLabel = statusLabels[apt.status] || apt.status

                return (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-gray-50/60"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {apt.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {apt.service || 'General'}
                      </p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusLabel}
                    </span>
                  </div>
                )
              })
            ) : (
              <p className="px-6 py-8 text-center text-sm text-gray-400">
                No appointments yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
