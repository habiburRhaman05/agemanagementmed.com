'use client'

import { m } from 'framer-motion'
import type { CSSProperties } from 'react'

import { Container } from '@/components/shared/Container'
import { IconRenderer } from '@/components/shared/IconRenderer'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import {
  HeartDropsIcon,
  LeafSparkleIcon,
  SpaHandsIcon,
  WellnessShieldIcon,
} from '@/components/ui/icons/wellness-icons'

import { cn } from '@/lib/utils'
import type { BenefitListData, DesignOverride } from '@/types/content'

interface BenefitListProps extends BenefitListData {
  background?: 'page' | 'alt' | 'raised' | 'accent'
  cardStyle?: boolean
  design?: DesignOverride
  sectionId?: string
  /** Optional array of awards logos to render at the bottom of the section */
  awards?: Array<{ src: string; alt: string }>
  awardsTitle?: string
  awardsLead?: string
  /** Optional heading rendered above the card (outside the white card). */
  introTitle?: string
  /** Optional multi-paragraph intro rendered above the card (outside the white card). */
  introParagraphs?: string[],
  overRideWidth?: string,
  paraWidth?: string
}

/** Custom SVG icons used for card items when item.icon is omitted. */
const DEFAULT_ICONS = [SpaHandsIcon, LeafSparkleIcon, HeartDropsIcon, WellnessShieldIcon]

/** Default 9 award logos for the "Recognized For Excellence" bottom section */
const DEFAULT_AWARDS = [
  { src: '/images/award-11-img.png', alt: 'Best of Pooler 2025' },
  { src: '/images/award-12-img.png', alt: 'Best of Savannah 2025' },
  { src: '/images/award-13-img.png', alt: 'Connect Best of Savannah 2025' },
  { src: '/images/award-14-img.png', alt: 'Best of Savannah 2024 Winner' },
  { src: '/images/award-15-img.png', alt: 'Best of Savannah 2023 Winner' },
  { src: '/images/award-16-img.png', alt: 'Best of Savannah 2022 Winner' },
  { src: '/images/award-17-img.png', alt: 'Best of Savannah 2021 Winner' },
  { src: '/images/award-18-img.png', alt: 'Best of Savannah 2020 Winner' },
  { src: '/images/award-19-img.png', alt: 'Best of Savannah 2019 Winner' },
]

/**
 * Rebuilt BenefitList component matching the reference design:
 * - Elevated white card container on soft off-white background with framer-motion `m` animations
 * - Centered Bodoni Moda typography for headings
 * - Staggered entrance animation and micro-interactions on sub-cards
 * - Optional / Default bottom Awards & Recognition logos section
 */
