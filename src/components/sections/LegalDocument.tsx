import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'

/**
 * Renders a legal/policy HTML blob in a clean, full-width editorial layout.
 *
 * The previous max-w-4xl card with heavy padding read as a narrow inset box
 * that broke the page rhythm. Now it uses a prose-width container with a
 * light left border accent and generous vertical spacing — consistent with
 * how premium publications (Stripe, Linear) present legal text.
 */
export function LegalDocument({ html }: { html: string }) {
  return (
    <Section spacing="lg" background="page">
      <Container width="prose">
        <Reveal>
          {/* Subtle left-accent line — same device as blockquotes in ProofBand */}
          <div className="border-l-2 border-sage-600/30 pl-8 sm:pl-10">
            <div
              className={[
                'prose prose-lg max-w-none',
                // Headings
                'prose-headings:font-display prose-headings:text-ink-900 prose-headings:tracking-tight',
                'prose-h1:text-display-md prose-h1:mb-6',
                'prose-h2:text-display-sm prose-h2:mt-12 prose-h2:mb-4',
                'prose-h3:text-title-lg prose-h3:mt-8',
                // Body
                'prose-p:text-canvas-600 prose-p:leading-relaxed',
                'prose-li:text-canvas-600',
                // Links
                'prose-a:text-sage-700 prose-a:no-underline prose-a:border-b prose-a:border-sage-300 hover:prose-a:border-sage-600 hover:prose-a:text-sage-800',
                // Strong / bold
                'prose-strong:text-ink-900 prose-strong:font-semibold',
                // HR
                'prose-hr:border-canvas-300',
              ].join(' ')}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
