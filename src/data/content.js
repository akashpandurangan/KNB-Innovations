/**
 * Everything editable on the site lives in this file: brand details, copy,
 * image ids, contact placeholders and form options.
 *
 * Images are Unsplash photos referenced by id (the part after images.unsplash.com/).
 * Swap in the studio's own photography by replacing `src` with a full URL or a
 * file in /public (see README.md > "Replacing images").
 */

/* ---------------------------------------------------------------- brand */

export const brand = {
  /* The reference artwork was not available, so the name is an editable placeholder. */
  name: 'AK Interiors',
  wordmark: { primary: 'AK', secondary: 'Interiors' },
  description:
    'An interior design studio creating considered, timeless spaces for homes and workplaces, from the first sketch to the final finish.',
}

/* ------------------------------------------------------------- contact */
/* PLACEHOLDERS: replace every value below before launch. */

export const contact = {
  email: 'hello@example.com',
  phoneDisplay: '+00 0000 000 000',
  phoneHref: '+000000000000',
  address: ['Studio address line', 'City, Country'],
  whatsapp: {
    // wa.me expects digits only, with country code and no "+" (e.g. 447700900123)
    number: '000000000000',
    message: 'Hello, I would like to book a design consultation.',
  },
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}

/* ---------------------------------------------------------- navigation */

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

/* ---------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Interior Design Studio',
  headline: ['Transforming Spaces,', 'Elevating Lifestyles.'],
  description:
    'We design thoughtful, timeless interiors that bring together refined aesthetics, everyday functionality, and exceptional craftsmanship.',
  primaryCta: { label: 'Explore Our Projects', href: '#projects' },
  secondaryCta: { label: 'Book a Consultation', href: '#contact' },
  image: {
    src: 'photo-1600210491892-03d54c0aaf87',
    alt: 'Bright, cream-toned living room with exposed timber beams, arched black-framed windows and a white sofa',
    position: '50% 55%',
  },
  caption: { title: 'Living room with timber beams', place: 'Sample project, City, Country' },
}

/* ------------------------------------------------------------ services */

export const servicesIntro = {
  eyebrow: 'Services',
  heading: 'Spaces Designed Around You',
  description:
    'From the first concept to the final detail, we create interiors that reflect your lifestyle and ambitions.',
}

/** `projectType` must match one of `projectTypes` below: it pre-fills the enquiry form. */
export const services = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    description: 'Crafting luxury living spaces custom-tailored to your style.',
    projectType: 'Residential Interiors',
    image: {
      src: 'photo-1616486029423-aaa4789e8c9a',
      alt: 'Calm bedroom with natural light, layered cream bedding and a timber bench at the foot of the bed',
      position: '50% 60%',
    },
  },
  {
    id: 'commercial',
    title: 'Commercial & Corporate',
    description: 'Modern, functional environments built to corporate standards.',
    projectType: 'Commercial & Corporate',
    image: {
      src: 'photo-1524758631624-e2822e304c36',
      alt: 'Light-filled collaborative office lounge with soft seating, glazed partitions and a sculptural floor lamp',
      position: '50% 50%',
    },
  },
  {
    id: 'turnkey',
    title: 'Turnkey Solutions',
    description: 'From 3D visualization to flawless final execution.',
    projectType: 'Turnkey Solutions',
    image: {
      src: 'photo-1503387837-b154d5074bd2',
      alt: 'A designer’s hand drawing a plan with a scale ruler on a dark wooden desk',
      position: '50% 40%',
    },
  },
  {
    id: 'bespoke',
    title: 'Bespoke Craftsmanship',
    description: 'Designing unique furniture, lighting, and decor.',
    projectType: 'Bespoke Craftsmanship',
    image: {
      src: 'photo-1540932239986-30128078f3c5',
      alt: 'Cluster of brushed-brass pendant lights hanging at different heights against a warm wall',
      position: '50% 35%',
    },
  },
]

/* ------------------------------------------------------------ projects */
/* SAMPLE CONTENT: names, categories, locations and years are placeholders, not real clients or completed work. */

export const projectsIntro = {
  eyebrow: 'Selected Work',
  heading: 'Spaces That Tell a Story',
  description:
    'Every project begins with a vision and becomes a space designed around the people who experience it.',
  sampleNote: 'Sample projects are shown for layout. Replace them with your own work.',
}

