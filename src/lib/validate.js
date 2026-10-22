import { projectTypes } from '../data/content'

export const FIELD_ORDER = ['name', 'email', 'phone', 'projectType', 'location', 'budget', 'message']

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS = /^[+\d\s().-]+$/

/** Returns an object of { fieldName: message } for every invalid field (empty if all valid). */
export function validateEnquiry(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Enter your full name.'
  else if (name.length < 2) errors.name = 'Your name needs at least 2 characters.'

  if (!email) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(email)) errors.email = 'Enter an email address like name@example.com.'

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (!PHONE_CHARS.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a phone number with 7 to 15 digits, or leave this blank.'
    }
  }

  if (!values.projectType) errors.projectType = 'Choose the type of project.'
  else if (!projectTypes.includes(values.projectType)) errors.projectType = 'Choose one of the listed project types.'

  if (!message) errors.message = 'Tell us a little about your project.'
  else if (message.length < 10) errors.message = 'Add a little more detail: at least 10 characters.'

  return errors
}
