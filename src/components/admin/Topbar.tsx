import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface TopbarProps {
  admin: { name: string; role: string }
}

export function Topbar({ admin }: TopbarProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-950/[0.06] bg-white/80 px-6 backdrop-blur-md lg:px-10">
      <div>
        <p className="text-sm font-medium text-ink-950">
          {greeting}, <span className="font-semibold">{admin.name.split(' ')[0]}</span>
        </p>
        <p className="text-xs text-gray-400">Here&apos;s what&apos;s happening with your practice today.</p>
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
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-canvas-100 hover:text-ink-950"
        >
          View site
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </header>
  )
}
