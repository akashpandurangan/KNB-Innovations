import { useRef, useState } from 'react'
import { projects, projectsIntro } from '../data/content'
import { ArrowUpRight } from './Icons'
import Button from './Button'
import Img from './Img'
import ProjectDialog from './ProjectDialog'
import Reveal from './Reveal'
import './Projects.css'

const SIZES = '(min-width: 1100px) 56vw, (min-width: 700px) 46vw, 100vw'

/** `onEnquire(projectType)` is optional: it lets the viewer's call-to-action pre-fill the contact form. */
export default function Projects({ onEnquire }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const openerRef = useRef(null)

  // Remember which control opened the viewer so focus can go back to it: Safari doesn't focus
  // buttons on click, so relying on the dialog's own restoration isn't enough.
  const openViewer = (index, event) => {
    openerRef.current = event.currentTarget
    setActiveIndex(index)
  }

  const closeViewer = () => {
    setActiveIndex(null)
    openerRef.current?.focus({ preventScroll: true })
  }

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__title">
            <p className="eyebrow">{projectsIntro.eyebrow}</p>
            <h2 id="projects-title">{projectsIntro.heading}</h2>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            {projectsIntro.description}
          </Reveal>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <article className="project" key={project.id}>
              <Reveal variant="image">
                <div className="media project__media">
                  <Img image={project.image} sizes={SIZES} />
                </div>
              </Reveal>

              <Reveal className="project__caption" delay={140}>
                <h3 className="project__name">{project.name}</h3>
                <div className="project__row">
                  <dl className="project__meta">
                    <div>
                      <dt className="visually-hidden">Category</dt>
                      <dd className="project__category">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="visually-hidden">Location</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div>
                      <dt className="visually-hidden">Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                  </dl>
                  <button type="button" className="link-arrow project__open" onClick={(event) => openViewer(index, event)}>
                    <span className="link-arrow__label">
                      View Project<span className="visually-hidden">: {project.name}</span>
                    </span>
                    <ArrowUpRight width={18} height={18} />
                  </button>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal className="projects__foot">
          <p className="projects__note">{projectsIntro.sampleNote}</p>
          <Button variant="secondary" onClick={(event) => openViewer(0, event)}>
            View All Projects
          </Button>
        </Reveal>
      </div>

      <ProjectDialog
        index={activeIndex}
        onClose={closeViewer}
        onNavigate={setActiveIndex}
        onEnquire={onEnquire}
      />
    </section>
  )
}
