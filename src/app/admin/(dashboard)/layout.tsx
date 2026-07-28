import { redirect } from 'next/navigation'

import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'
import { getCurrentAdmin } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')

  const identity = { name: admin.name, email: admin.email, role: admin.role }

  return (
    <div className="flex h-screen bg-canvas-50/60">
      <Sidebar admin={identity} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar admin={identity} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
