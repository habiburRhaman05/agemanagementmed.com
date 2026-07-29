'use client'

import { Upload, X, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2, Globe } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

/* ── Props ────────────────────────────────────────────────────────── */

interface IconUploaderProps {
  /** Current icon URL (if already set) */
  value: string
  /** Called with the new URL after a successful upload, or empty string to clear */
  onChange: (url: string) => void
  /** Optional label shown above the uploader */
  label?: string
  /** Optional hint text below the label */
  hint?: string
  /** Accepted MIME types — defaults to all common icon formats */
  accept?: string
  /** Max file size in bytes (default 5MB) */
  maxSize?: number
}

/* ── Constants ────────────────────────────────────────────────────── */

const ALLOWED_TYPES = [
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/ico',
]

const ALLOWED_EXTENSIONS = ['.ico', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

/* ── Component ────────────────────────────────────────────────────── */

export function IconUploader({
  value,
  onChange,
  label,
  hint,
  accept = 'image/x-icon,image/vnd.microsoft.icon,image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif',
  maxSize = MAX_SIZE,
}: IconUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<'upload' | 'url'>(value ? 'url' : 'upload')
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [preview, setPreview] = useState(value)
  const [urlValue, setUrlValue] = useState(value)
  const [urlLoading, setUrlLoading] = useState(false)

  /* ── Drag state ──────────────────────────────────────────────────── */
  const [dragging, setDragging] = useState(false)
  const dragCounter = useRef(0)

  /* ── Validate file type ──────────────────────────────────────────── */
  const isValidFile = (file: File): boolean => {
    // Check MIME type
    if (ALLOWED_TYPES.includes(file.type)) return true
    // Fallback: check extension
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    return ALLOWED_EXTENSIONS.includes(ext)
  }  /* ── Handle file upload to /api/upload/favicon ────────────────────── */
  const uploadFile = useCallback(
    async (file: File) => {
      // Client-side validation
      if (!isValidFile(file)) {
        setUploadState('error')
        const ext = file.name.split('.').pop()?.toUpperCase() || 'unknown'
        setErrorMsg(`Invalid file type "${ext}". Allowed: ICO, PNG, JPG, WebP, GIF, SVG, AVIF.`)
        return
      }
      if (file.size > maxSize) {
        setUploadState('error')
        setErrorMsg(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is ${maxSize / 1024 / 1024}MB.`)
        return
      }

      setUploadState('uploading')
      setErrorMsg('')
      setProgress(0)

      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(progressInterval)
            return 85
          }
          return prev + 5
        })
      }, 200)

      try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload/favicon', {
          method: 'POST',
          body: formData,
        })

        clearInterval(progressInterval)
        setProgress(100)

        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error || 'Upload failed')
        }

        // The URL from Cloudinary is already the full URL
        const faviconUrl = json.url
        
        setUploadState('success')
        setPreview(faviconUrl)
        setUrlValue(faviconUrl)
        onChange(faviconUrl)

        // Reset success state after 2s
        setTimeout(() => setUploadState('idle'), 2000)
      } catch (err) {
        clearInterval(progressInterval)
        setUploadState('error')
        setErrorMsg(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      }
    },
    [onChange, maxSize],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) uploadFile(file)
      // Reset input so the same file can be re-selected
      e.target.value = ''
    },
    [uploadFile],
  )

  /* ── Drag handlers ───────────────────────────────────────────────── */
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items?.[0]?.kind === 'file') {
      setDragging(true)
    }
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) setDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragging(false)
      dragCounter.current = 0
      const file = e.dataTransfer.files?.[0]
      if (file) uploadFile(file)
    },
    [uploadFile],
  )

  /* ── Clear icon ──────────────────────────────────────────────────── */
  const clearImage = useCallback(() => {
    setPreview('')
    setUrlValue('')
    setUploadState('idle')
    setErrorMsg('')
    onChange('')
  }, [onChange])

  /* ── URL mode: validate and fetch URL ────────────────────────────── */
  const handleUrlSubmit = useCallback(async () => {
    if (!urlValue.trim()) {
      setPreview('')
      onChange('')
      return
    }

    setUrlLoading(true)
    setErrorMsg('')

    try {
      // Validate URL format
      new URL(urlValue)

      // Try to fetch to verify it's accessible
      const res = await fetch(urlValue, { method: 'HEAD', mode: 'no-cors' })

      // no-cors won't give us status, so we just check if it didn't throw
      setPreview(urlValue)
      onChange(urlValue)
      setUploadState('success')
      setTimeout(() => setUploadState('idle'), 2000)
    } catch (err) {
      setErrorMsg('Invalid URL or unable to fetch. Please check the URL and try again.')
      setUploadState('error')
    } finally {
      setUrlLoading(false)
    }
  }, [urlValue, onChange])

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setUrlValue(val)
      // Live preview as user types
      if (val.trim()) {
        setPreview(val)
      } else {
        setPreview('')
      }
    },
    [],
  )

  const handleUrlBlur = useCallback(() => {
    // Validate on blur
    if (urlValue.trim()) {
      handleUrlSubmit()
    }
  }, [urlValue, handleUrlSubmit])

  /* ── Toggle mode ─────────────────────────────────────────────────── */
  const switchToUpload = useCallback(() => {
    setMode('upload')
    setUploadState('idle')
    setErrorMsg('')
  }, [])

  const switchToUrl = useCallback(() => {
    setMode('url')
    setUploadState('idle')
    setErrorMsg('')
    // Auto-focus the URL input when switching to URL mode
    setTimeout(() => urlInputRef.current?.focus(), 100)
  }, [])

  /* ── Render ──────────────────────────────────────────────────────── */

  const hasImage = Boolean(preview)

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}

      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={switchToUpload}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-sage-100 text-sage-700'
              : 'bg-canvas-100 text-gray-500 hover:bg-canvas-200'
          }`}
        >
          <Upload className="size-3.5" />
          Upload
        </button>
        <button
          type="button"
          onClick={switchToUrl}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'url'
              ? 'bg-sage-100 text-sage-700'
              : 'bg-canvas-100 text-gray-500 hover:bg-canvas-200'
          }`}
        >
          <Globe className="size-3.5" />
          Import from URL
        </button>

        {hasImage && (
          <button
            type="button"
            onClick={clearImage}
            className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <X className="size-3.5" />
            Remove
          </button>
        )}
      </div>

      {/* ── URL Mode ──────────────────────────────────────────────── */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LinkIcon className="size-4 text-gray-400" />
              </div>
              <input
                ref={urlInputRef}
                type="url"
                value={urlValue}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                placeholder="https://example.com/favicon.ico"
                className="block w-full rounded-lg border border-canvas-300 pl-10 pr-3 py-2.5 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={urlLoading || !urlValue.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {urlLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Globe className="size-4" />
              )}
              Import
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Paste a direct URL to an icon file (ICO, PNG, SVG, etc.) and click Import
          </p>
        </div>
      )}

      {/* ── Upload Mode ───────────────────────────────────────────── */}
      {mode === 'upload' && (
        <>
          {/* Drop zone */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
              dragging
                ? 'border-sage-500 bg-sage-50'
                : uploadState === 'error'
                  ? 'border-red-300 bg-red-50/50'
                  : uploadState === 'success'
                    ? 'border-sage-400 bg-sage-50/50'
                    : 'border-canvas-300 bg-white hover:border-sage-400 hover:bg-sage-50/30'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadState === 'uploading' ? (
              <div className="space-y-3">
                <Loader2 className="mx-auto size-8 animate-spin text-sage-600" />
                <p className="text-sm font-medium text-gray-700">Uploading...</p>
                <div className="mx-auto h-2 w-full max-w-xs overflow-hidden rounded-full bg-canvas-200">
                  <div
                    className="h-full rounded-full bg-sage-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">{progress}%</p>
              </div>
            ) : uploadState === 'error' ? (
              <div className="space-y-2">
                <AlertCircle className="mx-auto size-8 text-red-400" />
                <p className="text-sm font-medium text-red-600">{errorMsg}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setUploadState('idle')
                    setErrorMsg('')
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-canvas-300 hover:bg-canvas-50"
                >
                  Try again
                </button>
              </div>
            ) : uploadState === 'success' ? (
              <div className="space-y-2">
                <CheckCircle2 className="mx-auto size-8 text-sage-500" />
                <p className="text-sm font-medium text-sage-700">Icon uploaded successfully!</p>
              </div>
            ) : hasImage ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Drop a new icon or click to replace</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto size-8 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  Drop an icon here or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  ICO, PNG, JPG, WebP, GIF, SVG, AVIF — up to 5MB
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Icon Preview ──────────────────────────────────────────── */}
      {hasImage && (
        <div className="relative">
          <div className="flex items-center gap-4 rounded-lg bg-canvas-50 p-4 ring-1 ring-canvas-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Icon preview"
              className="h-16 w-16 rounded-lg object-contain bg-white ring-1 ring-canvas-200"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-icon.png'
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-950 truncate">
                {urlValue.split('/').pop() || 'icon'}
              </p>
              <p className="text-xs text-gray-400 truncate">{urlValue}</p>
            </div>
            {uploadState === 'uploading' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-ink-950/40 backdrop-blur-[1px]">
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-950 shadow-lg">
                  <Loader2 className="size-3.5 animate-spin" />
                  Uploading...
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Error banner (for URL mode) ──────────────────────────── */}
      {uploadState === 'error' && mode === 'url' && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* ── Success banner ───────────────────────────────────────── */}
      {uploadState === 'success' && mode === 'url' && (
        <div className="flex items-center gap-2 rounded-lg bg-sage-50 px-4 py-3 text-sm text-sage-700">
          <CheckCircle2 className="size-4 shrink-0" />
          Icon imported successfully!
        </div>
      )}
    </div>
  )
}
