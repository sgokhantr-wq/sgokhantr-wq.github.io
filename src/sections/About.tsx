import { Register } from '../components/Register'
import { Section } from '../components/Section'
import { SignatureBlock } from '../components/SignatureBlock'
import { ABOUT_PARAGRAPHS, EARLIER } from '../content/earlier'
import { SITE } from '../content/site'

export function About() {
  return (
    <Section id="about" stamp="Signed" title="About, earlier work, contact">
      <div className="grid">
        <div className="span-8">
          <div className="notes">
            {ABOUT_PARAGRAPHS.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <h3 style={{ margin: '32px 0 12px' }}>Earlier: tools that shipped real parts</h3>
          <Register
            prose
            columns={[
              { key: 'period', label: 'When', width: '10%' },
              { key: 'what', label: 'What' },
            ]}
            rows={EARLIER.map((e) => ({
              period: <span className="mono">{e.period}</span>,
              what: (
                <>
                  <strong>{e.title}.</strong> {e.desc}
                  <span className="evidence">{e.evidence}</span>
                </>
              ),
            }))}
          />
          <p className="mono" style={{ marginTop: 20, fontSize: 13, color: 'var(--weld)' }}>
            <span className="head" style={{ marginRight: 10 }}>
              Stack
            </span>
            {SITE.stackLine}
          </p>
        </div>
        <div className="span-4">
          <SignatureBlock />
        </div>
      </div>
    </Section>
  )
}
