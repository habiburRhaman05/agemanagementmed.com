'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useId, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useExport } from '@/hooks/useExport'
import { isValidFileName, sanitizeFileName, type ExportFormat, type ExportScope } from '@/lib/export/types'
import { cn } from '@/lib/utils'

export interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Which API route this modal downloads from, e.g. `/api/admin/leads/export`. */
  endpoint: string
  /** Displayed in the title/empty-state copy, e.g. "leads" or "appointments". */
  resourceLabel: string
  initialFormat: ExportFormat
  selectedIds: string[]
  totalCount: number
  /** Current list filters, forwarded to the API so "All Records" respects the active filter/search. */
  filters?: { status?: string; search?: string }
  defaultFileTitle: string
  defaultFileName: string
}

const FORMAT_OPTIONS: { id: ExportFormat; label: string }[] = [
  { id: 'csv', label: 'CSV' },
  { id: 'excel', label: 'Excel (.xlsx)' },
]

const inputClass =
  'mt-1 block w-full rounded-lg border border-canvas-300 px-3 py-2 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20 disabled:cursor-not-allowed disabled:opacity-60'

const optionButtonClass = (active: boolean) =>
  cn(
    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    active ? 'border-sage-600 bg-sage-50 text-sage-700' : 'border-canvas-300 text-gray-600 hover:bg-gray-50',
  )

export function ExportModal({
  open,
  onOpenChange,
  endpoint,
  resourceLabel,
  initialFormat,
  selectedIds,
  totalCount,
  filters,
  defaultFileTitle,
  defaultFileName,
}: ExportModalProps) {
  const titleId = useId()
  const nameId = useId()
  const { isExporting, runExport } = useExport(endpoint)
  const selectedCount = selectedIds.length

  const [format, setFormat] = useState<ExportFormat>(initialFormat)
  const [scope, setScope] = useState<ExportScope>(selectedCount > 0 ? 'selected' : 'all')
  const [fileTitle, setFileTitle] = useState(defaultFileTitle)
  const [fileName, setFileName] = useState(defaultFileName)
  const [touched, setTouched] = useState(false)

  // Reset to sensible defaults every time the modal opens fresh.
  useEffect(() => {
    if (open) {
      setFormat(initialFormat)
      setScope(selectedCount > 0 ? 'selected' : 'all')
      setFileTitle(defaultFileTitle)
      setFileName(defaultFileName)
      setTouched(false)
    }
  }, [open, initialFormat, selectedCount, defaultFileTitle, defaultFileName])

  const scopeCount = scope === 'selected' ? selectedCount : totalCount
  const noRecordsAvailable = scopeCount === 0
  const fileTitleError = touched && fileTitle.trim().length === 0 ? 'File title is required.' : null
  const fileNameError = touched && !isValidFileName(fileName) ? 'Enter a valid file name.' : null
  const canSubmit = !noRecordsAvailable && fileTitle.trim().length > 0 && isValidFileName(fileName) && !isExporting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!canSubmit) return

    const success = await runExport({
      format,
      scope,
      ids: scope === 'selected' ? selectedIds : undefined,
      fileTitle: fileTitle.trim(),
      fileName: sanitizeFileName(fileName),
      status: filters?.status,
      search: filters?.search,
    })

    if (success) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !isExporting && onOpenChange(next)}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-ink-950">Export {resourceLabel}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Export type */}
          <div>
            <p className="text-sm font-medium text-gray-700">Export type</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  disabled={isExporting}
                  onClick={() => setFormat(option.id)}
                  className={optionButtonClass(format === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Export scope */}
          <div>
            <p className="text-sm font-medium text-gray-700">Export scope</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isExporting || totalCount === 0}
                onClick={() => setScope('all')}
                className={optionButtonClass(scope === 'all')}
              >
                All records ({totalCount})
              </button>
              <button
                type="button"
                disabled={isExporting || selectedCount === 0}
                onClick={() => setScope('selected')}
                className={optionButtonClass(scope === 'selected')}
              >
                Selected ({selectedCount})
              </button>
            </div>
          </div>

          {/* File title */}
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium text-gray-700">
              Export file title
            </label>
            <input
              id={titleId}
              type="text"
              className={inputClass}
              placeholder="e.g. July Appointments"
              value={fileTitle}
              disabled={isExporting}
              onChange={(e) => setFileTitle(e.target.value)}
              aria-invalid={Boolean(fileTitleError)}
            />
            {fileTitleError ? <p className="mt-1.5 text-xs text-red-600">{fileTitleError}</p> : null}
          </div>

          {/* File name */}
          <div>
            <label htmlFor={nameId} className="block text-sm font-medium text-gray-700">
              File name
            </label>
            <div className="relative">
              <input
                id={nameId}
                type="text"
                value={fileName}
                disabled={isExporting}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. july-appointments-2026"
                className={cn(inputClass, 'pr-14')}
                aria-invalid={Boolean(fileNameError)}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                .{format === 'excel' ? 'xlsx' : 'csv'}
              </span>
            </div>
            {fileNameError ? <p className="mt-1.5 text-xs text-red-600">{fileNameError}</p> : null}
          </div>

          {noRecordsAvailable ? (
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>
                {scope === 'selected'
                  ? 'No rows selected. Select at least one row, or switch to "All records".'
                  : `No ${resourceLabel.toLowerCase()} available to export.`}
              </span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sage-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isExporting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating file…
              </>
            ) : (
              'Export'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
