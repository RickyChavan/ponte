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
}

// TODO: the Python backend (/api/contact) does not exist yet. Until it does,
// this resolves immediately so the form can show its success state.
export async function submitContact(data: ContactPayload): Promise<void> {
  void data
  await new Promise((resolve) => setTimeout(resolve, 300))
}
