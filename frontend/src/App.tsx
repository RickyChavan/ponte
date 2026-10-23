import { useState } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import { About, Faq, Hero, How, Pod, Talent, Why } from './components/Sections'
import type { ContactRole } from './lib/api'

export default function App() {
  const [role, setRole] = useState<ContactRole>('founder')

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
