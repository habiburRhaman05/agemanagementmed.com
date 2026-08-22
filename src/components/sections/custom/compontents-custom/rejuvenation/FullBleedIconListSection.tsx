import Image from 'next/image'
import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'

import type { Media } from '@/types/content'

export interface FullBleedIconItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
}

export interface FullBleedIconListSectionProps {
  image: Media
  /** Photo side at `lg`+; below that the photo always stacks on top. */
  imageSide?: 'left' | 'right'
  heading: string
  lead?: string
  itemsLabel?: string
  items: FullBleedIconItem[]
  closingParagraphs?: string[]
  cta?: { label: string; href: string }
}

/**
 * The source's `.photo-content-d.full-img` band — edge-to-edge photo against a
 * navy panel, no Container gutter, running the full viewport width. Used for
 * the two gendered sexual-wellness sections, which the source renders as
 * separate full-width bands with the testimonial block between them.
 */
export function FullBleedIconListSection({
  image,
  imageSide = 'left',
  heading,
  lead,
  itemsLabel,
  items,
  closingParagraphs,
  cta,
}: FullBleedIconListSectionProps) {
  const imageBlock = (
    <div className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-auto lg:min-h-full">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center bg-[#14214B] px-6 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20 xl:px-24">
      <h2 className="font-display text-[28px] font-medium leading-tight text-balance text-canvas-50 sm:text-[34px] lg:max-w-[18ch] lg:text-[40px]">
        {heading}
      </h2>

      {lead ? (
        <p className="mt-4 max-w-[60ch] text-[15px] font-normal leading-relaxed text-canvas-50/75 sm:text-[16px]">
          {lead}
        </p>
      ) : null}

      {itemsLabel ? <p className="mt-6 text-[15px] font-semibold text-canvas-50 sm:text-[16px]">{itemsLabel}</p> : null}

      <ul className="mt-5 grid max-w-[46rem] grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-4">
            <item.icon className="size-7 shrink-0" aria-hidden />
            <span className="text-[15px] leading-snug text-canvas-50/90 sm:text-[16px]">{item.label}</span>
          </li>
        ))}
      </ul>

      {closingParagraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-canvas-50/75 sm:text-[16px]">
          {paragraph}
        </p>
      ))}

      {cta ? (
        <div className="mt-8">
          <Link
            href={cta.href}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#519B99] px-8 py-4 text-center font-sans text-[13px] font-bold uppercase leading-snug tracking-[0.15em] text-white transition-opacity duration-300 hover:opacity-90 sm:w-auto sm:text-[14px]"
          >
            {cta.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              aria-hidden
              className="hidden shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2 sm:block"
            >
              <path
                d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
      ) : null}
    </div>
  )

  return (
    <section className="relative grid lg:grid-cols-[42%_58%]">
      <div className={imageSide === 'left' ? 'lg:order-1' : 'order-1 lg:order-2'}>{imageBlock}</div>
      <div className={imageSide === 'left' ? 'lg:order-2' : 'order-2 lg:order-1'}>{textBlock}</div>
    </section>
  )
}
