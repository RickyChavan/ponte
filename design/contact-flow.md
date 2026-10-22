# Ponte: Contact Flow

One form, two paths chosen by a first question.

**I am a…** (required, radio): Founder or business owner / Professional or partner who wants to join

## Founder path (short form, updated 2026-10-22)
Always visible: name (required), work email (required), "What do you need help with?" free text (required unless roles are picked below), consent.
Behind "Add more details (optional)": phone or WhatsApp, company name, stage and size, which roles the pod needs (checkboxes).

## Talent/partner path
Always visible: name, work email, "What do you do?" (required), optional note, consent.
Behind "Add more details (optional)": phone or WhatsApp, LinkedIn or portfolio link.

## Consent
Checkbox, required: "I agree to Ponte contacting me about my enquiry." Under it: "We use your details only to reply to your enquiry, and we don't share them with other clients." The privacy-policy link was removed because no policy page exists yet; consent text version is `2026-10-22-v2` in the backend. A real privacy page needs counsel before it is linked again.

## States
- **Success:** "Thanks, [name]. We'll reply within 2 working days." (confirmed by the founder)
- **Field error:** inline, specific. "Please enter a valid email, like name@company.com."
- **Server error:** "Something went wrong on our side. Your details are still here. Try again, or email us at [email]."
- Spam protection: honeypot field plus rate limit (implemented in backend phase).

## Data note
Stores personal data. Backend phase must cover India DPDP Act consent, retention and deletion handling.
