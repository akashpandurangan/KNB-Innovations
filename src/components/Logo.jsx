import { brand } from '../data/content'
import './Logo.css'

/*
 * The KNB mark: a gold bar with a chevron laid over it, apex pushing up into the bar.
 * Rebuilt as vector from the supplied artwork (coordinates measured from the 1024px original) so it
 * stays sharp at any size. The chevron uses currentColor; the gold is the logo's own colour.
 */
export function LogoMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 198 1024 626" aria-hidden="true" focusable="false">
      <rect className="logo-mark__bar" x="0" y="198" width="1024" height="98.5" />
      <path d="M512.5 251.5 936 752 879 824 512.5 390.5 146 824 89 752Z" fill="currentColor" />
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <a className="logo" href="#home" aria-label={`${brand.name}, back to top`} onClick={onClick}>
      <LogoMark className="logo__mark" />
      <span className="logo__text">
        <span className="logo__primary">{brand.wordmark.primary}</span>
        <span className="logo__secondary">{brand.wordmark.secondary}</span>
      </span>
    </a>
  )
}
