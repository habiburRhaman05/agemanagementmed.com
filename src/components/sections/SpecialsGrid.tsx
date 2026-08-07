'use client'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
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

function SpecialCard({ special }: { special: Special }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
      <div className="relative aspect-[3/4]">
        <Image src={special.image.src} alt={special.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-label font-semibold uppercase tracking-wide text-sage-700">{special.window}</p>
        <h3 className="mt-2 font-display text-title-lg text-ink-950">{special.title}</h3>
        <p className="mt-3 flex-1 text-body-sm leading-relaxed text-canvas-600">{special.description}</p>

        <BookAppointmentButton
          variant="teal"
          className="mt-6 w-full sm:w-auto"
          modalTitle={`Claim: ${special.title}`}
          defaultLocation={special.locations[0]}
          defaultService={`Wellness special — ${special.title}`}
        >
          {special.ctaLabel ?? 'Claim'}
        </BookAppointmentButton>
      </div>
    </div>
  )
}

export function SpecialsGrid({ specials }: { specials: Special[] }) {
  const [activeTab, setActiveTab] = useState<LocationTab['id']>('all')
  const reduceMotion = useReducedMotion()

  const visible = specials.filter(
    (special) => activeTab === 'all' || special.locations.includes(activeTab),
  )

  return (
    <Section className="bg-gradient-to-b from-[#e0e9f4] to-[#f3f6fa]" spacing="md">
      <Container>
        <SectionHeader title="Select Your Location" align="center" />

        <div className="mt-8 flex justify-center gap-2">
          {LOCATION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-full px-5 py-2 text-body-sm font-semibold transition-colors',
                activeTab === tab.id
                  ? 'bg-ink-950 text-canvas-50'
                  : 'bg-canvas-100 text-canvas-600 hover:bg-canvas-200',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {visible.length ? (
          <StaggerGroup
            as="ul"
            stagger={0.06}
            className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-6"
          >
            {visible.map((special) => (
              <StaggerItem as="li" key={special.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
                <SpecialCard special={special} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className="mx-auto mt-12 max-w-md text-center text-body text-canvas-600">
            No specials are currently available for this location. Check back soon.
          </p>
        )}
      </Container>
    </Section>
  )
}
