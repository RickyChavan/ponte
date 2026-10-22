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
      <a
        href="#main"
        className="btn btn-neutral absolute -left-[999px] z-50 focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/90 backdrop-blur">
        <div className="navbar mx-auto max-w-6xl px-4">
          <div className="navbar-start">
            <a href="#top" className="flex min-h-11 items-center gap-2 font-display text-3xl font-bold" aria-label="Ponte home">
              <Logo />
              ponte
            </a>
          </div>
          <nav className="navbar-center hidden lg:flex" aria-label="Main">
            <ul className="menu menu-horizontal gap-1 text-base">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="navbar-end gap-2">
            <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
              Talk to us
            </a>
            <button
              ref={btn}
              type="button"
              className="btn btn-ghost btn-square lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Icons.close /> : <Icons.menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-base-300/60 bg-base-100 lg:hidden">
            <ul className="menu mx-auto w-full max-w-6xl px-4 text-base">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-base-300 bg-base-100 p-3 sm:hidden">
        <a href="#contact" className="btn btn-primary btn-block">
          Talk to us
        </a>
      </div>
    </>
  )
}
