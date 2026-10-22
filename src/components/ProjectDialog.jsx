import { useEffect, useRef } from 'react'
import { projects } from '../data/content'
import { ChevronLeft, ChevronRight, Close } from './Icons'
import Button from './Button'
import Img from './Img'
import './ProjectDialog.css'

/*
 * Project viewer built on the native <dialog>: focus is trapped inside, Escape closes it,
 * and focus returns to the "View Project" button that opened it.
 * `index` is the open project (null = closed).
 */
export default function ProjectDialog({ index, onClose, onNavigate, onEnquire }) {
  const dialogRef = useRef(null)
  const isOpen = index !== null
  const project = isOpen ? projects[index] : null
  const count = projects.length

  useEffect(() => {
    if (!isOpen) return undefined
    const dialog = dialogRef.current
    dialog.showModal()
    document.documentElement.classList.add('is-locked')
    return () => {
      document.documentElement.classList.remove('is-locked')
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const go = (step) => onNavigate((index + step + count) % count)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') go(-1)
    if (event.key === 'ArrowRight') go(1)
  }

  const handleEnquire = () => {
    onEnquire?.('')
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      // Clicks on the backdrop land on the <dialog> element itself, never on its panel.
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      {project && (
        <div className="project-dialog__panel">
          <div className="media project-dialog__media">
            <Img
              key={project.id}
              image={project.image}
              priority
              widths={[800, 1200, 1600]}
              sizes="(min-width: 800px) 60vw, 100vw"
            />
          </div>

          <div className="project-dialog__info">
            <div className="project-dialog__top">
              <p className="eyebrow">{project.category}</p>
              <button type="button" className="icon-button" onClick={onClose} aria-label="Close project viewer">
                <Close />
              </button>
            </div>

            <h2 className="project-dialog__title" id="project-dialog-title">
              {project.name}
            </h2>
            <p className="project-dialog__blurb">{project.blurb}</p>

            <dl className="project-dialog__facts">
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>

            <p className="project-dialog__note">Sample project. Replace with your own work.</p>

            <div className="project-dialog__footer">
              <Button href="#contact" onClick={handleEnquire}>
                Start a Similar Project
              </Button>
              <div className="project-dialog__pager">
                <button type="button" className="icon-button" onClick={() => go(-1)} aria-label="Previous project">
                  <ChevronLeft />
                </button>
                <span className="project-dialog__count" aria-live="polite">
                  {index + 1} of {count}
                </span>
                <button type="button" className="icon-button" onClick={() => go(1)} aria-label="Next project">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
