import type { ComponentType, ReactNode } from 'react'
import { HeroArt, Icons, TeamArt } from './Art'

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary uppercase">{children}</p>
}

function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-4xl leading-[1.05] font-bold md:text-5xl ${className}`}>{children}</h2>
}

function CtaLink({ children = 'Talk to us', className = 'btn btn-primary btn-lg' }: { children?: ReactNode; className?: string }) {
  return (
    <a href="#contact" className={className}>
      {children}
    </a>
  )
}

function IconBadge({ Icon }: { Icon: ComponentType }) {
  return (
    <div className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
      <Icon />
    </div>
  )
}

/* ---------------------------------------------------------------- Hero */

const FACTS: { Icon: ComponentType; text: string }[] = [
  { Icon: Icons.lock, text: 'One pod per client, never shared' },
  { Icon: Icons.shield, text: 'NDA per client, contracts reviewed by our lawyer' },
  { Icon: Icons.clock, text: 'We reply within 2 working days' },
]

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-base-100 bg-[radial-gradient(900px_520px_at_88%_0%,rgba(240,120,74,.22),transparent_62%),radial-gradient(700px_420px_at_0%_100%,rgba(242,176,76,.10),transparent_60%)]"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 lg:grid-cols-[1.2fr_.8fr] lg:py-24">
          <div>
            <Eyebrow>Management as a service</Eyebrow>
            <h1 className="text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-7xl">
              Build the <span className="text-accent">bridge</span> to your next stage.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-base-content/80 md:text-xl">
              Ponte builds and manages a dedicated pod of 4 to 6 skilled people for your startup or MSME: engineers,
              marketers, operations and finance. European work culture, Indian results.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CtaLink />
              <a href="#how" className="btn btn-outline btn-lg">
                See how it works <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-base-content/70">
              Or write to
              <a className="link inline-flex min-h-11 items-center font-semibold text-base-content" href="mailto:hello@ponte.co.in">
                hello@ponte.co.in
              </a>
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <HeroArt />
          </div>
        </div>
      </section>

      <section aria-label="Facts about how Ponte works" className="border-y border-base-300 bg-base-200">
        <ul className="mx-auto grid max-w-6xl gap-px px-4 py-5 text-sm sm:grid-cols-3 sm:gap-6 md:text-base">
          {FACTS.map(({ Icon, text }) => (
            <li key={text} className="flex min-h-11 items-center gap-3">
              <span className="text-primary">
                <Icon />
              </span>
              <span className="text-base-content/90">{text}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

/* --------------------------------------------------------------- Value */

export function Value() {
  return (
    <section className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl leading-[1.05] font-bold md:text-6xl">You can't run, sell and manage everything alone.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-base-content/80 md:text-xl">
          Growth asks for more hats than one founder can wear. Instead of hiring one person at a time, you get a ready
          pod of 4 to 6 people who work only for your business, managed by Ponte.
        </p>
        <div className="mx-auto mt-10 max-w-2xl rounded-box border border-base-300 bg-base-200 p-6 text-left md:p-8">
          <h3 className="text-2xl font-semibold">So what is a pod?</h3>
          <p className="mt-2 text-base-content/80">
            A pod is a small team of 4 to 6 people who work only for your business. Think of it as your own team,
            without having to hire each person yourself. Ponte puts the team together and manages it day to day, and
            you tell it what matters most.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Pod */

const ROLES: [string, string, string][] = [
  ['01', 'Software and DevOps engineers', 'Build, ship and keep your product running.'],
  ['02', 'Sales and marketing', 'Find customers and build a steady pipeline.'],
  ['03', 'Operations and project management', 'Keep delivery, vendors and deadlines on track.'],
  ['04', 'Finance, HR and admin', 'Handle accounts, hiring and the paperwork behind growth.'],
]

export function Pod() {
  return (
    <section id="services" className="bg-base-200 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Your pod</Eyebrow>
          <Heading>A team built around your goals.</Heading>
          <p className="mt-4 text-lg text-base-content/80">
            We mix roles from the list below to fit what your business needs right now.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map(([n, title, text]) => (
            <article
              key={n}
              className="group relative overflow-hidden rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:border-primary/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="font-display text-6xl font-bold text-base-300 transition group-hover:text-primary/40" aria-hidden="true">
                {n}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-base-content/80">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <CtaLink />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Why */

function PodDots({ n, tone }: { n: number; tone: string }) {
  return (
    <div className="flex flex-wrap gap-2" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={`size-8 rounded-full ${tone}`} />
      ))}
    </div>
  )
}

export function Why() {
  return (
    <section id="why" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>Why Ponte</Eyebrow>
          <Heading>Your pod, your privacy, your pace.</Heading>
        </div>

        {/* Privacy */}
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <IconBadge Icon={Icons.lock} />
            <h3 className="mt-4 text-3xl font-semibold">One pod, one client.</h3>
            <p className="mt-3 text-base-content/80">
              Every pod works in isolation. Your data and plans are never shared with other clients, and each client
              signs an NDA. Our lawyer reviews the contracts.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3" role="img" aria-label="Diagram: three separate pods, one for you and two for other clients, kept apart">
            <div className="rounded-box border-2 border-primary bg-base-200 p-5">
              <div className="mb-4 flex items-center justify-between gap-2 text-sm font-semibold">
                <span>Your pod</span>
                <span className="badge badge-primary badge-sm">Only you</span>
              </div>
              <PodDots n={5} tone="bg-base-content" />
            </div>
            <div className="rounded-box border-2 border-dashed border-base-300 p-5 opacity-80">
              <div className="mb-4 flex items-center justify-between gap-2 text-sm font-semibold">
                <span>Another client</span>
                <span className="badge badge-outline badge-sm">Walled off</span>
              </div>
              <PodDots n={4} tone="bg-secondary" />
            </div>
            <div className="rounded-box border-2 border-dashed border-base-300 p-5 opacity-80">
              <div className="mb-4 flex items-center justify-between gap-2 text-sm font-semibold">
                <span>Another client</span>
                <span className="badge badge-outline badge-sm">Walled off</span>
              </div>
              <PodDots n={6} tone="bg-secondary" />
            </div>
          </div>
        </div>

        {/* Culture */}
        <div className="mt-20 grid items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <IconBadge Icon={Icons.clock} />
            <h3 className="mt-4 text-3xl font-semibold">European work culture, Indian results.</h3>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {[
              ['Time off is respected', 'Respect for working hours and leave.'],
              ['Plain, written communication', 'Clear, direct and documented.'],
              ['Autonomy and trust', 'Pods own their outcomes.'],
              ['Quality over speed', 'Done properly, then done fast.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3 rounded-box border border-base-300 bg-base-200 p-5">
                <span className="mt-0.5 text-accent">
                  <Icons.check />
                </span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="text-base-content/80">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cost */}
        <div className="mt-20 grid items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <IconBadge Icon={Icons.rupee} />
            <h3 className="mt-4 text-3xl font-semibold">Costs you can see.</h3>
            <p className="mt-3 text-base-content/80">
              You cover the expenses of your own pod, plus a management fee to Ponte. We walk you through the numbers on
              the first call.
            </p>
          </div>
          <div
            className="flex flex-col items-stretch gap-3 text-center sm:flex-row sm:items-center lg:col-span-3"
            role="img"
            aria-label="Your cost is the expenses of your own pod plus a Ponte management fee"
          >
            <div className="flex-1 rounded-box border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/70">The expenses of</p>
              <p className="font-display text-2xl font-bold">your own pod</p>
            </div>
            <span className="font-display text-3xl text-accent" aria-hidden="true">
              +
            </span>
            <div className="flex-1 rounded-box border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/70">A fee to Ponte for</p>
              <p className="font-display text-2xl font-bold">managing it</p>
            </div>
            <span className="font-display text-3xl text-accent" aria-hidden="true">
              =
            </span>
            <div className="flex-1 rounded-box border-2 border-accent bg-base-200 p-5">
              <p className="text-sm text-base-content/70">Shared with you on</p>
              <p className="font-display text-2xl font-bold">the first call</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <CtaLink />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- How */

const STEPS = [
  ['Talk', 'Tell us where you are and where you want to be. No obligation.'],
  ['Design your pod', 'We agree the 4 to 6 roles your business needs.'],
  ['Pod starts', 'Your pod gets to work with clear targets, managed by Ponte.'],
  ['Review and grow', 'Regular check-ins to adjust the pod as your business changes.'],
]

export function How() {
  return (
    <section id="how" className="bg-base-200 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <Heading>Four steps from hello to growing.</Heading>
        </div>
        <ol className="steps steps-vertical w-full md:steps-horizontal">
          {STEPS.map(([title, text], i) => (
            <li key={title} className={`step ${i === STEPS.length - 1 ? 'step-primary' : 'step-neutral'}`} data-content={i + 1}>
              <div className="px-2 text-left md:text-center">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-base-content/80">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 text-center">
          <CtaLink />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- Terms */

// TODO(founder): these four topics are deliberately described without promises. Replace each line with Ponte's real
// terms (minimum term and exit, ownership of the work, replacing a pod member, data handling) once decided.
const TERMS: [ComponentType, string, string][] = [
  [Icons.clock, 'How long, and how to leave', 'The minimum term and how to end it.'],
  [Icons.check, 'Who owns the work', 'Code, documents and data produced by your pod.'],
  [Icons.people, 'If someone leaves your pod', 'How a replacement and handover would work.'],
  [Icons.lock, 'How your data is handled', 'Access, storage and who can see what.'],
]

export function Terms() {
  return (
    <section className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Eyebrow>No surprises</Eyebrow>
          <Heading>The questions we expect, answered before you start.</Heading>
          <p className="mt-4 text-base-content/80">
            Good partnerships start with clear terms. These are the four things we go through with you on the first
            call.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {TERMS.map(([Icon, t, d]) => (
            <li key={t} className="rounded-box border border-base-300 bg-base-200 p-5">
              <IconBadge Icon={Icon} />
              <h3 className="mt-4 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-base-content/80">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- FAQ */

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
    "We settle the term and how to end it with you before your pod starts, and we're happy to go through it on the first call.",
  ],
  [
    'Who owns the work the pod produces?',
    "We settle ownership of the code, documents and data with you in your contract, and we're happy to explain it on the first call.",
  ],
  [
    'What if someone in my pod leaves?',
    "We'll walk you through how a replacement and handover would work on the first call.",
  ],
  ['How quickly will you reply?', 'Within 2 working days of your message.'],
]

export function Faq() {
  return (
    <section id="faq" className="bg-base-200 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <Eyebrow>Questions</Eyebrow>
        <Heading>Questions you may have.</Heading>
        <div className="mt-10 space-y-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="collapse collapse-arrow rounded-box border border-base-300 bg-base-100">
              <input type="radio" name="faq" defaultChecked={i === 0} aria-label={q} />
              <div className="collapse-title min-h-14 text-lg font-semibold">{q}</div>
              <div className="collapse-content text-base-content/80">{a}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base-content/80">
          Something else?{' '}
          <a className="link font-semibold text-base-content" href="#contact">
            Ask us
          </a>
          .
        </p>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- About */

export function About() {
  return (
    <section id="about" className="bg-base-100 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <TeamArt />
        <div>
          <Eyebrow>About</Eyebrow>
          <Heading>Why we built Ponte.</Heading>
          <p className="mt-5 text-lg text-base-content/80">
            Many startups and MSMEs need a full team long before they can afford to build one. We built Ponte to close
            that gap: a dedicated pod, managed by us, that works only for you.
          </p>
          <p className="mt-3 text-lg text-base-content/80">
            Ponte means "bridge". We want to be the bridge between where you are and where your business is going.
          </p>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Talent */

export function Talent({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="bg-base-100 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-neutral p-8 text-neutral-content md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Do great work? Work with us.</h2>
            <p className="mt-3 max-w-2xl text-neutral-content/80">
              We're looking for engineers, marketers, operations and finance people to work in client pods, and for
              partners who work with startups and MSMEs. Tell us what you do and we'll get in touch.
            </p>
          </div>
          <a href="#contact" onClick={onJoin} className="btn btn-lg border-0 bg-base-100 text-base-content hover:bg-base-300">
            Tell us about you
          </a>
        </div>
      </div>
    </section>
  )
}
