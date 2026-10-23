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

declare global {
  interface Window {
    PONTE_CONFIG?: { API_BASE?: string }
  }
}

/** Backend address from public/config.js; empty means same origin (dev uses the Vite proxy). */
function apiBase(): string {
  return (window.PONTE_CONFIG?.API_BASE ?? '').replace(/\/+$/, '')
}

/** Posts the contact form to the Python backend. */
export async function submitContact(data: ContactPayload): Promise<void> {
  let res: Response
  try {
    res = await fetch(`${apiBase()}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    throw new ApiError(0, 'network')
  }
  if (!res.ok) throw new ApiError(res.status, 'request failed')
}
