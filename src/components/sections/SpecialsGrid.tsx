"use client"

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Special, SpecialLocation } from '@/content/pages/specials'
import { cn } from '@/lib/utils'
import { BookingForm } from '../shared/BookingForm'

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

      {/* ── Text Content ──────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">

        {/* Window — e.g. "APRIL-JUNE:" */}
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1C274C] mb-2">
          {special.window}
        </p>

        {/* Title — Dark Navy Bodoni Serif */}
        <h3
          className="text-2xl sm:text-[26px] font-normal leading-snug text-[#1C274C] mb-3"
          style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', Georgia, serif" }}
        >
          {special.title}
        </h3>

        {/* Description — Dark Neutral Body */}
        <p className="flex-1 text-sm sm:text-[15px] leading-relaxed text-[#2D3748] font-normal mb-6">
          {special.description}
        </p>

        {/* CTA — Teal Pill Button with cursor-pointer */}
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#519B99] hover:bg-[#448b89] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                <span>{special.ctaLabel ?? 'Claim'}</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
              </button>
            </DialogTrigger>
            
            {/* Modal Dialog Content Matching Target Screenshot */}
            <DialogContent className="max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-[480px] overflow-y-auto rounded-[28px] border-none bg-[#0B1938] p-6 sm:p-9 text-white shadow-2xl [&>button]:bg-slate-700/60 [&>button]:text-slate-200 [&>button]:hover:bg-slate-600 [&>button]:hover:text-white [&>button]:border-none [&>button]:cursor-pointer">
              <DialogHeader className="mb-2 text-center sm:text-center">
                <DialogTitle
                  className="font-['Bodoni_Moda',var(--font-bodoni),Georgia,serif] text-2xl sm:text-[28px] font-normal text-white text-center leading-tight"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', Georgia, serif" }}
                >
                  Claim Wellness Special
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <BookingForm
                  variant="dark"
                  defaultLocation={special.locations[0]}
                  serviceLabel={`Wellness special — ${special.title}`}
                  submitLabel="NEXT STEP"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

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