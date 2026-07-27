import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { ContentGrid } from '@/components/sections/ContentGrid'
import { HeroCompact } from '@/components/sections/HeroCompact'
import { blogContent } from '@/content/pages/blog'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata(blogContent.seo)

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <HeroCompact
        {...blogContent.hero}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog' }]}
      />

      <ContentGrid title="All posts" items={blogContent.posts} />

      <ClosingCTA
        title="Ready to transform your health?"
        body="Take the first step towards a healthier, more vibrant you."
        cta={{ label: 'Schedule a consultation', href: '/book' }}
      />
    </>
  )
}
