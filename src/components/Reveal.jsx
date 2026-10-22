import { useEffect, useRef } from 'react'

/*
 * One shared IntersectionObserver reveals elements once, as they enter the viewport.
 * The attribute is set directly on the DOM node (not React state) so scrolling never
 * triggers a re-render. All motion itself lives in CSS (base.css) and is switched off
 * under prefers-reduced-motion.
 */
let observer = null

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-revealed', '')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

/**
 * variant "up"    → fade and rise (text, captions)
 * variant "image" → clip-path curtain with a slow settle (photography)
 * delay           → ms, used to stagger siblings
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const io = getObserver()
    if (!io) {
      el.setAttribute('data-revealed', '')
      return undefined
    }
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
