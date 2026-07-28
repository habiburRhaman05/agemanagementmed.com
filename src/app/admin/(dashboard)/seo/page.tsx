import { SeoTable } from '@/components/admin/SeoTable'
import { getAllTreatments } from '@/content/treatments/main'
import { prisma } from '@/lib/prisma'

const STATIC_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/contact-us', label: 'Contact Us' },
  { path: '/our-experts', label: 'Our Experts' },
  { path: '/blog', label: 'Blog' },
  { path: '/news', label: 'News' },
  { path: '/book', label: 'Book' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms-and-conditions', label: 'Terms and Conditions' },
  { path: '/thank-you', label: 'Thank You' },
]

export default async function SeoPage() {
  const [treatments, seoRows] = await Promise.all([
    getAllTreatments(),
    prisma.pageSeo.findMany({ orderBy: { path: 'asc' } }),
  ])

  const seoByPath = new Map(seoRows.map((row) => [row.path, row]))

  const pages = [...STATIC_PAGES, ...treatments.map((t) => ({ path: t.href, label: t.name }))].map(
    ({ path, label }) => ({ path, label, seo: seoByPath.get(path) ?? null }),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-950">SEO</h1>
        <p className="text-sm text-gray-500">
          Title, description, canonical, OG image, robots, and structured-data override — per page, across the whole site.
        </p>
      </div>
      <SeoTable pages={pages} />
    </div>
  )
}
