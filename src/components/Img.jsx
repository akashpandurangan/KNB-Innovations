import { useState } from 'react'
import { imageSrcSet, imageUrl } from '../lib/images'

const DEFAULT_WIDTHS = [480, 800, 1200, 1600]

/**
 * Responsive photograph. Fills its parent (`.media` sets the aspect ratio), uses
 * `srcset` so phones don't download desktop-size files, lazy-loads unless `priority`,
 * and falls back to a quiet neutral panel if the file can't be loaded.
 */
export default function Img({ image, sizes = '100vw', widths = DEFAULT_WIDTHS, priority = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className="img-fallback" role="img" aria-label={image.alt} />
  }

  const mid = widths[Math.min(1, widths.length - 1)]

  return (
    <img
      src={imageUrl(image.src, mid)}
      srcSet={imageSrcSet(image.src, widths)}
      sizes={sizes}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ objectPosition: image.position }}
      onError={() => setFailed(true)}
    />
  )
}
