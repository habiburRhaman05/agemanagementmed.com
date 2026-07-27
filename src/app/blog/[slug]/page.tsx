import { notFound } from 'next/navigation'

import { Header } from '@/components/layout/Header'
import { ClosingCTA } from '@/components/sections/ClosingCTA'
import { HeroEditorial } from '@/components/sections/HeroEditorial'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { Section } from '@/components/shared/Section'
import { blogContent } from '@/content/pages/blog'
import { blogPosts } from '@/content/posts'
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
        <Container width="prose">
          <Reveal>
            <div
              className="prose prose-sage prose-lg prose-img:rounded-lg prose-a:text-sage-700 mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Reveal>
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
