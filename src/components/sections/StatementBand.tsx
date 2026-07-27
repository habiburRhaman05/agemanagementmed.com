import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

interface StatementBandProps {
  text: string
  background?: 'page' | 'alt' | 'accent' | 'inverse'
}

/**
 * A single large sentence with nothing else on screen. The pacing device that
 * gives the page its Apple-like sectional rhythm. Keep it under ~16 words.
 */
export function StatementBand({ text, background = 'page' }: StatementBandProps) {
  return (
    <Section background={background} spacing="lg">
      <Container width="prose">
        <Reveal>
          <p className="text-center font-display text-display-md text-balance">{text}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
