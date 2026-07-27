import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { AspectImage } from '@/components/ui/AspectImage'
import type { ContentSummary } from '@/types/content'

function CardBody({ item }: { item: ContentSummary }) {
  return (
    <>
      {item.image ? (
        <AspectImage
          media={item.image}
          ratio="landscape"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      ) : null}

      <div className={item.image ? 'mt-6' : 'border-t border-canvas-300 pt-6'}>
        {item.eyebrow || item.date ? (
          <p className="mb-3 flex items-center gap-2 text-body-sm text-canvas-600">
            {item.eyebrow ? <span className="text-sage-700">{item.eyebrow}</span> : null}
            {item.eyebrow && item.date ? <span aria-hidden>·</span> : null}
            {item.date ? <span>{item.date}</span> : null}
          </p>
        ) : null}

        <h3 className="text-title-lg transition-colors group-hover:text-sage-700">
          {item.title}
        </h3>

        {item.excerpt ? <p className="mt-3 text-body-sm text-canvas-600">{item.excerpt}</p> : null}

        <span className="mt-5 inline-flex items-center gap-2 text-body-sm font-semibold text-sage-700">
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
export function ContentCard({ item }: { item: ContentSummary }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className="group block">
        <CardBody item={item} />
      </a>
    )
  }

  return (
    <Link href={item.href} className="group block">
      <CardBody item={item} />
    </Link>
  )
}
