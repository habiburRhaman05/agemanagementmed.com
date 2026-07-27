import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import type { Award, Testimonial } from '@/types/content'

interface Stat {
  value: string
  label: string
}

interface ProofBandProps {
  eyebrow?: string
  stats: Stat[]
  quotes: Testimonial[]
  awards?: Award[]
}

/**
 * Light, editorial — navy serif on a warm sand surface, framed by thin rules.
 * No dark fill, no teal-on-dark: proof reads as quiet confidence, not a
 * template's contrast block. The single dark band on a page is ClosingCTA.
 */
export function ProofBand({ eyebrow, stats, quotes, awards }: ProofBandProps) {
  return (
    <Section background="alt" spacing="lg">
      <Container>
        {eyebrow ? (
          <span className="block text-label font-semibold uppercase text-sage-700">
            {eyebrow}
          </span>
        ) : null}

        <Reveal>
          <dl className="mt-10 grid gap-10 border-b border-ink-900/10 pb-16 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-display-md text-ink-900 tabular">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-body-sm text-canvas-600">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {quotes.map((quote, index) => (
            <Reveal key={quote.id} delay={index * 90}>
              <figure className="border-l-2 border-sage-600 pl-7">
                <blockquote className="font-display text-display-sm leading-[1.35] text-ink-900">
                  “{quote.quote}”
                </blockquote>
                <figcaption className="mt-6 text-body-sm text-canvas-600">
                  <span className="font-semibold text-ink-900">{quote.author}</span>
                  {quote.source === 'google' ? ' · Google review' : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {awards?.length ? (
          <ul className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 border-t border-ink-900/10 pt-14">
            {awards.map((award) => (
              <li key={award.src}>
                <Image
                  src={award.src}
                  alt={award.alt}
                  width={110}
                  height={110}
                  className="h-16 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  )
}
