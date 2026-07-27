import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
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
  /** Treatment pages want the full viewport; editorial/blog posts stay a shorter, content-forward height. */
  fullHeight?: boolean
}

/**
 * An immersive hero style applied to treatments and editorial pages.
 * The image covers the background, overlaid with dark scrim to keep text legible.
 */
export function HeroEditorial({
  eyebrow,
  title,
  lead,
  image,
  ctas,
  breadcrumbs,
  fullHeight = false,
}: HeroEditorialProps) {
  return (
    <section
      className={cn(
        'relative isolate flex flex-col justify-end overflow-hidden pb-16 pt-32 lg:pb-24 lg:pt-44',
        fullHeight ? 'min-h-screen' : 'min-h-128 lg:min-h-168',
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.focalPoint ?? 'center' }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/45 to-ink-950/20" aria-hidden />

      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            {breadcrumbs?.length ? (
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-body-sm text-canvas-50/70">
                  {breadcrumbs.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center gap-1.5">
                      {i > 0 ? (
                        <ChevronRight className="size-3.5 text-canvas-50/40" aria-hidden />
                      ) : null}
                      <Link href={crumb.href} className="transition-colors hover:text-white">
                        {crumb.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {eyebrow ? (
              <Eyebrow tone="inverse" className="mb-5">
                {eyebrow}
              </Eyebrow>
            ) : null}

            <h1 className="text-display-lg text-canvas-50">{title}</h1>

            <p className="mt-6 max-w-2xl text-body-lg text-canvas-50/90">{lead}</p>

            {ctas?.length ? (
              <div className="mt-10 flex flex-wrap gap-4">
                {ctas.map((cta, i) => (
                  <Button
                    key={cta.href}
                    asChild
                    size="lg"
                    variant={cta.variant ?? (i === 0 ? 'primary' : 'outlineInverse')}
                  >
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
