import { getPost, getCategories, getTags } from '@/actions/blog'
import { notFound } from 'next/navigation'
import { BlogForm } from '@/components/admin/BlogForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const [post, categories, tags] = await Promise.all([
    getPost(id),
    getCategories(),
    getTags(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <BlogForm
      mode="edit"
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        contentHtml: post.contentHtml,
        featuredImage: post.featuredImage,
        status: post.status,
        categoryId: post.categoryId,
        tags: post.tags,
        seo: post.seo,
      }}
      categories={categories}
      tags={tags}
    />
  )
}
