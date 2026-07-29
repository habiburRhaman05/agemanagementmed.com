import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/lib/generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const services = [
  {
    slug: 'hormone-therapy-men',
    href: '/bioidentical-hormone-replacement-therapy/male',
    shortName: 'BHRT for Men',
    summary: 'Testosterone and hormone optimization for energy, strength, libido, and mental clarity.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a6886cfb4176d3727b9bb48.jpg',
    cardImageAlt: 'A SAMM provider greeting a male patient',
    cardBenefits: ['Boost energy', 'Build muscle', 'Enhance libido'],
    order: 1,
    status: 'published',
  },
  {
    slug: 'hormone-therapy-women',
    href: '/bioidentical-hormone-replacement-therapy/female',
    shortName: 'BHRT for Women',
    summary: 'Restore hormonal balance with protocols built from your labs, symptoms, and health history.',
    cardImageSrc: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
    cardImageAlt: 'A woman resting outdoors, representing restored energy and balance',
    cardBenefits: ['Stabilize mood and sleep', 'Restore energy', 'Support metabolism'],
    order: 2,
    status: 'published',
  },
  {
    slug: 'weight-loss-men',
    href: '/concierge-medical-weight-loss/male',
    shortName: 'Weight Loss for Men',
    summary: 'Lab-guided, physician-supervised weight management built from your own data.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a688eccb7fe5a8e316eec84.jpg',
    cardImageAlt: 'A patient measuring their waist during a body composition check',
    cardBenefits: ['Safe & sustainable', 'Expert-guided', 'Comprehensive program'],
    order: 3,
    status: 'published',
  },
  {
    slug: 'weight-loss-women',
    href: '/concierge-medical-weight-loss/female',
    shortName: 'Weight Loss for Women',
    summary: 'Personalized medical weight loss for women in Savannah using lab testing, body composition data, hormone insights, and ongoing provider guidance.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a68904e18a264df533661be.jpg',
    cardImageAlt: 'A patient measuring their waist during a body composition check',
    cardBenefits: ['Safe & sustainable', 'Expert-guided', 'Comprehensive program'],
    order: 4,
    status: 'published',
  },
  {
    slug: 'aesthetics',
    href: '/aesthetics',
    shortName: 'Medical Aesthetics',
    summary: 'Medical-grade aesthetic services personalized to your skin care goals.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a688f5218a264df533460c5.webp',
    cardImageAlt: 'A couple embracing and smiling outdoors',
    cardBenefits: ['Clinician-delivered', 'Natural results', 'Personalized plans'],
    order: 5,
    status: 'published',
  },
  {
    slug: 'glp1-microdosing-men',
    href: '/glp-1-microdosing/male',
    shortName: 'GLP-1 Microdosing',
    summary: 'Precision, low-dose GLP-1 therapy - the metabolic benefit without the side effects.',
    cardImageSrc: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
    cardImageAlt: 'A clinician holding a blood sample for lab testing',
    cardBenefits: ['Muted food noise', 'Preserves lean muscle', 'Minimal side effects'],
    order: 6,
    status: 'published',
  },
  {
    slug: 'glp1-microdosing-women',
    href: '/glp-1-microdosing/female',
    shortName: 'GLP-1 Microdosing',
    summary: 'Low-dose, lab-guided GLP-1 therapy for women in Savannah to quiet food noise, support metabolic health and insulin sensitivity, and help preserve lean muscle.',
    cardImageSrc: '/images/treatments/glp1-microdosing-women/hero.jpg',
    cardImageAlt: 'An active woman staying hydrated outdoors',
    cardBenefits: ['Muted food noise', 'Preserves lean muscle', 'Minimal side effects'],
    order: 7,
    status: 'published',
  },
  {
    slug: 'hair-restoration-men',
    href: '/platelet-rich-plasma-hair/male',
    shortName: 'Hair Restoration For Man',
    summary: 'Concentrated platelets from your own blood, used to stimulate natural hair regrowth.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a6890a418a264df5336d5fb.jpg',
    cardImageAlt: 'A confident man with a full, healthy head of hair',
    cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],
    order: 8,
    status: 'published',
  },
  {
    slug: 'hair-restoration-women',
    href: '/platelet-rich-plasma-hair/female',
    shortName: 'Hair Restoration for Women',
    summary: 'PRP hair restoration for women in Savannah uses growth factors from your blood to support thinning hair, hair density, and natural regrowth.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a68910935208880347b9007.webp',
    cardImageAlt: 'A woman with full, healthy, voluminous hair in golden-hour light',
    cardBenefits: ['Natural & safe', 'Minimally invasive', 'Non-surgical'],
    order: 9,
    status: 'published',
  },
  {
    slug: 'laser-vaginal-therapy',
    href: '/laser-vaginal-therapy',
    shortName: 'Laser Vaginal Therapy',
    summary: 'Laser vaginal therapy in Savannah uses non-surgical CO2 laser technology to support vaginal dryness, laxity, comfort, lubrication, and intimacy concerns.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a688fdeb7fe5a8e317146b0.jpg',
    cardImageAlt: 'A couple embracing warmly outdoors',
    cardBenefits: ['Non-surgical, in-office', 'Minimal downtime', 'CO2 laser technology'],
    order: 10,
    status: 'published',
  },
  {
    slug: 'perimenopause-menopause',
    href: '/perimenopause-menopause',
    shortName: 'Menopause Relief',
    summary: 'Struggling with hot flashes, fatigue, or brain fog? SAMM offers personalized menopause treatment in Savannah with hormone testing.',
    cardImageSrc: '/images/treatments/perimenopause-menopause/hero.jpg',
    cardImageAlt: 'An active mature woman, strength training',
    cardBenefits: ['Personalized lab testing', 'Symptom tracking', 'Data-driven care'],
    order: 11,
    status: 'published',
  },
  {
    slug: 'sexual-wellness-men',
    href: '/rejuvenation-enhancement/male',
    shortName: 'Sexual Wellness for Men',
    summary: 'Medical treatment for ED, low libido, and declining performance - discreet, non-surgical.',
    cardImageSrc: '/images/services/sexualwilens.png',
    cardImageAlt: 'A couple embracing, representing renewed intimacy and confidence',
    cardBenefits: ['Non-invasive', 'Personalized programs', 'Boosts confidence'],
    order: 12,
    status: 'published',
  },
  {
    slug: 'sexual-wellness-women',
    href: '/rejuvenation-enhancement/female',
    shortName: 'Sexual Wellness for Women',
    summary: 'Explore women\'s sexual wellness treatments in Savannah for vaginal dryness, painful intercourse, low libido, sensitivity concerns, and confidence.',
    cardImageSrc: '/images/treatments/sexual-wellness-women/hero.jpg',
    cardImageAlt: 'A close, tender moment between a couple',
    cardBenefits: ['Non-invasive options', 'Minimal downtime', 'Personalized care'],
    order: 13,
    status: 'published',
  },
  {
    slug: 'shockwave-therapy',
    href: '/shockwave-therapy',
    shortName: 'Shockwave Therapy',
    summary: 'A non-invasive acoustic wave treatment that supports improved blood flow, encourages new vessel growth, and helps restore natural erectile function - without injections or surgery.',
    cardImageSrc: 'https://assets.cdn.filesafe.space/MchptoGAJlN1a0TmPjaq/media/6a68901b1bff7f5e8b40e4db.png',
    cardImageAlt: 'An athletic man in a gym, representing restored strength and vitality',
    cardBenefits: ['Supports blood flow', 'Encourages new vessel growth', 'Non-invasive, no surgery'],
    order: 14,
    status: 'published',
  },
]

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
    console.log(`  ✓ ${service.slug}`)
  }
}

main()
  .then(() => {
    console.log('Services seeded successfully.')
  })
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
