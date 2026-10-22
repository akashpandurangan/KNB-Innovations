import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids sits across the middle of the viewport.
 * Returns '' when none of them does (e.g. between navigable sections).
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const targets = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive((current) => (current === entry.target.id ? '' : current))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