export function BenefitList({
  eyebrow,
  title,
  lead,
  items,
  columns = 2,
  numbered = false,
  background = 'page',
  cardStyle,
  design,
  sectionId,
  awards = DEFAULT_AWARDS,
  awardsTitle = 'Recognized For Excellence In Savannah & Beyond',
  awardsLead = 'These recognitions reflect our commitment to delivering high-quality aesthetic and wellness services in the Savannah area.',
  introTitle,
  introParagraphs,
  overRideWidth,
  paraWidth
}: BenefitListProps) {
  const useCards = cardStyle ?? (columns === 2 && !numbered)

  if (useCards) {
    return (
      <section
        id={sectionId}
        className={cn(
          'relative w-full bg-[#F8F9F5] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden',
          design?.className
        )}
        style={design?.vars as CSSProperties}
      >
        {/* Decorative Blur Background */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            borderRadius: '50%',
            background: '#587DBD',
            filter: 'blur(500px)',
            height: '790px',
            maxWidth: '790px',
            width: '100%',
            top: '40%',
            zIndex: 0,
          }}
        />

        <Container className={cn('relative z-10 !max-w-[1292px] mx-auto', design?.containerClassName)}>
          {/* Intro above the card (outside the white card) */}
          {introTitle || introParagraphs?.length ? (
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
            >
              {introTitle ? (
                <h2
                  className="text-[32px] sm:text-[48px] font-medium tracking-tight text-[#1C274C] mb-3 font-display leading-tight"
                  
                >
                  {introTitle}
                </h2>
              ) : null}

              {introParagraphs?.length ? (
                <div className="mt-4 space-y-3">
                  {introParagraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className={cn(
                        'text-base text-[#1C274C] font-normal leading-relaxed mx-auto',
                        !overRideWidth && 'max-w-xl'
                      )}
                      style={overRideWidth ? { maxWidth: overRideWidth } : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </m.div>
          ) : null}

          {/* Main Elevated White Card Container with entrance animation */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-[28px] p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100/70"
          >
            {/* Header Section inside Card */}
            {title || eyebrow || lead ? (
              <m.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
              >
                {eyebrow ? (
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#489B93] mb-2">
                    {eyebrow}
                  </p>
                ) : null}

                {title ? (
                  <h2
                    className="text-[32px] sm:text-[48px] font-medium tracking-tight text-[#1C274C] mb-3 font-display leading-tight"
                    
                  >
                    {title}
                  </h2>
                ) : null}

                {lead ? (
                  <p className="text-base text-[#1C274C] font-normal leading-relaxed max-w-xl mx-auto">
                    {lead}
                  </p>
                ) : null}
              </m.div>
            ) : null}

            {/* 2-Column Sub-Cards Grid with Staggered Entrance & Hover Animation */}
            <div
              className={cn(
                'grid gap-6',
                columns === 2 && 'grid-cols-1 md:grid-cols-2',
                columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                design?.cardClassName
              )}
            >
              {items.map((item, index) => {
                const DefaultIcon = DEFAULT_ICONS[index % DEFAULT_ICONS.length]

                return (
                  <m.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group bg-[#FBFBF9] hover:bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 flex flex-row items-start gap-4 sm:gap-6 cursor-pointer"
                  >
                    {/* Column 1: Icon */}
                    <div className="shrink-0 text-[#489B93] mt-1 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {item.icon ? (
                        <IconRenderer icon={item.icon} className="w-10 h-10 sm:w-12 sm:h-12 text-[#489B93]" />
                      ) : (
                        <DefaultIcon className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.75]" aria-hidden="true" />
                      )}
                    </div>

                    {/* Column 2: Title & Body Text */}
                    <div className="flex-1">
                      <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-medium tracking-tight text-[#1C274C] mb-2 font-display capitalize leading-tight group-hover:text-[#489B93] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {item.body ? (
                        <p className="text-base text-[#1C274C] font-normal leading-relaxed">
                          {item.body}
                        </p>
                      ) : null}

                      {item.items?.length ? (
                        <ul className="mt-4 space-y-2 text-left">
                          {item.items.map((sub) => (
                            <li key={sub} className="flex gap-2 text-xs text-slate-600">
                              <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#489B93]" aria-hidden="true" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </m.div>
                )
              })}
            </div>
          </m.div>

          {/* Bottom Awards & Recognition Section */}
          {awards && awards.length > 0 ? (
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 sm:mt-20 md:mt-24 text-center"
            >
              {awardsTitle ? (
                <h3
                  className="text-[32px] sm:text-[48px] font-medium leading-tight text-[#1C274C] mb-3 font-display"
                  
                >
                  {awardsTitle}
                </h3>
              ) : null}

              {awardsLead ? (
                <p
                  className={cn(
                    'text-base text-[#1C274C] font-normal leading-relaxed mx-auto mb-10 sm:mb-12',
                    !paraWidth && 'max-w-2xl'
                  )}
                  style={paraWidth ? { maxWidth: paraWidth } : undefined}
                >
                  {awardsLead}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 !max-w-[1292px] mx-auto">
                {awards.map((award, i) => (
                  <m.div
                    key={award.src + i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ scale: 1.08 }}
                    className="shrink-0 p-1"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={award.src}
                      alt={award.alt}
                      className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
                      loading="lazy"
                    />
                  </m.div>
                ))}
              </div>
            </m.div>
          ) : null}
        </Container>
      </section>
    )
  }

  // Ruled-row fallback layout
  return (
    <Section
      background={background}
      spacing="lg"
      className={design?.className}
      data-section-id={sectionId}
      style={design?.vars as CSSProperties}
    >
      <Container className={design?.containerClassName}>
        {title || eyebrow || lead ? (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#489B93] mb-2">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className="text-3xl sm:text-4xl font-normal text-[#1C274C] mb-3 font-display"
                
              >
                {title}
              </h2>
            ) : null}
            {lead ? <p className="text-sm text-slate-600 font-light">{lead}</p> : null}

            {introParagraphs?.length ? (
              <div className="mt-4 space-y-3">
                {introParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-sm text-slate-600 font-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <ul
          className={cn(
            'mt-12 grid gap-x-16 gap-y-12',
            columns === 2 && 'md:grid-cols-2',
            columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
            design?.cardClassName
          )}
        >
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 3) * 70}>
                <div className={cn('border-t border-slate-200 pt-6', design?.cardClassName)}>
                  {item.icon ? (
                    <div className="mb-4">
                      <IconRenderer icon={item.icon} className="text-[#489B93]" />
                    </div>
                  ) : null}

                  {numbered ? (
                    <span className="mb-4 block font-serif text-xl text-[#489B93] tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  ) : null}

                  <h3
                    className="text-xl font-normal text-[#1C274C] font-display"
                    
                  >
                    {item.title}
                  </h3>

                  {item.body ? (
                    <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">{item.body}</p>
                  ) : null}

                  {item.items?.length ? (
                    <ul className="mt-4 space-y-2">
                      {item.items.map((sub) => (
                        <li key={sub} className="flex gap-2.5 text-xs text-slate-600">
                          <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#489B93]" aria-hidden="true" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
