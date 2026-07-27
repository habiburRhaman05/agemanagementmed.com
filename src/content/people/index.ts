import type { Person } from '@/types/content'

/**
 * 8 providers and staff, bios extracted verbatim from /our-experts.
 *
 * ⚠ Portrait mapping is UNVERIFIED. The source files are named
 * `team-1..8-img.png` with no person attribution. Confirm each face against
 * the clinic's team page before publishing — see docs/00-AUDIT.md §5.4.
 */
export const people: Person[] = [
  {
    slug: 'harry-collins',
    name: 'Harry S. Collins',
    credentials: 'DO, FACOG',
    role: 'Medical Director · Age Management Medicine Specialist',
    portrait: { src: '/images/teams/team-1-img.png', alt: 'Dr. Harry S. Collins, DO, FACOG' },
    summary:
      'Founder of SAMM and a Life Fellow of the American College of Obstetricians and Gynecologists, certified in Age Management Medicine.',
    bio: [
      'Dr. Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists and is certified in Age Management Medicine through the prestigious Cenegenics Medical Institute. He earned his BA in biology from the University of Colorado (Denver) with distinction before receiving his Doctor of Osteopathic Medicine from Kansas City University of Medicine and Biosciences.',
      'After completing his residency in obstetrics and gynecology at Walter Reed Army Medical Center, Dr. Collins served as Command Physician during Operation Urgent Fury in Grenada, retiring from the U.S. Army Medical Corps as a Lt. Colonel. He trained under Dr. David Matlock at The Laser Vaginal Rejuvenation Institute of Los Angeles and has dedicated his career to hormone optimization and age management medicine.',
      'Today, Dr. Collins brings his extensive expertise in Bio-Identical Hormone Optimization to the Southeast, combining his military medical experience with advanced training in age management medicine to provide comprehensive care for his patients.',
    ],
    specialties: ['Bioidentical hormone optimization', 'Age management medicine', 'Regenerative therapies'],
  },
  {
    slug: 'evelia-johnsen',
    name: 'Evelia Johnsen',
    credentials: 'MSN, FNP-C',
    role: 'Family Nurse Practitioner',
    portrait: { src: '/images/teams/team-2-img.png', alt: 'Evelia Johnsen, MSN, FNP-C' },
    summary:
      'Family Practice Nurse Practitioner, veteran, and advanced aesthetics professional focused on perimenopause and menopause care.',
    bio: [
      'Evelia Johnsen is a Family Practice Nurse Practitioner, veteran, and advanced aesthetics professional with a deep commitment to helping individuals feel balanced, confident, and cared for at every stage of life. Her career began in the military as a Combat Medic, with her last few years spent as a Flight Medic, where she developed exceptional skill, precision, and composure in high-pressure environments. She later brought that same level of expertise into civilian healthcare as an Emergency Room Nurse before advancing her role as a Nurse Practitioner.',
      "Today, Evelia specializes in bioidentical hormone therapy and aesthetic medicine. While she loves treating everyone, she has a focused interest in supporting women through the complexities of perimenopause and menopause. Evelia's work is rooted not only in clinical expertise but also in deeply personal experience. She has completed advanced training in hormone optimization through BioTE, Empire Medical, and WorldLink Medical, and has advanced training in neurotoxin modulators, dermal fillers, and comprehensive skin health.",
      "Her approach blends medical precision with a refined aesthetic eye, delivering natural, elegant results that enhance — not change — her patients' appearance. She believes that, for the menopausal woman, this is not something one simply has to get through, and that with the right support, it can be a time of renewal, confidence, and empowerment.",
      'A proud veteran, devoted wife, and mother of five, Evelia is guided by her faith-centered values, which shape her commitment to compassionate, elevated, and deeply personalized care.',
    ],
    specialties: ['Bioidentical hormone therapy', 'Perimenopause & menopause', 'Aesthetic medicine'],
  },
  {
    slug: 'sarah-malone',
    name: 'Sarah Malone',
    credentials: 'MSN, WHNP',
    role: "Women's Health Nurse Practitioner",
    portrait: { src: '/images/teams/team-3-img.png', alt: 'Sarah Malone, MSN, WHNP' },
    summary:
      "Duke-trained women's health nurse practitioner, Army Nurse Corps veteran, and hormone specialist.",
    bio: [
      "“Why live to 90 if you're going to feel 90?” That belief drives everything Sarah Malone, MSN, WHNP-BC, does as a women's health nurse practitioner, Army Nurse Corps veteran, and hormone specialist.",
      "Sarah has over a decade of nursing experience and several years specializing in hormone optimization and women's health. A graduate of Duke University's Women's Health Nurse Practitioner program, she has completed advanced training through WorldLink Medical, a society dedicated to advancing hormone-based care, and continues to pursue ongoing education through their programs. Her clinical focus includes PCOS, sexual wellness, and the care of perimenopausal and menopausal women.",
      'She is committed to providing nonjudgmental, sex-positive care, creating a safe and empowering space where women feel comfortable discussing their concerns and taking ownership of their health. In addition to bioidentical hormone replacement therapy, Sarah has a strong interest in integrating regenerative and aesthetic medicine into her practice.',
      'Sarah is also a clinical educator and has spent over seven years teaching undergraduate nursing students, reflecting her deep commitment to education, empowerment, and advancing the field of women’s health.',
    ],
    specialties: ['PCOS', 'Sexual wellness', 'Perimenopause & menopause', 'BHRT'],
  },
  {
    slug: 'emily-sellars',
    name: 'Emily Sellars',
    credentials: 'BSN, RN',
    role: 'Medical Weight Loss Coach',
    portrait: { src: '/images/teams/team-4-img.png', alt: 'Emily Sellars, BSN, RN' },
    summary:
      'Registered Nurse with over a decade of experience, specializing in weight loss and metabolic optimization.',
    bio: [
      'Emily is a dedicated Registered Nurse with over a decade of experience in the healthcare field. Passionate about health and wellness, she specializes in weight loss and metabolic optimization as a coach for Savannah Age Management.',
      'Drawing from personal experience with Bioidentical Hormone Replacement Therapy, she collaborates closely with the rest of the team to develop tailored strategies that help patients achieve their health goals. Emily believes in a holistic approach to wellness, integrating evidence-based practices with individualized care.',
    ],
    specialties: ['Medical weight loss', 'Metabolic optimization'],
  },
  {
    slug: 'tamara-bell',
    name: 'Tamara Bell',
    role: 'Exercise Physiologist and Nutritionist',
    portrait: { src: '/images/teams/team-5-img.png', alt: 'Tamara Bell, Exercise Physiologist' },
    summary:
      'Exercise Physiologist and Nutritionist, an integral team member for the past 10 years.',
    bio: [
      'Tamara has been an integral team member for the past 10 years, leveraging her expertise as an Exercise Physiologist and Nutritionist. She provides personalized care to help you reach your fitness and nutrition goals.',
      'Tamara graduated from Auburn University and the University of North Texas and holds a Bachelor of Science in Kinesiology. Before joining, she served as Head Instructor for the Universal Cheerleader Association, sharing her passion across the United States, Tokyo, Paris and London.',
    ],
    specialties: ['Exercise physiology', 'Nutrition'],
  },
  {
    slug: 'elaine-gayheart',
    name: 'Elaine Gayheart',
    role: 'Office Manager',
    portrait: { src: '/images/teams/team-6-img.png', alt: 'Elaine Gayheart, Office Manager' },
    summary: 'A decade of emergency medicine experience across ambulance and urgent care settings.',
    bio: [
      'With a decade of experience in emergency medicine across ambulance and urgent care settings, Elaine Gayheart brings valuable expertise to our team. Her strong background in ensuring accurate, HIPAA-compliant documentation and her exceptional organizational skills make her an asset in maintaining our high standards of patient care and clinic operations.',
      "Elaine's passion for helping others shines through in her dedication to both patient care and team support. Her experience in training colleagues and coordinating medical services allows her to contribute significantly to our clinic's efficient and compassionate care environment.",
    ],
  },
  {
    slug: 'brittany-moore',
    name: 'Brittany Moore',
    role: 'Patient Service Specialist',
    portrait: { src: '/images/teams/team-7-img.png', alt: 'Brittany Moore, Patient Service Specialist' },
    summary:
      'Business management background bringing leadership, organization, and communication to the front office.',
    bio: [
      'Brittany Moore is a dedicated professional and proud mother of three with a Bachelor of Science in Business Management, specializing in Small Business & Entrepreneurship and Human Resource Management. With a strong background in business operations, management, and front office administration, she brings valuable leadership, organization, and communication skills that help create an efficient and welcoming environment for both patients and staff.',
      "Her experience in operations and team support allows her to contribute to the clinic's overall growth, streamline daily processes, and enhance patient satisfaction through compassionate and professional service.",
    ],
  },
  {
    slug: 'ashspernette-douglas',
    name: 'Ashspernette Douglas',
    role: 'Patient Service Specialist',
    portrait: {
      src: '/images/teams/team-8-img.png',
      alt: 'Ashspernette Douglas, Patient Service Specialist',
    },
    summary:
      'Certified Registered Medical Assistant with over 14 years of experience in the medical field.',
    bio: [
      'Ashspernette (Ash) Douglas is a Certified Registered Medical Assistant with over 14 years of experience in the medical field. She is passionate about helping others and meeting new people from all walks of life.',
      'Ash is passionate about making a genuine positive impact on the lives of others, her community, and every patient she serves. Above all, Ash believes that every patient deserves to feel heard, comfortable, and cared for. She takes great pride in creating a seamless, stress-free experience for each individual she works with.',
    ],
  },
]

export const providers = people.slice(0, 4)

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug)
}
