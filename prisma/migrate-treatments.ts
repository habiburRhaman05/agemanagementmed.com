import 'dotenv/config'

import { PrismaClient } from '../src/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

import { blogContent } from '../src/content/pages/blog'
import { contactContent } from '../src/content/pages/contact'
import { expertsContent } from '../src/content/pages/experts'
import { homeContent } from '../src/content/pages/home'
import { site } from '../src/content/site'
// Historical/rollback reference (plan.md Phase 10.4) — main.ts itself is now DB-backed.
import { treatments } from '../src/content/treatments/main.static-backup'
import type { Seo } from '../src/types/content'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

/** Every non-treatment public page's SEO, keyed by its route path. Add here as new pages ship. */
const staticPageSeo: Record<string, Seo> = {
  '/': homeContent.seo,
  '/contact-us': contactContent.seo,
  '/our-experts': expertsContent.seo,
  '/blog': blogContent.seo,
}

async function upsertPageSeo(path: string, seo: Seo) {
  await prisma.pageSeo.upsert({
    where: { path },
    update: {
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      ogImageUrl: seo.ogImage?.src,
      noindex: seo.noindex ?? false,
    },
    create: {
      path,
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      ogImageUrl: seo.ogImage?.src,
      noindex: seo.noindex ?? false,
    },
  })
}

async function main() {
  console.log('Migrating treatments + page SEO + site settings into Postgres...')

  const existingTreatmentCount = await prisma.treatment.count()
  if (existingTreatmentCount > 0) {
    throw new Error(
      `Treatment table already has ${existingTreatmentCount} row(s). Refusing to double-seed. ` +
        'Truncate the table explicitly first if you intend to re-run this script.',
    )
  }

  for (const treatment of treatments) {
    const { slug, href, pillar, audience, kind, seo, ...rest } = treatment

    await prisma.treatment.create({
      data: {
        slug,
        href,
        pillar,
        audience: audience ?? null,
        kind,
        data: rest as object,
      },
    })

    await upsertPageSeo(href, seo)

    console.log(`  ✓ ${slug} -> ${href}`)
  }
  console.log(`✓ ${treatments.length} treatments migrated`)

  for (const [path, seo] of Object.entries(staticPageSeo)) {
    await upsertPageSeo(path, seo)
    console.log(`  ✓ page SEO seeded for ${path}`)
  }

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      siteName: site.name,
      tagline: site.tagline,
      phone: site.phone,
      email: site.email,
      logoUrl: '/images/samm-blue-logo.png',
      logoDarkUrl: '/images/samm-logo.webp',
    },
  })
  console.log('✓ SiteSettings singleton seeded')

  const treatmentCount = await prisma.treatment.count()
  const pageSeoCount = await prisma.pageSeo.count()
  console.log(
    `\nDone. Treatment rows: ${treatmentCount} (expected ${treatments.length}). PageSeo rows: ${pageSeoCount}.`,
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
