'use client'

import { useState } from 'react'
import { Maximize2, WandSparkles } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

/** Matches the small inline `FieldError` already duplicated in TreatmentForm/NewTreatmentForm. */
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

interface SchemaJsonEditorProps {
  value: string
  onChange: (value: string) => void
  /** Shown above the inline textarea, matching the existing field label style. */
  label?: string
  /** Small grey note after the label, e.g. "— optional, replaces the auto-generated schema". */
  hint?: string
  placeholder?: string
  /** Validation error from the parent form's submit-time JSON.parse check. */
  error?: string
}

/** Pretty-prints JSON text in place; leaves it untouched (and reports why) if it doesn't parse. */
function formatJson(text: string): { formatted: string; error: string | null } {
  const trimmed = text.trim()
  if (!trimmed) return { formatted: text, error: null }
  try {
    return { formatted: JSON.stringify(JSON.parse(trimmed), null, 2), error: null }
  } catch (err) {
    return { formatted: text, error: err instanceof Error ? err.message : 'Invalid JSON' }
  }
}

/**
 * The inline "Schema (JSON-LD) override" textarea plus an Expand button that
 * opens the same value in a large modal for comfortable editing/formatting —
 * both views read and write the one field passed in via `value`/`onChange`,
 * so nothing is lost switching between them.
 */
export function SchemaJsonEditor({
  value,
  onChange,
  label = 'Schema (JSON-LD) override',
  hint,
  placeholder,
  error,
}: SchemaJsonEditorProps) {
  const [open, setOpen] = useState(false)
  const [formatError, setFormatError] = useState('')

  function handleFormat() {
    const { formatted, error: err } = formatJson(value)
    if (err) {
      setFormatError(`Can't format — ${err}`)
      return
    }
    setFormatError('')
    onChange(formatted)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-medium text-gray-500">
          {label} {hint ? <span className="font-normal text-gray-400">{hint}</span> : null}
        </label>
        <button
          type="button"
          onClick={() => {
            setFormatError('')
            setOpen(true)
          }}
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-canvas-300 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-sage-600 hover:text-sage-700"
        >
          <Maximize2 className="size-3.5" />
          Expand
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
      />
      <FieldError message={error} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[85vh] w-[95vw] max-w-4xl flex-col rounded-2xl sm:rounded-2xl">
          <DialogHeader className="shrink-0">
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>

          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <div className="flex shrink-0 items-center justify-between">
              <p className="text-xs text-gray-500">
                Edits here are the same field as the small box on the page — nothing is separate to save.
              </p>
              <button
                type="button"
                onClick={handleFormat}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-canvas-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-sage-600 hover:text-sage-700"
              >
                <WandSparkles className="size-3.5" />
                Format
              </button>
            </div>

            <textarea
              value={value}
              onChange={(e) => {
                setFormatError('')
                onChange(e.target.value)
              }}
              placeholder={placeholder}
              spellCheck={false}
              className={cn(
                'min-h-0 flex-1 resize-none rounded-lg border border-canvas-300 px-3 py-2 font-mono text-xs leading-relaxed',
                'focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20',
              )}
            />
            {formatError ? <p className="shrink-0 text-xs text-red-600">{formatError}</p> : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
