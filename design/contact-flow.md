# Ponte: Contact Flow

One form, two paths chosen by a first question.

**I am a…** (required, radio): Founder or business owner / Professional or partner who wants to join

## Founder path fields
- Your name (required)
- Work email (required) and phone/WhatsApp (optional)
- Company name (required)
- Stage and size: just starting / growing (under 20 people) / established (20+) (required)
- Which roles would your pod need? checkboxes: Software and DevOps engineers / Sales and marketing / Operations and project management / Finance, HR and admin / Not sure yet (required, at least one)
- Anything else we should know? (optional, 500 chars)

## Talent/partner path fields
- Name, email (required); LinkedIn or portfolio link; area of expertise; availability

## Consent
Checkbox, required: "I agree to Ponte contacting me about my enquiry." Link to privacy policy.

## States
- **Success:** "Thanks, [name]. We'll reply within 2 working days." (confirmed by the founder)
- **Field error:** inline, specific. "Please enter a valid email, like name@company.com."
- **Server error:** "Something went wrong on our side. Your details are still here. Try again, or email us at [email]."
- Spam protection: honeypot field plus rate limit (implemented in backend phase).

## Data note
Stores personal data. Backend phase must cover India DPDP Act consent, retention and deletion handling.
