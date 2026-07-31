'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { StaggerGroup, StaggerItem } from '@/components/shared/Stagger'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Media } from '@/types/content'

const BookingForm = dynamic(
  () => import('@/components/shared/GetConnectedForm').then((mod) => mod.BookingForm),
  {
    loading: () => (
      <div className="flex h-48 items-center justify-center text-body-sm text-canvas-600">
        Loading form…
      </div>
    ),
  }
)

export interface ServiceHighlightItem {
  image: Media
  title: string
  description: string
  ctaLabel: string
  href: string
}

export interface ServiceHighlightsGridProps {
  eyebrow?: string
  title: string
  lead?: string
  items: ServiceHighlightItem[]
}

/**
 * Uniform vertical service cards — image banner, title, clamped description,
 * CTA pinned to the bottom so every card in a row reads the same height
 * regardless of minor copy-length differences.
 */
export function ServiceHighlightsGrid({ eyebrow, title, lead, items }: ServiceHighlightsGridProps) {
  return (
    <Section background="page" spacing="md">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" />

        <StaggerGroup
          as="ul"
          stagger={0.06}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-canvas-300/60 bg-canvas-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg">
                <div className="relative aspect-4/3">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: item.image.focalPoint ?? 'center' }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 min-h-14 font-display text-title-md text-ink-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-4 min-h-24 text-body-sm leading-relaxed text-canvas-600">
                    {item.description}
                  </p>

                  {item.href === '/book-appointment' ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="mt-6 self-start group">
                          {item.ctaLabel}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="
                          w-[calc(100%-1rem)]
                          max-w-2xl
                          max-h-[90dvh]
                          overflow-y-auto
                          rounded-[28px]
                          p-5
                          sm:w-full
                          sm:rounded-[40px]
                          sm:p-10
                        "
                      >
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-display text-ink-900">
                            Schedule A Consultation
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <BookingForm />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button asChild size="sm" className="mt-6 self-start group">
                      <Link href={item.href}>
                        {item.ctaLabel}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  )
}
