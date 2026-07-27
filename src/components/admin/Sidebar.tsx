'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  CalendarCheck,
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
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
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
        className="fixed left-4 top-4 z-50 rounded-lg border bg-white p-2 shadow-sm lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-white transition-transform lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            S
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">SAMM Admin</p>
            <p className="text-xs text-gray-500">Age Management Med</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
