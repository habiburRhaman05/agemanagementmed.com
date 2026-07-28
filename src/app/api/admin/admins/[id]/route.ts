import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const UpdateAdminSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(['admin', 'superadmin']).optional(),
  password: z.string().min(8).optional(),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Only super admins can manage admins' }, { status: 403 })
  }

  const { id } = await params
  const existing = await prisma.admin.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = UpdateAdminSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  if (parsed.data.role && parsed.data.role !== 'superadmin' && existing.role === 'superadmin') {
    const superadminCount = await prisma.admin.count({ where: { role: 'superadmin' } })
    if (superadminCount <= 1) {
      return NextResponse.json({ error: 'At least one super admin must remain' }, { status: 400 })
    }
  }

  const { password, ...rest } = parsed.data
  const row = await prisma.admin.update({
    where: { id },
    data: {
      ...rest,
      ...(password ? { password: await hashPassword(password) } : {}),
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })

  return NextResponse.json({ admin: row })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Only super admins can remove admins' }, { status: 403 })
  }

  const { id } = await params
  if (id === admin.adminId) {
    return NextResponse.json({ error: 'You cannot remove your own account' }, { status: 400 })
  }

  const existing = await prisma.admin.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (existing.role === 'superadmin') {
    const superadminCount = await prisma.admin.count({ where: { role: 'superadmin' } })
    if (superadminCount <= 1) {
      return NextResponse.json({ error: 'At least one super admin must remain' }, { status: 400 })
    }
  }

  await prisma.admin.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
