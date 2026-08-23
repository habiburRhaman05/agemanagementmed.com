// One-off, targeted fix for the 3 blog-related gaps found in the client
// audit response (Aug 23, 2026):
//   1. Publish the correct post (`low-testosterone-symptoms-for-men-in-their-40s`)
//      and fix its 2 stale /bhrt-male/ links.
//   2. Archive the broken duplicate (`low-testosterone-symptoms-in-men-before-40-samm`).
//   3. Add the missing PostSeo record for `perimenopause-symptoms`, pulled
//      directly from production's own HTML (download/_blog_perimenopause-symptoms_.html).
//
// Dry-run by default. Pass --write to apply. Every change is printed before
// AND re-read from the DB after, so nothing is trusted blind.

require('dotenv/config')
const { PrismaClient } = require('../src/lib/generated/prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const WRITE = process.argv.includes('--write')

const OLD_LINK = 'https://www.agemanagementmed.com/bhrt-male/'
const NEW_LINK = 'https://www.agemanagementmed.com/bioidentical-hormone-replacement-therapy/male/'

const PERIMENOPAUSE_SEO = {
  metaTitle: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
  metaDesc:
    'Learn common perimenopause symptoms, why lifestyle changes may stop working, and when hormone evaluation may clarify fatigue, brain fog, and weight gain.',
  ogImage: '',
  canonical: 'https://www.agemanagementmed.com/blog/perimenopause-symptoms/',
  noindex: false,
  keywords: null,
  h1: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
  ogTitle: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
  ogDescription: null,
  ogType: null,
  twitterTitle: null,
  twitterDescription: null,
  schemaJsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        name: 'Savannah Age Management Medicine - Health & Wellness',
        image: [
          'https://www.agemanagementmed.com/themes/default/assets/images/photo-1x1.jpg',
          'https://www.agemanagementmed.com/themes/default/assets/images/photo-4x3.jpg',
          'https://www.agemanagementmed.com/themes/default/assets/images/photo-16x9.jpg',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '200 Blue Moon Xing Suite 102',
          addressLocality: 'Pooler',
          addressRegion: 'GA',
          postalCode: '31322',
          addressCountry: 'US',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 32.0807431, longitude: -81.2886384 },
        url: 'https://www.agemanagementmed.com/',
        telephone: '+19129256911',
        medicalSpecialty: ['PrimaryCare', 'Dermatology', 'Physiotherapy', 'DietNutrition', 'Endocrine'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
        priceRange: '$$',
        availableService: [
          { '@type': 'MedicalProcedure', name: 'Bioidentical Hormone Replacement Therapy' },
          { '@type': 'MedicalTherapy', name: 'Platelet Rich Plasma Therapy (PRP)' },
          { '@type': 'MedicalTherapy', name: 'Sexual Performance & Rejuvenation' },
          { '@type': 'MedicalTherapy', name: 'Concierge Medical Weight Loss' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.agemanagementmed.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.agemanagementmed.com/blog/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Perimenopause Symptoms',
            item: 'https://www.agemanagementmed.com/blog/perimenopause-symptoms/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the first signs of perimenopause?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common early signs include fatigue, brain fog, irregular periods, sleep disruption, mood changes, and low libido.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can perimenopause cause weight gain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Hormonal fluctuations can affect metabolism, insulin sensitivity, and body composition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why am I gaining weight despite diet and exercise?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hormonal changes during perimenopause can make weight management more difficult despite healthy habits.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does perimenopause affect libido?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Hormonal changes may reduce libido and contribute to discomfort or changes in sexual wellness.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I know if my hormones are out of balance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Symptoms like fatigue, brain fog, weight gain, sleep changes, and low libido may indicate a hormonal imbalance.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I consider hormone therapy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hormone therapy may be considered when symptoms significantly affect daily life or persist despite lifestyle changes.',
            },
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
        image:
          'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/image1-260608052536.jpg',
        datePublished: 'June 8, 2026',
        author: { '@type': 'Organization', name: 'Savannah Age Management Medicine' },
      },
    ],
  },
}

async function main() {
  console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY RUN (pass --write to apply)'}\n`)

  // ------------------------------------------------------------------
  // 1. Publish the correct post + fix its 2 stale /bhrt-male/ links
  // ------------------------------------------------------------------
  const correctPost = await prisma.post.findUnique({
    where: { slug: 'low-testosterone-symptoms-for-men-in-their-40s' },
  })
  if (!correctPost) throw new Error('correct post not found')

  const occurrences = (correctPost.contentHtml.match(new RegExp(OLD_LINK, 'g')) || []).length
  console.log('[1] low-testosterone-symptoms-for-men-in-their-40s')
  console.log('    current status:', correctPost.status, '-> published')
  console.log(`    stale link occurrences (${OLD_LINK}):`, occurrences, '-> replacing with', NEW_LINK)

  const fixedHtml = correctPost.contentHtml.split(OLD_LINK).join(NEW_LINK)

  if (WRITE) {
    await prisma.post.update({
      where: { id: correctPost.id },
      data: { status: 'published', contentHtml: fixedHtml },
    })
  }

  // ------------------------------------------------------------------
  // 2. Archive the broken duplicate
  // ------------------------------------------------------------------
  const duplicatePost = await prisma.post.findUnique({
    where: { slug: 'low-testosterone-symptoms-in-men-before-40-samm' },
  })
  if (!duplicatePost) throw new Error('duplicate post not found')

  console.log('\n[2] low-testosterone-symptoms-in-men-before-40-samm')
  console.log('    current status:', duplicatePost.status, '-> archived')

  if (WRITE) {
    await prisma.post.update({
      where: { id: duplicatePost.id },
      data: { status: 'archived' },
    })
  }

  // ------------------------------------------------------------------
  // 3. Add PostSeo for perimenopause-symptoms
  // ------------------------------------------------------------------
  const perimenopausePost = await prisma.post.findUnique({
    where: { slug: 'perimenopause-symptoms' },
  })
  if (!perimenopausePost) throw new Error('perimenopause-symptoms post not found')

  const existingSeo = await prisma.postSeo.findUnique({ where: { postId: perimenopausePost.id } })
  console.log('\n[3] perimenopause-symptoms')
  console.log('    existing PostSeo row:', existingSeo ? 'YES (would be overwritten — aborting)' : 'none, creating')

  if (existingSeo) {
    console.error('    Refusing to overwrite an existing PostSeo row. Aborting step 3.')
  } else if (WRITE) {
    await prisma.postSeo.create({
      data: { postId: perimenopausePost.id, ...PERIMENOPAUSE_SEO },
    })
  }

  if (!WRITE) {
    console.log('\nDry run complete — no changes written. Re-run with --write to apply.')
    await prisma.$disconnect()
    return
  }

  // ------------------------------------------------------------------
  // Verify — re-read everything back from the DB
  // ------------------------------------------------------------------
  console.log('\n--- verifying ---')

  const v1 = await prisma.post.findUnique({ where: { id: correctPost.id } })
  const v1StillStale = (v1.contentHtml.match(new RegExp(OLD_LINK, 'g')) || []).length
  console.log('[1] status:', v1.status, '| stale links remaining:', v1StillStale)

  const v2 = await prisma.post.findUnique({ where: { id: duplicatePost.id } })
  console.log('[2] status:', v2.status)

  const v3 = await prisma.postSeo.findUnique({ where: { postId: perimenopausePost.id } })
  console.log('[3] PostSeo created:', !!v3, '| has schemaJsonLd:', !!v3?.schemaJsonLd)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error('ERROR:', e)
  process.exit(1)
})
