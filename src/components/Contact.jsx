import { contact, contactIntro } from '../data/content'
import { ArrowUpRight } from './Icons'
import ContactForm from './ContactForm'
import Reveal from './Reveal'
import './Contact.css'

export default function Contact({ projectType, onProjectTypeChange }) {
  const whatsappHref = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}`

  return (
    <section className="section section--alt contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal className="contact__head">
            <p className="eyebrow">{contactIntro.eyebrow}</p>
            <h2 id="contact-title">{contactIntro.heading}</h2>
          </Reveal>

          <Reveal as="p" className="lead" delay={100}>
            {contactIntro.description}
          </Reveal>

          <Reveal as="dl" className="contact__details" delay={180}>
            <div>
              <dt>Email</dt>
              <dd>
                <a className="contact__link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a className="contact__link" href={`tel:${contact.phoneHref}`}>
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>
                {contact.address.map((line) => (
                  <span className="contact__line" key={line}>
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a className="contact__link" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Message the studio
                  <span className="visually-hidden"> (opens WhatsApp in a new tab)</span>
                </a>
              </dd>
            </div>
          </Reveal>

          <Reveal className="contact__socials" delay={240}>
            <p className="contact__socials-label">Follow the studio</p>
            <ul className="contact__socials-list">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a className="link-arrow" href={social.href} target="_blank" rel="noopener noreferrer">
                    <span className="link-arrow__label">
                      {social.label}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </span>
                    <ArrowUpRight width={16} height={16} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="contact__form" delay={120}>
          <ContactForm projectType={projectType} onProjectTypeChange={onProjectTypeChange} />
        </Reveal>
      </div>
    </section>
  )
}
