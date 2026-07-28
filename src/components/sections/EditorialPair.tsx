import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Parallax } from '@/components/shared/Parallax'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { AspectImage } from '@/components/ui/AspectImage'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { EditorialPairData } from '@/types/content'

interface EditorialPairProps extends EditorialPairData {
  background?: 'page' | 'alt' | 'raised'
}

/**
 * The workhorse block — replaces every image+text section on the site (~20
 * pages). A 7/5 asymmetric split (not an even half-half) plus a soft blurred
 * color field behind the image are what keep it from reading as a template,
 * even repeated dozens of times across the site.
 *
 * For `imageTreatment="framed"` (the default) the image fills 100% of its
 * column's width AND height rather than being locked to a fixed aspect
 * ratio — it stretches to match whatever height the text column establishes
 * on desktop, and falls back to a fixed min-height on mobile where there's
 * no sibling column to match. `cutout` images keep a fixed square ratio,
 * since those are usually irregular transparent PNGs, not photos meant to
 * bleed edge-to-edge.
 */
export function EditorialPair({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageSide = 'right',
  imageTreatment = 'framed',
  cta,
  background = 'page',
}: EditorialPairProps) {
  const cutout = imageTreatment === 'cutout'

  return (
    <Section background={background} spacing="lg" className="overflow-hidden">
      <Container>
        {/* items-stretch (not items-center) so both columns share the row's
            height — required for the image column to have a real height to
            fill on desktop. */}
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal
            className={cn(
              'flex flex-col justify-center lg:col-span-7',
              imageSide === 'left' ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {eyebrow ? <Eyebrow className="mb-5 self-start">{eyebrow}</Eyebrow> : null}

            <h2 className="text-display-md">{title}</h2>

            <div className="mt-7 space-y-5">
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-body text-canvas-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {bullets?.length ? (
              <ul className="mt-8 space-y-3 border-t border-canvas-300 pt-8">
                {bullets.map((item) => (
                  <li key={item} className="flex gap-4 text-body">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage-600" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {cta ? (
              <Button asChild variant="secondary" className="mt-10">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ) : null}
          </Reveal>

          <Reveal
            delay={100}
            className={cn(
              'relative min-h-96 lg:col-span-5 lg:min-h-0',
              imageSide === 'left' ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <div
              className={cn(
                'absolute -z-10 aspect-square w-4/5 rounded-full bg-sage-100/60 blur-2xl',
                imageSide === 'left' ? '-left-10 -top-10' : '-right-10 -top-10',
              )}
              aria-hidden
            />

            <Parallax strength={28} className="h-full w-full">
              {cutout ? (
                <AspectImage
                  media={image}
                  ratio="square"
                  fit="cutout"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              ) : (
                <div className="relative h-full w-full min-h-96 overflow-hidden rounded-3xl shadow-lg lg:min-h-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="rounded-3xl object-cover"
                    style={{ objectPosition: image.focalPoint ?? 'center' }}
                  />
                </div>
              )}
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}