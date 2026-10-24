import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ApiError, submitContact, type ContactRole } from '../lib/api'

export const CONTACT_EMAIL = 'hello@ponte.co.in'

const NEEDS = [
  ['eng', 'Software and DevOps engineers'],
  ['sales', 'Sales and marketing'],
  ['ops', 'Operations and project management'],
  ['fin', 'Finance, HR and admin'],
  ['unsure', 'Not sure yet'],
] as const

const STAGES = ['Just starting', 'Growing (under 20 people)', 'Established (20+)']

type Errors = Partial<Record<'name' | 'email' | 'notes' | 'expertise' | 'consent', string>>

interface Props {
  role: ContactRole
  setRole: (r: ContactRole) => void
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact({ role, setRole }: Props) {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [doneName, setDoneName] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const a11y = (id: keyof Errors) =>
    errors[id] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-err` } : {}

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const fd = new FormData(form.current!)
    if (fd.get('website')) return // honeypot
    const v = (k: string) => String(fd.get(k) ?? '').trim()
    const needs = fd.getAll('needs').map(String)
    const next: Errors = {}

    if (!v('name')) next.name = 'Please tell us your name.'
    if (!v('email')) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) next.email = 'Please enter a valid email, like name@company.com.'
    if (role === 'founder') {
      if (!v('notes') && !needs.length) next.notes = 'Tell us in a line or two what you need help with.'
    } else if (!v('expertise')) next.expertise = 'Please tell us your area of expertise.'
    if (!fd.get('consent')) next.consent = 'Please tick this box so we can contact you.'

    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setSending(true)
    setServerError(null)
    try {
      await submitContact({
        role,
        name: v('name'),
        email: v('email'),
        phone: v('phone') || undefined,
        company: v('company') || undefined,
        stage: v('stage') || undefined,
        needs: role === 'founder' && needs.length ? needs : undefined,
        expertise: v('expertise') || undefined,
        link: v('link') || undefined,
        notes: v('notes') || undefined,
        consent: true,
        website: v('website') || undefined,
      })
      setDoneName(v('name').split(' ')[0])
    } catch (err) {
      const status = err instanceof ApiError ? err.status : 0
      setServerError(
        status === 429
          ? 'Too many attempts from your network. Please try again in a few minutes.'
          : status === 422
            ? 'Some details look invalid. Please check the form and try again.'
            : `Something went wrong on our side. Your details are still here. Try again, or email us at ${CONTACT_EMAIL}.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section section--tint">
      <div className="container split split--form">
        <div className="split__head">
          <h2>Tell us what you need.</h2>
          <p>Pricing depends on your goals and team, so we’ll talk it through together. No obligation.</p>
          <ul className="plain">
            <li>We’ll reply within 2 working days.</li>
            <li>No obligation, no hard sell.</li>
          </ul>
          <p className="bigmail">
            Prefer to write?
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        {doneName !== null ? (
          <div role="status" tabIndex={-1} className="panel done">
            <h3>Thanks{doneName ? `, ${doneName}` : ''}.</h3>
            <p>We’ll reply within 2 working days.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={onSubmit} noValidate className="panel">
            <fieldset className="seg">
              <legend>I am a…</legend>
              <input
                id="role-founder"
                type="radio"
                name="role"
                checked={role === 'founder'}
                onChange={() => setRole('founder')}
              />
              <label htmlFor="role-founder">Founder or business owner</label>
              <input
                id="role-talent"
                type="radio"
                name="role"
                checked={role === 'talent'}
                onChange={() => setRole('talent')}
              />
              <label htmlFor="role-talent">Professional or partner</label>
            </fieldset>

            <Field id="name" label="Your name" error={errors.name}>
              <input id="name" name="name" type="text" autoComplete="name" {...a11y('name')} />
            </Field>
            <Field id="email" label="Work email" error={errors.email}>
              <input id="email" name="email" type="email" autoComplete="email" {...a11y('email')} />
            </Field>

            {role === 'founder' ? (
              <Field id="notes" label="What do you need help with?" error={errors.notes}>
                <textarea
                  id="notes"
                  name="notes"
                  maxLength={500}
                  rows={3}
                  placeholder="For example: two engineers to build our app, and someone to run our sales."
                  {...a11y('notes')}
                />
              </Field>
            ) : (
              <>
                <Field id="expertise" label="What do you do?" error={errors.expertise}>
                  <input
                    id="expertise"
                    name="expertise"
                    type="text"
                    placeholder="For example: DevOps, B2B sales, accounting"
                    {...a11y('expertise')}
                  />
                </Field>
                <Field id="notes" label="Anything else we should know? (optional)">
                  <textarea id="notes" name="notes" maxLength={500} rows={2} />
                </Field>
              </>
            )}

            <details className="more">
              <summary>Add more details (optional)</summary>
              <div className="more__body">
                <Field id="phone" label="Phone or WhatsApp">
                  <input id="phone" name="phone" type="tel" autoComplete="tel" />
                </Field>
                {role === 'founder' ? (
                  <>
                    <Field id="company" label="Company name">
                      <input id="company" name="company" type="text" autoComplete="organization" />
                    </Field>
                    <Field id="stage" label="Stage and size">
                      <select id="stage" name="stage" defaultValue="">
                        <option value="">Choose one</option>
                        {STAGES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <fieldset className="checks">
                      <legend>Which roles would your pod need?</legend>
                      {NEEDS.map(([value, label]) => (
                        <label key={value} className="check">
                          <input type="checkbox" name="needs" value={value} />
                          <span>{label}</span>
                        </label>
                      ))}
                    </fieldset>
                  </>
                ) : (
                  <Field id="link" label="LinkedIn or portfolio link">
                    <input id="link" name="link" type="url" />
                  </Field>
                )}
              </div>
            </details>

            <div className="trap" aria-hidden="true">
              <label>
                Leave blank <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="field">
              <label className="check">
                <input type="checkbox" name="consent" {...a11y('consent')} />
                <span>I agree to Ponte contacting me about my enquiry.</span>
              </label>
              <p className="field__hint">
                We use your details only to reply to your enquiry, and we don’t share them with other clients.
              </p>
              {errors.consent && (
                <p id="consent-err" role="alert" className="field__error">
                  {errors.consent}
                </p>
              )}
            </div>

            {serverError && (
              <p role="alert" className="notice">
                {serverError}
              </p>
            )}

            <button type="submit" className="btn btn--block" disabled={sending} aria-busy={sending}>
              Send my details
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
