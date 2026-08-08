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
    lead: 'Explore articles about health optimization, hormone balance, weight management, regenerative therapies, and overall well-being.',
  },

  posts: [
    {
      href: '/blog/perimenopause-symptoms',
      eyebrow: "Women's health",
      title: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
      date: 'June 8, 2026',
      excerpt: 'Perimenopause Symptoms and Hormone Imbalance',
      image: {
        src: 'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/image1-260608052536.jpg',
        alt: 'Perimenopause Symptoms: When Lifestyle Changes Are Not Enough',
      },
    },
    {
      href: '/blog/hormone-health-explained',
      eyebrow: 'Hormone health',
      title: 'Vitamin D, K2 & Hormone Health | Why Labs Matter',
      date: 'May 21, 2026',
      excerpt: 'Vitamin D, K2 & Hormone Health Explained',
      image: {
        src: 'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/image1-260522014722.jpg',
        alt: 'Vitamin D, K2 & Hormone Health | Why Labs Matter',
      },
    },
    {
      href: '/blog/semaglutide-vs-tirzepatide-for-weight-loss-how-clinicians-decide',
      eyebrow: 'Weight loss',
      title: 'Semaglutide vs Tirzepatide for Weight Loss | SAMM',
      date: 'April 29, 2026',
      excerpt: 'Semaglutide vs Tirzepatide for Weight Loss',
      image: {
        src: 'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/image1-260429053027.png',
        alt: 'Semaglutide vs Tirzepatide for Weight Loss | SAMM',
      },
    },
    {
      href: '/blog/low-testosterone-and-erectile-dysfunction',
      eyebrow: "Men's health",
      title: 'Can Low Testosterone Cause Erectile Dysfunction? | SAMM',
      date: 'March 13, 2026',
      excerpt: 'Low Testosterone and Erectile Dysfunction Explained',
      image: {
        src: 'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/pexels-olly-3766217-260313050540.jpg',
        alt: 'Can Low Testosterone Cause Erectile Dysfunction? | SAMM',
      },
    },
    {
      href: '/blog/low-testosterone-symptoms-for-men-in-their-40s',
      eyebrow: "Men's health",
      title: 'Low Testosterone Symptoms in Men Before 40 | SAMM',
      date: 'February 6, 2026',
      excerpt:
        'Learn the signs of low testosterone in men, how symptoms can appear before 40, and when to get tested. Get clinical guidance on male hypogonadism here.',
      image: {
        src: 'https://waldoughmediaclients.s3.us-east-2.amazonaws.com/wwwagemanagementmedcom/blog/pexels-olly-874158-260206035409.jpg',
        alt: 'Low Testosterone Symptoms in Men Before 40 | SAMM',
      },
    },
  ] satisfies ContentSummary[],
}
