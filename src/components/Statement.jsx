import { statement } from '../data/content'
import Reveal from './Reveal'
import './Statement.css'

export default function Statement() {
  return (
    <section className="section section--alt statement" aria-labelledby="statement-title">
      <div className="container statement__inner">
        <span className="statement__rule" aria-hidden="true" />
        <Reveal as="h2" className="statement__title" id="statement-title">
          {statement.heading.map((line, index) => (
            <span className={`statement__line${index === 1 ? ' italic' : ''}`} key={line}>
              {line}{' '}
            </span>
          ))}
        </Reveal>
        <Reveal as="p" className="statement__text" delay={150}>
          {statement.description}
        </Reveal>
      </div>
    </section>
  )
}
