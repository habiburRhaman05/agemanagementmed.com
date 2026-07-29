'use client'

import { format } from 'date-fns'
import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'

interface AdminRow {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

function CreateAdminModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (a: AdminRow) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'superadmin'>('admin')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to create admin')

      onCreated(json.admin)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to create admin')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(6,11,33,0.5)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between border-b border-canvas-200 px-6 py-4">
          <h2 className="text-base font-semibold text-ink-950">Add admin</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-canvas-100 hover:text-ink-950">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div>
            <label className="block text-xs font-medium text-gray-500">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Temporary password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'superadmin')} className={inputClass}>
              <option value="admin">Admin — manages content</option>
              <option value="superadmin">Super admin — can also manage other admins</option>
            </select>
          </div>

          {status === 'error' ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 border-t border-canvas-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-canvas-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : null}
              Create admin
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ResetPasswordModal({
  admin,
  onClose,
  onDone,
}: {
  admin: AdminRow
  onClose: () => void
  onDone: () => void
}) {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to reset password')
      onDone()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(6,11,33,0.5)] ring-1 ring-ink-950/[0.06]">
        <div className="flex items-center justify-between border-b border-canvas-200 px-6 py-4">
          <h2 className="text-base font-semibold text-ink-950">Reset password</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-canvas-100 hover:text-ink-950">
            <X className="size-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <p className="text-sm text-gray-500">
            Set a new password for <span className="font-medium text-ink-950">{admin.email}</span>.
          </p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="New password"
            className={inputClass}
          />
          {status === 'error' ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          ) : null}
          <div className="flex justify-end gap-3 border-t border-canvas-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-canvas-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : null}
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AdminsManager({ initial, currentAdminId }: { initial: AdminRow[]; currentAdminId: string }) {
  const [admins, setAdmins] = useState(initial)
  const [createOpen, setCreateOpen] = useState(false)
  const [resetTarget, setResetTarget] = useState<AdminRow | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const flash = (type: 'success' | 'error', message: string) => {
    setBanner({ type, message })
    setTimeout(() => setBanner(null), 3500)
  }

  const handleRoleToggle = async (a: AdminRow) => {
    const newRole = a.role === 'superadmin' ? 'admin' : 'superadmin'
    setUpdatingId(a.id)
    try {
      const res = await fetch(`/api/admin/admins/${a.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update role')
      setAdmins((prev) => prev.map((x) => (x.id === a.id ? json.admin : x)))
      flash('success', `${a.name} is now ${newRole === 'superadmin' ? 'a super admin' : 'an admin'}.`)
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to update role')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (a: AdminRow) => {
    if (!confirm(`Remove ${a.name} (${a.email})? They will lose access immediately.`)) return
    setDeletingId(a.id)
    try {
      const res = await fetch(`/api/admin/admins/${a.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to remove admin')
      setAdmins((prev) => prev.filter((x) => x.id !== a.id))
      flash('success', `${a.name} removed.`)
    } catch (err) {
      flash('error', err instanceof Error ? err.message : 'Failed to remove admin')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-950">Admins</h1>
          <p className="text-sm text-gray-500">
            {admins.length} account{admins.length === 1 ? '' : 's'} with dashboard access. Only super admins can
            manage this page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-dash-action px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dash-action-hover"
        >
          <Plus className="size-4" />
          Add admin
        </button>
      </div>

      {banner ? (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            banner.type === 'success' ? 'bg-sage-50 text-sage-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {banner.type === 'success' ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {banner.message}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
        <table className="min-w-full divide-y">
          <thead>
            <tr className="bg-canvas-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Admin</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">Role</th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">Added</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {admins.map((a) => (
              <tr key={a.id} className="hover:bg-canvas-50/60">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-ink-950">
                    {a.name} {a.id === currentAdminId ? <span className="text-xs text-gray-400">(you)</span> : null}
                  </p>
                  <p className="text-xs text-gray-400">{a.email}</p>
                </td>
                <td className="hidden px-6 py-4 sm:table-cell">
                  <button
                    type="button"
                    onClick={() => handleRoleToggle(a)}
                    disabled={updatingId === a.id || a.id === currentAdminId}
                    title={a.id === currentAdminId ? "You can't change your own role" : 'Click to toggle role'}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                      a.role === 'superadmin'
                        ? 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                        : 'bg-canvas-100 text-gray-600 hover:bg-canvas-200'
                    }`}
                  >
                    {updatingId === a.id ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : a.role === 'superadmin' ? (
                      <ShieldCheck className="size-3" />
                    ) : null}
                    {a.role === 'superadmin' ? 'Super admin' : 'Admin'}
                  </button>
                </td>
                <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                  {format(new Date(a.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setResetTarget(a)}
                      title="Reset password"
                      className="rounded-lg p-2 text-gray-400 hover:bg-canvas-100 hover:text-sage-700"
                    >
                      <KeyRound className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(a)}
                      disabled={deletingId === a.id || a.id === currentAdminId}
                      title={a.id === currentAdminId ? "You can't remove your own account" : 'Remove admin'}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {deletingId === a.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen ? (
        <CreateAdminModal
          onClose={() => setCreateOpen(false)}
          onCreated={(a) => {
            setAdmins((prev) => [...prev, a])
            setCreateOpen(false)
            flash('success', `${a.name} added as ${a.role === 'superadmin' ? 'a super admin' : 'an admin'}.`)
          }}
        />
      ) : null}

      {resetTarget ? (
        <ResetPasswordModal
          admin={resetTarget}
          onClose={() => setResetTarget(null)}
          onDone={() => {
            flash('success', `Password reset for ${resetTarget.email}.`)
            setResetTarget(null)
          }}
        />
      ) : null}
    </div>
  )
}
