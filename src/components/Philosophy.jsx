import { philosophy } from '../data/content'
import { ArrowRight } from './Icons'
import Img from './Img'
import Reveal from './Reveal'
import './Philosophy.css'

export default function Philosophy() {
  return (
    <section className="section philosophy" id="about" aria-labelledby="philosophy-title">
      <div className="container philosophy__grid">
        <figure className="philosophy__figure">
          <Reveal variant="image">
            <div className="media philosophy__media">
              <Img image={philosophy.image} sizes="(min-width: 900px) 48vw, 100vw" />
            </div>
          </Reveal>
          <Reveal as="figcaption" className="philosophy__caption" delay={200}>
            {philosophy.caption}
          </Reveal>
        </figure>

        <div className="philosophy__text">
          <Reveal className="philosophy__head">
            <p className="eyebrow">{philosophy.eyebrow}</p>
            <h2 id="philosophy-title">
              {philosophy.heading.map((line, index) => (
                <span className={`philosophy__line${index === 1 ? ' italic' : ''}`} key={line}>
                  {line}{' '}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal as="p" className="lead" delay={120}>
            {philosophy.description}
          </Reveal>

          <ul className="philosophy__points">
            {philosophy.points.map((point, index) => (
              <Reveal as="li" className="philosophy__point" key={point} delay={index * 90}>
                {point}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <a className="link-arrow" href={philosophy.cta.href}>
              <span className="link-arrow__label">{philosophy.cta.label}</span>
              <ArrowRight width={18} height={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
