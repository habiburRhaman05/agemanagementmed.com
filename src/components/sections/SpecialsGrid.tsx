'use client'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Special, SpecialLocation } from '@/content/pages/specials'
import { cn } from '@/lib/utils'
import { BookingForm } from '../shared/BookingForm'
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
    <div className="item lg-col-md-6">
      <div className="box">
        <div className="img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={special.image.src} alt={special.image.alt} />
        </div>

        <div className="content">
          <div className="top">
            <h3 className="top-title">{special.window}</h3>
            <h4 className="lg-title">{special.title}</h4>

            <div className="lg-text">
              <p>{special.description}</p>
            </div>
          </div>

          <div className="cta">
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="lg-btn lg-btn-arrow-right">
                  {special.ctaLabel ?? 'Claim'}
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] max-w-2xl overflow-y-auto rounded-[28px] p-5 sm:w-full sm:rounded-[40px] sm:p-10">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-ink-900">Claim: {special.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <BookingForm
                    defaultLocation={special.locations[0]}
                    serviceLabel={`Wellness special — ${special.title}`}
                    submitLabel="Claim this special"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The Specials page "Select Your Location" filter + offer grid —
 * `#filter-d` / `#grid-d`. Ported 1:1 from
 * https://www.agemanagementmed.com/specials/; styling lives in
 * src/app/legacy.css.
 */
export function SpecialsGrid({ specials }: { specials: Special[] }) {
  const [activeTab, setActiveTab] = useState<LocationTab['id']>('all')
  const reduceMotion = useReducedMotion()

  const visible = specials.filter((special) => activeTab === 'all' || special.locations.includes(activeTab))

  return (
    <div className="group" style={{ backgroundColor: '#fff' }}>
      <div className="radial-gradient" aria-hidden />

      <div className="lg-content-d" style={{ position: 'relative', zIndex: 1 }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <h2 className="lg-title" style={{ margin: 0 }}>
              Select Your Location
            </h2>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 50 }} />

      <div id="filter-d" style={{ zIndex: 1, position: 'relative' }}>
        <div className="lg-max-width-1440">
          <div className="lg-container">
            <div className="filter">
              <ul>
                {LOCATION_TABS.map((tab) => (
                  <li
                    key={tab.id}
                    className={cn('item', activeTab === tab.id && 'active')}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: 50 }} />

      <div id="grid-d">
        <div className="radial-gradient" aria-hidden />
        <div className="radial-gradient radial-gradient-2" aria-hidden />

        <div className="lg-max-width-1440">
          <div className="lg-container">
            {visible.length ? (
              <div className="lg-grid lg-justify-center">
                {visible.map((special) => (
                  <SpecialCard special={special} key={special.id} />
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center' }}>No specials are currently available for this location. Check back soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
