'use client'

import { Upload, X, Link as LinkIcon, ImageIcon, AlertCircle, CheckCircle2, Loader2, FileImage } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

/* ── Props ────────────────────────────────────────────────────────── */

interface ImageUploaderProps {
  /** Current image URL (if already set) */
  value: string
  /** Called with the new URL after a successful upload, or empty string to clear */
  onChange: (url: string) => void
  /** Optional label shown above the uploader */
  label?: string
  /** Optional hint text below the label */
  hint?: string
  /** Cloudinary folder name, e.g. 'blog' or 'testimonials' */
  folder?: string
  /** Accepted MIME types */
  accept?: string
  /** Max file size in bytes (default 10MB) */
  maxSize?: number
}

/* ── Constants ────────────────────────────────────────────────────── */

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

/* ── Component ────────────────────────────────────────────────────── */

export function ImageUploader({
  value,
  onChange,
  label,
  hint,
  folder = 'uploads',
  accept = 'image/jpeg,image/png,image/webp,image/gif,image/avif',
  maxSize = MAX_SIZE,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<'upload' | 'url'>(value ? 'url' : 'upload')
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [preview, setPreview] = useState(value)
  const [urlValue, setUrlValue] = useState(value)

  /* ── Drag state ──────────────────────────────────────────────────── */
  const [dragging, setDragging] = useState(false)
  const dragCounter = useRef(0)

  /* ── Handle file selection ───────────────────────────────────────── */
  const uploadFile = useCallback(
    async (file: File) => {
      // Client-side validation
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadState('error')
        setErrorMsg(`Invalid file type "${file.type.split('/')[1]}". Allowed: jpeg, png, webp, gif, avif.`)
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

      // Simulate progress for UX (actual upload doesn't support real progress via FormData)
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
        formData.append('folder', folder)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        clearInterval(progressInterval)
        setProgress(100)

        const json = await res.json()

        if (!res.ok) {
          throw new Error(json.error || 'Upload failed')
        }

        setUploadState('success')
        setPreview(json.url)
        setUrlValue(json.url)
        onChange(json.url)

        // Reset success state after 2s
        setTimeout(() => setUploadState('idle'), 2000)
      } catch (err) {
        clearInterval(progressInterval)
        setUploadState('error')
        setErrorMsg(err instanceof Error ? err.message : 'Upload failed. Please try again.')
      }
    },
    [folder, onChange, maxSize],
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

  /* ── Clear image ─────────────────────────────────────────────────── */
  const clearImage = useCallback(() => {
    setPreview('')
    setUrlValue('')
    setUploadState('idle')
    setErrorMsg('')
    onChange('')
  }, [onChange])

  /* ── URL mode handler ────────────────────────────────────────────── */
  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setUrlValue(val)
      setPreview(val)
      onChange(val)
    },
    [onChange],
  )

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
          <FileImage className="size-3.5" />
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
          <LinkIcon className="size-3.5" />
          URL
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
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LinkIcon className="size-4 text-gray-400" />
          </div>
          {/* 👇 CHANGE 'url' TO 'text' ON THIS LINE 👇 */}
          <input
            ref={urlInputRef}
            type="text" 
            value={urlValue}
            onChange={handleUrlChange}
            placeholder="https://res.cloudinary.com/..."
            className="block w-full rounded-lg border border-canvas-300 pl-10 pr-3 py-2.5 text-sm text-ink-950 placeholder-gray-400 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
          />
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
                <p className="text-sm font-medium text-sage-700">Uploaded successfully!</p>
              </div>
            ) : hasImage ? (
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Drop a new image or click to replace</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto size-8 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">
                  Drop an image here or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WebP, GIF, AVIF — up to 10MB
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Image Preview ─────────────────────────────────────────── */}
      {hasImage && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full rounded-lg object-cover ring-1 ring-canvas-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          {uploadState === 'uploading' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-ink-950/40 backdrop-blur-[1px]">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-950 shadow-lg">
                <Loader2 className="size-3.5 animate-spin" />
                Uploading...
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
