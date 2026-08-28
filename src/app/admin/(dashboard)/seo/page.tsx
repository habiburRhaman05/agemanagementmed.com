import { Suspense } from 'react'
import Link from 'next/link'
import { Stethoscope } from 'lucide-react'

import { SeoTable } from '@/components/admin/SeoTable'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { fromPageSeoRow } from '@/lib/pageSeoAdmin'
import { prisma } from '@/lib/prisma'

/**
 * Only pages that have no editor of their own live here. Treatment pages
 * are deliberately excluded — their SEO is edited inside the treatment
 * itself (/admin/treatments → edit), alongside that page's content. They
 * used to appear in both places, which meant the same field existed twice
 * with no indication of which one "won".
 *
 * Funnel/confirmation routes (/thank-you, /newsletter-thankyou,
 * /schedule-consultation, /lead-magnet, /conversational-ai) are also left
 * out: they carry no unique content and aren't in the sitemap, so there is
 * nothing useful to tune.
 */
const STATIC_PAGES = [
  { path: '/', label: 'Home' },
  { path: '/our-experts', label: 'Our Experts' },
  { path: '/contact-us', label: 'Contact Us' },
  { path: '/book-appointment', label: 'Book Appointment' },
  { path: '/services', label: 'Services' },
  { path: '/specials', label: 'Wellness Specials' },
  { path: '/financing-options', label: 'Financing Options' },
  { path: '/office-policies', label: 'Office Policies' },
  { path: '/blog', label: 'Blog' },
  { path: '/in-the-news', label: 'In The News' },
  { path: '/newsletter', label: 'Newsletter' },
  { path: '/privacy-policy', label: 'Privacy Policy' },
  { path: '/terms-and-conditions', label: 'Terms & Conditions' },
]

async function SeoTableSection() {
  const seoRows = await prisma.pageSeo.findMany({ orderBy: { path: 'asc' } })
  const seoByPath = new Map(seoRows.map((row) => [row.path, row]))

  const pages = STATIC_PAGES.map(({ path, label }) => ({
    path,
    label,
    seo: fromPageSeoRow(seoByPath.get(path) ?? null),
  }))

  return <SeoTable pages={pages} />
}

export default function SeoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-950">Site pages SEO</h1>
        <p className="text-sm text-gray-500">
          Title, description, canonical, OG image, robots, and structured data — for the site&apos;s
          standard pages.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-sage-600/20 bg-sage-600/5 p-4">
        <Stethoscope className="mt-0.5 size-5 shrink-0 text-sage-700" aria-hidden />
        <div className="text-sm">
          <p className="font-medium text-ink-950">Looking for a treatment page?</p>
          <p className="mt-0.5 text-gray-600">
            Treatment SEO is edited on the treatment itself, together with its content — so
            everything for that page is in one place.{' '}
            <Link href="/admin/treatments" className="font-medium text-sage-700 hover:underline">
              Go to Treatments →
            </Link>
          </p>
        </div>
      </div>

      <Suspense fallback={<TableSkeleton columns={3} />}>
        <SeoTableSection />
      </Suspense>
    </div>
  )
}
