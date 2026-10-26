import { Icons, Slot } from './Art'

/* ----------------------------------------------------------------- Hero */

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <h1 className="hero__title">Build the bridge to your next stage.</h1>
        <div className="hero__meta">
          <p className="lead">A dedicated team of 4 to 6 for your startup or MSME, built and managed by Ponte.</p>
          <div className="actions">
            <a href="#contact" className="btn">
              Talk to us
            </a>
            <a href="#how" className="btn btn--quiet">
              See how it works
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <Slot name="hero" className="hero__photo" priority />
      </div>
    </section>
  )
}

/* ------------------------------------------------------- Roles (the index) */

const ROLES: [string, string][] = [
  ['Software and DevOps engineers', 'Build, ship and keep your product running.'],
  ['Sales and marketing', 'Find customers and build a steady pipeline.'],
  ['Operations and project management', 'Keep delivery, vendors and deadlines on track.'],
  ['Finance, HR and admin', 'Handle accounts, hiring and the paperwork behind growth.'],
]

export function Pod() {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="statement">You can’t run, sell and manage everything alone.</h2>
        <p className="statement__lead">
          Instead of hiring one person at a time, you get a pod: a small team of 4 to 6 people who work only for your
          business, managed by Ponte.
        </p>
      </div>
      <div className="container index">
        <div className="index__head">
          <h2>A team built around your goals.</h2>
          <p>We mix roles to fit what your business needs right now.</p>
        </div>
        <ol className="index__list">
          {ROLES.map(([title, text]) => (
            <li key={title} data-reveal>
              <a href="#contact" className="index__row">
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="index__go">
                  <Icons.arrow />
                  <span className="visually-hidden">Talk to us about this role</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Principles (about) */

export function Why() {
  return (
    <section id="why" className="section section--tint">
      <div className="container">
        <h2 className="section__head">Your pod, your privacy, your pace.</h2>
        <div className="principles">
          <article data-reveal>
            <h3>One pod, one client.</h3>
            <p>
              Every pod works in isolation. Your data and plans are never shared with other clients. Each client signs
              an NDA, and our lawyer reviews the contracts.
            </p>
          </article>
          <article data-reveal>
            <h3>European work culture, Indian results.</h3>
            <ul className="plain">
              <li>Respect for working hours and leave.</li>
              <li>Clear, direct, documented communication.</li>
              <li>Autonomy and trust.</li>
              <li>Quality over speed.</li>
            </ul>
          </article>
          <article data-reveal>
            <h3>Costs you can see.</h3>
            <p>
              You cover the expenses of your own pod, plus a management fee to Ponte. We go through the numbers on the
              first call.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Process */

const STEPS: [string, string][] = [
  ['Talk', 'Tell us where you are and where you want to be. No obligation.'],
  ['Design your pod', 'We agree the 4 to 6 roles your business needs.'],
  ['Pod starts', 'Your pod gets to work with clear targets, managed by Ponte.'],
  ['Review and grow', 'Regular check-ins to adjust the pod as your business changes.'],
]

export function How() {
  return (
    <section id="how" className="section">
      <div className="container">
        <h2 className="section__head">Four steps from hello to growing.</h2>
        <ol className="steps">
          {STEPS.map(([title, text]) => (
            <li key={title} data-reveal>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Founders */

export function About() {
  return (
    <section id="about" className="section section--tint">
      <div className="container about">
        <div className="about__text">
          <h2>Why we built Ponte.</h2>
          <p className="lead">
            Many startups and MSMEs need a full team long before they can afford to build one. We built Ponte to close
            that gap: a dedicated pod, managed by us, that works only for you.
          </p>
          <p>Ponte means “bridge”. We want to be the bridge between where you are and where your business is going.</p>
        </div>
        <div className="founders">
          <figure>
            <Slot name="founder-1" className="founders__photo" sizes="(min-width: 60rem) 22vw, 45vw" />
            <figcaption>
              <span className="fill" data-fill="first founder's name and role">
                Founder name and role
              </span>
            </figcaption>
          </figure>
          <figure>
            <Slot name="founder-2" className="founders__photo" sizes="(min-width: 60rem) 22vw, 45vw" />
            <figcaption>
              <span className="fill" data-fill="second founder's name and role">
                Founder name and role
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ FAQ */

// TODO(founder): the answers marked "first call" are deliberately non-committal. Replace each with Ponte's real
// terms (minimum term and exit, ownership of work, replacement of pod members, how people are chosen) once decided.
const FAQ: [string, string][] = [
  [
    'What is a pod?',
    'A small team of 4 to 6 people who work only for your business. Ponte puts the team together and manages it day to day.',
  ],
  [
    'Who works in my pod?',
    'A group chosen for your goals, from engineering and DevOps, sales and marketing, operations and project management, and finance, HR and admin.',
  ],
  [
    'Will my pod work for anyone else?',
    'No. Every pod works in isolation for one client. Your data and plans are not shared with other clients, and each client signs an NDA. Our lawyer reviews the contracts.',
  ],
  [
    'What does it cost?',
    'You pay the expenses of your own pod, plus a management fee to Ponte. Pricing depends on the roles and the team, so we go through the numbers with you on the first call.',
  ],
  [
    'How long do I commit for, and how do I leave?',
    'We settle the term and how to end it with you before your pod starts, and we’re happy to go through it on the first call.',
  ],
  [
    'Who owns the work the pod produces?',
    'We settle ownership of the code, documents and data with you in your contract, and we’re happy to explain it on the first call.',
  ],
  [
    'What if someone in my pod leaves?',
    'We’ll walk you through how a replacement and handover would work on the first call.',
  ],
  ['How quickly will you reply?', 'Within 2 working days of your message.'],
]

export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container faqwrap">
        <div className="faqwrap__head">
          <h2>Questions you may have.</h2>
          <p>
            Something else?{' '}
            <a className="link" href="#contact">
              Ask us
            </a>
            .
          </p>
        </div>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Talent */

export function Talent({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="band">
      <div className="container band__row">
        <div>
          <h2>Do great work? Work with us.</h2>
          <p>
            We’re looking for engineers, marketers, operations and finance people for client pods, and for partners who
            work with startups and MSMEs.
          </p>
        </div>
        <a href="#contact" onClick={onJoin} className="btn">
          Tell us about you
        </a>
      </div>
    </section>
  )
}
