import type { ContentSummary, Seo } from '@/types/content'

/**
 * Index only — titles extracted from /blog (docs/00-AUDIT.md §1.1). Full post
 * bodies were not extracted from the download; post pages are queued next.
 */
export const blogContent = {
  seo: {
    title: 'Blog | Savannah Age Management Medicine',
    description:
      'Hormone health, weight loss, and wellness insights from the providers at Savannah Age Management Medicine.',
    canonical: '/blog',
  } satisfies Seo,

  hero: {
    eyebrow: 'Journal',
    title: 'Hormone health, explained',
    lead: 'Practical, provider-written insight on hormones, weight loss, and healthy aging.',
  },

  posts: [
    {
      href: '/blog/perimenopause-symptoms',
      eyebrow: "Women's health",
      title: 'Perimenopause symptoms: when lifestyle changes are not enough',
      excerpt:
        'How to tell the difference between ordinary stress and the early signs of a hormonal transition.',
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/female/Symptoms.jpg',
        alt: 'A woman relaxing outdoors with a book',
      },
    },
    {
      href: '/blog/hormone-health-explained',
      eyebrow: 'Hormone health',
      title: 'Vitamin D, K2 & hormone health: why labs matter',
      excerpt: 'Why comprehensive lab work — not guesswork — is the starting point for hormone therapy.',
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/photo-content-38-img.jpg',
        alt: 'A clinician holding a blood sample for lab testing',
      },
    },
    {
      href: '/blog/semaglutide-vs-tirzepatide-for-weight-loss-how-clinicians-decide',
      eyebrow: 'Weight loss',
      title: 'Semaglutide vs. tirzepatide for weight loss: how clinicians decide',
      excerpt: 'What separates the two GLP-1 medications, and how a provider chooses between them.',
      image: {
        src: '/images/services/image-4.png',
        alt: 'A patient measuring their waist during a weight-loss program',
      },
    },
    {
      href: '/blog/low-testosterone-and-erectile-dysfunction',
      eyebrow: "Men's health",
      title: 'Can low testosterone cause erectile dysfunction?',
      excerpt: 'The hormonal link between testosterone levels and sexual function, explained plainly.',
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/safety.jpg',
        alt: 'A SAMM provider consulting with a male patient',
      },
    },
    {
      href: '/blog/low-testosterone-symptoms-for-men-in-their-40s',
      eyebrow: "Men's health",
      title: 'Low testosterone symptoms in men before 40',
      excerpt: 'The early signs of declining testosterone many men dismiss as ordinary aging.',
      image: {
        src: '/images/treatments/bioidentical-hormone-replacement-therapy/male/hero-banner-bg.jpg',
        alt: 'A man in casual clothing, representing everyday vitality',
      },
    },
  ] satisfies ContentSummary[],
}
