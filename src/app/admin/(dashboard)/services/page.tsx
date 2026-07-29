import { ServicesManager } from '@/components/admin/ServicesManager'
import { prisma } from '@/lib/prisma'

export default async function ServicesPage() {
  const rows = await prisma.service.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  const services = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    href: row.href,
    shortName: row.shortName,
    summary: row.summary,
    cardImageSrc: row.cardImageSrc,
    cardImageAlt: row.cardImageAlt,
    cardBenefits: row.cardBenefits as string[],
    order: row.order,
    status: row.status,
    updatedAt: row.updatedAt.toISOString(),
  }))

  return <ServicesManager initial={services} />
}
