export interface NavLink {
  label: string
  href: string
  description?: string
  links?: { label: string; href: string }[]
  /** Opens in a new tab (e.g. the Medical Aesthetics link, hosted off-site). */
  external?: boolean
}

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Experts', href: '/our-experts' },
  {
    label: 'Treatments for Men',
    href: '#',
    links: [
      { label: 'Hormone Therapy For Men', href: '/bioidentical-hormone-replacement-therapy/male' },
      { label: 'Hair Restoration', href: '/platelet-rich-plasma-hair/male' },
      { label: 'Sexual Drive For Men', href: '/rejuvenation-enhancement/male' },
      { label: 'Concierge Medical Weight Loss', href: '/concierge-medical-weight-loss/male' },
      { label: 'GLP-1 Microdosing For Men', href: '/glp-1-microdosing/male' },
      { label: 'Wellness Specials', href: '/specials' },
      { label: 'Medical Aesthetics Services', href: 'https://www.savannahskinmed.com/' },
    ],
  },
  {
    label: 'Treatments for Women',
    href: '#',
    links: [
      { label: 'Hormone Therapy For Women', href: '/bioidentical-hormone-replacement-therapy/female' },
      { label: 'Perimenopause & Menopause', href: '/perimenopause-menopause' },
      { label: 'Hair Restoration', href: '/platelet-rich-plasma-hair/female' },
      { label: 'Sexual Satisfaction For Women', href: '/rejuvenation-enhancement/female' },
      { label: 'Concierge Medical Weight Loss', href: '/concierge-medical-weight-loss/female' },
      { label: 'GLP-1 Microdosing For Women', href: '/glp-1-microdosing/female' },
          { label: 'Wellness Specials', href: '/specials' },

      { label: 'Medical Aesthetics Services', href: 'https://www.savannahskinmed.com/' },
    ],
  },
  { label: 'Contact', href: '/contact-us' },
];

export const footerNav = {
  // Paired men/women, matching the live footer's "Services" column order.
  treatments: [
    { label: 'Hormone Therapy For Men', href: '/bioidentical-hormone-replacement-therapy/male' },
    { label: 'Hormone Therapy For Women', href: '/bioidentical-hormone-replacement-therapy/female' },
    { label: 'Perimenopause & Menopause', href: '/perimenopause-menopause' },
    { label: 'Hair Restoration For Men', href: '/platelet-rich-plasma-hair/male' },
    { label: 'Hair Restoration For Women', href: '/platelet-rich-plasma-hair/female' },
    { label: 'Sexual Drive For Men', href: '/rejuvenation-enhancement/male' },
    { label: 'Sexual Satisfaction For Women', href: '/rejuvenation-enhancement/female' },
    { label: 'Concierge Medical Weight Loss For Men', href: '/concierge-medical-weight-loss/male' },
    { label: 'Concierge Medical Weight Loss For Women', href: '/concierge-medical-weight-loss/female' },
    { label: 'GLP-1 Microdosing For Men', href: '/glp-1-microdosing/male' },
    { label: 'GLP-1 Microdosing For Women', href: '/glp-1-microdosing/female' },
    { label: 'Medical Aesthetics Services', href: 'https://www.savannahskinmed.com/', external: true },
  ] satisfies NavLink[],
  practice: [
    { label: 'Home', href: '/' },
    { label: 'Our Experts', href: '/our-experts' },
    // No dedicated financing page exists in this app yet — points at Contact
    // until one is built.
    { label: 'Financing Options', href: '/contact-us' },
    { label: 'Office Policies', href: '/office-policy' },
    { label: 'Blog', href: '/blog' },
    { label: 'In The News', href: '/in-the-news' },
    { label: 'Wellness Specials', href: '/specials' },
    { label: 'Contact', href: '/contact-us' },
  ] satisfies NavLink[],
  locations: [] satisfies NavLink[],
  legal: [{ label: 'Privacy Policy', href: '/privacy-policy' }] satisfies NavLink[],
}
