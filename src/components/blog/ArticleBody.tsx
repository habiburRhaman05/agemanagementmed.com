import { splitContentIntoSegments } from '@/lib/blogTable'

import { BlogTable } from './BlogTable'

/**
 * High-order renderer for blog post bodies: ordinary HTML keeps rendering
 * exactly as before (links, images, headings, embedded CTAs), while any
 * table detected in the content — real <table> markup, escaped table tags
 * pasted as text, or a plain paragraph grid — renders as a styled
 * <BlogTable> component instead of raw text.
 *
 * `className` carries the prose typography classes; it is applied to every
 * HTML segment so spacing/typography behave as if the content were one
 * uninterrupted block.
 */
export function ArticleBody({ html, className }: { html: string; className?: string }) {
  const segments = splitContentIntoSegments(html)

  return (
    <div className="mt-6">
      {segments.map((segment, i) =>
        segment.type === 'table' ? (
          <BlogTable key={i} table={segment.table} />
        ) : (
          <div key={i} className={className} dangerouslySetInnerHTML={{ __html: segment.html }} />
        ),
      )}
    </div>
  )
}
