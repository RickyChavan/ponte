# Lovable prompt for the Ponte website

Paste everything below the line into Lovable.

---

Build a single-page marketing website for **Ponte** (ponte.co.in), a management-as-a-service company for startups and MSMEs in India. Ponte builds and manages a **dedicated pod of 4 to 6 skilled people** for each client (engineers, sales and marketing, operations, finance/HR). Brand idea: *ponte* means "bridge". Tone: warm, approachable, plain language, confident but not boastful. Tagline: **"Build the bridge to your next stage."**

## Tech
React + Vite + TypeScript + Tailwind. Single page with smooth anchor scrolling. **Do not use Supabase, auth or any database.** The contact form should validate on the client and, on submit, call a stub `submitContact(data)` function in `src/lib/api.ts` that POSTs JSON to `/api/contact` (a Python backend will be added later); until then show the success state.

## Visual design
- Colours: background cream `#FBF6EE`, sand sections `#F1E7D6`, text deep teal `#12383C`, secondary text `#3F5F62`, primary accent terracotta `#B4441F` (hover `#8F3416`), highlight amber `#E8A33D`, white cards.
- Fonts: **Fraunces** (headings, 600-700) and **Inter** (body).
- Rounded shapes, generous whitespace, soft shadows. Bridge/arch motif: arch-shaped hero image frame, wavy arch section dividers, a small arch logo mark (two nested arches, terracotta and amber) beside the lowercase wordmark "ponte".
- No stock photos of fake people. Use illustrations/SVG (e.g. three or more people standing on a bridge in the hero). Do not invent client names, logos, testimonials or statistics.

## Sections (in this order)
1. **Sticky header:** logo, links (Your pod, Why Ponte, How it works, About), primary button "Talk to us". Mobile: hamburger menu; sticky bottom "Talk to us" bar.
2. **Hero:** eyebrow "Management as a service"; H1 "Build the bridge to your next stage."; sub "Ponte builds and manages a dedicated pod of 4 to 6 skilled people for your startup or MSME: engineers, marketers, operations and finance. European work culture, Indian results."; buttons "Talk to us" and "See how it works"; chips "Startups", "MSMEs", "Dedicated pods of 4 to 6".
3. **Value:** H2 "You can't run, sell and manage everything alone." Body "Growth asks for more hats than one founder can wear. Instead of hiring one person at a time, you get a ready pod of 4 to 6 people who work only for your business, managed by Ponte."
4. **Your pod** (eyebrow), H2 "A team built around your goals.", sub "We mix roles from the list below to fit what your business needs right now." Four icon cards: *Software and DevOps engineers* (Build, ship and keep your product running.), *Sales and marketing* (Find customers and build a steady pipeline.), *Operations and project management* (Keep delivery, vendors and deadlines on track.), *Finance, HR and admin* (Handle accounts, hiring and the paperwork behind growth.). Button "Talk to us".
5. **Why Ponte** (sand background), H2 "Your pod, your privacy, your pace." Three cards: *One pod, one client* (Every pod works in isolation. Your data and plans are never shared with other clients, and each client signs an NDA. Our lawyer reviews the contracts.); *European work culture, Indian results* (Respect for working hours and leave. Clear, direct and documented communication. Autonomy and trust. Quality over speed.); *Costs you can see* (You cover the expenses of your own pod, plus a management fee to Ponte. We walk you through the numbers on the first call.).
6. **How it works:** four numbered steps joined by a dashed bridge line: Talk (Tell us where you are and where you want to be.), Design your pod (We agree the 4 to 6 roles your business needs.), Pod starts (Your pod gets to work with clear targets, managed by Ponte.), Review and grow (Regular check-ins to adjust the pod as your business changes.).
7. **About:** H2 "Why we built Ponte." Body "Many startups and MSMEs need a full team long before they can afford to build one. We built Ponte to close that gap: a dedicated pod, managed by us, that works only for you. Ponte means "bridge". We want to be the bridge between where you are and where your business is going." Beside it an arch-framed illustration of a small team.
8. **Talent strip:** dark teal rounded box, "Great at what you do? Join our bench." / "We're building a network of talent and partners." Button "Join as talent or partner" (scrolls to the form and selects the talent option).
9. **Contact:** H2 "Let's talk about what you need, and what it costs." Sub "Pricing depends on your goals and team, so we'll talk it through together. No obligation." Bullets: Tell us a little about your business / We'll reply within 2 working days / No obligation, no hard sell. Form card:
   - Segmented choice "I am a…": *Founder or business owner* / *Professional or partner*.
   - Always: Your name, Work email, Phone or WhatsApp (optional).
   - Founder only: Company name, Stage and size (Just starting / Growing (under 20 people) / Established (20+)), checkboxes "Which roles would your pod need?" (Software and DevOps engineers, Sales and marketing, Operations and project management, Finance, HR and admin, Not sure yet), Anything else (optional, 500 chars).
   - Talent only: Area of expertise, LinkedIn or portfolio link (optional).
   - Consent checkbox: "I agree to Ponte contacting me about my enquiry." with privacy policy link. Hidden honeypot field. Button "Send my details".
   - Inline errors, e.g. "Please enter a valid email, like name@company.com." and "Pick at least one, or choose 'Not sure yet'." Focus moves to first error. Success state: "Thanks, [first name]. We'll reply within 2 working days."
10. **Footer:** logo, tagline, links, hello@ponte.co.in, "© 2026 Ponte · ponte.co.in", Privacy policy.

## Accessibility and quality
WCAG 2.1 AA: all text 4.5:1 contrast, visible focus rings (amber), 44px minimum touch targets, labelled inputs, `aria-invalid` and `aria-describedby` on errors, semantic landmarks, skip link, one h1, respect `prefers-reduced-motion` (scroll-reveal animations optional). No horizontal scroll at 320px. Fully responsive (375, 768, 1280). Add meta title "Ponte | Build the bridge to your next stage" and a meta description.
