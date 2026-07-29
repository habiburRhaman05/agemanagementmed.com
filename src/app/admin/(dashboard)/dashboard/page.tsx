import { getDashboardStats } from '@/actions/appointment'
import Link from 'next/link'
import {
  FileText,
  CalendarCheck,
  Inbox,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const statusIcons: Record<string, LucideIcon> = {
  pending: Clock,
  confirmed: CheckCircle2,
  completed: CheckCircle2,
  cancelled: XCircle,
}

const statusColors: Record<string, string> = {
  pending: 'text-amber-700 bg-amber-50/80 ring-amber-600/20',
  confirmed: 'text-sage-700 bg-sage-50/80 ring-sage-600/20',
  completed: 'text-blue-700 bg-blue-50/80 ring-blue-600/20',
  cancelled: 'text-rose-700 bg-rose-50/80 ring-rose-600/20',
}

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const metrics = [
    {
      label: 'New Leads',
      value: stats.newLeads,
      sublabel: `${stats.totalLeads} total in database`,
      icon: Inbox,
      trend: '+12% from last month',
      trendUp: true,
    },
    {
      label: 'Total Appointments',
      value: stats.totalAppointments,
      sublabel: 'Scheduled consultations',
      icon: CalendarCheck,
      trend: '+4% from last month',
      trendUp: true,
    },
    {
      label: 'Published Articles',
      value: stats.publishedPosts,
      sublabel: `Out of ${stats.totalPosts} total drafts`,
      icon: FileText,
      trend: '+2 new this week',
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-10 pb-10">
      {/* Premium Header Area */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            Overview
          </h1>
          <p className="mt-2 text-base text-gray-500">
            A real-time snapshot of your practice's inquiries and content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/create"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-ink-950 hover:bg-ink-900 transition-all hover:-translate-y-0.5"
          >
            <Plus className="-ml-1 h-4 w-4" />
            New Post
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-all hover:-translate-y-0.5"
          >
            View Leads
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-sage-50 p-3 ring-1 ring-sage-100/50">
                <metric.icon className="h-6 w-6 text-sage-600" />
              </div>
              <div className={`flex items-center gap-1.5 text-sm font-medium ${metric.trendUp ? 'text-sage-600' : 'text-gray-500'}`}>
                {metric.trendUp && <TrendingUp className="h-4 w-4" />}
                {metric.trend}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-500">{metric.label}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-ink-950">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-gray-400">{metric.sublabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="flex flex-col rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white/50 px-8 py-6 backdrop-blur-md">
            <div>
              <h2 className="text-lg font-semibold text-ink-950">Recent Appointments</h2>
              <p className="text-sm text-gray-500">Latest scheduled consultations</p>
            </div>
            <Link
              href="/admin/appointments"
              className="group inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-ink-950"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex-1 divide-y divide-gray-50 bg-white">
            {stats.recentAppointments.length > 0 ? (
              stats.recentAppointments.map((apt) => {
                const StatusIcon = statusIcons[apt.status] || Clock
                const statusColor = statusColors[apt.status] || 'text-gray-700 bg-gray-50 ring-gray-600/20'
                const statusLabel = statusLabels[apt.status] || apt.status
                const initials = apt.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

                return (
                  <div
                    key={apt.id}
                    className="group flex items-center justify-between px-8 py-5 transition-colors hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-50 text-sm font-semibold text-sage-700 ring-1 ring-sage-100">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-950">
                          {apt.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {apt.service || 'General Consultation'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColor}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="flex h-48 flex-col items-center justify-center px-8 text-center">
                <CalendarCheck className="h-8 w-8 text-gray-300" />
                <p className="mt-4 text-sm font-medium text-gray-900">No appointments</p>
                <p className="mt-1 text-sm text-gray-500">Check back later for new bookings.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="flex flex-col rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 bg-white/50 px-8 py-6 backdrop-blur-md">
            <div>
              <h2 className="text-lg font-semibold text-ink-950">Recent Content</h2>
              <p className="text-sm text-gray-500">Latest articles and guides</p>
            </div>
            <Link
              href="/admin/blog"
              className="group inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-ink-950"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="flex-1 divide-y divide-gray-50 bg-white">
            {stats.recentPosts.length > 0 ? (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex items-center justify-between px-8 py-5 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-950 group-hover:text-sage-600 transition-colors">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : 'Recently updated'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      post.status === 'published'
                        ? 'bg-sage-50 text-sage-700 ring-sage-600/20'
                        : post.status === 'draft'
                          ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
                          : 'bg-gray-50 text-gray-600 ring-gray-500/20'
                    }`}
                  >
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                       post.status === 'published' ? 'bg-sage-500' : post.status === 'draft' ? 'bg-amber-500' : 'bg-gray-400'
                    }`} />
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex h-48 flex-col items-center justify-center px-8 text-center">
                <FileText className="h-8 w-8 text-gray-300" />
                <p className="mt-4 text-sm font-medium text-gray-900">No posts yet</p>
                <p className="mt-1 text-sm text-gray-500">Start writing your first article.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
