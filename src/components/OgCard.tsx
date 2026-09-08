import { SITE } from '../content/site'
import { MEASURED_STAMP, TOTALS } from '../content/totals'

/** The 1200×630 Open Graph card, rendered by scripts/og-render.mjs. Light theme only. */
export function OgCard() {
  const four = TOTALS.slice(0, 4)
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        position: 'relative',
        background: 'var(--sheet)',
        color: 'var(--ink)',
        overflow: 'hidden',
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, var(--hairline) 31px, var(--hairline) 32px)',
      }}
    >
      <div style={{ position: 'absolute', left: 88, top: 0, bottom: 0, width: 2, background: 'var(--marking)' }} />
      <div style={{ position: 'absolute', left: 132, top: 56, right: 72 }}>
        <div className="head" style={{ fontSize: 16, marginBottom: 12 }}>
          Contractor
        </div>
        <div style={{ font: '900 148px/0.92 var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.005em' }}>
          {SITE.name}
        </div>
        <div style={{ font: '600 30px/1.2 var(--font-body)', color: 'var(--slate)', marginTop: 14 }}>{SITE.role}</div>
        <div style={{ marginTop: 34, border: '1px solid var(--hairline)', padding: '12px 18px 16px', background: 'var(--sheet)' }}>
          <div className="head" style={{ fontSize: 14, marginBottom: 8 }}>
            Description of work
          </div>
          <div style={{ font: '700 44px/1.05 var(--font-display)' }}>{SITE.descriptionOfWork}</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 132,
          right: 72,
          bottom: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid var(--ink)',
          background: 'var(--sheet)',
        }}
      >
        {four.map((t, i) => (
          <div key={t.label} style={{ padding: '12px 18px 14px', borderRight: i < 3 ? '1px solid var(--hairline)' : 0 }}>
            <div className="head" style={{ fontSize: 14, marginBottom: 10 }}>
              {t.label}
            </div>
            <div style={{ font: '700 40px/1 var(--font-mono)', textAlign: 'right' }}>{t.value}</div>
          </div>
        ))}
      </div>
      <div
        className="stamp stamp--lg"
        style={{ position: 'absolute', right: 40, bottom: 118, background: 'var(--sheet)' }}
      >
        {MEASURED_STAMP.label}
      </div>
    </div>
  )
}
