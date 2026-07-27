import Image from 'next/image'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import type { Award } from '@/types/content'

interface CredentialStripProps {
  eyebrow?: string
  title: string
  lead?: string
  awards: Award[]
  background?: 'page' | 'alt' | 'raised'
}

export function CredentialStrip({
  eyebrow,
  title,
  lead,
  awards,
  background = 'alt',
}: CredentialStripProps) {
  return (
    <Section background={background} spacing="md">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} align="center" size="sm" />

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
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
      </Container>
    </Section>
  )
}
