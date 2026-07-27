'use server'

import { prisma } from '@/lib/prisma'
import {
  hashPassword,
  verifyPassword,
  createToken,
  setSessionCookie,
  clearSessionCookie,
  getCurrentAdmin,
} from '@/lib/auth'
import { z } from 'zod'

/* ── Validation schemas ───────────────────────────────────────────── */

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

/* ── Server Actions ───────────────────────────────────────────────── */

export type ActionResult =
  | { success: true; data?: unknown }
  | { success: false; error: string }

export async function login(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult | null> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const parsed = LoginSchema.safeParse({ email, password })
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input'
      return { success: false, error: firstError }
    }

    const admin = await prisma.admin.findUnique({
      where: { email: parsed.data.email },
    })

    if (!admin) {
      return { success: false, error: 'Invalid email or password' }
    }

    const valid = await verifyPassword(parsed.data.password, admin.password)
    if (!valid) {
      return { success: false, error: 'Invalid email or password' }
    }

    const token = await createToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    await setSessionCookie(token)

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function logout(): Promise<ActionResult> {
  try {
    await clearSessionCookie()
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'Failed to logout' }
  }
}

export async function getProfile(): Promise<ActionResult> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return { success: false, error: 'Not authenticated' }
    }
    return {
      success: true,
      data: {
        id: admin.adminId,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    }
  } catch (error) {
    console.error('Get profile error:', error)
    return { success: false, error: 'Failed to get profile' }
  }
}

export async function changePassword(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string

    const parsed = ChangePasswordSchema.safeParse({
      currentPassword,
      newPassword,
    })
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input'
      return { success: false, error: firstError }
    }

    const admin = await getCurrentAdmin()
    if (!admin) {
      return { success: false, error: 'Not authenticated' }
    }

    const dbAdmin = await prisma.admin.findUnique({
      where: { id: admin.adminId },
    })
    if (!dbAdmin) {
      return { success: false, error: 'Admin not found' }
    }

    const valid = await verifyPassword(
      parsed.data.currentPassword,
      dbAdmin.password
    )
    if (!valid) {
      return { success: false, error: 'Current password is incorrect' }
    }

    const hashed = await hashPassword(parsed.data.newPassword)
    await prisma.admin.update({
      where: { id: admin.adminId },
      data: { password: hashed },
    })

    return { success: true }
  } catch (error) {
    console.error('Change password error:', error)
    return { success: false, error: 'Failed to change password' }
  }
}
