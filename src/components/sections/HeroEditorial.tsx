import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { AspectImage } from '@/components/ui/AspectImage'
import { Button } from '@/components/ui/Button'
import type { Cta, Media } from '@/types/content'

interface Crumb {
  label: string
  href: string
}

interface HeroEditorialProps {
  eyebrow?: string
  title: string
  lead: string
  image: Media
  ctas?: Cta[]
  breadcrumbs?: Crumb[]
}

/**
 * The default hero for interior pages: type on cream beside the image, rather
 * than white text over a darkened photo. Legible at every size, and it lets
 * the lead paragraph be long enough to actually explain the treatment.
 */
export function HeroEditorial({
  eyebrow,
  title,
  lead,
  image,
  ctas,
  breadcrumbs,
}: HeroEditorialProps) {
  return (
    <Section spacing="none" className="pb-16 pt-32 lg:pb-28 lg:pt-44">
      <Container>
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-10">
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

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {eyebrow ? (
              <span className="mb-6 block text-label font-semibold uppercase text-sage-700">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="text-display-lg">{title}</h1>

            <p className="mt-8 text-body-lg text-canvas-600">{lead}</p>

            {ctas?.length ? (
              <div className="mt-10 flex flex-wrap gap-4">
                {ctas.map((cta, i) => (
                  <Button
                    key={cta.href}
                    asChild
                    size="lg"
                    variant={cta.variant ?? (i === 0 ? 'primary' : 'secondary')}
                  >
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <AspectImage
              media={image}
              ratio="landscape"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
