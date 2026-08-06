'use client'

import { m } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Flame,
  Heart,
  Moon,
  Sparkles,
  Zap,
} from 'lucide-react'
import dynamic from 'next/dynamic'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { BenefitItem, Media } from '@/types/content'

const formLoading = (
  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
    Loading form…
  </div>
)
const BookingForm = dynamic(
  () => import('@/components/shared/BookingForm').then((mod) => mod.BookingForm),
  { loading: () => formLoading }
)

export interface SymptomsHeroCardProps {
  image: Media
  heading: string
  lead: string
  groups: BenefitItem[]
  closingNote?: string
  ctaLabel?: string
  ctaHref?: string
}

/** 6 Benefit items for "Our Men's Hormone Program May Help You" */
const PROGRAM_BENEFITS = [
  {
    icon: Heart,
    title: 'Enhance Sexual Wellness',
    desc: 'Support libido and overall sexual function',
  },
  {
    icon: Flame,
    title: 'Support Lean Muscle & Fat Loss',
    desc: 'Improve body composition and metabolism',
  },
  {
    icon: Zap,
    title: 'Restore Energy & Mental Clarity',
    desc: 'Feel sharper, focused, and energized',
  },
  {
    icon: Moon,
    title: 'Improve Sleep Quality',
    desc: 'Experience deeper, more restorative sleep',
  },
  {
    icon: Sparkles,
    title: 'Elevate Mood & Motivation',
    desc: 'Restore drive, confidence, and resilience',
  },
  {
    icon: Activity,
    title: 'Improve Mobility & Recovery',
    desc: 'Reduce lingering pain & enhance movement with integrated support',
  },
]

/**
 * Unified Symptoms & Optimization Component:
 * - ONE single elevated container card with rounded-[28px] border radius
 * - Top half: Dark Navy (#0B1938) with side-by-side portrait photo & categorized symptom checklists
 * - Bottom half: White (#FFFFFF) section with "Hormone Optimization For Men", 6 benefit cards grid, and CTA button
 */
export function SymptomsHeroCard({
  image,
  heading = 'Signs Of Low Testosterone In Men',
  lead = 'Low testosterone affects more than just libido. Symptoms often appear across multiple systems:',
  groups,
  closingNote = 'Diminished hormone levels can slow you down physically and mentally, keeping you from enjoying the activities and lifestyle you once loved. You don\'t have to accept this as "normal aging."',
  ctaLabel = 'SCHEDULE A CONSULTATION',
}: SymptomsHeroCardProps) {
  const imageSrc = image?.src || 'https://res.cloudinary.com/khs2rcsr/image/upload/v1785336801/ChatGPT_Image_Jul_29_2026_08_52_07_PM_dyqlrx.png'
  const imageAlt = image?.alt || heading

  return (
    <section className="relative w-full bg-[##F7F8F2] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-5xl mx-auto px-0">
        {/* ONE SINGLE UNIFIED CARD CONTAINER */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200/80"
          style={{ borderRadius: '28px', overflow: 'hidden' }}
        >
          {/* TOP HALF: Dark Navy Block (#0B1938) */}
          <div className="bg-[#0B1938] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
              {/* Left Column: Image */}
              <div className="relative min-h-[280px] sm:min-h-[380px] max-h-[340px] sm:max-h-none lg:min-h-full bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-top absolute inset-0"
                />
              </div>

              {/* Right Column: Symptom Checklist */}
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12 text-white">
                <h2
                  className="text-[28px] sm:text-4xl lg:text-[40px] font-normal leading-tight text-white mb-2 capitalize text-center font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  {heading}
                </h2>

                {lead ? (
                  <p className="text-base text-slate-300 font-normal leading-relaxed mb-6 text-center">
                    {lead}
                  </p>
                ) : null}

                {groups && groups.length > 0 ? (
                  <div className="space-y-5 mb-6">
                    {groups.map((group) => (
                      <div key={group.title}>
                        <h3 className="text-base font-semibold text-white mb-1.5 text-center">
                          {group.title}
                        </h3>
                        {group.items?.length ? (
                          <ul className="space-y-1 pl-1">
                            {group.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-base text-slate-200/90 font-normal">
                                <span className="text-[#519B99] shrink-0 font-sans">→</span>
                                <span className={idx === 0 && group.title.includes('Sexual') ? 'underline decoration-slate-400' : ''}>
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {closingNote ? (
                  <p className="text-base text-slate-300 font-normal leading-relaxed mb-6 pt-2 border-t border-slate-700/50 text-center">
                    {closingNote}
                  </p>
                ) : null}

                <div className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[11px] uppercase tracking-wider px-7 py-3.5 h-auto inline-flex items-center gap-2 shadow-md transition-all border-none"
                      >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100%-1rem)] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-[28px] p-5 sm:w-full sm:rounded-[40px] sm:p-10">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-display text-slate-900">
                          Book Your Consultation
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <BookingForm />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM HALF: White Overview Section (#FFFFFF) */}
          <div className="bg-white p-6 sm:p-8 lg:p-12 xl:p-16">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start mb-12 border-b border-slate-100 pb-8">
              <div className="text-center">
                <h2
                  className="text-[36px] font-normal leading-tight text-[#1C274C] mt-6 sm:mt-8 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  Hormone <br className="hidden sm:inline" />
                  Optimization <br className="hidden sm:inline" />
                  For Men
                </h2>
              </div>

              <div className="text-center">
                <h3
                  className="text-[20px] font-normal text-[#1C274C] mb-2 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
                >
                  What BHRT Is And How It Works
                </h3>
                <p className="text-base text-slate-600 font-normal leading-relaxed">
                  Bioidentical Hormone Replacement Therapy (BHRT) uses hormones that are{' '}
                  <strong className="font-semibold text-slate-800">
                    chemically identical to those produced naturally by your body
                  </strong>
                  , allowing for more precise and personalized optimization.
                </p>
              </div>
            </div>

            {/* Sub-Header */}
            <div className="text-center mb-10">
              <h3
                className="text-[32px] font-[500] text-[#14214b] leading-tight font-['Bodoni_Moda',var(--font-bodoni),serif]"
                style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif" }}
              >
                Our Men’s Hormone Program May Help You:
              </h3>
            </div>

            {/* 6 Benefit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12">
              {PROGRAM_BENEFITS.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.title} className="flex flex-col items-center text-center gap-3">
                    <div className="shrink-0 text-[#519B99]">
                      <Icon className="w-10 h-10 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-[20px] font-bold leading-snug text-[#1C274C]">
                        {b.title} <span className="font-normal text-[#14214b]">— {b.desc}</span>
                      </h4>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Consultation CTA Button */}
            <div className="text-center pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[11px] uppercase tracking-wider px-7 py-3.5 h-auto inline-flex items-center gap-2 shadow-md transition-all border-none"
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100%-1rem)] max-w-2xl max-h-[90dvh] overflow-y-auto rounded-[28px] p-5 sm:w-full sm:rounded-[40px] sm:p-10">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-display text-slate-900">
                      Book Your Consultation
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <BookingForm />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </m.div>
      </Container>
    </section>
  )
}
