import { PHOTOS } from '../photos'
import { Logo } from './Art'
import { NAV } from './Header'

export default function Footer() {
  const credits = Object.values(PHOTOS).filter((p) => p.credit)
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="#top" className="wordmark wordmark--large" aria-label="Ponte home">
            <Logo />
            ponte
          </a>
          <p className="footer__line">Management as a service for MSMEs and startups.</p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Contact">
          <a href="#contact">Talk to us</a>
          <a href="mailto:hello@ponte.co.in">hello@ponte.co.in</a>
        </nav>
      </div>
      <div className="container footer__small">
        <p>© 2026 Ponte</p>
        {credits.length > 0 && (
          <p data-credits>
            Photographs:{' '}
            {credits.map((p, i) => (
              <span key={p.credit!.href}>
                {i > 0 && ', '}
                <a href={p.credit!.href}>{p.credit!.name}</a> ({p.credit!.licence})
              </span>
            ))}
          </p>
        )}
      </div>
    </footer>
  )
}
