import { getImageProps } from 'next/image'

/**
 * Next image-optimizer URL (AVIF/WebP, re-encoded) for a local `/public`
 * photo used as a CSS `background-image`, where `<Image>` can't be used
 * without changing the markup. Picks the 1920px candidate; the optimizer
 * never upscales, so smaller originals keep their own dimensions.
 *
 * Anything that isn't a local raster path (remote URLs, SVGs, data URIs) is
 * returned unchanged. Remote hosts would throw if they weren't in
 * `images.remotePatterns`, and background URLs can come from the database.
 */
export function optimizedBackgroundUrl(src: string): string {
  if (!src.startsWith('/') || src.startsWith('//') || /\.svg(\?|$)/i.test(src)) return src

  const { props } = getImageProps({ src, alt: '', width: 1920, height: 1080, sizes: '100vw' })
  const candidate = props.srcSet
    ?.split(', ')
    .map((entry) => entry.split(' '))
    .find(([, descriptor]) => descriptor === '1920w')?.[0]
  return candidate ?? props.src
}

/**
 * The admin-uploaded favicon is a Cloudinary `.ico` bundling nine sizes
 * (~190 KB), fetched at high priority on every page. Cloudinary serves the
 * same icon as a 64px PNG (~4 KB). Browser tabs use 16–32px and Google's
 * result favicons need ≥48px, so 64px covers both. Non-Cloudinary or non-ico
 * URLs are returned unchanged.
 */
export function optimizedFaviconUrl(url: string): string {
  const match = url.match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)\.ico$/i)
  return match ? `${match[1]}w_64,h_64,c_limit/${match[2]}.png` : url
}
