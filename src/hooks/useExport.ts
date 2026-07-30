'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import type { ExportFormat, ExportScope } from '@/lib/export/types'

export interface ExportRequest {
  format: ExportFormat
  scope: ExportScope
  ids?: string[]
  status?: string
  search?: string
  fileTitle: string
  fileName: string
}

/**
 * Downloads an admin export from `endpoint` and drives the toast/loading
 * lifecycle. Shared by every export-capable admin table so the fetch,
 * blob-download, and error-toast logic exists exactly once.
 */
export function useExport(endpoint: string) {
  const [isExporting, setIsExporting] = useState(false)

  async function runExport(request: ExportRequest): Promise<boolean> {
    if (isExporting) return false
    setIsExporting(true)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        toast.error(body?.error || 'Unable to generate export file.')
        return false
      }

      const blob = await res.blob()
      const extension = request.format === 'excel' ? 'xlsx' : 'csv'

      try {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${request.fileName}.${extension}`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
      } catch (downloadError) {
        console.error('Export download error:', downloadError)
        toast.error('Something went wrong.')
        return false
      }

      toast.success('Export completed successfully.')
      return true
    } catch (error) {
      console.error('Export request error:', error)
      toast.error('Something went wrong.')
      return false
    } finally {
      setIsExporting(false)
    }
  }

  return { isExporting, runExport }
}
