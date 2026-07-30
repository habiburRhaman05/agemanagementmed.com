'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  CalendarCheck,
  Inbox,
  Stethoscope,
  Quote,
  Newspaper,
  Users,
  Search,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Gem,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/actions/auth'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  superadminOnly?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarCheck },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Treatments', href: '/admin/treatments', icon: Stethoscope },
  { label: 'Services', href: '/admin/services', icon: Gem },
  { label: 'Team', href: '/admin/people', icon: Users },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'SEO', href: '/admin/seo', icon: Search },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Admins', href: '/admin/admins', icon: ShieldCheck, superadminOnly: true },
]

interface SidebarProps {
  admin: { name: string; email: string; role: string }
  logoUrl?: string | null
}

export function Sidebar({ admin, logoUrl }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    window.location.href = '/admin/login'
  }

  const visibleItems = navItems.filter((item) => !item.superadminOnly || admin.role === 'superadmin')
  const initials = admin.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname.startsWith(item.href)
    return (
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
            : 'text-dash-slate-400 hover:bg-white/[0.04] hover:text-white'
        )}
      >
        <span
          className={cn(
            'absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full bg-sage-400 shadow-[0_0_12px_rgba(98,183,155,0.7)] transition-all',
            isActive ? 'w-1 opacity-100' : 'w-0 opacity-0'
          )}
          aria-hidden
        />
        <item.icon
          className={cn(
            'h-5 w-5 shrink-0 transition-colors',
            isActive ? 'text-sage-400' : 'text-dash-slate-400/70 group-hover:text-sage-400'
          )}
        />
        {item.label}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-dash-navy-950 p-2 text-white shadow-lg lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-dash-navy-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-linear-to-b from-dash-navy-950 via-dash-navy-900 to-dash-navy-800 transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-6">
          {logoUrl ? (
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-sage-700/40">
              <img src={logoUrl} alt="Logo" className="h-full w-full object-contain p-1" />
            </div>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sage-400 to-sage-700 text-sm font-bold text-white shadow-lg shadow-sage-700/40">
              S
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-white">SAMM Admin</p>
            <p className="text-xs text-dash-slate-400">Age Management Med</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {visibleItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Account + logout */}
        <div className="space-y-1 border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-sage-400">
              {initials || 'A'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{admin.name}</p>
              <p className="truncate text-xs capitalize text-dash-slate-400">{admin.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-dash-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
