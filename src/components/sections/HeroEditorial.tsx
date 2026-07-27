import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
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
}: HeroEditorialProps) {
  return (
    <section className="relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden pb-16 pt-32 lg:min-h-[42rem] lg:pb-24 lg:pt-44">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-ink-950/60" aria-hidden />

      <Container className="relative">
        <div className="max-w-3xl">
          {breadcrumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-body-sm text-canvas-50/70">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 ? <span aria-hidden>/</span> : null}
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? (
            <span className="mb-4 block text-label font-semibold uppercase text-sage-400">
              {eyebrow}
            </span>
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
                  className={i === 0 ? '!bg-sage-600 hover:!bg-ink-900 !text-white' : ''}
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
