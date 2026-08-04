/**
 * Homepage imagery — PLACEHOLDERS.
 *
 * Every image used by the homepage's rebranded sections is declared here so it
 * can be swapped in one place. Replace the URLs below with the final assets;
 * no component hardcodes an image path.
 *
 * These currently point at known-good images already served by the project's
 * Cloudinary account purely so nothing renders broken during the rebuild.
 */
export const homeMedia = {
  /** Animated poster for the "Welcome To Savannah Age Management Medicine" video. */
  welcomePoster:
    'https://res.cloudinary.com/khs2rcsr/image/upload/v1785817252/video-11-img_f8wfjb.gif',

  /** Background behind the "Who We Are" statement band. */
  whoWeAreBackground:
    'https://res.cloudinary.com/khs2rcsr/image/upload/v1785407018/photo-content-54-img_uz9klt.jpg',

  /** Background behind the testimonials band. */
  testimonialsBackground:
    'https://res.cloudinary.com/khs2rcsr/image/upload/v1785469249/photo-content-24-img_t5dmp1.jpg',

  /** Background behind the closing "Ready to transform your health?" band. */
  closingBackground:
    'https://res.cloudinary.com/khs2rcsr/image/upload/v1785338054/photo-content-92-img_nitez0.jpg',
} as const
