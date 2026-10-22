import { useEffect, useRef, useState } from 'react'
import { contact, projectTypes } from '../data/content'
import { FIELD_ORDER, validateEnquiry } from '../lib/validate'
import { buildMailto, isFormConnected, submitEnquiry } from '../lib/submitEnquiry'
import Button from './Button'
import { Check } from './Icons'
import './ContactForm.css'

const EMPTY = { name: '', email: '', phone: '', projectType: '', location: '', budget: '', message: '' }

function readValues(form) {
  const data = new FormData(form)
  const values = { ...EMPTY }
  FIELD_ORDER.forEach((key) => {
    values[key] = String(data.get(key) ?? '')
  })
  return values
}

function Field({ name, label, optional = false, error, wide = false, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}${wide ? ' field--wide' : ''}`}>
      <label className="field__label" htmlFor={`enquiry-${name}`}>
        {label}
        {optional && <span className="field__optional">Optional</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`enquiry-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Enquiry form. `projectType` is owned by the page so service links can pre-fill it.
 * Status: idle → submitting → success | error. See lib/submitEnquiry.js for what "success" means.
 */
export default function ContactForm({ projectType, onProjectTypeChange }) {
  const formRef = useRef(null)
  const successRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [submitted, setSubmitted] = useState(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const errorCount = Object.keys(errors).length
  const describe = (name) => ({
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `enquiry-${name}-error` : undefined,
  })

  const revalidate = (form, name) => {
    const next = validateEnquiry(readValues(form))
    setErrors((current) => {
      const updated = { ...current }
      if (next[name]) updated[name] = next[name]
      else delete updated[name]
      return updated
    })
  }

  // Check a field when the visitor leaves it, but only once it has content or an existing error:
  // tabbing through an empty form shouldn't shout.
  const handleBlur = (event) => {
    const { name, value } = event.target
    if (!FIELD_ORDER.includes(name)) return
    if (value.trim() || errors[name]) revalidate(event.currentTarget, name)
  }

  // Errors clear as soon as the fix is made.
  const handleChange = (event) => {
    const { name } = event.target
    if (errors[name]) revalidate(event.currentTarget, name)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const values = readValues(form)
    const found = validateEnquiry(values)
    setErrors(found)
    setAttempted(true)

    const firstInvalid = FIELD_ORDER.find((key) => found[key])
    if (firstInvalid) {
      setStatus('idle')
      setServerError('')
      form.elements.namedItem(firstInvalid)?.focus()
      return
    }

    // Honeypot: a hidden field real visitors never fill. Bots that do get a convincing "success" and nothing is sent.
    if (new FormData(form).get('company')) {
      setSubmitted({ values, mode: isFormConnected ? 'sent' : 'demo' })
      setStatus('success')
      return
    }

    setStatus('submitting')
    setServerError('')
    try {
      const { mode } = await submitEnquiry(values)
      setSubmitted({ values, mode })
      setStatus('success')
    } catch (error) {
      setServerError(error.message)
      setStatus('error')
    }
  }

  const editEnquiry = () => {
    setStatus('idle')
    setTimeout(() => formRef.current?.elements.namedItem('name')?.focus(), 0)
  }

  const resetForm = () => {
    formRef.current?.reset()
    onProjectTypeChange('')
    setErrors({})
    setAttempted(false)
    setSubmitted(null)
    editEnquiry()
  }

  const isSuccess = status === 'success' && submitted
  const firstName = submitted?.values.name.trim().split(/\s+/)[0]

  return (
    <div className="enquiry">
      {/* The form stays mounted (just hidden) after success so "Edit enquiry" keeps everything the visitor typed. */}
      <form
        ref={formRef}
        className="form"
        noValidate
        hidden={Boolean(isSuccess)}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
        onChange={handleChange}
        aria-label="Consultation enquiry"
      >
        <p className="form__intro">All fields are required unless marked optional.</p>

        {attempted && errorCount > 0 && (
          <p className="form__alert" role="alert">
            {errorCount === 1 ? 'One field needs attention.' : `${errorCount} fields need attention.`} Check the
            messages below.
          </p>
        )}
        {status === 'error' && (
          <p className="form__alert" role="alert">
            {serverError}
          </p>
        )}

        <div className="form__grid">
          <Field name="name" label="Full name" error={errors.name}>
            <input id="enquiry-name" name="name" type="text" autoComplete="name" required {...describe('name')} />
          </Field>

          <Field name="email" label="Email address" error={errors.email}>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              {...describe('email')}
            />
          </Field>

          <Field name="phone" label="Phone number" optional error={errors.phone}>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              {...describe('phone')}
            />
          </Field>

          <Field name="projectType" label="Project type" error={errors.projectType}>
            <select
              id="enquiry-projectType"
              name="projectType"
              required
              value={projectType}
              onChange={(event) => onProjectTypeChange(event.target.value)}
              {...describe('projectType')}
            >
              <option value="">Select a project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field name="location" label="Approximate project location" optional error={errors.location}>
            <input
              id="enquiry-location"
              name="location"
              type="text"
              autoComplete="address-level2"
              placeholder="City or area"
              {...describe('location')}
            />
          </Field>

          <Field name="budget" label="Estimated budget" optional error={errors.budget}>
            <input
              id="enquiry-budget"
              name="budget"
              type="text"
              placeholder="A range, in your currency"
              {...describe('budget')}
            />
          </Field>

          <Field name="message" label="Message" wide error={errors.message}>
            <textarea
              id="enquiry-message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about the space, your timeline and what you have in mind."
              {...describe('message')}
            />
          </Field>

          {/* Honeypot: visually and semantically hidden from real visitors. */}
          <div className="form__trap" aria-hidden="true">
            <label>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        </div>

        <div className="form__actions">
          <Button type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Request a Consultation'}
          </Button>
          {!isFormConnected && (
            <p className="form__demo-note">
              Demo mode: no form service is connected yet, so submitting this form does not send your details.
            </p>
          )}
        </div>
      </form>

      {isSuccess && (
        <div className="form-success" ref={successRef} tabIndex={-1} role="status" aria-labelledby="form-success-title">
          <span className="form-success__icon" aria-hidden="true">
            <Check width={22} height={22} />
          </span>
          <h3 id="form-success-title">Thank you, {firstName}.</h3>

          {submitted.mode === 'demo' ? (
            <>
              <p>
                <strong>This is a demo: your enquiry has not been sent.</strong> No form service is connected to
                this website yet, so nothing has left your browser.
              </p>
              <p>To contact the studio now, send your details from your own email app.</p>
              <div className="form-success__actions">
                <Button href={buildMailto(contact.email, submitted.values)}>Send by email instead</Button>
                <button type="button" className="link-arrow" onClick={editEnquiry}>
                  <span className="link-arrow__label">Edit enquiry</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                Your enquiry has been sent. A reply will go to <strong>{submitted.values.email}</strong>.
              </p>
              <div className="form-success__actions">
                <Button variant="secondary" onClick={resetForm}>
                  Send another enquiry
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
