import type { Award, BenefitListData, ContentSummary, EditorialPairData, Seo } from '@/types/content'

/** Copy extracted verbatim from /our-experts — see docs/00-AUDIT.md §2.2, §2.6. */
export const expertsContent = {
  seo: {
    title: 'The Experts at Savannah Age Management Medicine',
    description:
      "Usher in the most dynamic years of your life with the help of Savannah Age Management Medicine's experienced professionals.",
    canonical: '/our-experts',
  } satisfies Seo,

  hero: {
    eyebrow: 'Our Experts',
    title: 'The foundation of age management medicine in Savannah, GA',
    lead: 'Savannah Age Management Medicine was founded by Dr. Harry Collins, a leader in hormone optimization, age management medicine, and functional wellness in Savannah, Georgia. His vision was to create a practice focused on helping patients improve energy, restore balance, and achieve long-term health — not just treat symptoms.',
    image: {
      src: '/images/teams/team-1-img.png',
      alt: 'Dr. Harry Collins, founder of Savannah Age Management Medicine',
    },
  },

  standard: {
    eyebrow: 'Our philosophy',
    title: 'A new standard in hormone and regenerative care',
    body: [
      'Dr. Collins founded SAMM with a simple belief: healthcare should go beyond treating symptoms — it should focus on optimizing how patients feel, function, and live.',
      'That philosophy continues to shape every treatment and patient experience today.',
    ],
    image: {
      src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/patient-benifit.jpg',
      alt: 'A SAMM provider greeting a patient in the clinic',
    },
    imageSide: 'right',
  } satisfies EditorialPairData,

  whyChooseUs: {
    eyebrow: 'Why choose us',
    title: 'Why choose us?',
    lead: 'Our team is comprised of seasoned professionals with extensive backgrounds in integrative medicine, bioidentical hormone therapy, and longevity treatments. We are deeply dedicated to providing the best possible treatment for our patients.',
    columns: 2,
    items: [
      {
        title: 'We believe in your health potential',
        body: 'Looking your best and feeling healthy are key to living a fulfilling life. With our personalized care, your best years are still ahead of you.',
      },
      {
        title: 'We provide the best possible patient experience',
        body: "Tailoring our care to each individual's unique needs is core to our treatment approach. We know that one size does not fit all.",
      },
      {
        title: 'We want to earn your trust',
        body: 'Your health, wellness, and quality of life are always at the heart of what we do.',
      },
      {
        title: 'Conventional approaches are not working',
        body: 'Our team has seen firsthand that the normal approach to patient care is not working. Addressing these shortcomings is what motivates us at Savannah Age Management.',
      },
    ],
  } satisfies BenefitListData,

  awards: [
    { src: '/images/award-11-img.png', alt: 'Best of Savannah award' },
    { src: '/images/award-13-img.png', alt: 'Regional excellence award' },
    { src: '/images/award-15-img.png', alt: 'Best of Savannah Doctors award' },
    { src: '/images/award-17-img.png', alt: 'Community recognition award' },
    { src: '/images/award-19-img.png', alt: 'Wellness practice award' },
  ] satisfies Award[],

  press: [
    {
      href: '/in-the-news',
      eyebrow: 'Woman of Influence',
      date: 'Mar 4, 2026',
      title: 'Q&A with women who are making a difference in Pooler & Chatham County',
      excerpt:
        'As part of the Women of Influence issue, Raechel Halbert of Savannah Age Management Medicine shares her journey of building a growing wellness practice.',
    },
    {
      href: '/in-the-news',
      eyebrow: 'Press',
      date: 'Oct 3, 2025',
      title: 'Savannah Age Management Medicine celebrates grand opening of Statesboro location',
      excerpt:
        'Savannah Age Management Medicine, a leader in proactive healthcare, has officially opened its second location.',
    },
  ] satisfies ContentSummary[],
}
