import { useState } from 'react'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import { About, Hero, How, Pod, Talent, Value, Why } from './components/Sections'
import type { ContactRole } from './lib/api'

export default function App() {
  const [role, setRole] = useState<ContactRole>('founder')

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Value />
        <Pod />
        <Why />
        <How />
        <About />
        <Talent onJoin={() => setRole('talent')} />
        <Contact role={role} setRole={setRole} />
      </main>
      <Footer />
    </>
  )
}
