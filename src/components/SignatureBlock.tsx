import { SITE } from '../content/site'
import { WITHHELD } from '../content/withheld'
import { ThemeToggle } from './ThemeToggle'

/** The signature block: how a form ends. Signed, dated, with what it withholds stated. */
export function SignatureBlock() {
  return (
    <div className="form" style={{ gridTemplateColumns: '1fr' }}>
      <div className="form__box">
        <span className="field-label">Signed</span>
        <div className="display" style={{ fontSize: 32, lineHeight: '36px', fontWeight: 900, textTransform: 'uppercase' }}>
          {SITE.name}
        </div>
      </div>
      <div className="form__box">
        <span className="field-label">Date</span>
        <div className="form__value">{SITE.measuredOn}</div>
      </div>
      <div className="form__box" style={{ padding: 0 }}>
        <a className="box-link" href={SITE.resumeFile} download={SITE.resumeDownloadName} style={{ border: 0 }}>
          <span className="head">Résumé</span>
          <strong>Download PDF</strong>
        </a>
      </div>
      <div className="form__box">
        <span className="field-label">Email</span>
        <div className="form__value">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>
      <div className="form__box">
        <span className="field-label">LinkedIn</span>
        <div className="form__value">
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            {SITE.linkedinHandle}
          </a>
        </div>
      </div>
      <div className="form__box">
        <span className="field-label">GitHub</span>
        <div className="form__value">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            {SITE.githubHandle}
          </a>
        </div>
      </div>
      <div className="form__box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span className="field-label" style={{ margin: 0 }}>
          Theme
        </span>
        <ThemeToggle />
      </div>
      <div className="form__box">
        <span className="field-label">Withheld</span>
        <ul className="mono" style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 13, lineHeight: 1.5, color: 'var(--slate)' }}>
          {WITHHELD.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
      <div className="form__box">
        <span className="field-label">Previous sheet</span>
        <div className="form__value">
          The earlier site stays up at{' '}
          <a href={SITE.previousSite} target="_blank" rel="noopener noreferrer">
            {SITE.previousSiteLabel}
          </a>
          .
        </div>
      </div>
    </div>
  )
}
