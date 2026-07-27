import 'dotenv/config'
import { PrismaClient } from '../src/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { blogContent } from '../src/content/pages/blog'
import { blogPosts } from '../src/content/posts'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Migrating blog posts to database...\n')

  const admin = await prisma.admin.findFirst()
  if (!admin) {
    console.error('No admin found. Run seed first.')
    process.exit(1)
  }

  let imported = 0
  let skipped = 0

  for (const post of blogContent.posts) {
    const slug = post.href.split('/').pop() || ''
    const contentHtml = blogPosts[slug]

    if (!contentHtml) {
      console.log(`  ⚠ No content for "${post.title}" (/${slug}), skipping`)
      skipped++
      continue
    }

    // Check if already exists
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) {
      console.log(`  ∼ "${post.title}" already exists, updating...`)
      await prisma.post.update({
        where: { slug },
        data: {
          title: post.title,
          excerpt: post.excerpt || null,
          contentHtml,
          featuredImage: post.image?.src || null,
          status: 'published',
          publishedAt: post.date ? new Date(post.date) : new Date(),
          readingTime: Math.ceil(
            contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length /
              200
          ),
          authorId: admin.id,
        },
      })
      skipped++
      continue
    }

    await prisma.post.create({
      data: {
        title: post.title,
        slug,
        excerpt: post.excerpt || null,
        contentHtml,
        featuredImage: post.image?.src || null,
        status: 'published',
        publishedAt: post.date ? new Date(post.date) : new Date(),
        readingTime: Math.ceil(
          contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length /
            200
        ),
        authorId: admin.id,
      },
    })

    console.log(`  ✓ "${post.title}" imported`)
    imported++
  }

  console.log(`\n✅ Blog migration complete!`)
  console.log(`   ${imported} imported, ${skipped} skipped/updated`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
