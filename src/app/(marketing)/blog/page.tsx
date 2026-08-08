import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { Container } from '@/components/shared/Container'
import { blogContent } from '@/content/pages/blog'
import { cn } from '@/lib/utils'
import { buildMetadata } from '@/lib/seo'
import { getPosts } from '@/actions/blog'
import type { ContentSummary } from '@/types/content'

export const metadata = buildMetadata(blogContent.seo)

export const dynamic = 'force-dynamic'

const POSTS_PER_PAGE = 9

/** Thin long-stem arrow used throughout the site's brand CTAs. */
function ArrowSvg({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path
        d="M1 5.6059C0.585786 5.6059 0.25 5.94168 0.25 6.3559C0.25 6.77011 0.585786 7.1059 1 7.1059V5.6059ZM21.5303 6.88623C21.8232 6.59333 21.8232 6.11846 21.5303 5.82557L16.7574 1.0526C16.4645 0.759702 15.9896 0.759702 15.6967 1.0526C15.4038 1.34549 15.4038 1.82036 15.6967 2.11326L19.9393 6.3559L15.6967 10.5985C15.4038 10.8914 15.4038 11.3663 15.6967 11.6592C15.9896 11.9521 16.4645 11.9521 16.7574 11.6592L21.5303 6.88623ZM1 7.1059H21V5.6059H1V7.1059Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ── Hero — full-bleed brand photo, navy scrim, left-aligned title ──── */

function BlogHero() {
  return (
    <section className="relative isolate flex min-h-[360px] items-end overflow-hidden pt-36 pb-12 sm:min-h-[440px] sm:pb-16 lg:pt-44">
      <Image
        src="/images/photo-content-56-img.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-[center_25%]"
      />
      <div className="absolute inset-0 -z-10 bg-[#0f1c3f]/55" aria-hidden />

      <Container className="relative">
        <h1 className="font-display text-[40px] text-white sm:text-[56px]">Blog</h1>
        {blogContent.hero.lead ? (
          <p className="mt-3 max-w-2xl text-[16px] font-light text-white/85">
            {blogContent.hero.lead}
          </p>
        ) : null}
      </Container>
    </section>
  )
}

/* ── Loading skeleton (matches the new card grid) ─────────────────── */

function BlogGridSkeleton() {
  return (
    <section className="bg-gradient-to-br from-[#eef1f8] via-white to-[#e7ecf6] py-16 sm:py-20">
      <Container>
        <div className="mx-auto mb-12 h-10 w-40 animate-pulse rounded bg-gray-200/70" />
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex animate-pulse flex-col">
              <div className="aspect-[4/3] bg-gray-200/70" />
              <div className="mt-5 space-y-3">
                <div className="h-5 w-full rounded bg-gray-200/70" />
                <div className="h-5 w-3/4 rounded bg-gray-200/70" />
                <div className="h-3 w-24 rounded bg-gray-200/70" />
                <div className="h-4 w-full rounded bg-gray-200/70" />
                <div className="mt-2 h-9 w-32 rounded-full bg-gray-200/70" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ── Post card ─────────────────────────────────────────────────────── */

function BlogCard({ post }: { post: ContentSummary }) {
  return (
    <Link key={post.href} href={post.href} className="group flex flex-col">
      {post.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-[20px] leading-snug text-[#15224c] transition-colors group-hover:text-[#519B99] sm:text-[22px]">
          {post.title}
        </h3>

        {post.date ? <p className="mt-2 text-[13px] font-medium text-[#519B99]">{post.date}</p> : null}

        {post.excerpt ? (
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#15224c]/75">{post.excerpt}</p>
        ) : null}

        <span className="mt-5 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#519B99] px-6 py-2.5 text-[13px] font-bold tracking-[0.1em] text-white uppercase transition-colors duration-300 group-hover:bg-[#458785]">
          Read more
          <ArrowSvg className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

/* ── Pagination ───────────────────────────────────────────────────── */

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  return (
    <div className="pb-16">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={currentPage === 2 ? '/blog' : `/blog?page=${currentPage - 1}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#15224c]/15 bg-white px-4 py-2.5 text-body-sm font-medium text-[#15224c]/70 transition-all hover:border-[#519B99]/40 hover:text-[#519B99] hover:shadow-sm"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={page === 1 ? '/blog' : `/blog?page=${page}`}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-body-sm font-medium transition-all ${
                  page === currentPage
                    ? 'bg-[#519B99] text-white shadow-sm'
                    : 'border border-[#15224c]/15 bg-white text-[#15224c]/70 hover:border-[#519B99]/40 hover:text-[#519B99] hover:shadow-sm'
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#15224c]/15 bg-white px-4 py-2.5 text-body-sm font-medium text-[#15224c]/70 transition-all hover:border-[#519B99]/40 hover:text-[#519B99] hover:shadow-sm"
              >
                Next
                <ChevronRight className="size-4" />
              </Link>
            )}
          </div>
          <p className="text-body-sm text-[#15224c]/50">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </Container>
    </div>
  )
}

/* ── "All Posts" grid ─────────────────────────────────────────────── */

function BlogGrid({ posts }: { posts: ContentSummary[] }) {
  return (
    <section className="bg-gradient-to-br from-[#eef1f8] via-white to-[#e7ecf6] py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-[36px] text-[#15224c] sm:text-[48px]">All Posts</h2>

        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.href} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ── Blog posts content (DB-driven, wrapped with pagination) ──────── */

async function BlogPostsContent({ currentPage }: { currentPage: number }) {
  const result = await getPosts({
    status: 'published',
    page: currentPage,
    pageSize: POSTS_PER_PAGE,
  })

  const posts: ContentSummary[] = result.posts.map((post) => ({
    href: `/blog/${post.slug}`,
    title: post.title,
    excerpt: post.excerpt || undefined,
    eyebrow: post.category?.name || undefined,
    date: post.publishedAt
      ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
      : undefined,
    image: post.featuredImage
      ? { src: post.featuredImage, alt: post.title }
      : undefined,
  }))

  return (
    <>
      <BlogGrid posts={posts} />
      <Pagination currentPage={currentPage} totalPages={result.totalPages} />
    </>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(params.page) || 1)

  return (
    <>
      <Header overlay />

      <BlogHero />

      {/* ── Blog grid — DB-driven, streamed via Suspense ────────────────── */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogPostsContent currentPage={currentPage} />
      </Suspense>

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
        centered
      />
    </>
  )
}
