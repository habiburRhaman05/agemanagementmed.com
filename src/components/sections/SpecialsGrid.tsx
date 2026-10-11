"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

import type { Special, SpecialLocation } from '@/content/pages/specials'
import { cn } from '@/lib/utils'
import { StaggerGroup, StaggerItem } from '../shared/Stagger'

interface LocationTab {
  id: 'all' | SpecialLocation
  label: string
}

const LOCATION_TABS: LocationTab[] = [
  { id: 'all', label: 'All' },
  { id: 'statesboro', label: 'Statesboro' },
  { id: 'savannah-pooler', label: 'Pooler' },
]

/** Same pill shape/style as `BookAppointmentButton`, but a real link that always goes to the card's CTA URL instead of opening the booking modal. */
function SpecialCta({ special }: { special: Special }) {
  const href = special.ctaHref || '/book-appointment'
  const isExternal = /^https?:\/\//i.test(href)

  const className =
    'group inline-flex h-14 w-full items-center cursor-pointer justify-center gap-3 whitespace-nowrap rounded-full bg-[#427f7d] px-[32px] py-5 font-bold font-sans text-[15px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:opacity-90 max-[379px]:gap-2 max-[379px]:px-5 max-[379px]:py-3 max-[379px]:text-[11px] max-[379px]:tracking-[0.06em] mt-6'

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      className="transition-transform duration-300 ease-out group-hover:translate-x-2"
      aria-hidden
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="white"
      />
    </svg>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {special.ctaLabel ?? 'Claim'}
        {arrow}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {special.ctaLabel ?? 'Claim'}
      {arrow}
    </Link>
  )
}

function SpecialCard({ special }: { special: Special }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.13)]">

      {/* ── Image (Aspect Square to show full text without left/right cropping) ── */}
      <div className="relative aspect-square w-full  overflow-hidden bg-slate-100">
        <Image
          src={special.image.src}
          alt={special.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-label font-semibold uppercase tracking-wide text-sage-700">{special.window}</p>
        <h3 className="mt-2 font-display text-title-lg text-ink-950">{special.title}</h3>
        <p className="mt-3 flex-1 text-body-sm leading-relaxed text-canvas-600">{special.description}</p>

        <SpecialCta special={special} />
      </div>
    </div>
  )
}

export function SpecialsGrid({ specials }: { specials: Special[] }) {
  const [activeTab, setActiveTab] = useState<LocationTab['id']>('all')

  const visible = specials.filter(
    (special) => activeTab === 'all' || special.locations.includes(activeTab),
  )

  return (
    <Section className="bg-gradient-to-b from-[#e0e9f4] to-[#f3f6fa]" spacing="md">
      <Container className="max-w-6xl">
        <SectionHeader title="Select Your Location" align="center" />

        {/* Location filter tabs with cursor-pointer */}
        <div className="mt-8 flex justify-center gap-2">
          {LOCATION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-full px-8 py-3 text-base font-semibold transition-colors cursor-pointer',
                activeTab === tab.id
                  ? 'bg-ink-950 text-canvas-50'
                  : 'bg-canvas-100 text-canvas-600 hover:bg-canvas-200',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated Cards Container — Bottom to Top Slide on Tab Change */}
        <AnimatePresence mode="wait">
          {visible.length ? (
            <div
              key={activeTab}
           
            
              className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-6 sm:gap-8"
            >
              {visible.map((special, index) => (
                <div
                  key={special.id}
                
                  className="w-full sm:w-auto sm:grow sm:basis-[380px] sm:max-w-[560px]"
                >
                  <SpecialCard special={special} />
                </div>
              ))}
            </div>
          ) : (
            <m.p
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-12 max-w-md text-center text-body text-canvas-600"
            >
              No specials are currently available for this location. Check back soon.
            </m.p>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  )
}