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
    <fieldset className="fieldset">
      <label htmlFor={id} className="fieldset-legend text-base">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </fieldset>
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
  const cls = (base: string, id: keyof Errors, errorClass: string) => `${base} w-full ${errors[id] ? errorClass : ''}`

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
    <section id="contact" className="bg-base-200 py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">Contact</p>
          <h2 className="text-3xl font-bold md:text-4xl">Let's talk about what you need, and what it costs.</h2>
          <p className="mt-4 text-base-content/80">
            Pricing depends on your goals and team, so we'll talk it through together. No obligation.
          </p>
          <ul className="mt-6 space-y-3 text-base-content/80">
            {['Tell us a little about your business', "We'll reply within 2 working days", 'No obligation, no hard sell'].map(
              (t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 size-2.5 flex-none rounded-full bg-primary" aria-hidden="true" />
                  {t}
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 rounded-box border border-base-300 bg-base-100 p-5">
            <p className="font-semibold">Prefer to write to us directly?</p>
            <a className="link link-hover inline-flex min-h-11 items-center text-lg font-semibold text-primary" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          {doneName !== null ? (
            <div role="status" tabIndex={-1} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-2xl">Thanks{doneName ? `, ${doneName}` : ''}.</h3>
                <p>We'll reply within 2 working days.</p>
              </div>
            </div>
          ) : (
            <form ref={form} onSubmit={onSubmit} noValidate className="card bg-base-100 shadow-xl">
              <div className="card-body gap-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-base">I am a…</legend>
                  <div className="join w-full">
                    <input
                      className="btn join-item flex-1 checked:btn-neutral"
                      type="radio"
                      name="role"
                      aria-label="Founder or business owner"
                      checked={role === 'founder'}
                      onChange={() => setRole('founder')}
                    />
                    <input
                      className="btn join-item flex-1 checked:btn-neutral"
                      type="radio"
                      name="role"
                      aria-label="Professional or partner"
                      checked={role === 'talent'}
                      onChange={() => setRole('talent')}
                    />
                  </div>
                </fieldset>

                <Field id="name" label="Your name" error={errors.name}>
                  <input id="name" name="name" type="text" autoComplete="name" className={cls('input', 'name', 'input-error')} {...a11y('name')} />
                </Field>
                <Field id="email" label="Work email" error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" className={cls('input', 'email', 'input-error')} {...a11y('email')} />
                </Field>

                {role === 'founder' ? (
                  <Field id="notes" label="What do you need help with?" error={errors.notes}>
                    <textarea
                      id="notes"
                      name="notes"
                      maxLength={500}
                      rows={3}
                      placeholder="For example: two engineers to build our app, and someone to run our sales."
                      className={cls('textarea', 'notes', 'textarea-error')}
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
                        className={cls('input', 'expertise', 'input-error')}
                        {...a11y('expertise')}
                      />
                    </Field>
                    <Field id="notes" label="Anything else we should know? (optional)">
                      <textarea id="notes" name="notes" maxLength={500} rows={2} className="textarea w-full" />
                    </Field>
                  </>
                )}

                <details className="collapse collapse-arrow border border-base-300 bg-base-100">
                  <summary className="collapse-title min-h-11 font-semibold">Add more details (optional)</summary>
                  <div className="collapse-content grid gap-1">
                    <Field id="phone" label="Phone or WhatsApp">
                      <input id="phone" name="phone" type="tel" autoComplete="tel" className="input w-full" />
                    </Field>
                    {role === 'founder' ? (
                      <>
                        <Field id="company" label="Company name">
                          <input id="company" name="company" type="text" autoComplete="organization" className="input w-full" />
                        </Field>
                        <Field id="stage" label="Stage and size">
                          <select id="stage" name="stage" defaultValue="" className="select w-full">
                            <option value="">Choose one</option>
                            {STAGES.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </Field>
                        <fieldset className="fieldset">
                          <legend className="fieldset-legend text-base">Which roles would your pod need?</legend>
                          <div className="grid gap-1 sm:grid-cols-2">
                            {NEEDS.map(([value, label]) => (
                              <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3">
                                <input type="checkbox" name="needs" value={value} className="checkbox" />
                                <span>{label}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      </>
                    ) : (
                      <Field id="link" label="LinkedIn or portfolio link">
                        <input id="link" name="link" type="url" className="input w-full" />
                      </Field>
                    )}
                  </div>
                </details>

                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Leave blank <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <fieldset className="fieldset">
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm">
                    <input type="checkbox" name="consent" className="checkbox mt-0.5" {...a11y('consent')} />
                    <span>I agree to Ponte contacting me about my enquiry.</span>
                  </label>
                  <p className="text-sm text-base-content/70">
                    We use your details only to reply to your enquiry, and we don't share them with other clients.
                  </p>
                  {errors.consent && (
                    <p id="consent-err" role="alert" className="text-sm text-error">
                      {errors.consent}
                    </p>
                  )}
                </fieldset>

                {serverError && (
                  <div role="alert" className="alert alert-error alert-soft mt-2">
                    <span>{serverError}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-block mt-2" disabled={sending}>
                  {sending && <span className="loading loading-spinner" aria-hidden="true" />}
                  Send my details
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
