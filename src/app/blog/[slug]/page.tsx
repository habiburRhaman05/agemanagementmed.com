import { Phone } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { blogContent } from '@/content/pages/blog'
import { blogPosts } from '@/content/posts'
import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return blogContent.posts.map((post) => {
    // Extract slug from href (e.g., "/blog/perimenopause-symptoms" -> "perimenopause-symptoms")
    const slug = post.href.split('/').pop() || ''
    return { slug }
  })
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogContent.posts.find((p) => p.href.endsWith(`/${slug}`))
  if (!post) {
    return buildMetadata({ title: 'Not Found', description: '', canonical: '' })
  }

  return buildMetadata({
    title: `${post.title} | Savannah Age Management Medicine`,
    description: post.excerpt || '',
    canonical: post.href,
    ogImage: post.image,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogContent.posts.find((p) => p.href.endsWith(`/${slug}`))
  const content = blogPosts[slug]

  if (!post || !content) {
    notFound()
  }

  return (
    <>
      <Header />
      <HeroEditorial
        title={post.title}
        eyebrow={post.eyebrow}
        lead={post.date || ''}
        image={post.image!}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
          { label: post.title, href: post.href },
        ]}
      />

      <Section background="page" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-8">
              <div
                className={[
                  'prose prose-lg max-w-none',
                  'prose-headings:font-display prose-headings:text-ink-900',
                  'prose-p:text-canvas-600 prose-li:text-canvas-600',
                  'prose-a:text-sage-700 prose-a:no-underline hover:prose-a:underline',
                  'prose-img:rounded-2xl',
                  'prose-strong:text-ink-900',
                  // Embedded "Schedule a consultation" links from the source content
                  // render as a plain <a>; style them to match the site's Button.
                  '[&_.btn-arrow-right]:inline-flex [&_.btn-arrow-right]:items-center [&_.btn-arrow-right]:gap-2',
                  '[&_.btn-arrow-right]:rounded-full [&_.btn-arrow-right]:bg-linear-to-br [&_.btn-arrow-right]:from-sage-600 [&_.btn-arrow-right]:to-ink-900',
                  '[&_.btn-arrow-right]:px-7 [&_.btn-arrow-right]:py-3 [&_.btn-arrow-right]:font-semibold [&_.btn-arrow-right]:text-canvas-50 [&_.btn-arrow-right]:no-underline',
                  '[&_.btn-arrow-right]:shadow-glow',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Reveal>

            <div className="lg:col-span-4">
              <Reveal delay={100} className="lg:sticky lg:top-32">
                <div className="rounded-3xl border border-canvas-300/60 bg-canvas-50 p-8 shadow-md">
                  <h2 className="text-title-md font-display">Have questions?</h2>
                  <p className="mt-2 text-body-sm text-canvas-600">
                    Talk to our care team about what you read — no pressure, just answers.
                  </p>

                  <Button asChild size="lg" variant="primary" className="mt-6 w-full">
                    <Link href={site.bookingHref}>Schedule a consultation</Link>
                  </Button>

                  <a
                    href={site.phoneHref}
                    className="mt-4 flex items-center justify-center gap-2 text-body-sm font-medium text-ink-900 hover:text-sage-700"
                  >
                    <Phone className="size-4 text-sage-600" aria-hidden />
                    {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book' }}
      />
    </>
  )
}
