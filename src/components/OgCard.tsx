import { HERO_STATS, SITE } from '../content/site'

/** The 1200×630 Open Graph card, rasterized by scripts/og-render.mjs. Light theme only. */
export function OgCard() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 68px 44px',
        background: 'var(--bg)',
        color: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-30% -10% auto -10%',
          height: '70%',
          background: 'radial-gradient(700px 340px at 18% 40%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 70%)',
        }}
      />
      <div style={{ position: 'relative' }}>
        <div style={{ font: '700 18px/1 var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--brand-deep)' }}>
          {SITE.role}
        </div>
        <div style={{ font: '800 62px/1 var(--font-display)', marginTop: 18, maxWidth: '20ch' }}>
          {SITE.headline} <span style={{ color: 'var(--brand-deep)' }}>{SITE.headlineAccent}</span>
        </div>
        <div style={{ font: '600 23px/1.4 var(--font-body)', color: 'var(--muted)', marginTop: 16, maxWidth: '52ch' }}>
          {SITE.name} · a field-service ERP for a commercial HVAC &amp; mechanical contractor
        </div>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {HERO_STATS.map((st) => (
          <div key={st.l} style={{ background: 'var(--surface)', padding: '14px 20px 16px' }}>
            <div style={{ font: '800 42px/1 var(--font-display)' }}>{st.v}</div>
            <div style={{ font: '700 13px/1.3 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 6 }}>
              {st.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
