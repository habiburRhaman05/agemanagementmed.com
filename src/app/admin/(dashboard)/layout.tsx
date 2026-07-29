import { redirect } from 'next/navigation'

import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'
import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')

  const identity = { name: admin.name, email: admin.email, role: admin.role }
  const siteSettings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } })
  const logoUrl = siteSettings?.logoUrl || null

  return (
    <div className="flex h-screen bg-dash-bg">
      <Sidebar admin={identity} logoUrl={logoUrl} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar admin={identity} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
