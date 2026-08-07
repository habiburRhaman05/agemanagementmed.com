import type { Media } from '@/types/content'

export interface TextImagePanelProps {
  image: Media
  /** 'left' = image on the left, content on the right. 'right' = image on the right. */
  imageSide?: 'left' | 'right'
  heading: string
  lead?: string
  bg?: string
  items: string[]
  /** Tune per-image if the subject's head/face gets cropped. e.g. 'center 15%' */
  imageObjectPosition?: string
}

/**
 * Responsive text + image panel with arrow-bullet list.
 */
export function TextImagePanel({
  bg,
  image,
  imageSide = 'left',
  heading,
  lead,
  items,
  imageObjectPosition = 'center 20%',
}: TextImagePanelProps) {
  const imageBlock = (
    <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full min-h-0 lg:min-h-[520px] rounded-2xl overflow-hidden shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: imageObjectPosition }}
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center py-4 lg:py-0">
      <h2
        className="sm:text-[48px] text-[36px] font-normal leading-tight mb-4"
        style={{ color: '#0B2055', fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
      >
        {heading}
      </h2>

      <div className="text-sm sm:text-base text-[#111214] font-medium leading-relaxed">
        {lead ? <p className="mb-4">{lead}</p> : null}

        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[#111214] font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12" fill="none">
                <path
                  d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
                  fill="#519B99"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <section className={`relative w-full ${bg ? bg : 'bg-white'} py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
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