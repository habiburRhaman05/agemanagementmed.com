import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { ContentGrid } from '@/components/sections/ContentGrid'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { blogContent } from '@/content/pages/blog'
import { buildMetadata } from '@/lib/seo'
import { getPosts } from '@/actions/blog'
import type { ContentSummary } from '@/types/content'

export const metadata = buildMetadata(blogContent.seo)

export const dynamic = 'force-dynamic'

const POSTS_PER_PAGE = 9

/* ── Loading skeleton (matches ContentGrid's internal grid classes) ── */

function BlogGridSkeleton() {
  return (
    <Section background="page" spacing="lg">
      <Container>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-canvas-300/60 bg-canvas-50"
            >
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="flex flex-1 flex-col p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-5 bg-gray-200 rounded w-full" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full mt-2" />
                <div className="h-3 bg-gray-200 rounded w-20 mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/* ── Latest Blog Section ──────────────────────────────────────────── */

function LatestBlogSection({ posts }: { posts: ContentSummary[] }) {
  return (
    <Section background="alt" spacing="lg">
      <Container>
        <div className="mb-10 text-center">
          <p className="mb-2 text-label font-semibold uppercase tracking-widest text-sage-600">
            Latest Articles
          </p>
          <h2 className="text-display-sm text-ink-900">Stay informed</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-2xl border border-canvas-300/60 bg-canvas-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sage-600/30 hover:shadow-lg"
            >
              {post.image && (
                <div className="relative -mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              {post.eyebrow && (
                <p className="mb-2 text-body-sm text-sage-700">{post.eyebrow}</p>
              )}
              <h3 className="text-title-lg transition-colors group-hover:text-sage-700 line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-2 text-body-sm text-canvas-600 line-clamp-2">{post.excerpt}</p>
              )}
              {post.date && (
                <p className="mt-3 text-body-sm text-canvas-500">{post.date}</p>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-canvas-300/60 bg-canvas-50 px-4 py-2.5 text-body-sm font-medium text-canvas-600 transition-all hover:border-sage-600/30 hover:text-sage-700 hover:shadow-sm"
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
                    ? 'bg-sage-700 text-canvas-50 shadow-sm'
                    : 'border border-canvas-300/60 bg-canvas-50 text-canvas-600 hover:border-sage-600/30 hover:text-sage-700 hover:shadow-sm'
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-canvas-300/60 bg-canvas-50 px-4 py-2.5 text-body-sm font-medium text-canvas-600 transition-all hover:border-sage-600/30 hover:text-sage-700 hover:shadow-sm"
              >
                Next
                <ChevronRight className="size-4" />
              </Link>
            )}
          </div>
          <p className="text-body-sm text-canvas-500">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </Container>
    </div>
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
      <ContentGrid title="All posts" items={posts} />
      <Pagination currentPage={currentPage} totalPages={result.totalPages} />
    </>
  )
}

/* ── Latest blog posts (always fetches fresh alongside main query) ── */

async function LatestPostsContent() {
  const result = await getPosts({
    status: 'published',
    page: 1,
    pageSize: 6,
  })

  const latestPosts: ContentSummary[] = result.posts.map((post) => ({
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

  if (latestPosts.length === 0) return null

  return <LatestBlogSection posts={latestPosts} />
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
      <Header />

      {/* ── Hero — exactly as original ──────────────────────────────────── */}
      <HeroCompact
        {...blogContent.hero}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Journal', href: '/blog' },
        ]}
      />

      {/* ── Blog grid — original ContentGrid layout, now DB-driven ─────── */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogPostsContent currentPage={currentPage} />
      </Suspense>

      {/* ── Latest Blog section (below pagination) ──────────────────────── */}
      {/* <Suspense fallback={null}>
        <LatestPostsContent />
      </Suspense> */}

      {/* ── Closing CTA — exactly as original ──────────────────────────── */}
      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book-appointment' }}
      />
    </>
  )
}
