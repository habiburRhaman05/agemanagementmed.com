import 'dotenv/config'
import { PrismaClient } from '../src/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

interface RawNewsItem {
  title: string
  date: string
  source: string
  newsUrl: string
  description: string
  image: string
  type: 'article' | 'video'
}

// Real press coverage, provided verbatim — do not invent or reword.
const items: RawNewsItem[] = [
  {
    title: 'SARAH MALONE Joins Savannah Age Management Medicine As Nurse Practitioner',
    date: 'February 19, 2026',
    source: 'Savannah Business Journal',
    newsUrl:
      'https://www.savannahbusinessjournal.com/news/health_hospitals/sarah-malone-joins-savannah-age-management-medicine-as-nurse-practitioner/article_fc576871-22f9-4e54-a4b3-ecaaeb7d1e00.html',
    description:
      'Savannah Age Management Medicine (SAMM) recently announced the hire of Nurse Practitioner Sarah Malone...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260226031839.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Announces The Hire Of Nurse Practitioner Sarah Malone',
    date: 'February 18, 2026',
    source: 'Savannah CEO',
    newsUrl:
      'https://savannahceo.com/news/2026/02/savannah-age-management-medicine-announces-hire-nurse-practitioner-sarah-malone/',
    description:
      'Savannah Age Management Medicine (SAMM) recently announced the hire of Nurse Practitioner Sarah Malone...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-2-260226032018.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Announces The Hire Of Nurse Practitioner Sarah Malone',
    date: 'February 17, 2026',
    source: 'The Coastal Buzz',
    newsUrl:
      'https://www.thecoastalbuzz.com/people-buzz/2026/02/17/savannah-age-management-medicine-announces-the-hire-of-nurse-practitioner-sarah-malone/',
    description:
      'SAVANNAH, Ga., – Savannah Age Management Medicine (SAMM) recently announced the hire of Nurse Practitioner Sarah Malone...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260226032045.jpg',
    type: 'article',
  },
  {
    title: 'Tips To Maintain Your Energy Throughout The Day',
    date: 'February 4, 2026',
    source: 'WTOC',
    newsUrl: 'https://www.wtoc.com/2026/02/04/tips-maintain-your-energy-throughout-day/',
    description:
      "SAVANNAH, Ga. (WTOC) - We all know that feeling of the afternoon crash- your tank is already on E, but it's only 3 p.m. And there's still so much day ahead of you...",
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-3-260226032402.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Receives Regional Award',
    date: 'January 27, 2026',
    source: 'Savannah Business Journal',
    newsUrl:
      'https://www.savannahbusinessjournal.com/news/chambers_commerce/jan-27---savannah-age-management-medicine-receives-regional-award/article_2cd7263b-39bb-4b6f-9e71-d59d29073df0.html',
    description:
      'Savannah Age Management Medicine was recently honored by the Statesboro Chamber of Commerce as the 2025 "Best New Start Up."...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-4-260226032508.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Receives Regional Award',
    date: 'January 22, 2026',
    source: 'Savannah CEO',
    newsUrl: 'https://savannahceo.com/news/2026/01/savannah-age-management-medicine-receives-regional-award/',
    description:
      'Savannah Age Management Medicine was recently honored by the Statesboro Chamber of Commerce as the 2025 "Best New Start Up."...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-2-260226032654.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Celebrates Grand Opening Of Statesboro Location',
    date: 'October 3, 2025',
    source: 'Grice Connect',
    newsUrl:
      'https://www.griceconnect.com/local-news/savannah-age-management-medicine-celebrates-grand-opening-of-statesboro-location-11261142',
    description:
      'Savannah Age Management Medicine, a leader in proactive healthcare, has officially opened its second location with a…',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-5-260226032824.jpg',
    type: 'article',
  },
  {
    title: 'Patient Turns Into Employee At Clinic',
    date: 'October 2, 2025',
    source: 'WTOC',
    newsUrl: 'https://www.youtube.com/watch?v=KgNoH2e4zI0',
    description: '',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-6-260226033027.jpg',
    type: 'video',
  },
  {
    title: 'As The First Millennial Women Enter Perimenopause, Advances In Hormone Therapy Show Promise',
    date: 'September 25, 2025',
    source: 'Savannah Now',
    newsUrl:
      'https://www.savannahnow.com/story/opinion/columns/guest/2025/09/25/aging-well-and-gracefully-can-happen-with-hormone-replacement-therapy/86331556007/?gca-cat=p&gnt-cfr=1',
    description:
      'I first heard the term "Millennopause" on a webinar, the content of which was designed to bring attention to...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260301082017.jpg',
    type: 'article',
  },
  {
    title: 'Local Physician Assistant Discusses The Importance Of Hormone Treatment',
    date: 'September 23, 2025',
    source: 'WTOC',
    newsUrl: 'https://www.youtube.com/watch?v=oTrQVnnntGw',
    description: '',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260402015916.jpg',
    type: 'video',
  },
  {
    title: 'Best Of Savannah Doctors 2025',
    date: 'September 1, 2025',
    source: 'Savannah Magazine',
    newsUrl: 'https://savannahmagazine.com/best-of-doctors/best-of-savannah-doctors-2025/',
    description:
      "From allergists to oncologists and pediatricians to menopause specialists, here are the best in Savannah's medical…",
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260303075941.jpg',
    type: 'article',
  },
  {
    title: 'Platelet Rich Plasma Therapy For Recreational Athletes',
    date: 'August 20, 2025',
    source: 'WTOC',
    newsUrl: 'https://www.wtoc.com/2025/08/20/platelet-rich-plasma-therapy-recreational-athletes/',
    description:
      "SAVANNAH, Ga. (WTOC) - Running is in Lovelight Burns' blood. And her blood has helped her get back to running...",
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-260402020021.jpg',
    type: 'article',
  },
  {
    title: 'EVELIA JOHNSON Joins Savannah Age Management Medicine As Family Nurse Practitioner',
    date: 'August 19, 2025',
    source: 'Savannah Business Journal',
    newsUrl:
      'https://www.savannahbusinessjournal.com/news/health_hospitals/evelia-johnson-joins-savannah-age-management-medicine-as-family-nurse-practitioner/article_b286bb75-5d24-47de-8a18-6013b7dd49c4.html',
    description:
      'Savannah Age Management Medicine (SAMM) recently announced the hire of Family Nurse Practitioner Evelia (Eve) Johnson...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-9-260226033648.jpg',
    type: 'article',
  },
  {
    title: 'Savannah Age Management Medicine Announces The Hire Of Family Nurse Practitioner Evelia Johnson',
    date: 'August 19, 2025',
    source: 'Savannah CEO',
    newsUrl:
      'https://savannahceo.com/news/2025/08/savannah-age-management-medicine-announces-hire-family-nurse-practitioner-evelia-johnson/',
    description:
      'Savannah Age Management Medicine (SAMM) recently announced the hiring of Family Nurse Practitioner Evelia (Eve) Johnson...',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-2-260226033711.jpg',
    type: 'article',
  },
  {
    title: "Savannah Age Management Medicine Serves As Presenting Sponsor For Women's Wellness Fair And Luncheon",
    date: 'May 29, 2025',
    source: 'Savannah CEO',
    newsUrl:
      'https://savannahceo.com/news/2025/05/savannah-age-management-medicine-serves-presenting-sponsor-womens-wellness-fair-and-luncheon/',
    description:
      "Savannah Age Management Medicine (SAMM) recently served as the presenting sponsor for the Women's Wellness Fair...",
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-2-260226033804.jpg',
    type: 'article',
  },
  {
    title: 'Best Of Savannah Doctors 2024',
    date: 'August 30, 2024',
    source: 'Savannah Magazine',
    newsUrl: 'https://savannahmagazine.com/best-of-doctors/best-of-savannah-doctors-2024/',
    description:
      'Between perfecting the latest technological advances and building compassionate lifelong bonds with their patients, these Best…',
    image:
      'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/inthenews/image-2-260303080106.jpg',
    type: 'article',
  },
]

async function main() {
  console.log('Seeding news items...')

  for (const [index, item] of items.entries()) {
    const existing = await prisma.newsItem.findFirst({ where: { newsLink: item.newsUrl } })
    if (existing) {
      console.log(`  – Skipping (already exists): ${item.title}`)
      continue
    }

    await prisma.newsItem.create({
      data: {
        title: item.title,
        thumbnailUrl: item.image,
        newsLink: item.newsUrl,
        source: item.source,
        publishedLabel: item.date,
        description: item.description || null,
        type: item.type,
        order: index,
        published: true,
      },
    })
    console.log(`  ✓ Created: ${item.title}`)
  }

  console.log('Done.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
