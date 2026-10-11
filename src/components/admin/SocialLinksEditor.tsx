'use client'

import { useState } from 'react'
import { Globe, Plus, X } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ensureAbsoluteUrl } from '@/lib/utils'

export interface SocialLink {
  platform: string
  url: string
}

/** Social profiles first, then the medical-booking platforms providers actually get linked from. */
const PRESET_PLATFORMS = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'TikTok',
  'Optimantra',
  'Zocdoc',
  'Healthgrades',
] as const

// lucide-react dropped brand icons — a generic link icon for every platform
// avoids maintaining inlined brand SVGs for an admin-only list.
function PlatformIcon() {
  return <Globe className="size-4 shrink-0 text-gray-400" />
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm text-ink-950 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20'

function AddLinkDialog({ onAdd }: { onAdd: (link: SocialLink) => void }) {
  const [open, setOpen] = useState(false)
  const [platform, setPlatform] = useState<string>(PRESET_PLATFORMS[0])
  const [customPlatform, setCustomPlatform] = useState('')
  const [url, setUrl] = useState('')

  const resolvedPlatform = platform === 'Other' ? customPlatform.trim() : platform

  function reset() {
    setPlatform(PRESET_PLATFORMS[0])
    setCustomPlatform('')
    setUrl('')
  }

  function handleAdd() {
    if (!resolvedPlatform || !url.trim()) return
    onAdd({ platform: resolvedPlatform, url: ensureAbsoluteUrl(url) })
    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-canvas-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-sage-600 hover:text-sage-700"
        >
          <Plus className="size-4" />
          Add link
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add a social link</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="social-link-platform" className="block text-xs font-medium text-gray-500">
              Platform
            </label>
            <select
              id="social-link-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className={inputClass}
            >
              {PRESET_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
              <option value="Other">Other…</option>
            </select>
          </div>

          {platform === 'Other' ? (
            <div>
              <label htmlFor="social-link-platform-name" className="block text-xs font-medium text-gray-500">
                Platform name
              </label>
              <input
                id="social-link-platform-name"
                value={customPlatform}
                onChange={(e) => setCustomPlatform(e.target.value)}
                placeholder="e.g. Vagaro"
                className={inputClass}
              />
            </div>
          ) : null}

          <div>
            <label htmlFor="social-link-url" className="block text-xs font-medium text-gray-500">
              Link
            </label>
            <input
              id="social-link-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-canvas-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!resolvedPlatform || !url.trim()}
            className="rounded-lg bg-dash-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-dash-action-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Admin-facing social-links list for a provider — an "Add link" button opens
 * a dialog with a predefined platform dropdown (socials + the medical
 * booking platforms providers actually get linked from, e.g. Optimantra,
 * Zocdoc) instead of a freeform "Platform: URL" textarea.
 */
export function SocialLinksEditor({
  value,
  onChange,
}: {
  value: SocialLink[]
  onChange: (next: SocialLink[]) => void
}) {
  return (
    <div className="space-y-3">
      {value.length ? (
        <ul className="space-y-2">
          {value.map((link, index) => (
            <li
              key={`${link.platform}-${index}`}
              className="flex items-center gap-3 rounded-lg border border-canvas-200 px-3 py-2"
            >
              <PlatformIcon />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-950">{link.platform}</p>
                <p className="truncate text-xs text-gray-500">{link.url}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== index))}
                aria-label={`Remove ${link.platform} link`}
                className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-400">No social links added yet.</p>
      )}

      <AddLinkDialog onAdd={(link) => onChange([...value, link])} />
    </div>
  )
}
