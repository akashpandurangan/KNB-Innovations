import { brand, contact, navLinks } from '../data/content'
import { ArrowUp, ArrowUpRight } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="logo" href="#home" aria-label={`${brand.name}, back to top`}>
              <span className="logo__mark">{brand.wordmark.primary}</span>
              <span className="logo__name">{brand.wordmark.secondary}</span>
            </a>
            <p className="footer__about">{brand.description}</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h2 className="footer__heading">Explore</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a className="footer__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">Studio</h2>
            <ul>
              <li>
                <a className="footer__link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a className="footer__link" href={`tel:${contact.phoneHref}`}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="footer__address">
                {contact.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Follow</h2>
            <ul>
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a className="footer__link" href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                    <ArrowUpRight width={14} height={14} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <p className="footer__credit">Placeholder photography from Unsplash.</p>
          <a className="footer__top-link" href="#home">
            Back to top
            <ArrowUp width={16} height={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
