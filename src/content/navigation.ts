/**
 * Nav trees. Header, mega menu, mobile drawer, footer and sitemap all derive
 * from here — the routes exist in exactly one place.
 *
 * URLs match the live site (docs/01-INFORMATION-ARCHITECTURE.md §4, Option A):
 * the practice ranks locally on these paths, so the redesign changes the
 * navigation model without changing the URLs.
 */

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface MegaMenuColumn {
  /** Pillar heading — itself a link to the hub page. */
  title: string
  href: string
  links: NavLink[]
}

export const megaMenu: MegaMenuColumn[] = [
  {
    title: 'Hormone Therapy',
    href: '/bioidentical-hormone-replacement-therapy',
    links: [
      { label: 'For Men', href: '/bioidentical-hormone-replacement-therapy/male' },
      { label: 'For Women', href: '/bioidentical-hormone-replacement-therapy/female' },
      { label: 'Perimenopause & Menopause', href: '/perimenopause-menopause' },
      { label: 'BHRT vs HRT vs TRT', href: '/bhrt-hrt-trt' },
    ],
  },
  {
    title: 'Weight Loss',
    href: '/concierge-medical-weight-loss',
    links: [
      { label: 'For Men', href: '/concierge-medical-weight-loss/male' },
      { label: 'For Women', href: '/concierge-medical-weight-loss/female' },
      { label: 'GLP-1 Microdosing — Men', href: '/glp-1-microdosing/male' },
      { label: 'GLP-1 Microdosing — Women', href: '/glp-1-microdosing/female' },
    ],
  },
  {
    title: 'Sexual Wellness',
    href: '/rejuvenation-enhancement',
    links: [
      { label: 'For Men', href: '/rejuvenation-enhancement/male' },
      { label: 'For Women', href: '/rejuvenation-enhancement/female' },
      { label: 'Shockwave Therapy', href: '/shockwave-therapy' },
      { label: 'Laser Vaginal Therapy', href: '/laser-vaginal-therapy' },
    ],
  },
  {
    title: 'Hair Restoration',
    href: '/platelet-rich-plasma-hair',
    links: [
      { label: 'For Men', href: '/platelet-rich-plasma-hair/male' },
      { label: 'For Women', href: '/platelet-rich-plasma-hair/female' },
      { label: 'Medical Aesthetics', href: '/aesthetics' },
    ],
  },
]

/** Six items, down from sixteen across two gendered dropdowns. */
export const primaryNav: NavLink[] = [
  { label: 'Treatments', href: '/bioidentical-hormone-replacement-therapy' },
  { label: 'Our Experts', href: '/our-experts' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
]

export const footerNav = {
  practice: [
    { label: 'Our Experts', href: '/our-experts' },
    { label: 'Patient Results', href: '/results' },
    { label: 'In The News', href: '/in-the-news' },
    { label: 'Blogs', href: '/blog' },

  ] satisfies NavLink[],
  locations: [
  ] satisfies NavLink[],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ] satisfies NavLink[],
}
