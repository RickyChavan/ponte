import { useEffect, useRef, useState } from 'react'
import { Icons, Logo } from './Art'

export const NAV = [
  { href: '#services', label: 'Your pod' },
  { href: '#why', label: 'Why Ponte' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
  { href: '#about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="nav">
        <div className="container nav__row">
          <a href="#top" className="wordmark" aria-label="Ponte home">
            <Logo />
            ponte
          </a>
          <nav className="nav__links" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn nav__cta">
            Talk to us
          </a>
          <button
            ref={btn}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Icons.close /> : <Icons.menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="nav__mobile">
            <div className="container">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
      <div className="stickybar">
        <a href="#contact" className="btn">
          Talk to us
        </a>
      </div>
    </>
  )
}
