import { services, servicesIntro } from '../data/content'
import { ArrowRight } from './Icons'
import Img from './Img'
import Reveal from './Reveal'
import './Services.css'

/** `onSelect(projectType)` pre-fills the enquiry form, then the link scrolls to it. */
export default function Services({ onSelect }) {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__title">
            <p className="eyebrow">{servicesIntro.eyebrow}</p>
            <h2 id="services-title">{servicesIntro.heading}</h2>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            {servicesIntro.description}
          </Reveal>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <article className="service" key={service.id}>
              <Reveal variant="image">
                <div className="media service__media">
                  <Img image={service.image} sizes="(min-width: 800px) 46vw, 100vw" />
                </div>
              </Reveal>
              <Reveal className="service__body" delay={140}>
                <h3 className="service__title">{service.title}</h3>
                <p className="service__text">{service.description}</p>
                <a
                  className="link-arrow service__link"
                  href="#contact"
                  onClick={() => onSelect(service.projectType)}
                >
                  <span className="link-arrow__label">
                    Discover more<span className="visually-hidden">: {service.title}</span>
                  </span>
                  <ArrowRight width={18} height={18} />
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
