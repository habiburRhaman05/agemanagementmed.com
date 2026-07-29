import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface TopbarProps {
  admin: { name: string; role: string }
}

export function Topbar({ admin }: TopbarProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-dash-border bg-dash-surface/80 px-6 backdrop-blur-md lg:px-10">
      <div>
        <p className="text-sm font-medium text-dash-text">
          {greeting}, <span className="font-semibold">{admin.name.split(' ')[0]}</span>
        </p>
        <p className="text-xs text-dash-text-muted">Here&apos;s what&apos;s happening with your practice today.</p>
      </div>
      <div className="flex items-center gap-3">
        {admin.role === 'superadmin' ? (
          <span className="hidden rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700 sm:inline-flex">
            Super admin
          </span>
        ) : null}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-dash-text-muted transition-colors hover:bg-dash-bg hover:text-dash-text"
        >
          View site
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </header>
  )
}
