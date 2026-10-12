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
import { getAllPeople, getPersonBySlug } from '@/content/people'
import { buildBreadcrumbSchema } from '@/lib/breadcrumb-schema'
import { buildMetadata, buildPersonSchema } from '@/lib/seo'
import { ensureAbsoluteUrl } from '@/lib/utils'
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
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-canvas-100">
                <Image
                  src={person.portrait.src}
                  alt={person.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover object-top"
                />
              </div>

              {person.specialties?.length ? (
                <div className="mt-6">
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

              {person.socialLinks?.length ? (
                <div className="mt-6">
                  <p className="text-label font-semibold uppercase tracking-wide text-canvas-500">Follow</p>
                  <div className="mt-3 flex flex-wrap gap-3">
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
                </div>
              ) : null}
            </div>

            <div className="space-y-5 text-body-lg leading-relaxed text-canvas-700">
              {person.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
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
