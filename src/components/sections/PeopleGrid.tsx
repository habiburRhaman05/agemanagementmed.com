'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Award, Briefcase, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Cta, Person } from '@/types/content'

interface PeopleGridProps {
  eyebrow?: string
  title: string
  lead?: string
  people: Person[]
  cta?: Cta
  background?: 'page' | 'alt' | 'raised'
}

/** Full-screen modal that shows a team member's complete profile */
function PersonModal({ person, onClose }: { person: Person; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-8"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`${person.name} profile`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" />

        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-canvas-50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-ink-900/10 text-ink-900 transition-all duration-200 hover:bg-ink-900 hover:text-canvas-50 focus:outline-none focus:ring-2 focus:ring-sage-600"
          >
            <X className="size-5" />
          </button>

          {/* Content */}
          <div className="flex flex-col p-8 md:p-10 lg:p-12">
              {/* Name — desktop */}
              <div className="hidden md:block">
                <p className="text-label font-semibold uppercase tracking-widest text-sage-700">
                  {person.role}
                </p>
                <h2 className="mt-2 font-display text-display-sm text-ink-900">
                  {person.name}
                  {person.credentials ? (
                    <span className="ml-2 text-title-lg text-canvas-600">{person.credentials}</span>
                  ) : null}
                </h2>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-canvas-300 hidden md:block" />

              {/* Specialties */}
              {person.specialties?.length ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-label font-semibold uppercase tracking-wider text-ink-900">
                    <Award className="size-3.5 text-sage-600" />
                    <span>Specialties</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {person.specialties.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full bg-sage-100 px-3.5 py-1 text-body-sm font-medium text-sage-700 ring-1 ring-sage-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Summary */}
              {person.summary ? (
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-label font-semibold uppercase tracking-wider text-ink-900 mb-3">
                    <Briefcase className="size-3.5 text-sage-600" />
                    <span>About</span>
                  </div>
                  <p className="text-body font-medium text-ink-900 leading-relaxed">
                    {person.summary}
                  </p>
                </div>
              ) : null}

              {/* Full bio */}
              <div className="space-y-4 text-body text-canvas-600 leading-relaxed flex-1">
                {person.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-canvas-300">
                <Button asChild size="md" variant="primary">
                  <Link href="/book-appointment">Book a consultation</Link>
                </Button>
              </div>
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function PeopleGrid({
  eyebrow,
  title,
  lead,
  people,
  cta,
  background = 'page',
}: PeopleGridProps) {
  const [activePerson, setActivePerson] = useState<Person | null>(null)

  return (
    <>
      <Section background={background} spacing="lg">
        <Container>
          <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

          <StaggerGroup as="ul" stagger={0.07} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {people.map((person) => (
              <StaggerItem as="li" key={person.slug} className="h-full">
                {/* Card — h-full + flex-col makes every card in a row equal height */}
                <div className="group relative flex h-full flex-col items-center rounded-2xl border border-canvas-300 bg-white p-6 pb-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sage-600/30 hover:shadow-lg">

                  {/* Portrait with hover overlay */}
<button
  type="button"
  onClick={() => setActivePerson(person)}
  title={`View profile: ${person.name}`} // Simple tooltip fallback
  className="relative mx-auto block size-32 shrink-0 sm:size-36 focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 rounded-full"
>
  {/* Photo */}
  <div className="relative size-full overflow-hidden rounded-full bg-sage-50">
    <Image
      src={person.portrait.src}
      alt={person.portrait.alt}
      fill
      sizes="160px"
      className={cn(
        'object-cover object-top transition-all duration-500',
        'group-hover:scale-[1.04]',
      )}
    />
  </div>

  {/* Sage ring that grows on hover */}
  <span
    className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-sage-600/40 transition-all duration-300 group-hover:ring-4"
    aria-hidden
  />
</button>

                  {/* Name & role — pushed to bottom so cards align */}
                  <div className="mt-5 flex flex-1 flex-col justify-end">
                    <h3
                      className="cursor-pointer text-title-md font-display transition-colors duration-300 group-hover:text-sage-700"
                      onClick={() => setActivePerson(person)}
                    >
                      {person.name} <br/>
                      {person.credentials ? (
                        <span className="text-canvas-600">, {person.credentials}</span>
                      ) : null}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-sage-700">{person.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {cta ? (
            <div className="mt-14 flex justify-center">
              <Button asChild variant="secondary">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Portal-style modal */}
      {activePerson ? (
        <PersonModal person={activePerson} onClose={() => setActivePerson(null)} />
      ) : null}
    </>
  )
};
