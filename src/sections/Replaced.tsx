import { Register } from '../components/Register'
import { Section } from '../components/Section'
import { REPLACED, REPLACED_INTRO } from '../content/replaced'

export function Replaced() {
  return (
    <Section id="replaced" stamp="Replaced" title="What the paperwork used to be">
      <p className="standfirst notes" style={{ marginBottom: 28 }}>
        {REPLACED_INTRO}
      </p>
      <Register
        prose
        columns={[
          { key: 'from', label: 'From', width: '40%' },
          { key: 'to', label: 'To' },
        ]}
        rows={REPLACED.map((r) => ({
          from: r.from,
          to: (
            <>
              {r.to}
              <span className="evidence">{r.evidence}</span>
            </>
          ),
        }))}
      />
    </Section>
  )
}
