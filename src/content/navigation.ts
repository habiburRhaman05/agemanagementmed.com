

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
  extranalLink:{label: string
  href: string}
}

export const megaMenu: MegaMenuColumn[] = [
  {
    title: 'Hormone Therapy',
    href: '/bioidentical-hormone-replacement-therapy',
    links: [
      {
        label: 'Hormone Therapy For Men',
        href: '/bioidentical-hormone-replacement-therapy/male',
      },
      {
        label: 'Hormone Therapy For Women',
        href: '/bioidentical-hormone-replacement-therapy/female',
      },
      {
        label: 'Perimenopause & Menopause',
        href: '/perimenopause-menopause',
      },
    ],
    extranalLink: {
      label: 'Medical Aesthetics Services',
      href: 'https://www.savannahskinmed.com/',
    },
  },

  {
    title: 'Weight Loss',
    href: '/concierge-medical-weight-loss',
    links: [
      {
        label: 'Concierge Medical Weight For Loss Man',
        href: '/concierge-medical-weight-loss/male',
      },
      {
        label: 'Concierge Medical Weight Loss For Female',
        href: '/concierge-medical-weight-loss/female',
      },
      {
        label: 'GLP-1 Microdosing For Men',
        href: '/glp-1-microdosing/male',
      },
      {
        label: 'GLP-1 Microdosing For Women',
        href: '/glp-1-microdosing/female',
      },
    ],
    extranalLink: {
      label: 'Medical Aesthetics Services',
      href: 'https://www.savannahskinmed.com/',
    },
  },

  {
    title: 'Sexual Wellness',
    href: '/rejuvenation-enhancement',
    links: [
      {
        label: 'Sexual Drive For Men',
        href: '/rejuvenation-enhancement/male',
      },
      {
        label: 'Sexual Satisfaction For Women',
        href: '/rejuvenation-enhancement/female',
      },
      {
        label: 'Shockwave Therapy',
        href: '/shockwave-therapy',
      },
      {
        label: 'Laser Vaginal Therapy',
        href: '/laser-vaginal-therapy',
      },
    ],
    extranalLink: {
      label: 'Medical Aesthetics Services',
      href: 'https://www.savannahskinmed.com/',
    },
  },

  {
    title: 'Hair Restoration',
    href: '/platelet-rich-plasma-hair',
    links: [
      {
        label: 'Hair Restoration For Man',
        href: '/platelet-rich-plasma-hair/male',
      },
      {
        label: 'Hair Restoration For Female',
        href: '/platelet-rich-plasma-hair/female',
      }
    ],
    extranalLink: {
      label: 'Medical Aesthetics Services',
      href: 'https://www.savannahskinmed.com/',
    },
  },
];

/** Six items, down from sixteen across two gendered dropdowns. */
export const primaryNav: NavLink[] = [
  { label: 'Treatments', href: '/bioidentical-hormone-replacement-therapy' },
  { label: 'Our Experts', href: '/our-experts' },
  // { label: 'Blogs', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const footerNav = {
  practice: [
    { label: 'Our Experts', href: '/our-experts' },
    { label: 'Patient Results', href: '/results' },
    { label: 'In The News', href: '/in-the-news' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Office Policy', href: '/office-policy' },
    { label: 'Book Appointment', href: '/book' },
  ] satisfies NavLink[],
  locations: [
  ] satisfies NavLink[],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ] satisfies NavLink[],
}
