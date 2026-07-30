export interface ExportColumn<T> {
  label: string
  /** Direct key on the row, or a derived accessor for computed/formatted cells. */
  key: keyof T | ((row: T) => unknown)
}

export type ExportFormat = 'csv' | 'excel'
export type ExportScope = 'all' | 'selected'

export function getExportValue<T>(row: T, column: ExportColumn<T>): unknown {
  return typeof column.key === 'function' ? column.key(row) : row[column.key]
}

/** Empty/null/undefined become an empty cell rather than the literal string "null"/"undefined". */
export function formatExportCell(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString()
  return String(value)
}

const ILLEGAL_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1f]/g

/** Strips characters that are invalid in Windows/macOS/Linux filenames, collapses whitespace, caps length. */
export function sanitizeFileName(raw: string): string {
  return raw
    .trim()
    .replace(ILLEGAL_FILENAME_CHARS, '')
    .replace(/\s+/g, '-')
    .slice(0, 100)
}

export function isValidFileName(raw: string): boolean {
  return sanitizeFileName(raw).length > 0
}
