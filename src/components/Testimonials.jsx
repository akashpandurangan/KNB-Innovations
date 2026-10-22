import { testimonials, testimonialsIntro } from '../data/content'
import Reveal from './Reveal'
import './Testimonials.css'

export default function Testimonials() {
  const { featured, others } = testimonials

  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container testimonials__grid">
        <Reveal className="testimonials__label">
          <h2 className="testimonials__heading eyebrow" id="testimonials-title">
            {testimonialsIntro.eyebrow}
          </h2>
        </Reveal>

        <div className="testimonials__body">
          <Reveal as="figure" className="quote quote--featured">
            <blockquote>
              <p>{featured.quote}</p>
            </blockquote>
            <figcaption className="quote__by">
              <span className="quote__name">{featured.name}</span>
              <span className="quote__project">{featured.project}</span>
            </figcaption>
          </Reveal>

          <div className="testimonials__others">
            {others.map((item, index) => (
              <Reveal as="figure" className="quote" key={item.quote} delay={index * 120}>
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="quote__by">
                  <span className="quote__name">{item.name}</span>
                  <span className="quote__project">{item.project}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>

          <p className="testimonials__note">{testimonialsIntro.sampleNote}</p>
        </div>
      </div>
    </section>
  )
}
