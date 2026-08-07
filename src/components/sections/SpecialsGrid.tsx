"use client"

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

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
    <div className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_4px_25px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.13)]">

      {/* ── Image (Aspect Square to show full text without left/right cropping) ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
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
                'rounded-full px-5 py-2 text-sm font-semibold transition-colors cursor-pointer',
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
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-6 sm:gap-8"
            >
              {visible.map((special, index) => (
                <m.div
                  key={special.id}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-[480px] sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                >
                  <SpecialCard special={special} />
                </m.div>
              ))}
            </m.div>
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