import { redirect } from 'next/navigation'

import { AdminsManager } from '@/components/admin/AdminsManager'
import { getCurrentAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AdminsPage() {
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin) redirect('/admin/login')
  if (currentAdmin.role !== 'superadmin') redirect('/admin/dashboard')

  const rows = await prisma.admin.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })

  const admins = rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }))

  return <AdminsManager initial={admins} currentAdminId={currentAdmin.adminId} />
}
