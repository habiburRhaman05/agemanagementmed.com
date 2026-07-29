interface TableSkeletonProps {
  /** Number of skeleton rows to render */
  rows?: number
  /** Number of skeleton columns to render */
  columns?: number
}

/**
 * Shared loading placeholder for admin tables — same shell (sticky header,
 * row dividers, cell padding) as the real tables so there's no layout shift
 * when data resolves. Used both for client-side fetch loading states and as
 * a `<Suspense>` fallback for server-rendered table pages.
 */
export function TableSkeleton({ rows = 6, columns = 4 }: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-dash-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-20px_rgba(15,23,42,0.18)] ring-1 ring-ink-950/[0.06]">
      <table className="min-w-full divide-y divide-dash-border">
        <thead>
          <tr className="bg-dash-bg">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-3 text-left">
                <div className="h-3 w-20 animate-pulse rounded-full bg-dash-border" />
              </th>
            ))}
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-border">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: columns }).map((_, c) => (
                <td key={c} className="px-6 py-4">
                  <div
                    className="h-3.5 animate-pulse rounded-full bg-dash-border"
                    style={{ width: c === 0 ? '70%' : `${45 + ((r + c) % 3) * 15}%` }}
                  />
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <div className="ml-auto h-6 w-16 animate-pulse rounded-lg bg-dash-border" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
