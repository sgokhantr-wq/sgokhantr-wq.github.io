import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { AiSection } from './sections/AI'
import { About } from './sections/About'
import { Platform } from './sections/Platform'
import { Proof } from './sections/Proof'
import { SITE } from './content/site'

export default function App() {
  return (
    <>
      <a className="skip" href="#platform">
        Skip to the platform
      </a>
      <Nav />
      <main>
        <Hero />
        <Platform />
        <AiSection />
        <Proof />
        <About />
      </main>
      <footer className="footer">
        <div className="container">
          <span>© 2026 {SITE.name}</span>
          <span>{SITE.footer}</span>
        </div>
      </footer>
    </>
  )
}
