import Link from 'next/link'

import { Container } from '@/components/shared/Container'
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
 * pages). Clean image, no decorative color panel behind it — the structure
 * comes from generous whitespace and the offset grid, not a color block.
 */
export function EditorialPair({
  eyebrow,
  title,
  body,
  bullets,
  image,
  imageSide = 'right',
  cta,
  background = 'page',
}: EditorialPairProps) {
  return (
    <Section background={background} spacing="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal
            className={cn(
              'lg:col-span-6',
              imageSide === 'left' ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {eyebrow ? (
              <span className="mb-5 block text-label font-semibold uppercase text-sage-700">
                {eyebrow}
              </span>
            ) : null}

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
            delay={80}
            className={cn(
              'lg:col-span-6',
              imageSide === 'left' ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <AspectImage
              media={image}
              ratio="landscape"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
