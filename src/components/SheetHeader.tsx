import { SITE } from '../content/site'
import { asset } from '../lib/asset'
import { FEEDS, MEASURED_STAMP, MIRRORED, TOTALS } from '../content/totals'
import { Stamp } from './Stamp'
import s from './SheetHeader.module.css'

/** The non-hero: a filled-in form header with a totals row. Sized to content, never 100vh. */
export function SheetHeader() {
  return (
    <header id="sheet-header" className="section" aria-label="Sheet header">
      <div className="container">
        <div className={`form ${s.hdr}`}>
          <div className={`form__box ${s.contractor}`}>
            <span className="field-label">Contractor</span>
            <h1 className={s.name}>{SITE.name}</h1>
            <div className={s.role}>{SITE.role}</div>
          </div>

          <div className={`form__box ${s.meta}`}>
            <div>
              <span className="field-label">Period</span>
              <div className={`form__value ${s.period}`}>
                <span>
                  from <b>{SITE.workStart}</b>
                </span>
                <span>
                  to <b>{SITE.workTo}</b>
                </span>
                <span className="muted">({SITE.weeks} weeks)</span>
              </div>
            </div>
            <div>
              <span className="field-label">Sheet</span>
              <div className="form__value">1 of 1</div>
            </div>
            <div>
              <span className="field-label">Stack</span>
              <div className="form__value">Frappe v15 · ERPNext · Python · MariaDB · DuckDB</div>
            </div>
          </div>

          <div className={`form__box ${s.description}`}>
            <span className="field-label">Description of work</span>
            <p className={s.descLine}>{SITE.descriptionOfWork}</p>
          </div>

          <div className={`form__box ${s.standfirst}`}>
            <span className="field-label">Summary</span>
            <p className="standfirst">{SITE.standfirst}</p>
          </div>

          <div className={`form__box ${s.ctas}`}>
            <a className="box-link" href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}>
              <span className="head">Résumé</span>
              <strong>PDF</strong>
            </a>
            <a className="box-link" href={`mailto:${SITE.email}`}>
              <span className="head">Email</span>
              <strong>Write</strong>
            </a>
            <a className="box-link" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="head">LinkedIn</span>
              <strong>Profile</strong>
            </a>
            <a className="box-link" href={SITE.github} target="_blank" rel="noopener noreferrer">
              <span className="head">GitHub</span>
              <strong>{SITE.githubHandle.replace('github.com/', '')}</strong>
            </a>
          </div>
        </div>

        <div className={s.totalsWrap}>
          <span className={s.measured}>
            <Stamp label={MEASURED_STAMP.label} sub={MEASURED_STAMP.sub} press />
          </span>
          <dl className={s.totals} aria-label="Totals">
            {TOTALS.map((t) => (
              <div key={t.label} title={`Method: ${t.method}`}>
                <dt>{t.label}</dt>
                <dd>{t.value}</dd>
                <small>{t.detail ?? ''}</small>
              </div>
            ))}
          </dl>
          <dl className={s.mirrored} aria-label="Mirrored data">
            {MIRRORED.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className={s.feeds}>
            <b>Feeds</b>
            {FEEDS.join(' · ')}
          </p>
        </div>
      </div>
    </header>
  )
}
