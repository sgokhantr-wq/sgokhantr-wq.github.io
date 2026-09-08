import { Nav } from './components/Nav'
import { SheetHeader } from './components/SheetHeader'
import { Replaced } from './sections/Replaced'
import { FieldOps } from './sections/FieldOps'
import { Crew } from './sections/Crew'
import { Centaurus } from './sections/Centaurus'
import { Verification } from './sections/Verification'
import { BuildLog } from './sections/BuildLog'
import { About } from './sections/About'
import { FOOTER_LINE } from './content/withheld'

export default function App() {
  return (
    <>
      <a className="skip" href="#sheet-header">
        Skip to the sheet
      </a>
      <Nav />
      <main className="ledger-page">
        <SheetHeader />
        <Replaced />
        <FieldOps />
        <Crew />
        <Centaurus />
        <Verification />
        <BuildLog />
        <About />
      </main>
      <footer className="footer">
        <div className="container mono" style={{ fontSize: 13, color: 'var(--slate)' }}>
          <span>{FOOTER_LINE}</span>
        </div>
      </footer>
    </>
  )
}
