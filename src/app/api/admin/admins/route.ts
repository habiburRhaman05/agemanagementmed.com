import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCurrentAdmin, hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const CreateAdminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'superadmin']).default('admin'),
})

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Only super admins can manage admins' }, { status: 403 })
  }

  const rows = await prisma.admin.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json({ admins: rows })
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  if (admin.role !== 'superadmin') {
    return NextResponse.json({ error: 'Only super admins can create admins' }, { status: 403 })
  }

  const body = await request.json().catch(() => null)
  const parsed = CreateAdminSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ') },
      { status: 400 },
    )
  }

  const existing = await prisma.admin.findUnique({ where: { email: parsed.data.email } })
  if (existing) {
    return NextResponse.json({ error: 'An admin with this email already exists' }, { status: 409 })
  }

  const hashed = await hashPassword(parsed.data.password)
  const row = await prisma.admin.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashed,
      role: parsed.data.role,
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })

  return NextResponse.json({ admin: row }, { status: 201 })
}
