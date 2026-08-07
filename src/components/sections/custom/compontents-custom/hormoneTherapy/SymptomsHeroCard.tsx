'use client'

import { m } from 'framer-motion'
import dynamic from 'next/dynamic'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  AwardBadgeIcon,
  BrainIcon,
  DocumentIcon,
  GearOptimizeIcon,
  NetworkIcon,
  ShieldSafeIcon,
} from '@/components/ui/icons/treatment-icons'
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
    icon: DocumentIcon,
    title: 'Enhance Sexual Wellness',
    desc: 'Support libido and overall sexual function',
  },
  {
    icon: BrainIcon,
    title: 'Support Lean Muscle & Fat Loss',
    desc: 'Improve body composition and metabolism',
  },
  {
    icon: NetworkIcon,
    title: 'Restore Energy & Mental Clarity',
    desc: 'Feel sharper, focused, and energized',
  },
  {
    icon: ShieldSafeIcon,
    title: 'Improve Sleep Quality',
    desc: 'Experience deeper, more restorative sleep',
  },
  {
    icon: AwardBadgeIcon,
    title: 'Elevate Mood & Motivation',
    desc: 'Restore drive, confidence, and resilience',
  },
  {
    icon: GearOptimizeIcon,
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
    <section className="relative w-full overflow-hidden bg-[#F7F8F2] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[170px] left-0 h-[790px] w-[790px] rounded-full bg-[#587DBD]"
        style={{ filter: 'blur(500px)' }}
      />
      <Container className="relative mx-auto px-0! lg:px-8!">
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
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] items-stretch">
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
                  className="text-[36px] font-medium leading-tight text-white mb-2 capitalize text-center font-['Bodoni_Moda',var(--font-bodoni),serif]"
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
                        className="w-full sm:w-auto justify-center rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[14px] uppercase tracking-wider px-8 py-4 h-auto inline-flex items-center gap-2.5 shadow-md transition-all border-none"
                      >
                        <span>{ctaLabel}</span>
                        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z" fill="white"/>
                        </svg>
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
              <div className="text-left lg:pl-[52px]">
                <h2
                  className="text-[36px] sm:text-[48px] font-medium leading-tight text-[#111214] mt-6 sm:mt-8 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif", fontWeight: 500 }}
                >
                  Hormone <br className="hidden sm:inline" />
                  Optimization <br className="hidden sm:inline" />
                  For Men
                </h2>
              </div>

              <div className="text-left">
                <h3
                  className="text-[36px] sm:text-[48px] font-medium leading-tight text-[#111214] mb-2 font-['Bodoni_Moda',var(--font-bodoni),serif]"
                  style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', serif", fontWeight: 500 }}
                >
                  What BHRT Is And How It Works
                </h3>
                <p
                  className="text-[20px] text-[#111214] leading-relaxed font-['Manrope',var(--font-sans),sans-serif]"
                  style={{ fontFamily: 'var(--font-sans), Manrope, sans-serif', fontWeight: 400 }}
                >
                  Bioidentical Hormone Replacement Therapy (BHRT) uses hormones that are{' '}
                  <strong className="font-semibold text-[#111214]">
                    chemically identical to those produced naturally by your body
                  </strong>
                  , allowing for more precise and personalized optimization.
                </p>
              </div>
            </div>

            {/* Sub-Header */}
            <div className="text-center mb-10">
              <h3
                className="text-[32px] font-medium text-[#111214] leading-tight font-['Bodoni_Moda',var(--font-bodoni),serif]"
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
                  <div key={b.title} className="flex flex-row items-start text-left gap-5 sm:gap-6">
                    <div className="shrink-0 text-[#519B99]">
                      <Icon className="w-9 h-9 sm:w-10 sm:h-10" />
                    </div>
                    <div>
                      <h4 className="text-[20px] font-bold leading-snug text-[#111214] font-['Manrope',var(--font-sans),sans-serif]">
                        {b.title} <span className="font-normal text-[#111214]">- {b.desc}</span>
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
                    className="w-full sm:w-auto justify-center rounded-full bg-[#519B99] hover:bg-[#448b89] text-white font-bold text-[14px] uppercase tracking-wider px-8 py-4 h-auto inline-flex items-center gap-2.5 shadow-md transition-all border-none"
                  >
                    <span>{ctaLabel}</span>
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z" fill="white"/>
                    </svg>
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
