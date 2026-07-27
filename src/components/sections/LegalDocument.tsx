import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

/** Renders a legal/policy HTML blob inside the site's card language, full-width and on-brand. */
export function LegalDocument({ html }: { html: string }) {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-3xl border border-canvas-300/60 bg-canvas-50 p-8 shadow-sm sm:p-12 lg:p-16">
            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink-900 prose-p:text-canvas-600 prose-a:text-sage-700 hover:prose-a:text-sage-800"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
