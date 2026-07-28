import { TestimonialsManager } from '@/components/admin/TestimonialsManager'
import { prisma } from '@/lib/prisma'

export default async function TestimonialsPage() {
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  const testimonials = rows.map((row) => ({
    id: row.id,
    name: row.name,
    roleLabel: row.roleLabel,
    treatment: row.treatment,
    quote: row.quote,
    rating: row.rating,
    photoUrl: row.photoUrl,
    featured: row.featured,
    status: row.status,
    order: row.order,
    updatedAt: row.updatedAt.toISOString(),
  }))

  return <TestimonialsManager initial={testimonials} />
}
