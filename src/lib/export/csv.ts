import { formatExportCell, getExportValue, type ExportColumn } from './types'

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Builds a standards-compliant CSV string (CRLF line endings, RFC 4180
 * quoting). Prefixed with a UTF-8 BOM so Excel opens accented characters
 * correctly instead of mangling them as Latin-1.
 */
export function buildCsv<T>(rows: T[], columns: ExportColumn<T>[]): string {
  const headerLine = columns.map((c) => csvEscape(c.label)).join(',')

  const lines = rows.map((row) =>
    columns
      .map((column) => csvEscape(formatExportCell(getExportValue(row, column))))
      .join(','),
  )

  const BOM = '﻿'
  return BOM + [headerLine, ...lines].join('\r\n')
}
