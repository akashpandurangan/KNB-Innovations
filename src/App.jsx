import { useState } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Process from './components/Process'
import Projects from './components/Projects'
import Services from './components/Services'
import Statement from './components/Statement'
import Testimonials from './components/Testimonials'
import useActiveSection from './hooks/useActiveSection'
import { navLinks } from './data/content'

const NAV_IDS = navLinks.map((link) => link.href.slice(1))

export default function App() {
  const activeId = useActiveSection(NAV_IDS)
  // Owned here so "Discover more" on a service, or "Start a Similar Project" in the viewer, can pre-fill the enquiry form.
  const [projectType, setProjectType] = useState('')

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header activeId={activeId} />
      <main id="main">
        <Hero />
        <Services onSelect={setProjectType} />
        <Projects onEnquire={setProjectType} />
        <Philosophy />
        <Process />
        <Statement />
        <Testimonials />
        <Contact projectType={projectType} onProjectTypeChange={setProjectType} />
      </main>
      <Footer />
    </>
  )
}
