import type { Media } from '@/types/content'

export interface TextImagePanelProps {
  image: Media
  /** 'left' = image on the left, content on the right. 'right' = image on the right. */
  imageSide?: 'left' | 'right'
  heading: string
  lead?: string
  items: string[]
}

/**
 * Responsive text + image panel with arrow-bullet list.
 * Replaces the legacy .photo-content-d approach with a fully Tailwind-driven layout
 * that adapts gracefully from mobile → desktop.
 */
export function TextImagePanel({ image, imageSide = 'left', heading, lead, items }: TextImagePanelProps) {
  const imageBlock = (
    <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full min-h-0 lg:min-h-[420px] rounded-2xl overflow-hidden shadow-md bg-slate-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center py-4 lg:py-0">
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-4"
        style={{ color: '#0B2055', fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
      >
        {heading}
      </h2>

      <div className="text-sm sm:text-base text-slate-700 leading-relaxed">
        {lead ? <p className="mb-4">{lead}</p> : null}

        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[#519B99] shrink-0 font-sans font-medium mt-0.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {imageSide === 'left' ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              <div className="order-2 lg:order-1">{textBlock}</div>
              <div className="order-1 lg:order-2">{imageBlock}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
