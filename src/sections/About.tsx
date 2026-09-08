import { ABOUT } from '../content/copy'
import { SITE } from '../content/site'
import { asset } from '../lib/asset'
import s from './sections.module.css'

export function About() {
  return (
    <section className="section section--band" id="about" aria-labelledby="about-t">
      <div className="container">
        <div className={s.about}>
          <div>
            <p className="eyebrow">{ABOUT.eyebrow}</p>
            <h2 id="about-t" style={{ margin: '12px 0 20px' }}>
              {ABOUT.title}
            </h2>
            {ABOUT.paragraphs.map((p) => (
              <p key={p} className="lede" style={{ marginBottom: '1em' }}>
                {p}
              </p>
            ))}
            <div className={s.contact}>
              <a className="btn btn--primary" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <a className="btn btn--ghost" href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}>
                Résumé (PDF)
              </a>
              <a className="btn btn--ghost" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
            <p className={s.withheld}>{ABOUT.withheld}</p>
          </div>

          <div>
            <h3 style={{ marginBottom: 16 }}>Earlier</h3>
            <ul className={s.earlier}>
              {ABOUT.earlier.map(([year, text]) => (
                <li key={year}>
                  <span className={s.year}>{year}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
