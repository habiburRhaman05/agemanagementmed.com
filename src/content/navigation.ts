export interface NavLink {
  label: string
  href: string
  description?: string
  links?: { label: string; href: string }[]
}

export const primaryNav: NavLink[] = [
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
  treatments: [
    { label: 'Hormone Therapy', href: '/bioidentical-hormone-replacement-therapy' },
    { label: 'Weight Loss', href: '/concierge-medical-weight-loss' },
    { label: 'Sexual Wellness', href: '/rejuvenation-enhancement' },
    { label: 'Hair Restoration', href: '/platelet-rich-plasma-hair' },
  ] satisfies NavLink[],
  practice: [
    { label: 'All Services', href: '/services' },
    { label: 'Our Experts', href: '/our-experts' },

    { label: 'In The News', href: '/in-the-news' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Book Appointment', href: '/book-appointment' },
  ] satisfies NavLink[],
  locations: [] satisfies NavLink[],
  legal: [
    { label: 'Office Policy', href: '/office-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ] satisfies NavLink[],
}
