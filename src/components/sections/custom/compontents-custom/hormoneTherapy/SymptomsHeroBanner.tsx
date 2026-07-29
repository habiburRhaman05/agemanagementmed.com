import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import type { BenefitItem, Media } from '@/types/content'

export interface SymptomsHeroBannerProps {
  image: Media
  heading: string
  lead: string
  groups: BenefitItem[]
}

/**
 * Full-bleed image hero with an overlaid title, followed by a grid of dark
 * symptom-category cards — one per audience-specific category from the
 * treatment's own `symptoms` data. The odd-numbered last category spans the
 * full row width instead of leaving an empty grid cell.
 */
export function SymptomsHeroBanner({ image, heading, lead, groups }: SymptomsHeroBannerProps) {
  const isOdd = groups.length % 2 === 1
  const lastIndex = groups.length - 1

  return (
    <Section background="page" spacing="md">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative h-80 sm:h-96">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: image.focalPoint ?? 'center' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-ink-950/30 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 px-6 py-8 sm:px-10">
                <h2 className="font-display text-display-sm text-canvas-50">{heading}</h2>
                <p className="mt-3 max-w-2xl text-body leading-relaxed text-canvas-50/85">{lead}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerGroup as="ul" stagger={0.06} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {groups.map((group, index) => (
            <StaggerItem
              as="li"
              key={group.title}
              className={isOdd && index === lastIndex ? 'sm:col-span-2' : undefined}
            >
              <div className="h-full rounded-2xl bg-ink-950 p-6 shadow-sm sm:p-7">
                <h3 className="font-display text-title-md text-canvas-50">{group.title}</h3>
                {group.body ? <p className="mt-2 text-body-sm text-canvas-50/70">{group.body}</p> : null}
                <ul
                  className={`mt-4 space-y-2 ${isOdd && index === lastIndex ? 'sm:grid sm:grid-cols-2 sm:gap-x-8 sm:space-y-0 sm:gap-y-2' : ''}`}
                >
                  {group.items?.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage-400" aria-hidden />
                      <span className="text-body-sm leading-snug text-canvas-50/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
