'use client'

import { AlertCircle, CheckCircle2, Loader2, Save } from 'lucide-react'
import { useState } from 'react'

interface SettingsData {
  siteName: string | null
  tagline: string | null
  logoUrl: string | null
  logoDarkUrl: string | null
  faviconUrl: string | null
  phone: string | null
  email: string | null
  socialLinks: {
    facebook?: string | null
    instagram?: string | null
    youtube?: string | null
    linkedin?: string | null
    tiktok?: string | null
  } | null
  defaultSeoTitle: string | null
  defaultSeoDescription: string | null
  defaultOgImageUrl: string | null
  headerScripts: string | null
  footerScripts: string | null
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  maxLength?: number
  textarea?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
        />
      )}
      {maxLength ? (
        <p className="mt-0.5 text-xs text-gray-400">
          {value.length}/{maxLength}
        </p>
      ) : null}
    </div>
  )
}

export function SettingsForm({ initial }: { initial: SettingsData }) {
  const [siteName, setSiteName] = useState(initial.siteName ?? '')
  const [tagline, setTagline] = useState(initial.tagline ?? '')
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl ?? '')
  const [logoDarkUrl, setLogoDarkUrl] = useState(initial.logoDarkUrl ?? '')
  const [faviconUrl, setFaviconUrl] = useState(initial.faviconUrl ?? '')
  const [phone, setPhone] = useState(initial.phone ?? '')
  const [email, setEmail] = useState(initial.email ?? '')
  const [facebook, setFacebook] = useState(initial.socialLinks?.facebook ?? '')
  const [instagram, setInstagram] = useState(initial.socialLinks?.instagram ?? '')
  const [youtube, setYoutube] = useState(initial.socialLinks?.youtube ?? '')
  const [linkedin, setLinkedin] = useState(initial.socialLinks?.linkedin ?? '')
  const [tiktok, setTiktok] = useState(initial.socialLinks?.tiktok ?? '')
  const [defaultSeoTitle, setDefaultSeoTitle] = useState(initial.defaultSeoTitle ?? '')
  const [defaultSeoDescription, setDefaultSeoDescription] = useState(initial.defaultSeoDescription ?? '')
  const [defaultOgImageUrl, setDefaultOgImageUrl] = useState(initial.defaultOgImageUrl ?? '')
  const [headerScripts, setHeaderScripts] = useState(initial.headerScripts ?? '')
  const [footerScripts, setFooterScripts] = useState(initial.footerScripts ?? '')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: siteName || null,
          tagline: tagline || null,
          logoUrl: logoUrl || null,
          logoDarkUrl: logoDarkUrl || null,
          faviconUrl: faviconUrl || null,
          phone: phone || null,
          email: email || null,
          socialLinks: {
            facebook: facebook || null,
            instagram: instagram || null,
            youtube: youtube || null,
            linkedin: linkedin || null,
            tiktok: tiktok || null,
          },
          defaultSeoTitle: defaultSeoTitle || null,
          defaultSeoDescription: defaultSeoDescription || null,
          defaultOgImageUrl: defaultOgImageUrl || null,
          headerScripts: headerScripts || null,
          footerScripts: footerScripts || null,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save settings')

      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to save settings')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <h2 className="text-sm font-semibold text-ink-950">Brand</h2>
          <Field label="Site name" value={siteName} onChange={setSiteName} />
          <Field label="Tagline" value={tagline} onChange={setTagline} />
          <Field label="Logo URL (light background)" value={logoUrl} onChange={setLogoUrl} placeholder="/images/samm-blue-logo.png" />
          <Field label="Logo URL (dark background / footer)" value={logoDarkUrl} onChange={setLogoDarkUrl} placeholder="/images/samm-logo.webp" />
          <Field label="Favicon URL" value={faviconUrl} onChange={setFaviconUrl} placeholder="/favicon.ico" />
          <Field label="Phone" value={phone} onChange={setPhone} />
          <Field label="Email" value={email} onChange={setEmail} />
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <h2 className="text-sm font-semibold text-ink-950">Social links</h2>
          <p className="text-xs text-gray-500">Leave blank to hide that icon in the footer.</p>
          <Field label="Facebook" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
          <Field label="Instagram" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
          <Field label="YouTube" value={youtube} onChange={setYoutube} placeholder="https://youtube.com/..." />
          <Field label="LinkedIn" value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/..." />
          <Field label="TikTok" value={tiktok} onChange={setTiktok} placeholder="https://tiktok.com/..." />
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <h2 className="text-sm font-semibold text-ink-950">Default SEO</h2>
          <p className="text-xs text-gray-500">
            Used site-wide when a specific page doesn't set its own SEO in the SEO tab.
          </p>
          <Field label="Default title" value={defaultSeoTitle} onChange={setDefaultSeoTitle} maxLength={70} />
          <Field
            label="Default description"
            value={defaultSeoDescription}
            onChange={setDefaultSeoDescription}
            maxLength={160}
            textarea
          />
          <Field label="Default OG image URL" value={defaultOgImageUrl} onChange={setDefaultOgImageUrl} />
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
          <h2 className="text-sm font-semibold text-ink-950">Tracking scripts</h2>
          <p className="text-xs text-gray-500">
            Raw HTML/JS (e.g. GTM, Meta Pixel). Injected as-is — admin-only, never rendered from public input.
          </p>
          <Field label="Header scripts" value={headerScripts} onChange={setHeaderScripts} textarea maxLength={20000} />
          <Field label="Footer scripts" value={footerScripts} onChange={setFooterScripts} textarea maxLength={20000} />
        </div>
      </div>

      {status === 'error' ? (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      ) : null}

      {status === 'success' ? (
        <div className="flex items-center gap-2 rounded-lg bg-sage-50 px-4 py-3 text-sm text-sage-700">
          <CheckCircle2 className="size-4 shrink-0" />
          Settings saved — changes are live now.
        </div>
      ) : null}

      <div className="flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save settings
            </>
          )}
        </button>
      </div>
    </form>
  )
}
