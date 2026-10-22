import { useCallback, useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import useScrolled from '../hooks/useScrolled'
import Button from './Button'
import Logo from './Logo'
import './Header.css'

const DESKTOP = '(min-width: 960px)'

export default function Header({ activeId }) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const drawerRef = useRef(null)

  const closeMenu = useCallback((returnFocus = false) => {
    // Release the scroll lock first so the browser can still follow the anchor that was just clicked.
    document.documentElement.classList.remove('is-locked')
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return undefined

    document.documentElement.classList.add('is-locked')
    drawerRef.current?.querySelector('a')?.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu(true)
        return
      }
      if (event.key !== 'Tab') return
      // Keep Tab inside the open menu: the toggle button plus the drawer's links.
      const focusable = [toggleRef.current, ...drawerRef.current.querySelectorAll('a, button')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const media = window.matchMedia(DESKTOP)
    const onResize = () => media.matches && closeMenu()

    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      media.removeEventListener('change', onResize)
      document.documentElement.classList.remove('is-locked')
    }
  }, [open, closeMenu])

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <div className="header__inner">
          <Logo onClick={() => open && closeMenu()} />

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="nav__link"
                    href={link.href}
                    aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="#contact" variant="ghost" size="sm" arrow={false} className="header__cta">
            Book a Consultation
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>
        </div>
      </header>

      {/* Sibling of <header>, not a child: the header's backdrop-filter would otherwise become this fixed panel's containing block. */}
      <div id="mobile-menu" ref={drawerRef} className={`drawer${open ? ' is-open' : ''}`} inert={!open}>
        <nav className="drawer__nav" aria-label="Mobile">
          <ul>
            {navLinks.map((link, index) => (
              <li key={link.href} style={{ '--i': index }}>
                <a
                  href={link.href}
                  aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                  onClick={() => closeMenu()}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__foot" style={{ '--i': navLinks.length }}>
          <Button href="#contact" onClick={() => closeMenu()}>
            Book a Consultation
          </Button>
        </div>
      </div>
    </>
  )
}
