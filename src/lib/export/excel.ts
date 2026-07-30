import ExcelJS from 'exceljs'

import { formatExportCell, getExportValue, type ExportColumn } from './types'

/** Excel worksheet names are capped at 31 characters and can't contain : \ / ? * [ ] */
function sanitizeSheetName(title: string): string {
  const cleaned = title.replace(/[:\\/?*[\]]/g, '').trim()
  return (cleaned || 'Export').slice(0, 31)
}

/** Builds a real .xlsx workbook (not a CSV-with-different-extension) via ExcelJS. */
export async function buildExcel<T>(
  rows: T[],
  columns: ExportColumn<T>[],
  sheetTitle: string,
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  workbook.created = new Date()

  const sheet = workbook.addWorksheet(sanitizeSheetName(sheetTitle))

  sheet.columns = columns.map((column) => ({
    header: column.label,
    key: column.label,
    width: Math.min(Math.max(column.label.length + 4, 16), 40),
  }))

  sheet.getRow(1).font = { bold: true }
  sheet.getRow(1).alignment = { vertical: 'middle' }

  for (const row of rows) {
    const record: Record<string, string> = {}
    for (const column of columns) {
      record[column.label] = formatExportCell(getExportValue(row, column))
    }
    sheet.addRow(record)
  }

  sheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columns.length },
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(arrayBuffer)
}
