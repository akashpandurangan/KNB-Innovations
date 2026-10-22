/* Thin-stroke icons that inherit colour from the surrounding text. Decorative by default. */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
  focusable: false,
}

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12h17M14 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowUp = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21V4M6 10l6-6 6 6" />
  </svg>
)

export const ChevronLeft = (props) => (
  <svg {...base} {...props}>
    <path d="m15 5-7 7 7 7" />
  </svg>
)

export const ChevronRight = (props) => (
  <svg {...base} {...props}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const Close = (props) => (
  <svg {...base} {...props}>
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
)

export const Check = (props) => (
  <svg {...base} {...props}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
)
