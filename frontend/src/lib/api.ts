export type ContactRole = 'founder' | 'talent'

export interface ContactPayload {
  role: ContactRole
  name: string
  email: string
  phone?: string
  company?: string
  stage?: string
  needs?: string[]
  expertise?: string
  link?: string
  notes?: string
  consent: boolean
  /** Honeypot: hidden from people, bots tend to fill it. */
  website?: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

/** Posts the contact form to the Python backend (proxied to :8000 in dev). */
export async function submitContact(data: ContactPayload): Promise<void> {
  let res: Response
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    throw new ApiError(0, 'network')
  }
  if (!res.ok) throw new ApiError(res.status, 'request failed')
}
