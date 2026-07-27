import { PrismaClient } from '../src/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash as bcryptHash } from 'bcrypt-ts'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcryptHash('admin123', 12)

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@samm.com' },
    update: {},
    create: {
      email: 'admin@samm.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log(`  ✓ Admin created: ${admin.email}`)

  // Create categories
  const categories = [
    { name: "Men's Health", slug: 'mens-health' },
    { name: "Women's Health", slug: 'womens-health' },
    { name: 'Hormone Health', slug: 'hormone-health' },
    { name: 'Weight Loss', slug: 'weight-loss' },
    { name: 'Sexual Wellness', slug: 'sexual-wellness' },
    { name: 'Aesthetics', slug: 'aesthetics' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log(`  ✓ ${categories.length} categories created`)

  // Create tags
  const tags = [
    { name: 'Testosterone', slug: 'testosterone' },
    { name: 'Estrogen', slug: 'estrogen' },
    { name: 'Bioidentical Hormones', slug: 'bioidentical-hormones' },
    { name: 'Semaglutide', slug: 'semaglutide' },
    { name: 'Tirzepatide', slug: 'tirzepatide' },
    { name: 'PRP', slug: 'prp' },
    { name: 'Menopause', slug: 'menopause' },
    { name: 'Perimenopause', slug: 'perimenopause' },
    { name: 'Sexual Health', slug: 'sexual-health' },
    { name: 'Weight Management', slug: 'weight-management' },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
  }
  console.log(`  ✓ ${tags.length} tags created`)

  // Create demo appointments
  const appointments = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '(912) 555-0101',
      service: 'Hormone Therapy Consultation',
      message: 'Interested in discussing bioidentical hormone replacement therapy.',
      preferredDate: new Date('2026-08-05'),
      preferredTime: '10:00 AM',
      status: 'confirmed',
    },
    {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '(912) 555-0102',
      service: 'Weight Loss Consultation',
      message: 'Looking for GLP-1 medication options for weight loss.',
      preferredDate: new Date('2026-08-07'),
      preferredTime: '2:00 PM',
      status: 'pending',
    },
    {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(912) 555-0103',
      service: 'PRP Hair Restoration',
      message: 'Would like to learn more about PRP for hair loss.',
      preferredDate: new Date('2026-08-10'),
      preferredTime: '11:30 AM',
      status: 'pending',
    },
    {
      name: 'Robert Wilson',
      email: 'robert.wilson@example.com',
      phone: '(912) 555-0104',
      service: 'General Consultation',
      message: 'Have been experiencing low energy and fatigue for months.',
      preferredDate: new Date('2026-07-28'),
      preferredTime: '3:00 PM',
      status: 'completed',
    },
    {
      name: 'Jessica Martinez',
      email: 'jessica.martinez@example.com',
      phone: '(912) 555-0105',
      service: 'Menopause Treatment',
      message: 'Seeking treatment options for perimenopause symptoms.',
      preferredDate: new Date('2026-08-12'),
      preferredTime: '9:30 AM',
      status: 'cancelled',
    },
  ]

  for (const apt of appointments) {
    await prisma.appointment.create({ data: apt })
  }
  console.log(`  ✓ ${appointments.length} appointments created`)

  console.log('\n✅ Seeding complete!')
  console.log('   Admin login: admin@samm.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
