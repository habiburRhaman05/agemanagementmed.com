import { Play } from 'lucide-react'

import { AspectImage } from '@/components/ui/AspectImage'
import type { Media } from '@/types/content'

export interface VideoThumbnailItem {
  title: string
  image: Media
  href: string
  /** Shown as a small label on the thumbnail, e.g. "WTOC", "YouTube". Derived from the URL if omitted. */
  source?: string
}

function deriveSourceLabel(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '')
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube'
    return host.split('.')[0].toUpperCase()
  } catch {
    return 'Watch'
  }
}

/** Premium "watch" grid — every card reads the same height, source badge + play affordance, opens in a new tab. */
export function VideoThumbnailGrid({ items }: { items: VideoThumbnailItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.href} className="h-full">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-canvas-300/60 bg-canvas-50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg"
          >
            <div className="relative">
              <AspectImage
                media={item.image}
                ratio="landscape"
                rounded={false}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 46vw"
                imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />

              {/* Bottom gradient scrim — grounds the source badge without a separate solid bar */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent"
                aria-hidden
              />

              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-canvas-50/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950 shadow-sm">
                {item.source ?? deriveSourceLabel(item.href)}
              </span>

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-canvas-50/95 text-ink-950 shadow-md ring-4 ring-canvas-50/20 transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-4.5 translate-x-0.5 fill-current" aria-hidden />
                </span>
              </span>
            </div>

            <div className="flex min-h-20 flex-1 items-start p-4">
              <p className="line-clamp-2 font-display text-body font-medium leading-snug text-ink-950 transition-colors group-hover:text-sage-700">
                {item.title}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
