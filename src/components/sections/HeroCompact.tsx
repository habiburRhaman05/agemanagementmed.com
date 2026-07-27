import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
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
    <Section spacing="none" className="relative overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-20">
      <div className="absolute inset-0 bg-mesh-warm" aria-hidden />
      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            {breadcrumbs?.length ? (
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-body-sm text-canvas-600">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center gap-1.5">
                      {i > 0 ? (
                        <ChevronRight className="size-3.5 text-canvas-300" aria-hidden />
                      ) : null}
                      <Link href={crumb.href} className="transition-colors hover:text-sage-700">
                        {crumb.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}

            <h1 className="text-display-lg">{title}</h1>
            {lead ? <p className="mt-6 text-body-lg text-canvas-600">{lead}</p> : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
