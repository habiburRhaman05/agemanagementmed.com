import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AspectImage } from '@/components/ui/AspectImage'
import { Button } from '@/components/ui/Button'
import type { Cta, Person } from '@/types/content'

interface PeopleGridProps {
  eyebrow?: string
  title: string
  lead?: string
  people: Person[]
  cta?: Cta
  background?: 'page' | 'alt' | 'raised'
}

export function PeopleGrid({
  eyebrow,
  title,
  lead,
  people,
  cta,
  background = 'page',
}: PeopleGridProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((person, index) => (
            <li key={person.slug}>
              <Reveal delay={(index % 4) * 60}>
                <AspectImage
                  media={person.portrait}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 100vw"
                  imageClassName="grayscale transition-all duration-500 hover:grayscale-0"
                />
                <h3 className="mt-6 text-title-md font-display">
                  {person.name}
                  {person.credentials ? (
                    <span className="text-canvas-600">, {person.credentials}</span>
                  ) : null}
                </h3>
                <p className="mt-2 text-body-sm text-sage-700">{person.role}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {cta ? (
          <div className="mt-14">
            <Button asChild variant="secondary">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