export const projects = [
  {
    id: 'serene-residence',
    name: 'The Serene Residence',
    category: 'Residential',
    location: 'City, Country',
    year: '2025',
    blurb:
      'A quiet family home built around soft light, tactile fabrics and a restrained cream palette.',
    image: {
      src: 'photo-1631679706909-1844bbd07221',
      alt: 'Serene living room in cream and white with a bouclé armchair, round mirrors and a pale rug',
      position: '50% 55%',
    },
  },
  {
    id: 'contemporary-villa',
    name: 'The Contemporary Villa',
    category: 'Residential',
    location: 'City, Country',
    year: '2024',
    blurb:
      'A dark-clad villa wrapped around an old tree, with warm timber interiors opening to the garden.',
    image: {
      src: 'photo-1600585154340-be6161a56a0c',
      alt: 'Contemporary villa with black timber cladding and glazed living spaces glowing at dusk behind a large tree',
      position: '38% 50%',
    },
  },
  {
    id: 'urban-retreat',
    name: 'The Urban Retreat',
    category: 'Residential',
    location: 'City, Country',
    year: '2025',
    blurb:
      'A glass-walled living room with a timber ceiling, deep leather seating and a canopy of treetops.',
    image: {
      src: 'photo-1600210492493-0946911123ea',
      alt: 'Living room with floor-to-ceiling glazing, a timber ceiling, tan leather sectional and a woven pendant light',
      position: '55% 55%',
    },
  },
  {
    id: 'modern-workspace',
    name: 'The Modern Workspace',
    category: 'Commercial',
    location: 'City, Country',
    year: '2024',
    blurb:
      'An open studio floor with a curved glazed wall, polished concrete and a long meeting table.',
    image: {
      src: 'photo-1497366811353-6870744d04b2',
      alt: 'Modern office with a curved steel-framed glass wall, concrete ceiling, polished floor and a long meeting table',
      position: '50% 55%',
    },
  },
  {
    id: 'warm-minimalist-apartment',
    name: 'The Warm Minimalist Apartment',
    category: 'Residential',
    location: 'City, Country',
    year: '2025',
    blurb:
      'A compact apartment where rattan, timber and a single dark accent do the work of decoration.',
    image: {
      src: 'photo-1618219908412-a29a1bb7b86e',
      alt: 'Minimal apartment entry with a rattan sideboard, round mirror, woven pendant and timber ceiling',
      position: '55% 50%',
    },
  },
  {
    id: 'signature-living-space',
    name: 'The Signature Living Space',
    category: 'Residential',
    location: 'City, Country',
    year: '2024',
    blurb:
      'An open-plan living room anchored by a timber feature wall, a deep sofa and black steel framing.',
    image: {
      src: 'photo-1600607687939-ce8a6c25118c',
      alt: 'Open-plan living room with a timber feature wall, pale grey sofa and an open kitchen beyond black-framed glazing',
      position: '55% 55%',
    },
  },
]

/* ---------------------------------------------------------- philosophy */

export const philosophy = {
  eyebrow: 'Our Philosophy',
  heading: ['Thoughtful Design.', 'Timeless Living.'],
  description:
    'We believe great interiors are more than beautiful spaces. They are carefully considered environments that balance proportion, materials, light, functionality, and the way people live.',
  points: [
    'Purposeful space planning.',
    'Timeless material selection.',
    'Attention to every detail.',
    'Seamless design-to-execution process.',
  ],
  cta: { label: 'Discover Our Approach', href: '#process' },
  image: {
    src: 'photo-1600585152220-90363fe7e115',
    alt: 'Bright kitchen with a white stone island, pale oak stools, black pendant lights and warm timber cabinetry',
    position: '50% 55%',
  },
  caption: 'Stone, timber and daylight, kept in proportion.',
}

/* ------------------------------------------------------------- process */

export const processIntro = {
  eyebrow: 'Our Process',
  heading: 'From Vision to Reality',
}

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We understand your lifestyle, needs, aspirations, and project requirements.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'We develop layouts, moodboards, material palettes, and visual concepts.',
  },
  {
    number: '03',
    title: 'Refine',
    description: 'We align every detail through feedback, planning, and design refinement.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'We bring the approved design to life with careful coordination and execution.',
  },
]

/* ----------------------------------------------------------- statement */

export const statement = {
  heading: ['Execution is', 'the Real Luxury.'],
  description:
    'Beautiful design deserves exceptional attention to detail, from the first sketch to the final finish.',
}

/* -------------------------------------------------------- testimonials */
/* SAMPLE CONTENT: these are not real client reviews. Replace with genuine, permissioned feedback. */

export const testimonialsIntro = {
  eyebrow: 'Testimonials',
  sampleNote: 'Sample testimonials. Replace with genuine client feedback before launch.',
}

export const testimonials = {
  featured: {
    quote:
      'The studio listened first, then designed. Our home feels calm and considered, and every detail was handled as carefully as the concept.',
    name: 'Client name',
    project: 'Residential interior',
  },
  others: [
    {
      quote: 'Clear communication at every stage, and a finish that matched the drawings.',
      name: 'Client name',
      project: 'Commercial interior',
    },
    {
      quote: 'They turned a loose brief into a space we are proud to welcome people into.',
      name: 'Client name',
      project: 'Turnkey project',
    },
  ],
}

/* ------------------------------------------------------------- contact */

export const contactIntro = {
  eyebrow: 'Contact',
  heading: 'Let’s Design Your Space.',
  description:
    'Have a project in mind? Tell us a little about your vision, and let’s start a conversation.',
}

export const projectTypes = [
  'Residential Interiors',
  'Commercial & Corporate',
  'Turnkey Solutions',
  'Bespoke Craftsmanship',
  'Not sure yet',
]
