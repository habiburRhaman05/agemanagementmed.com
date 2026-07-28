import { Sidebar } from '@/components/admin/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/60">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">{children}</div>
      </main>
    </div>
  )
}
