import { getCategories, getTags } from '@/actions/blog'
import { getPeople } from '@/actions/people'
import { BlogForm } from '@/components/admin/BlogForm'

export default async function CreateBlogPage() {
  const [categories, tags, people] = await Promise.all([
    getCategories(),
    getTags(),
    getPeople(),
  ])

  return (
    <BlogForm
      mode="create"
      categories={categories}
      tags={tags}
      people={people}
    />
  )
}
