'use client'

import { ChevronDown, Download, FileSpreadsheet, FileText } from 'lucide-react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ExportFormat } from '@/lib/export/types'
import { ExportModal } from './ExportModal'

export interface ExportButtonProps {
  endpoint: string
  resourceLabel: string
  selectedIds: string[]
  totalCount: number
  filters?: { status?: string; search?: string }
  defaultFileTitle: string
  defaultFileName: string
}

/** "Export Data" action button — a CSV/Excel dropdown that opens the shared confirmation modal. */
export function ExportButton(props: ExportButtonProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('csv')

  const openWith = (nextFormat: ExportFormat) => {
    setFormat(nextFormat)
    setModalOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-canvas-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
          >
            <Download className="size-4" />
            Export Data
            <ChevronDown className="size-3.5 text-gray-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => openWith('csv')}>
            <FileText className="size-4 text-gray-500" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openWith('excel')}>
            <FileSpreadsheet className="size-4 text-gray-500" />
            Export as Excel (.xlsx)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ExportModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        endpoint={props.endpoint}
        resourceLabel={props.resourceLabel}
        initialFormat={format}
        selectedIds={props.selectedIds}
        totalCount={props.totalCount}
        filters={props.filters}
        defaultFileTitle={props.defaultFileTitle}
        defaultFileName={props.defaultFileName}
      />
    </>
  )
}
