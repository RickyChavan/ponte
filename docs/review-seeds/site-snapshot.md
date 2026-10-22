# Ponte website snapshot (as built, 2026-10-22)

Source of truth for the simulation. This is what a visitor actually sees at ponte.co.in-to-be (currently only a local build). Nothing here is invented beyond what the founder supplied.

## The company (founder-supplied facts)
- Ponte is a management-as-a-service company for Indian startups and MSMEs.
- For each client it builds and manages a **dedicated pod of 4 to 6 people**: software and DevOps engineers, sales and marketing, operations and project management, finance/HR/admin.
- Every pod operates **in isolation**; no data shared between clients; **NDA per client**; contracts **reviewed by Ponte's lawyer**.
- "**European work culture, Indian results**": respect for working hours and leave; clear, direct, documented communication; autonomy and trust; quality over speed.
- The **client pays the pod's expenses** plus a **Ponte management fee**. Pricing is not public; it is discussed on the first call.
- Ponte is **brand new: no public clients, no case studies, no testimonials, no team page, no named founders on the site, no phone number, no social links**. The only contact is hello@ponte.co.in and the form.
- Reply promise: within 2 working days.

## Page structure (single page, top to bottom)
1. **Sticky navbar:** logo "ponte", links Your pod / Why Ponte / How it works / About, button "Talk to us". On phones: hamburger menu plus a sticky bottom "Talk to us" bar.
2. **Hero:** eyebrow "Management as a service". H1 "Build the bridge to your next stage." Sub: "Ponte builds and manages a dedicated pod of 4 to 6 skilled people for your startup or MSME: engineers, marketers, operations and finance. European work culture, Indian results." Buttons "Talk to us" and "See how it works". Chips: Startups, MSMEs, Dedicated pods of 4 to 6. Right side: an arch-framed illustration of three people standing on a bridge (decorative, no photo).
3. **Value:** "You can't run, sell and manage everything alone." Short paragraph about getting a ready pod instead of hiring one at a time.
4. **Your pod:** "A team built around your goals." Four cards: Software and DevOps engineers; Sales and marketing; Operations and project management; Finance, HR and admin (one-line benefit each). Button "Talk to us".
5. **Why Ponte:** "Your pod, your privacy, your pace." Three cards: One pod, one client (isolation, NDA, lawyer reviews contracts); European work culture, Indian results; Costs you can see (client covers pod expenses plus a management fee; numbers walked through on the first call).
6. **How it works:** Four steps: Talk; Design your pod; Pod starts; Review and grow. Button "Talk to us".
7. **About:** "Why we built Ponte." Two short paragraphs; arch illustration of a team. **No names, photos or bios of real people.**
8. **Talent strip:** "Great at what you do? Join our bench." Button "Join as talent or partner".
9. **Contact:** "Let's talk about what you need, and what it costs." Form: I am a (founder / professional or partner); name; work email; phone or WhatsApp (optional); founders: company name, stage and size, which roles the pod needs (checkboxes), notes; talent: area of expertise, LinkedIn/portfolio link; consent checkbox. Inline errors. Success message: "Thanks, <name>. We'll reply within 2 working days."
10. **Footer:** tagline, links, hello@ponte.co.in, "© 2026 Ponte", a "Privacy policy" link that currently goes nowhere (placeholder).

## What is missing (known gaps)
- No case studies, testimonials, client logos, numbers or named people: nothing that proves Ponte has delivered anything.
- No public pricing, price range or example engagement; the cost model is described in one sentence.
- No FAQ; no explanation of what happens to a pod when a person leaves, how quality is controlled, who the pod members report to, how long the minimum commitment is, or how a client exits.
- No privacy policy page; no security page; no mention of the DPDP Act.
- No "book a call" calendar; contact is a form with up to 8 fields plus consent.
- No WhatsApp or phone option; no Hindi or regional language.
- The hero illustration is generic; no photography of real people.
- No analytics, no SEO content beyond a title and meta description, only one page.

## Measured facts about the build
- React + Vite + Tailwind 4 + daisyUI 5; production JS about 243 kB (75 kB gzip), CSS about 86 kB (14 kB gzip).
- Fonts (Fraunces, Inter) load from Google Fonts.
- Colour contrast: body text 11.8:1, secondary text 6.4:1, white on terracotta buttons 5.5:1 (all pass WCAG AA). Buttons and inputs are 45px tall; checkboxes sit inside 44px rows.
- No horizontal scroll at 320, 375, 768 or 1280 px widths; keyboard menu, skip link, focus rings, form errors announced via role=alert.
- Form posts to a FastAPI backend that stores the enquiry and can alert Slack/email; rate limited; honeypot spam trap.
