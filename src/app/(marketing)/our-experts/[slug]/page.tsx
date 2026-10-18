import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { ContentCard } from '@/components/features/ContentCard'
import { Container } from '@/components/shared/Container'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Section } from '@/components/shared/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageSchema } from '@/components/seo/PageSchema'
import { getPostsByPerson } from '@/actions/blog'
import { bestOfSavannah2026, findAwardHonoree } from '@/content/awards'
import { getAllPeople, getPersonBySlug } from '@/content/people'
import { buildBreadcrumbSchema } from '@/lib/breadcrumb-schema'
import { buildMetadata, buildPersonSchema } from '@/lib/seo'
import { ensureAbsoluteUrl } from '@/lib/utils'
import { getPersonPortraitAlt } from '@/lib/person-display'
import type { ContentSummary } from '@/types/content'

// Belt-and-suspenders fallback on top of the explicit revalidatePath calls
// in actions/blog.ts (which fire the moment a post is assigned/unassigned/
// archived) — keeps this page from ever being stale for longer than an hour
// even if a write ever reaches the DB some other way.
export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

// Pre-rendered for every published provider at build time; new/edited
// providers still resolve on demand (not `dynamicParams = false`) since this
// list can change between deploys.
export async function generateStaticParams() {
  const people = await getAllPeople()
  return people.map((person) => ({ slug: person.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = await getPersonBySlug(slug)
  if (!person) {
    return buildMetadata({ title: 'Not Found', description: '', canonical: '' })
  }

  return buildMetadata({
    title: `${person.name}${person.credentials ? `, ${person.credentials}` : ''} | Savannah Age Management Medicine`,
    description: person.summary,
    canonical: `/our-experts/${person.slug}`,
    ogImage: { src: person.portrait.src, alt: person.portrait.alt },
  })
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params
  const person = await getPersonBySlug(slug)
  if (!person) notFound()

  const posts = await getPostsByPerson(person.id)
  const awardHonoree = findAwardHonoree(person.name)

  const articles: ContentSummary[] = [
    ...posts.map(
      (post): ContentSummary => ({
        href: `/blog/${post.slug}`,
        title: post.title,
        excerpt: post.excerpt ?? undefined,
        eyebrow: 'SAMM Blog',
        date: post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : undefined,
        image: post.featuredImage ? { src: post.featuredImage, alt: post.title } : undefined,
      }),
    ),
    ...(person.externalArticles ?? []).map(
      (article): ContentSummary => ({
        href: article.url,
        title: article.title,
        eyebrow: article.publication ?? 'Guest editorial',
        external: true,
      }),
    ),
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Our Experts', href: '/our-experts' },
    { label: person.name, href: `/our-experts/${person.slug}` },
  ]

  return (
    <>
      <PageSchema path={`/our-experts/${person.slug}`} />
      <JsonLd data={buildPersonSchema(person)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)!} />
      <Header overlay />

      {/* Solid navy (same `bg-ink-900` used across the site), not the
          provider's photo — `tone="dark"` gets the same white-text
          treatment as a photo background without rendering one. */}
      <HeroCompact
        eyebrow={person.role}
        title={`${person.name}${person.credentials ? `, ${person.credentials}` : ''}`}
        lead={person.summary}
        breadcrumbs={breadcrumbs}
        tone="dark"
        media={(
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full border-4 border-white/15 bg-ink-800 shadow-2xl">
            <Image
              src={person.portrait.src}
              alt={getPersonPortraitAlt(person)}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-cover object-top"
            />
          </div>
        )}
      />

      <Section spacing="lg">
        <Container>
          <article className="mx-auto max-w-4xl">
            <h2 className="text-display-sm text-ink-900">{person.name} Biography</h2>
            <div className="mt-8 space-y-5 text-body-lg leading-relaxed text-canvas-700">
              {person.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {person.specialties?.length ? (
              <div className="mt-8">
                <p className="text-label font-semibold uppercase tracking-wide text-canvas-500">
                  Specialties
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.specialties.map((specialty) => (
                    <Eyebrow key={specialty} className="normal-case">
                      {specialty}
                    </Eyebrow>
                  ))}
                </div>
              </div>
            ) : null}

            {awardHonoree ? (
              <section aria-labelledby="provider-awards" className="mt-10 border-t border-canvas-300 pt-8">
                <h3 id="provider-awards" className="font-display text-title-md font-medium text-ink-900">
                  Awards
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Image
                    src={bestOfSavannah2026.seal.src}
                    alt={bestOfSavannah2026.seal.alt}
                    width={52}
                    height={52}
                    className="size-12 object-contain"
                  />
                  <p className="text-body-sm font-medium text-ink-900">
                    Best of Savannah {bestOfSavannah2026.year}
                  </p>
                  {awardHonoree.honors.map((honor) => (
                    <Eyebrow
                      key={`${honor.placement}-${honor.category}`}
                      className="normal-case tracking-[0.12em]"
                    >
                      {honor.placement} · {honor.category}
                    </Eyebrow>
                  ))}
                </div>
              </section>
            ) : null}

            {person.socialLinks?.length ? (
              <section aria-labelledby="provider-social-links" className="mt-8 border-t border-canvas-300 pt-8">
                <h3 id="provider-social-links" className="font-display text-title-md font-medium text-ink-900">
                  Social links
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {person.socialLinks.map((social) => (
                    <a
                      key={social.url}
                      href={ensureAbsoluteUrl(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-canvas-300 px-4 py-2 text-body-sm font-medium text-canvas-700 transition-colors hover:border-sage-600 hover:text-sage-700"
                    >
                      {social.platform}
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </Container>
      </Section>

      {/* Always rendered, even with zero articles — this list is populated
          by assigning the provider to a post in the blog editor, so an
          empty state here is expected for anyone not yet assigned to one,
          not a sign the feature is broken or missing. */}
      <Section background="alt" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Articles"
            title={`From ${person.name}`}
            lead="SAMM blog posts and published guest editorials."
          />
          {articles.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ContentCard key={article.href} item={article} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-body text-canvas-600">
              No articles yet — assign {person.name.split(' ')[0]} as the author on a blog post to see it
              here automatically.
            </p>
          )}
        </Container>
      </Section>

      <ClosingCTA
        title="Ready to schedule a consultation?"
        body={`Meet with ${person.name.split(' ')[0]} and the rest of the SAMM team.`}
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        backgroundImage="/images/hero-16-bg.jpg"
        centered
      />
    </>
  )
}
