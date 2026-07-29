'use client'

import Link from 'next/link'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface TopbarProps {
  admin: { name: string; role: string }
}

export function Topbar({ admin }: TopbarProps) {
  const pathname = usePathname()
  
  // Generate breadcrumbs from pathname (e.g. /admin/settings -> Settings)
  const segments = pathname.split('/').filter(Boolean)
  // Skip 'admin' which is the first segment usually
  const breadcrumbs = segments.slice(1).map((segment, index) => {
    // Replace hyphens with spaces and capitalize
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      
    // Determine if it's an ID (usually long alphanumeric) and format nicely or skip
    // For simplicity, we just use the raw label. A more advanced version could fetch names for IDs.
    
    return {
      label: label.length > 25 ? 'Details' : label,
      isLast: index === segments.length - 2
    }
  })

  // If no breadcrumbs (e.g. at /admin), just say Dashboard
  if (breadcrumbs.length === 0) {
    breadcrumbs.push({ label: 'Dashboard', isLast: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-xl lg:px-10">
      <div className="flex items-center text-sm font-medium text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">Admin</span>
          <ChevronRight className="h-4 w-4 text-gray-300" />
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className={crumb.isLast ? "text-ink-950 font-semibold" : "text-gray-400"}>
                {crumb.label}
              </span>
              {!crumb.isLast && <ChevronRight className="h-4 w-4 text-gray-300" />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {admin.role === 'superadmin' ? (
          <span className="hidden rounded-full bg-sage-50 px-3 py-1 text-xs font-semibold text-sage-700 ring-1 ring-inset ring-sage-600/10 sm:inline-flex">
            Super admin
          </span>
        ) : null}
        <div className="h-4 w-[1px] bg-gray-200 mx-1 hidden sm:block" />
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-ink-950"
        >
          View site
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </header>
  )
}
