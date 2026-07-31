import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { AspectImage } from '@/components/ui/AspectImage'
import type { ContentSummary } from '@/types/content'

function CardBody({ item, compact }: { item: ContentSummary; compact?: boolean }) {
  return (
    <>
      {item.image ? (
        <AspectImage
          media={item.image}
          ratio={compact ? 'wide' : 'landscape'}
          rounded={false}
          sizes={
            compact
              ? '(min-width: 1280px) 23vw, (min-width: 1024px) 46vw, (min-width: 640px) 46vw, 100vw'
              : '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw'
          }
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : null}

      <div className={compact ? 'flex flex-1 flex-col p-4' : 'flex flex-1 flex-col p-6'}>
        {item.eyebrow || item.date ? (
          <p className={`flex items-center gap-2 text-body-sm text-canvas-600 ${compact ? 'mb-2' : 'mb-3'}`}>
            {item.eyebrow ? <span className="text-sage-700">{item.eyebrow}</span> : null}
            {item.eyebrow && item.date ? <span aria-hidden>·</span> : null}
            {item.date ? <span>{item.date}</span> : null}
          </p>
        ) : null}

        <h3 className={`transition-colors group-hover:text-sage-700 ${compact ? 'line-clamp-2 text-title-md' : 'text-title-lg'}`}>
          {item.title}
        </h3>

        {item.excerpt ? (
          <p className={`text-body-sm text-canvas-600 ${compact ? 'mt-2 line-clamp-2' : 'mt-2.5'}`}>{item.excerpt}</p>
        ) : null}

        <span className={`inline-flex items-center gap-2 text-body-sm font-semibold text-sage-700 ${compact ? 'mt-3' : 'mt-5'}`}>
          Read more
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </>
  )
}

/** Shared by journal posts, press items, and patient results. */
export function ContentCard({ item, compact = false }: { item: ContentSummary; compact?: boolean }) {
  const className =
    'group flex h-full flex-col overflow-hidden rounded-2xl border border-canvas-300/60 bg-canvas-50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg'

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        <CardBody item={item} compact={compact} />
      </a>
    )
  }

  return (
    <Link href={item.href} className={className}>
      <CardBody item={item} compact={compact} />
    </Link>
  )
}
