# KNB Innovations: studio website

A single-page marketing site for KNB Innovations, a premium interior design studio. Built with React 19 and Vite, plain CSS with design tokens, and no animation library (all motion is CSS plus one shared `IntersectionObserver`).

The brand name and wordmark live in `brand` in `src/data/content.js`. The logo mark (gold bar and chevron) is redrawn as vector in `src/components/Logo.jsx` from the supplied artwork, and is also used for `public/favicon.svg`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the production build locally
npm run lint
```

Requires Node 20.19+ (developed on Node 24).

## Where things live

```
index.html                  title, meta description, Open Graph tags, Google Fonts
public/favicon.svg          the KNB mark on white
src/data/content.js         ALL copy, image ids, contact details, form options. Edit here first.
src/styles/tokens.css       colours, type scale, spacing, motion easing
src/styles/base.css         reset, typography, buttons, reveal animations, reduced-motion rules
src/components/             Logo, Header, Hero, Services, Projects (+ProjectDialog), Philosophy,
                            Process, Statement, Testimonials, Contact (+ContactForm), Footer
                            each with its own .css file beside it
src/lib/                    images.js (URL/srcset), validate.js, submitEnquiry.js
src/hooks/                  useScrolled, useActiveSection
```

## Design system in brief

| Token | Value | Used for |
| --- | --- | --- |
| `--c-bg` | `#FFFFFF` | primary background |
| `--c-bg-alt` | `#F8F7F4` | statement and contact sections |
| `--c-ink` | `#171717` | text, primary button |
| `--c-muted` | `#686868` | secondary text |
| `--c-line` | `#E9E6E0` | hairline borders |
| `--c-accent` | `#B69A69` | fine rules, dots, small details only |
| `--c-logo-gold` | `#AC894F` | the gold bar in the logo mark (measured from the supplied artwork) |
| `--c-hover` | `#F1EEE8` | hover backgrounds |

Headings use Cormorant Garamond (light), body and UI use Manrope. Gold on white is only about 2.7:1, so it is never used for text; `--c-accent-deep` exists for any small gold text that needs contrast.

## Connecting the enquiry form

**No backend ships with this project, and the form says so.** With nothing configured it runs in *demo mode*: it validates, shows a success panel that states clearly that nothing was sent, and offers a working "Send by email instead" `mailto:` fallback carrying the visitor's details.

To receive real enquiries, set one environment variable:

1. Copy `.env.example` to `.env`.
2. Set `VITE_FORM_ENDPOINT` to a URL that accepts a JSON `POST`.
3. Rebuild. The demo notice disappears and submissions are sent to that URL.

The payload is JSON: `name`, `email`, `phone`, `projectType`, `location`, `budget`, `message`.

Works with, for example:

- **Formspree**: create a form, use `https://formspree.io/f/<id>`.
- **Web3Forms / Getform / Basin**: use their JSON endpoint (some need an access key as an extra field; add it in `src/lib/submitEnquiry.js`).
- **Your own function** (Netlify, Vercel, Cloudflare Workers, AWS): point at the function URL, validate and forward server-side.

Notes:

- Anything prefixed `VITE_` is bundled into public JavaScript. Only use a *public* endpoint; never put an API secret here.
- A hidden honeypot field is included; add server-side validation and rate limiting on your endpoint too.
- "Estimated budget" is free text because the currency isn't known. Swap it for a `<select>` of local ranges in `ContactForm.jsx` if preferred.

## Replacing placeholder content

Everything marked `PLACEHOLDER` or `SAMPLE CONTENT` in `src/data/content.js` must be replaced before launch:

- **Brand**: if the name or logo ever changes, update `brand` in `content.js`, the mark in `Logo.jsx`, and `public/favicon.svg`. Page title and description are in `index.html`.
- **Contact**: email, phone, address, WhatsApp number (digits with country code, no `+`), and social URLs. The values shipped are inert examples (`example.com`, `+00…`).
- **Projects**: the six projects, their locations and years are demo content, not real clients or completed work. The page and the viewer both carry a "sample" note; remove those (`sampleNote` and the line in `ProjectDialog.jsx`) when real work goes in.
- **Testimonials**: the quotes are sample text with "Client name" attributions. Replace them with genuine, permissioned feedback and remove `sampleNote`.

### Replacing images

Images are [Unsplash](https://unsplash.com) photos referenced by id (`photo-…`) and served resized from `images.unsplash.com` with a responsive `srcset`. They are free to use under the [Unsplash licence](https://unsplash.com/license) but are stand-ins. For the studio's own photography, set `src` to a path in `/public` (for example `/images/villa.jpg`) or a full URL; `src/lib/images.js` passes non-Unsplash values through unchanged. If a file ever fails to load, a neutral panel appears instead of a broken image.

## Accessibility and performance

- Semantic landmarks, a skip link, one `h1`, and labelled sections.
- All form fields have visible labels; errors are linked with `aria-describedby`, marked `aria-invalid`, and announced via a live region; the first invalid field takes focus.
- Visible focus indicators on every interactive element.
- The mobile menu traps focus, closes on Escape and returns focus to its toggle. The project viewer uses the native `<dialog>`.
- `prefers-reduced-motion` disables the hero sequence, scroll reveals, the drawer's motion and smooth scrolling.
- Below-the-fold images are lazy-loaded; the hero image is `fetchpriority="high"`; every image is sized by an aspect-ratio box to avoid layout shift.

## Known follow-ups

- Contact details, social links, WhatsApp number and all sample content (above).
- A real form endpoint (above); without one the form cannot deliver enquiries.
- "View All Projects" opens the project viewer at the first project, because this is a single-page site. Add a `/projects` route if a full archive is needed.
- Fonts load from Google Fonts. Self-host them (for example with `@fontsource`) if you need to avoid third-party requests.
