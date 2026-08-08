import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Tag, ArrowLeft, Phone } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { ShareButton } from '@/components/blog/ShareButton'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import BookAppointmentButton from '@/components/shared/BookAppointmentButton'
import { Container } from '@/components/shared/Container'
import { LegacyCtaLink } from '@/components/shared/LegacyCtaLink'
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
        className="h-full bg-[#519B99] transition-all duration-150"
        style={{ width: '0%' }}
        id="reading-progress"
        suppressHydrationWarning
      />
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

/** Thin long-stem arrow used throughout the site's brand CTAs. */
function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Sidebar "More Articles" box skeleton — shown while related posts stream in. */
function MoreArticlesSkeleton() {
  return (
    <div className="border border-gray-200 p-6">
      <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
      <div className="mt-5 space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── "More Articles" sidebar list (wrapped in Suspense) ───────────── */

async function MoreArticles({ currentSlug }: { currentSlug: string }) {
  let related
  try {
    related = await getPosts({
      status: 'published',
      pageSize: 5,
    })
  } catch {
    related = { posts: [] }
  }

  const relatedPosts = related.posts.filter((p) => p.slug !== currentSlug).slice(0, 4)

  if (relatedPosts.length === 0) return null

  return (
    <div className="border border-gray-200 p-6">
      <h2 className="font-display text-[24px] text-[#15224c]">More Articles</h2>

      <ul className="mt-5">
        {relatedPosts.map((rp) => (
          <li key={rp.id} className="border-b border-gray-100 py-4 first:pt-0 last:border-0 last:pb-0">
            <Link
              href={`/blog/${rp.slug}`}
              className="group flex items-start justify-between gap-3 text-[15px] leading-snug font-medium text-[#15224c] transition-colors hover:text-[#519B99]"
            >
              <span>{rp.title}</span>
              <ArrowSvg className="mt-1 shrink-0 text-[#519B99] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
      {/* ── Hero Section — solid navy band, centered eyebrow + title ──── */}
      <section className="relative overflow-hidden bg-[#0f1c3f] pt-36 pb-16 sm:pt-44 sm:pb-20">
        <Container className="relative text-center">
          <p className="text-[13px] font-bold tracking-[0.15em] text-white uppercase">Blog</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-[32px] leading-tight text-white sm:text-[44px]">
            {post.title}
          </h1>
        </Container>
      </section>

      {/* ── Article Body ────────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          {/* Back link + category, above the two columns */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#15224c]/60 transition-colors hover:text-[#519B99]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Link>
            {post.category ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#519B99]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#519B99] uppercase">
                <Tag className="h-3 w-3" />
                {post.category.name}
              </span>
            ) : null}
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:order-2">
              <div className="space-y-6 lg:sticky lg:top-24">
                <Suspense fallback={<MoreArticlesSkeleton />}>
                  <MoreArticles currentSlug={post.slug} />
                </Suspense>

                <TableOfContents html={post.contentHtml || ''} />

                {/* CTA Card */}
                <div className="border border-gray-200 p-6">
                  <h3 className="font-display text-[18px] text-[#15224c]">Need personalized care?</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#15224c]/60">
                    Our providers can help with your specific health concerns.
                  </p>
                  <LegacyCtaLink
                    href="/book-appointment"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#519B99] px-4 py-2.5 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#458785]"
                  >
                    Book a consultation
                  </LegacyCtaLink>
                  <a
                    href={site.phoneHref}
                    className="mt-3 flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#519B99] hover:text-[#458785]"
                  >
                    <Phone className="h-3 w-3" />
                    {site.phone}
                  </a>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="border border-gray-200 p-6">
                    <h3 className="mb-3 text-xs font-semibold tracking-widest text-[#15224c]/40 uppercase">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(({ tag }) => (
                        <span
                          key={tag.slug}
                          className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-[#15224c]/70 transition-colors hover:border-[#519B99]/40 hover:text-[#519B99]"
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
            <article className="border border-gray-200 p-6 sm:p-10 lg:col-span-8 lg:order-1">
              {/* Meta */}
              <p className="text-[13px] text-[#15224c]/50">
                {postDate ? <>Posted on {postDate}</> : null}
                {postDate ? ' · ' : null}
                {readingTime} min read · {authorName}
              </p>

              <h1 className="mt-3 font-display text-[28px] leading-tight text-[#15224c] sm:text-[34px] lg:text-[38px]">
                {post.title}
              </h1>

              <div className="mt-4">
                <ShareButton title={post.title} url={canonicalUrl} />
              </div>

              {/* Excerpt lead */}
              {post.excerpt && (
                <p className="mt-6 text-[17px] leading-relaxed font-light text-[#15224c]/85 italic">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              {processedHtml ? (
                <div
                  className={[
                    'prose prose-lg mt-6 max-w-none',
                    // Headings
                    'prose-headings:font-display prose-headings:font-semibold prose-headings:text-[#15224c] prose-headings:scroll-mt-24',
                    'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4',
                    'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
                    // Paragraphs
                    'prose-p:text-[#15224c]/80 prose-p:leading-8 prose-p:mb-5',
                    // Links
                    'prose-a:text-[#519B99] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-[#519B99] hover:prose-a:decoration-2',
                    // Images
                    'prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8',
                    // Bold
                    'prose-strong:text-[#15224c] prose-strong:font-semibold',
                    // Blockquote
                    'prose-blockquote:border-l-[#519B99] prose-blockquote:bg-[#519B99]/5 prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic',
                    'prose-blockquote:font-normal prose-blockquote:text-[#15224c]/80 prose-blockquote:text-lg',
                    // Lists
                    'prose-ul:list-disc prose-ul:pl-6 prose-ul:text-[#15224c]/80 prose-li:my-1',
                    'prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-[#15224c]/80',
                    // Code
                    'prose-code:rounded-lg prose-code:bg-gray-100 prose-code:px-2 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-[#458785]',
                    'prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:shadow-md prose-pre:my-6',
                    // Horizontal rule
                    'prose-hr:border-gray-200 prose-hr:my-10',
                    // Tables
                    'prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm',
                    'prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-xs prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-gray-500',
                    'prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:border-t prose-td:border-gray-100',
                    // Embedded CTA buttons
                    '[&_.btn-arrow-right]:inline-flex [&_.btn-arrow-right]:items-center [&_.btn-arrow-right]:gap-2.5',
                    '[&_.btn-arrow-right]:rounded-full [&_.btn-arrow-right]:bg-[#519B99]',
                    '[&_.btn-arrow-right]:px-7 [&_.btn-arrow-right]:py-3.5 [&_.btn-arrow-right]:text-[13px] [&_.btn-arrow-right]:font-bold [&_.btn-arrow-right]:tracking-[0.1em] [&_.btn-arrow-right]:uppercase',
                    '[&_.btn-arrow-right]:text-white [&_.btn-arrow-right]:no-underline',
                    '[&_.btn-arrow-right]:hover:bg-[#458785]',
                    '[&_.btn-arrow-right]:transition-colors [&_.btn-arrow-right]:duration-200',
                  ].join(' ')}
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              ) : (
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#519B99] text-sm font-bold text-white">
                      {authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#15224c]">{authorName}</p>
                      <p className="text-xs text-[#15224c]/50">Clinical Expert</p>
                    </div>
                  </div>

                  {/* Share */}
                  <ShareButton title={post.title} url={canonicalUrl} />
                </div>

                {/* Mobile tags */}
                {post.tags.length > 0 && (
                  <div className="mt-6 border-t border-gray-100 pt-6 lg:hidden">
                    <p className="mb-3 text-xs font-semibold tracking-widest text-[#15224c]/40 uppercase">
                      Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(({ tag }) => (
                        <span
                          key={tag.slug}
                          className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-[#15224c]/70"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile CTA */}
              <div className="mt-8 border border-gray-200 p-6 lg:hidden">
                <h3 className="font-display text-[18px] text-[#15224c]">
                  Have questions about what you read?
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#15224c]/60">
                  Our care team is here to help — no pressure, just answers.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <BookAppointmentButton className="w-full sm:w-auto">Schedule a consultation</BookAppointmentButton>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-medium text-[#15224c]/70 transition-colors hover:border-[#519B99]/40 hover:text-[#519B99]"
                  >
                    <Phone className="h-4 w-4 text-[#519B99]" />
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
      {/* Progress bar script — reads scrollHeight only on resize (not per scroll tick),
          throttles via requestAnimationFrame, and uses a passive listener to avoid
          forced reflows during scrolling. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var bar = document.getElementById('reading-progress')
              if (!bar) return
              var docHeight = 0
              var ticking = false

              function measure() {
                docHeight = document.documentElement.scrollHeight - window.innerHeight
              }

              function update() {
                ticking = false
                var scrollTop = window.scrollY
                var progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
                bar.style.width = progress + '%'
              }

              function onScroll() {
                if (ticking) return
                ticking = true
                requestAnimationFrame(update)
              }

              measure()
              window.addEventListener('resize', measure, { passive: true })
              window.addEventListener('load', measure, { passive: true })
              window.addEventListener('scroll', onScroll, { passive: true })
            })()
          `,
        }}
      />

      {/* Main article content (includes the "More Articles" sidebar, streamed via Suspense) */}
      <ArticleContent post={post} />

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        centered
      />
    </>
  )
}
