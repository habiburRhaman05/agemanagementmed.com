import { BadgeCheck } from 'lucide-react'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { AspectImage } from '@/components/ui/AspectImage'
import type { Media } from '@/types/content'

interface ReviewerBioProps {
  /** Full byline, e.g. "Dr. Harry S. Collins, DO, FACOG, Medical Director". */
  name: string
  bio: string[]
  portrait: Media
  background?: 'page' | 'alt' | 'raised'
}

/** The medical-review byline — who wrote or reviewed this clinical content. */
export function ReviewerBio({ name, bio, portrait, background = 'alt' }: ReviewerBioProps) {
  return (
    <Section background={background} spacing="md">
      <Container>
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-canvas-300/60 bg-canvas-50 p-6 text-center shadow-md sm:gap-8 sm:p-10 lg:flex-row lg:items-start lg:text-left">
            <div className="w-32 shrink-0 sm:w-40">
              <AspectImage media={portrait} ratio="square" fit="cutout" sizes="200px" className="rounded-2xl" />
            </div>
            <div>
              <Eyebrow className="mb-4">
                <BadgeCheck className="mr-1.5 -ml-0.5 inline size-3.5" aria-hidden />
                Reviewed by
              </Eyebrow>
              <h3 className="text-title-lg font-display">{name}</h3>
              <div className="mt-4 space-y-3 text-body-sm text-canvas-600">
                {bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
