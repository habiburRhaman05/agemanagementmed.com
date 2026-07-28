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
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/actions/auth'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Appointments', href: '/admin/appointments', icon: CalendarCheck },
  { label: 'Leads', href: '/admin/leads', icon: Inbox },
  { label: 'Treatments', href: '/admin/treatments', icon: Stethoscope },
  { label: 'SEO', href: '/admin/seo', icon: Search },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    window.location.href = '/admin/login'
  }

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname.startsWith(item.href)
    return (
      <Link
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          isActive
            ? 'bg-white/10 text-white'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        )}
      >
        <span
          className={cn(
            'absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full bg-emerald-400 transition-all',
            isActive ? 'w-1 opacity-100' : 'w-0 opacity-0'
          )}
          aria-hidden
        />
        <item.icon
          className={cn(
            'h-5 w-5 shrink-0 transition-colors',
            isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400'
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
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-800 bg-slate-900 p-2 text-white shadow-sm lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white shadow-lg shadow-emerald-900/30">
            S
          </div>
          <div>
            <p className="text-sm font-semibold text-white">SAMM Admin</p>
            <p className="text-xs text-slate-500">Age Management Med</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/5 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
