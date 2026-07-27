import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

interface Crumb {
  label: string
  href: string
}

interface HeroCompactProps {
  eyebrow?: string
  title: string
  lead?: string
  breadcrumbs?: Crumb[]
}

/** Type-only hero for utility pages — financing, policies, contact, journal. */
export function HeroCompact({ eyebrow, title, lead, breadcrumbs }: HeroCompactProps) {
  return (
    <Section spacing="none" className="border-b border-canvas-300 pb-14 pt-32 lg:pt-44">
      <Container>
        <div className="max-w-3xl">
          {breadcrumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-body-sm text-canvas-600">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 ? <span aria-hidden>/</span> : null}
                    <Link href={crumb.href} className="hover:text-sage-700">
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? (
            <span className="mb-5 block text-label font-semibold uppercase text-sage-700">
              {eyebrow}
            </span>
          ) : null}

          <h1 className="text-display-lg">{title}</h1>
          {lead ? <p className="mt-6 text-body-lg text-canvas-600">{lead}</p> : null}
        </div>
      </Container>
    </Section>
  )
}
