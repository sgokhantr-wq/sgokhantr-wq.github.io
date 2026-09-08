import { HERO_STATS, SITE } from '../content/site'
import { asset } from '../lib/asset'
import MonthBoard from '../mockups/MonthBoard'
import s from './Hero.module.css'

const TERM = 'field-service'

/** The opening screen: one claim, the numbers beside it, one large product shot under it. */
export function Hero() {
  // Keep the compound adjective whole: a break at its hyphen is the first thing a phone shows.
  const [beforeTerm, afterTerm] = SITE.headline.split(TERM)
  return (
    <header className={s.hero} id="top">
      <div className="container">
        <div className={s.top}>
          <div>
            <p className="eyebrow">{SITE.role}</p>
            <h1 className={s.h1}>
              {beforeTerm}
              <span className={s.nowrap}>{TERM}</span>
              {afterTerm} <span className={s.accent}>{SITE.headlineAccent}</span>
            </h1>
            <p className={`lede ${s.lede}`}>{SITE.lede}</p>
            <div className={`btn-row ${s.actions}`}>
              <a className="btn btn--primary" href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}>
                Résumé (PDF)
              </a>
              <a className="btn btn--ghost" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <a className="btn btn--ghost" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <dl className={s.figures}>
            {HERO_STATS.map((st) => (
              <div className={s.figure} key={st.l}>
                <dd className={s.figureV} style={{ margin: 0 }}>
                  {st.v}
                </dd>
                <dt className={s.figureL}>{st.l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className={s.shot}>
          <MonthBoard />
        </div>
      </div>
    </header>
  )
}
