import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Media } from '@/types/content'
import { ArrowBulletIcon } from './icons'

export interface PhotoArrowListRow {
  image: Media
  /** Which side the photo sits on at `lg`+. Below that every row stacks photo-first. */
  imageSide: 'left' | 'right'
  heading: string
  items: string[]
}

/**
 * The hub page's `.photo-content-d.group` block: rows of photo + navy
 * arrow-list that share one rounded outline, reading as a single checkerboard
 * panel rather than separate cards. Plain text bullets — the source markup
 * uses `.list-arrow-right` here, with no per-item icons.
 */
export function PhotoArrowListQuadPanel({ rows }: { rows: PhotoArrowListRow[] }) {
  return (
    <Section background="page" spacing="sm">
      <Container>
        <Reveal>
          <div className="overflow-hidden rounded-xl shadow-xl">
            {rows.map((row) => {
              const imageBlock = (
                <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-full">
                  <Image
                    src={row.image.src}
                    alt={row.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: row.image.focalPoint ?? 'center' }}
                  />
                </div>
              )

              const textBlock = (
                <div className="flex flex-col justify-center bg-[#14214B] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
                  <h2 className="font-display text-[26px] font-medium leading-tight text-balance text-canvas-50 sm:text-[30px] lg:max-w-[16ch] lg:text-[34px]">
                    {row.heading}
                  </h2>

                  <ul className="mt-6 space-y-3 lg:mt-8">
                    {row.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <ArrowBulletIcon className="w-[22px] shrink-0" aria-hidden />
                        <span className="text-[15px] leading-normal text-canvas-50/90 sm:text-[16px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )

              return (
                // `order` keeps the photo above its text on mobile regardless of
                // `imageSide` — plain DOM order would bury the second row's photo
                // under two stacked text blocks.
                <div key={row.heading} className="grid lg:grid-cols-2">
                  <div className={row.imageSide === 'left' ? 'lg:order-1' : 'order-1 lg:order-2'}>{imageBlock}</div>
                  <div className={row.imageSide === 'left' ? 'lg:order-2' : 'order-2 lg:order-1'}>{textBlock}</div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
