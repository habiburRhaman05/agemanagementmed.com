import { prisma } from '../src/lib/prisma'

const data = [
  {
    id: 'david-p',
    quote:
      'As a former D1 athlete with seven varsity letters, fitness has always been central to my life. In my seventies, aging challenges emerged — fatigue, poor sleep, and weight gain to nearly 230 pounds despite staying active. Within three weeks of starting treatment, I noticed improvements. My enhanced stamina enabled longer workouts, and I began building muscle at 72. I dropped to my high school weight of 200 pounds, and my bloodwork improved significantly.',
    author: 'David P.',
    source: 'google',
  },
  {
    id: 'mark-m',
    quote:
      'Both my wife and I have been on the program for approximately five months now, what a difference. Our quality of life has been steadily improving with every week. Improved endurance, more energy, and we actually look forward to working out. Dr. Collins is great and follows you along each milestone. Highly recommend it for every married couple.',
    author: 'Mark M.',
    source: 'google',
  },
  {
    id: 'joseph-s',
    quote:
      'Dr. Collins and staff are all encompassing — you have a true management team to care for your age and hormone related care. They are proactive versus reactive. The calls, texts and communication are always received and answered.',
    author: 'Joseph S.',
    source: 'google',
  },
  {
    id: 'mike-d',
    quote:
      'Dr. Collins is and always has been a very personable and attentive doctor. He is very professional and does a great job. He is my favorite doctor by far.',
    author: 'Mike D.',
    source: 'google',
  },
]

async function main() {
  for (let i = 0; i < data.length; i++) {
    const t = data[i]
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {
        name: t.author,
        quote: t.quote,
        source: t.source,
        status: 'published',
        order: i,
      },
      create: {
        id: t.id,
        name: t.author,
        quote: t.quote,
        source: t.source,
        status: 'published',
        order: i,
      },
    })
  }
  console.log('Testimonials seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
