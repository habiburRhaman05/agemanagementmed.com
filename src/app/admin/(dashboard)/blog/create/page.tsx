import { getCategories, getTags } from '@/actions/blog'
import { BlogForm } from '@/components/admin/BlogForm'

export default async function CreateBlogPage() {
  const [categories, tags] = await Promise.all([
    getCategories(),
    getTags(),
  ])

  return (
    <BlogForm
      mode="create"
      categories={categories}
      tags={tags}
    />
  )
}
