const UNSPLASH = 'https://images.unsplash.com/'

/**
 * Resolve an image `src` from content.js to a URL at a given width.
 * - Unsplash ids (`photo-…`) are served resized and format-negotiated (AVIF/WebP) by the CDN.
 * - Anything else (a full URL or a path in /public) is returned as-is.
 */
export function imageUrl(src, width) {
  if (!src.startsWith('photo-')) return src
  return `${UNSPLASH}${src}?auto=format&fit=crop&q=72&w=${width}`
}

/** `srcset` string for an Unsplash id, or undefined for self-hosted images. */
export function imageSrcSet(src, widths) {
  if (!src.startsWith('photo-')) return undefined
  return widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ')
}
