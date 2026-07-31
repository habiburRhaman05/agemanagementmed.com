import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { AspectImage } from '@/components/ui/AspectImage'
import { Audience, Media, Pillar } from '@/types/content'

export interface TreatmentSummary {
  slug: string
  href: string
  pillar: Pillar
  audience: Audience
  name: string
  shortName: string
  summary: string
  cardImage: Media
  cardBenefits: string[]
}

interface ServicesProps {
  eyebrow?: string
  title: string
  lead?: string
  treatments: TreatmentSummary[]
  background?: 'page' | 'alt' | 'raised'
  visibleCount?: number
  viewAllHref?: string
  align?: "center" | "left"
}

function formatPillar(pillar: Pillar): string {
  return String(pillar).replace(/[-_]/g, ' ')
}

const READOUT_HEIGHTS = [3, 6, 4, 9, 5, 7, 3, 10, 4, 6, 8, 3, 5, 9, 4, 6]

function ReadoutDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-2.5 items-end gap-[2px] ${className}`} aria-hidden>
      {READOUT_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-sage-600/25 transition-colors duration-500 group-hover:bg-sage-600/40"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

function TreatmentCard({ treatment }: { treatment: TreatmentSummary }) {
  return (
    <Link
      href={treatment.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-sage-200/30 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sage-500/40 hover:shadow-xl hover:shadow-sage-900/10"
    >
      {/* 
        Image Block: Reduced to h-44 to shorten the card. 
        Added 'object-cover object-top' to guarantee the image fills the box from the top correctly.
      */}
      <div className="relative shrink-0 h-60 w-full overflow-hidden bg-sage-50">
        <AspectImage
          media={treatment.cardImage}
          ratio="landscape"
          rounded={false}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
          imageClassName="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Floating CTA on the image */}
        <span
          className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-white text-sage-700 opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      {/* Content Block */}
      <div className="flex flex-1 flex-col p-5 pt-4">
        {/* Text Area */}
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sage-700">
            {formatPillar(treatment.pillar)}
          </span>
          <h3 className="mt-0.5 text-title-md font-bold leading-tight text-canvas-900 transition-colors group-hover:text-sage-800">
            {treatment.shortName}
          </h3>
          <p className="mt-1 line-clamp-2 text-body-sm text-canvas-600">
            {treatment.summary}
          </p>
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-2">
       
          
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            {/* Benefits List (Horizontal to save vertical space) */}
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-canvas-700">
              {treatment.cardBenefits.map((benefit, index) => (
                <li key={benefit} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sage-600" aria-hidden />
                  {benefit}
                  {index < treatment.cardBenefits.length - 1 && (
                    <span className="text-sage-200/70 text-[8px]" aria-hidden>•</span>
                  )}
                </li>
              ))}
            </ul>

            
          </div>
        </div>
      </div>
    </Link>
  )
}

export function Services({
  eyebrow,
  title,
  lead,
  treatments,
  align,
  background = 'page',
  visibleCount = 6,
  viewAllHref = '/services',
}: ServicesProps) {
  const visible = treatments.slice(0, visibleCount)
  const hasMore = treatments.length > visibleCount

  return (
    <Section background={background} spacing="lg" className='pb-0'>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align={align} />

        <StaggerGroup
          as="ul"
          stagger={0.08}
          className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {visible.map((treatment) => (
            <StaggerItem as="li" key={treatment.slug} className="flex h-full">
              <TreatmentCard treatment={treatment} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 rounded-full border-2 border-sage-600/30 bg-canvas-50 px-6 py-3 text-body-sm font-semibold text-sage-700 transition-all duration-300 hover:border-sage-600 hover:bg-sage-600 hover:text-canvas-50"
            >
              View all services
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  )
}