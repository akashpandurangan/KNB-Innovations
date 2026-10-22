import { processIntro, processSteps } from '../data/content'
import Reveal from './Reveal'
import './Process.css'

export default function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="process__head">
          <p className="eyebrow">{processIntro.eyebrow}</p>
          <h2 id="process-title">{processIntro.heading}</h2>
        </Reveal>

        <ol className="process__steps">
          {processSteps.map((step, index) => (
            <Reveal as="li" className="process__step" key={step.number} delay={index * 130}>
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="process__title">
                <span className="visually-hidden">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="process__text">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
