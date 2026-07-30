import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { CalendarDays, Clock, User, Tag, ArrowLeft, Phone } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { ShareButton } from '@/components/blog/ShareButton'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { getPostBySlug, getPosts } from '@/actions/blog'
import { site } from '@/content/site'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      return buildMetadata({ title: 'Not Found', description: '', canonical: '' })
    }

    const ogImageSrc = post.seo?.ogImage || post.featuredImage

    return buildMetadata({
      title: post.seo?.metaTitle || `${post.title} | Savannah Age Management Medicine`,
      description: post.seo?.metaDesc || post.excerpt || '',
      canonical: post.seo?.canonical || `/blog/${post.slug}`,
      noindex: post.seo?.noindex ?? false,
      ogImage: ogImageSrc ? { src: ogImageSrc, alt: post.title } : undefined,
    })
  } catch {
    return buildMetadata({ title: 'Not Found', description: '', canonical: '' })
  }
}

/* ── Reading progress bar ─────────────────────────────────────────── */

function ReadingProgressBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-150"
        style={{ width: '0%' }}
        id="reading-progress"
        suppressHydrationWarning
      />
    </div>
  )
}

/* ── Table of Contents ────────────────────────────────────────────── */

function TableOfContents({ html }: { html: string }) {
  const headings = html.match(/<h[23][^>]*>(.*?)<\/h[23]>/g) || []

  if (headings.length === 0) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        On this page
      </h3>
      <nav className="space-y-2">
        {headings.map((heading, i) => {
          const text = heading.replace(/<[^>]*>/g, '')
          const level = heading.startsWith('<h3') ? 'ml-3' : ''
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

          return (
            <a
              key={i}
              href={`#${id}`}
              className={`block text-sm leading-relaxed text-gray-500 transition-colors hover:text-emerald-700 ${level}`}
            >
              {text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}

/* ── Article content with heading IDs ─────────────────────────────── */

function processArticleHtml(html: string): string {
  // Add IDs to h2/h3 tags for table of contents linking
  return html.replace(
    /<h([23])([^>]*)>(.*?)<\/h([23])>/g,
    (_match, level, attrs, text, _closingLevel) => {
      const id = text
        .replace(/<[^>]*>/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
      return `<h${level}${attrs} id="${id}" class="scroll-mt-24">${text}</h${level}>`
    }
  )
}

/* ── Related Posts (wrapped in Suspense) ──────────────────────────── */

async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  let related
  try {
    related = await getPosts({
      status: 'published',
      pageSize: 3,
    })
  } catch {
    related = { posts: [] }
  }

  const relatedPosts = related.posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="border-t border-gray-100 bg-gray-50/50 py-16">
      <Container>
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900">
            Related Articles
          </h2>
          <p className="mt-1 text-gray-500">
            Continue reading from our journal
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((rp) => {
            const date = rp.publishedAt
              ? format(new Date(rp.publishedAt), 'MMM d, yyyy')
              : ''

            return (
              <Link
                key={rp.id}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {rp.featuredImage && (
                  <div className="relative -mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                      src={rp.featuredImage}
                      alt={rp.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-emerald-700 line-clamp-2">
                  {rp.title}
                </h3>
                {rp.excerpt && (
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {rp.excerpt}
                  </p>
                )}
                {date && (
                  <p className="mt-3 text-xs text-gray-400">{date}</p>
                )}
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* ── Post content section ─────────────────────────────────────────── */

function ArticleContent({ post }: { post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>> }) {
  const postDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : ''

  const authorName = post.author?.name || 'SAMM Team'
  const processedHtml = post.contentHtml
    ? processArticleHtml(post.contentHtml)
    : ''
  const readingTime = post.readingTime || Math.ceil((post.contentHtml?.split(/\s+/).length || 0) / 200)
  const canonicalUrl = `${site.url}/blog/${post.slug}`

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative pt-28 pb-16">
          <Container>
            {/* Back link */}
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>

            {/* Category */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                  <Tag className="h-3 w-3" />
                  {post.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
              {postDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {postDate}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {authorName}
              </span>
            </div>

            {/* Share */}
            <div className="mt-6">
              <ShareButton title={post.title} url={canonicalUrl} />
            </div>
          </Container>
        </div>
      </section>

      {/* ── Article Body ────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents html={post.contentHtml || ''} />

                {/* CTA Card */}
                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Need personalized care?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Our providers can help with your specific health concerns.
                  </p>
                  <Link
                    href="/book-appointment-appointment"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
                  >
                    Book a consultation
                  </Link>
                  <a
                    href={site.phoneHref}
                    className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    <Phone className="h-3 w-3" />
                    {site.phone}
                  </a>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(({ tag }) => (
                        <span
                          key={tag.slug}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9">
              {/* Mobile meta */}
              <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-400 lg:hidden">
                {postDate && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {postDate}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} min read
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {authorName}
                </span>
              </div>

              {/* Excerpt lead */}
              {post.excerpt && (
                <div className="mb-8 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 px-6 py-4">
                  <p className="text-lg leading-relaxed text-emerald-900/80 italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Content */}
              {processedHtml ? (
                <div
                  className={[
                    'prose prose-lg max-w-none',
                    // Headings
                    'prose-headings:font-display prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:scroll-mt-24',
                    'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100',
                    'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
                    // Paragraphs
                    'prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-5',
                    // Links
                    'prose-a:text-emerald-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-emerald-500 hover:prose-a:decoration-2',
                    // Images
                    'prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8',
                    // Bold
                    'prose-strong:text-gray-900 prose-strong:font-semibold',
                    // Blockquote
                    'prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic',
                    'prose-blockquote:font-normal prose-blockquote:text-gray-600 prose-blockquote:text-lg',
                    // Lists
                    'prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-600 prose-li:my-1',
                    'prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-600',
                    // Code
                    'prose-code:rounded-lg prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-emerald-800',
                    'prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:shadow-md prose-pre:my-6',
                    // Horizontal rule
                    'prose-hr:border-gray-200 prose-hr:my-10',
                    // Tables
                    'prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm',
                    'prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-xs prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-gray-500',
                    'prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:border-t prose-td:border-gray-100',
                    // Embedded CTA buttons
                    '[&_.btn-arrow-right]:inline-flex [&_.btn-arrow-right]:items-center [&_.btn-arrow-right]:gap-2',
                    '[&_.btn-arrow-right]:rounded-full [&_.btn-arrow-right]:bg-gradient-to-br [&_.btn-arrow-right]:from-emerald-600 [&_.btn-arrow-right]:to-teal-700',
                    '[&_.btn-arrow-right]:px-7 [&_.btn-arrow-right]:py-3.5 [&_.btn-arrow-right]:font-semibold',
                    '[&_.btn-arrow-right]:text-white [&_.btn-arrow-right]:no-underline [&_.btn-arrow-right]:shadow-md',
                    '[&_.btn-arrow-right]:hover:shadow-lg [&_.btn-arrow-right]:hover:from-emerald-700 [&_.btn-arrow-right]:hover:to-teal-800',
                    '[&_.btn-arrow-right]:transition-all [&_.btn-arrow-right]:duration-200',
                    // First letter drop cap for first paragraph
                    '[&>p:first-of-type]:first-letter:text-4xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:text-emerald-700 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1',
                  ].join(' ')}
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              ) : (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                  <p className="text-gray-500">
                    This article content is being prepared. Please check back soon.
                  </p>
                </div>
              )}

              {/* Article footer */}
              <div className="mt-12 border-t border-gray-100 pt-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-md">
                      {authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{authorName}</p>
                      <p className="text-xs text-gray-400">Clinical Expert</p>
                    </div>
                  </div>

                  {/* Share */}
                  <ShareButton title={post.title} url={canonicalUrl} />
                </div>

                {/* Mobile tags */}
                {post.tags.length > 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-6 lg:hidden">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(({ tag }) => (
                        <span
                          key={tag.slug}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile CTA */}
              <div className="mt-8 rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm lg:hidden">
                <h3 className="text-base font-semibold text-gray-900">
                  Have questions about what you read?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Our care team is here to help — no pressure, just answers.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
                    <Link href={site.bookingHref}>Schedule a consultation</Link>
                  </Button>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                  >
                    <Phone className="h-4 w-4 text-emerald-600" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch (err) {
    console.error('[BlogPostPage] DB error for slug:', slug, err)
    // Don't show notFound for DB errors — let error.tsx handle it gracefully
    throw new Error('Failed to load article. Please try again.', { cause: err })
  }

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header overlay />
      <ReadingProgressBar />


      {/* Progress bar script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              const scrollTop = window.scrollY
              const docHeight = document.documentElement.scrollHeight - window.innerHeight
              const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
              const bar = document.getElementById('reading-progress')
              if (bar) bar.style.width = progress + '%'
            })
          `,
        }}
      />

      {/* Main article content */}
      <ArticleContent post={post} />

      {/* Related Posts (streamed via Suspense) */}
      <Suspense
        fallback={
          <section className="border-t border-gray-100 bg-gray-50/50 py-16">
            <Container>
              <div className="mb-8">
                <div className="h-7 w-48 rounded bg-gray-200 animate-pulse" />
                <div className="mt-1 h-4 w-64 rounded bg-gray-100 animate-pulse" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="-mx-5 -mt-5 mb-4 aspect-[16/9] rounded-t-xl bg-gray-200" />
                    <div className="mb-2 h-5 w-full rounded bg-gray-200" />
                    <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        }
      >
        <RelatedPosts currentSlug={slug} />
      </Suspense>

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />
    </>
  )
}
