import type { ComponentType, ReactNode } from 'react'
import { HeroArt, Icons, TeamArt } from './Art'

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">{children}</p>
}

function InfoCard({ Icon, title, children }: { Icon: ComponentType; title: string; children: ReactNode }) {
  return (
    <article className="card card-border bg-base-100 transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="card-body">
        <div className="mb-2 grid size-12 place-items-center rounded-2xl bg-base-200 text-primary">
          <Icon />
        </div>
        <h3 className="card-title text-xl">{title}</h3>
        <p className="text-base-content/80">{children}</p>
      </div>
    </article>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="hero overflow-hidden bg-base-100 bg-[radial-gradient(900px_500px_at_85%_10%,rgba(232,163,61,.25),transparent_60%),radial-gradient(700px_400px_at_0%_100%,rgba(180,68,31,.10),transparent_60%)]"
    >
      <div className="hero-content w-full max-w-6xl flex-col gap-12 px-4 py-14 lg:flex-row-reverse lg:justify-between lg:py-20">
        <div className="w-full max-w-sm lg:max-w-md">
          <HeroArt />
        </div>
        <div className="max-w-xl">
          <Eyebrow>Management as a service</Eyebrow>
          <h1 className="text-5xl leading-[1.1] font-bold lg:text-6xl">Build the bridge to your next stage.</h1>
          <p className="py-6 text-lg text-base-content/80">
            Ponte builds and manages a dedicated pod of 4 to 6 skilled people for your startup or MSME: engineers,
            marketers, operations and finance. European work culture, Indian results.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary btn-lg">
              Talk to us
            </a>
            <a href="#how" className="btn btn-ghost btn-lg">
              See how it works <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Who we work with">
            {['Startups', 'MSMEs', 'Dedicated pods of 4 to 6'].map((c) => (
              <li key={c} className="badge badge-lg badge-outline bg-base-100">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Value() {
  return (
    <section className="bg-base-200 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">You can't run, sell and manage everything alone.</h2>
        <p className="mt-4 text-lg text-base-content/80">
          Growth asks for more hats than one founder can wear. Instead of hiring one person at a time, you get a ready
          pod of 4 to 6 people who work only for your business, managed by Ponte.
        </p>
        <div className="mx-auto mt-8 max-w-2xl rounded-box bg-base-100 p-6 text-left">
          <h3 className="text-xl font-semibold">So what is a pod?</h3>
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

export function Pod() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-2xl">
          <Eyebrow>Your pod</Eyebrow>
          <h2 className="text-3xl font-bold md:text-4xl">A team built around your goals.</h2>
          <p className="mt-3 text-base-content/80">
            We mix roles from the list below to fit what your business needs right now.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard Icon={Icons.code} title="Software and DevOps engineers">
            Build, ship and keep your product running.
          </InfoCard>
          <InfoCard Icon={Icons.megaphone} title="Sales and marketing">
            Find customers and build a steady pipeline.
          </InfoCard>
          <InfoCard Icon={Icons.ops} title="Operations and project management">
            Keep delivery, vendors and deadlines on track.
          </InfoCard>
          <InfoCard Icon={Icons.finance} title="Finance, HR and admin">
            Handle accounts, hiring and the paperwork behind growth.
          </InfoCard>
        </div>
        <div className="mt-10">
          <a href="#contact" className="btn btn-primary">
            Talk to us
          </a>
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section id="why" className="bg-base-200 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 max-w-2xl">
          <Eyebrow>Why Ponte</Eyebrow>
          <h2 className="text-3xl font-bold md:text-4xl">Your pod, your privacy, your pace.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard Icon={Icons.lock} title="One pod, one client">
            Every pod works in isolation. Your data and plans are never shared with other clients, and each client signs
            an NDA. Our lawyer reviews the contracts.
          </InfoCard>
          <InfoCard Icon={Icons.clock} title="European work culture, Indian results">
            Respect for working hours and leave. Clear, direct and documented communication. Autonomy and trust.
            Quality over speed.
          </InfoCard>
          <InfoCard Icon={Icons.rupee} title="Costs you can see">
            You cover the expenses of your own pod, plus a management fee to Ponte. We walk you through the numbers on
            the first call.
          </InfoCard>
        </div>
        <div className="mt-10">
          <a href="#contact" className="btn btn-primary">
            Talk to us
          </a>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  ['Talk', 'Tell us where you are and where you want to be.'],
  ['Design your pod', 'We agree the 4 to 6 roles your business needs.'],
  ['Pod starts', 'Your pod gets to work with clear targets, managed by Ponte.'],
  ['Review and grow', 'Regular check-ins to adjust the pod as your business changes.'],
]

export function How() {
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl font-bold md:text-4xl">Four steps from hello to growing.</h2>
        </div>
        <ol className="steps steps-vertical w-full md:steps-horizontal">
          {STEPS.map(([title, text], i) => (
            <li key={title} className={`step ${i === STEPS.length - 1 ? 'step-primary' : 'step-neutral'}`} data-content={i + 1}>
              <div className="px-2 text-left md:text-center">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-base-content/80">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <a href="#contact" className="btn btn-primary">
            Talk to us
          </a>
        </div>
      </div>
    </section>
  )
}

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
    <section id="faq" className="bg-base-200 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="text-3xl font-bold md:text-4xl">Questions you may have.</h2>
        <div className="mt-8 space-y-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="collapse collapse-arrow bg-base-100">
              <input type="radio" name="faq" defaultChecked={i === 0} aria-label={q} />
              <div className="collapse-title min-h-11 font-semibold">{q}</div>
              <div className="collapse-content text-base-content/80">{a}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base-content/80">
          Something else?{' '}
          <a className="link font-semibold" href="#contact">
            Ask us
          </a>
          .
        </p>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <TeamArt />
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 className="text-3xl font-bold md:text-4xl">Why we built Ponte.</h2>
          <p className="mt-4 text-base-content/80">
            Many startups and MSMEs need a full team long before they can afford to build one. We built Ponte to close
            that gap: a dedicated pod, managed by us, that works only for you.
          </p>
          <p className="mt-3 text-base-content/80">
            Ponte means "bridge". We want to be the bridge between where you are and where your business is going.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Talent({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-neutral p-8 text-neutral-content md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Do great work? Work with us.</h2>
            <p className="mt-2 max-w-2xl text-neutral-content/85">
              We're looking for engineers, marketers, operations and finance people to work in client pods, and for
              partners who work with startups and MSMEs. Tell us what you do and we'll get in touch.
            </p>
          </div>
          <a href="#contact" onClick={onJoin} className="btn btn-accent">
            Tell us about you
          </a>
        </div>
      </div>
    </section>
  )
}
