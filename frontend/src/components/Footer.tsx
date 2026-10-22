import { Logo } from './Art'
import { NAV } from './Header'

export default function Footer() {
  return (
    <footer className="bg-neutral pb-24 text-neutral-content sm:pb-0">
      <div className="footer mx-auto max-w-6xl gap-10 px-4 py-14 sm:footer-horizontal">
        <aside>
          <a href="#top" className="flex min-h-11 items-center gap-2 font-display text-3xl font-bold">
            <Logo />
            ponte
          </a>
          <p className="max-w-xs text-neutral-content/85">Management as a service for MSMEs and startups.</p>
        </aside>
        <nav aria-label="Footer">
          <h2 className="footer-title font-sans">Explore</h2>
          {NAV.map((n) => (
            <a key={n.href} className="link link-hover inline-flex min-h-11 items-center" href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Contact">
          <h2 className="footer-title font-sans">Get in touch</h2>
          <a className="link link-hover inline-flex min-h-11 items-center" href="#contact">
            Talk to us
          </a>
          <a className="link link-hover inline-flex min-h-11 items-center" href="mailto:hello@ponte.co.in">
            hello@ponte.co.in
          </a>
        </nav>
      </div>
      <div className="border-t border-neutral-content/20 px-4 py-4 text-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2">
          <span>&copy; 2026 Ponte &middot; ponte.co.in</span>
          <a className="link link-hover inline-flex min-h-11 items-center" href={`mailto:hello@ponte.co.in`}>
            hello@ponte.co.in
          </a>
        </div>
      </div>
    </footer>
  )
}
