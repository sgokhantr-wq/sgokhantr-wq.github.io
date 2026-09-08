import { NAV, SITE } from '../content/site'
import { asset } from '../lib/asset'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <div className="container">
        <a className="nav__brand" href="#top">
          <span className="nav__mark" aria-hidden="true" />
          {SITE.short}
        </a>
        <ul className="nav__links">
          {NAV.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav__right">
          <ThemeToggle />
          <a className="btn btn--primary" href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}>
            Résumé
          </a>
        </div>
      </div>
    </nav>
  )
}
