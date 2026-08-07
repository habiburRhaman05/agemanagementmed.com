'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Cta, Person } from '@/types/content'

interface PeopleGridProps {
  eyebrow?: string
  title?: string
  lead?: string
  people: Person[]
  cta?: Cta
  background?: 'page' | 'alt' | 'raised'
  align?: 'left' | 'center'
}

/**
 * Rebuilt PeopleGrid component matching the elevated dark card screenshot design:
 * - Soft off-white page section background (#F8F9F5)
 * - Large rounded dark navy card container (#0B1938 rounded-[28px] shadow-2xl)
 * - Centered Bodoni Moda typography for header
 * - Full-width expert row cards with large circular portraits
 * - Complete bio paragraphs rendered for each provider
 * - Thin horizontal divider lines separating expert entries
 */
export function PeopleGrid({
  eyebrow,
  title = 'Meet Our Experts',
  lead = 'With years of experience in integrative medicine and hormone therapy, our experts are here to create personalized solutions that help you feel your best.',
  people,
  cta,
}: PeopleGridProps) {
  if (!people || people.length === 0) return null

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Container className="!max-w-[1292px] mx-auto">
        {/* Main Elevated Dark Navy Card Container */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#0B1938] rounded-[28px] p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_15px_50px_rgba(11,25,56,0.18)] text-white border border-slate-800/80"
        >
          {/* Header Section inside Card */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          >
            {eyebrow ? (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#519B99] mb-2">
                {eyebrow}
              </p>
            ) : null}

            <h2
              className="text-[32px] sm:text-[48px] font-medium leading-tight text-white mb-3 font-display"
              
            >
              {title}
            </h2>

            {lead ? (
              <p className="text-base text-white font-normal leading-relaxed">
                {lead}
              </p>
            ) : null}
          </m.div>

          {/* Expert Rows List */}
          <div className="flex flex-col gap-12 sm:gap-16">
            {people.map((person, index) => {
              const imageSrc = person.portrait?.src || ''
              const imageAlt = person.portrait?.alt || person.name
              const isCollins = person.name.toLowerCase().includes('collins')

              const bioParagraphs = Array.isArray(person.bio)
                ? person.bio
                : typeof person.bio === 'string'
                ? [person.bio]
                : person.summary
                ? [person.summary]
                : []

              return (
                <m.div
                  key={person.slug || person.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex flex-col"
                >
                  {/* Person Row Container */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12! lg:gap-[110px]!">
                    {/* Circular Portrait Image */}
                    <div className="relative w-40 h-40 sm:w-72 sm:h-72 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-slate-800">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={imageAlt}
                          fill
                          sizes="320px"
                          className="object-cover object-top"
                        />
                      ) : null}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 text-center md:text-left text-white">
                      <h3
                        className={cn(
                          "font-medium leading-tight text-white mb-1.5 font-display",
                          isCollins ? "text-[32px] md:text-[50px]" : "text-[32px] md:text-[40px]"
                        )}
                        
                      >
                        {person.name}
                        {person.credentials ? `, ${person.credentials}` : ''}
                      </h3>

                      <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-wide uppercase mb-4 sm:mb-6">
                        {person.role}
                      </p>

                      {/* Bio Paragraphs */}
                      <div className="space-y-3.5 text-base text-slate-200/90 font-normal leading-relaxed">
                        {bioParagraphs.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Divider between rows */}
                  {index < people.length - 1 ? (
                    <div className="mt-12 sm:mt-16 w-full h-[0.7px] bg-white" />
                  ) : null}
                </m.div>
              )
            })}
          </div>

          {/* Optional CTA */}
          {cta ? (
            <div className="mt-16 text-center">
              <Button asChild variant="primary" className="bg-[#519B99] hover:bg-[#448b89]">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          ) : null}
        </m.div>
      </Container>
    </section>
  )
}
