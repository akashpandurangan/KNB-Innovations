import { hero } from '../data/content'
import Button from './Button'
import Img from './Img'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__text">
        <p className="eyebrow hero__eyebrow">{hero.eyebrow}</p>

        <h1 className="hero__title" id="hero-title">
          {hero.headline.map((line, index) => (
            <span className="hero__line" key={line}>
              <span className={`hero__line-inner${index === 1 ? ' italic' : ''}`} style={{ '--i': index }}>
                {line}
              </span>{' '}
            </span>
          ))}
        </h1>

        <p className="lead hero__lead">{hero.description}</p>

        <div className="hero__actions">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>

      <figure className="hero__figure">
        <div className="hero__frame">
          <div className="media hero__media">
            <Img
              image={hero.image}
              priority
              widths={[640, 960, 1280, 1600, 2000]}
              sizes="(min-width: 960px) 48vw, 100vw"
            />
          </div>
          <figcaption className="hero__caption">
            <span className="hero__caption-title">{hero.caption.title}</span>
            <span className="hero__caption-place">{hero.caption.place}</span>
          </figcaption>
        </div>
      </figure>
    </section>
  )
}
