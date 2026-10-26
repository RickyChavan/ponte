import { useEffect, useState } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import { About, Faq, Hero, How, Pod, Talent, Why } from './components/Sections'
import type { ContactRole } from './lib/api'

export default function App() {
  const [role, setRole] = useState<ContactRole>('founder')

  // One reveal: elements marked data-reveal fade in once as they scroll into view. Without script, or with
  // reduced motion, they are visible from the start (see index.css).
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Pod />
        <Why />
        <How />
        <About />
        <Faq />
        <Talent onJoin={() => setRole('talent')} />
        <Contact role={role} setRole={setRole} />
      </main>
      <Footer />
    </>
  )
}
