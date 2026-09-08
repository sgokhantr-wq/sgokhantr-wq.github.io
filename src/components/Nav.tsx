import { NAV, SITE } from '../content/site'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const links = (
    <ul className="nav__links">
      {NAV.map((l) => (
        <li key={l.href}>
          <a href={l.href}>{l.label}</a>
        </li>
      ))}
    </ul>
  )
  return (
    <nav className="nav" aria-label="Sheet contents">
      <div className="container">
        <a className="nav__brand" href="#sheet-header">
          {SITE.short}
        </a>
        {links}
        <div className="nav__right">
          <details className="nav__contents">
            <summary>Contents</summary>
            {links}
          </details>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
