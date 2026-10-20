import type { ParsedTable } from '@/lib/blogTable'

/**
 * Brand-styled table used for every table detected inside blog post
 * content. Wrapped in a horizontal scroller so wide tables stay usable
 * on mobile.
 */
export function BlogTable({ table }: { table: ParsedTable }) {
  if (table.headers.length === 0 && table.rows.length === 0) return null

  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-relaxed">
        {table.headers.length > 0 && (
          <thead>
            <tr className="bg-[#0f1c3f]">
              {table.headers.map((header, i) => (
                <th key={i} className="px-4 py-3 text-sm font-semibold tracking-wide text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? 'bg-[#519B99]/5' : 'bg-white'}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={
                    ci === 0
                      ? 'border-t border-gray-100 px-4 py-3 font-medium text-[#15224c]'
                      : 'border-t border-gray-100 px-4 py-3 text-[#15224c]/80'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
