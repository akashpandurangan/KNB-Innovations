/**
 * Enquiry submission.
 *
 * No backend ships with this site. Behaviour depends on VITE_FORM_ENDPOINT:
 *
 *  - Not set  → "demo" mode. Nothing leaves the browser; the form says so plainly.
 *  - Set      → the enquiry is POSTed as JSON to that URL (Formspree, Web3Forms,
 *               Netlify/Vercel function, your own API…). See README.md.
 *
 * Resolves to { mode: 'demo' | 'sent' }. Rejects with an Error whose message is
 * safe to show to the visitor.
 */

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT || '').trim()

export const isFormConnected = ENDPOINT.length > 0

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitEnquiry(values) {
  if (!isFormConnected) {
    await wait(600) // lets the pending state be seen; no network request is made
    return { mode: 'demo' }
  }

  let response
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
  } catch {
    throw new Error('We couldn’t reach the server. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new Error('Something went wrong while sending your enquiry. Please try again, or email us directly.')
  }
  return { mode: 'sent' }
}

/** mailto: fallback that carries the enquiry into the visitor's own email app. */
export function buildMailto(toAddress, values) {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    `Project type: ${values.projectType}`,
    values.location ? `Location: ${values.location}` : null,
    values.budget ? `Budget: ${values.budget}` : null,
  ].filter((line) => line !== null)
  lines.push('', values.message)

  const subject = encodeURIComponent(`Consultation request: ${values.projectType}`)
  const body = encodeURIComponent(lines.join('\n'))
  return `mailto:${toAddress}?subject=${subject}&body=${body}`
}
